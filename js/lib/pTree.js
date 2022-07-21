const uuidKey = 'DY_UUID';
let uuid = 0;
const childListClass = 'p-tree-child-container'; // 子节点容器类名

const exludeproperties = ['opened', 'children', 'disabled']; //排除配置的属性值
//创建唯一坐标值，同一页面，值是累积的，并不用于后端存储
function getUUID() {
	return uuid++;
}

class PTree {
	constructor(config) {
		this.config = config;
		this.mapping = new Map(); //构建数据uuid和数据体的映射关系
		this.initDom();
		this.bindEvents(); //绑定事件
	}

	//组件初始化
	initDom() {
		const {
			data
		} = this.config; //抽离出数据部分，然后构建domtree
		if (Array.isArray(data)) {
			const root = this.getRoot();
			data.map(node => root.appendChild(this.createElement(node)))
		}
	}

	//基于内容构建属性和子节点
	createPropertiesAndChildren(ele, eleData) {
		const _uuid = eleData._uuid;
		Object.keys(eleData).forEach(key => {
			const value = eleData[key];
			if (key === 'text') {
				if (this.config.selectable == true) {
					ele.appendChild(this.getVCheckbox(eleData));
				} else {
					ele.appendChild(document.createTextNode(value));
				}
			} else if (key === 'children') {
				const children = Array.isArray(value) ? value : [];
				const _childrenContainer = this.getChildrenContainer(ele); //提升到循环外边，减少查询性能损耗
				children.forEach(child => this.addChildNode(_childrenContainer, this.createElement(child)));
			} else if (!exludeproperties.includes(key)) { //被排除的属性不做保留在自定义属性上
				ele.setAttribute(`data-${key}`, value);
			}
		})
		//生成副本
		this.addMapping(_uuid, {
			...eleData
		})
	}

	//生成一个可勾选组件
	getVCheckbox(eleData) {
		const checkboxContainer = document.createElement('div');
		checkboxContainer.className = 'checkbox-container';
		checkboxContainer.innerHTML =
			`<div class="checkbox" value='${eleData._uuid}'>${eleData.text}</div><span class='state-icon'></span>`;
		return checkboxContainer;
	}

	//创建ele
	createElement(eleData) {
		const ele = document.createElement('div');
		const _uuid = getUUID(); //获取当前节点uuid 
		ele.setAttribute(`data-${uuidKey}`, _uuid);
		eleData._uuid = _uuid;
		this.createPropertiesAndChildren(ele, eleData);
		this.configNodeClassList(ele, eleData);
		return ele;
	}

	//更新节点
	updateElement(eleData) {
		const _uuid = eleData._uuid;
		const parent = document.querySelector(`[data-${uuidKey}='${_uuid}']`);
		if (parent) {
			parent.innerHTML = '';
			this.createPropertiesAndChildren(parent, eleData);
		}
	}

	//获取子节点容器
	getChildrenContainer(parent) {
		let container = Array.from(parent.children).find(child => child.classList.contains(
			childListClass));
		if (!container) {
			container = document.createElement('div');
			container.classList.add(childListClass);
			parent.appendChild(container);
		}
		return container;
	}

	//添加子节点
	addChildNode(childContainer, node) {
		childContainer.appendChild(node);
	}

	//添加映射表
	addMapping(id, value) {
		this.mapping.set(id, value);
	}

	//获取根结点
	getRoot() {
		return document.querySelector(`#${this.config.root}`);
	}

	//配置一个节点的类样式
	configNodeClassList(ele, eleData) {
		if (ele) { //保证节点存在
			const classList = ele.classList; //获取样式表tokenList
			classList.add('tree-node'); //树节点默认类名 
			if (eleData.opened == true) {
				classList.toggle('opened', true); //设置展开
				delete eleData.opened;
			}

			//存在子节点
			if (eleData.children && Array.isArray(eleData.children) && eleData.children.length) {
				classList.toggle('haschild', true);
			} else {
				classList.toggle('haschild', false);
				classList.toggle('childnode', true); //子节点增加
			}

			//设置为禁止操作
			if (eleData.disabled === true) {
				classList.toggle('disabled', true);
			}
		}
	}

	// 绑定事件
	bindEvents() {
		this.getRoot().addEventListener('click', (e) => {
			let target = e.target;
			let currentTreeNode = target;
			if (!currentTreeNode.classList.contains('tree-node')) {
				currentTreeNode = currentTreeNode.closest('.tree-node');
			}
			if (target.classList.contains('state-icon')) { //勾选切换
				this.selectChangeHandler(currentTreeNode);
				e.stopImmediatePropagation();
			} else {
				typeof this.config.clickhandler === 'function' && this.config.clickhandler(target);
				this.treeNodeHandler(target, e);
			}
		})
	}

	//节点点击事件
	treeNodeHandler(treeNode, event) {
		if (this.isDisabled(treeNode)) {
			// event.preventDefault();
			event.stopPropagation(); //stopImmediatePropagation
			return;
		}
		if (this.isParentNode(treeNode)) {
			treeNode.classList.toggle('opened');
		}
	}

	//disabled节点
	isDisabled(treeNode) {
		return !!treeNode.closest('.disabled');
	}

	//单纯子节点
	isChildNode(treeNode) {
		return treeNode.classList.contains('childnode');
	}

	//含有子节点
	isParentNode(treeNode) {
		return !this.isChildNode(treeNode);
	}

	//节点选择变化
	selectChangeHandler(treeNode) {
		if (!this.isDisabled(treeNode)) {
			if (this.isChildNode(treeNode)) {
				const selected = treeNode.classList.toggle('selected');
			} else {
				const classList = treeNode.classList;
				let result = false;
				if (classList.contains('all')) {
					classList.toggle('all', false);
				} else if (classList.contains('half')) {
					classList.toggle('half', false);
				} else {
					result = classList.toggle('all', true);
				}
				this.upDateAllChildren(treeNode, result);
			}
			const parentNode = treeNode.parentNode.closest('.tree-node');
			this.loopUpdateParents(parentNode);
		}
	}

	//子节点变换更新父节点值
	loopUpdateParents(parentNode) {
		if (parentNode) {
			const _uuidkey = `data-${uuidKey}`;
			const uuid = parentNode.dataset[uuidKey.toLowerCase()];
			const children = document.querySelectorAll(
				`[${_uuidkey}='${uuid}'] > .p-tree-child-container > .tree-node`);
			if (children.length) {
				const allResult = Array.from(children).every(child => {
					return (this.isChildNode(child) && child.classList.contains('selected')) || (this
						.isParentNode(
							child) && child.classList.contains('all'))
				})

				if (allResult) {
					parentNode.classList.toggle('all', true);
					parentNode.classList.toggle('half', false);
				} else {
					const anyResult = Array.from(children).some(child => {
						return (this.isChildNode(child) && child.classList.contains('selected')) || (this
							.isParentNode(
								child) && (child.classList.contains('all') || child.classList.contains(
								'half')))
					})
					if (anyResult) {
						parentNode.classList.toggle('half', true);
						parentNode.classList.toggle('all', false);
					} else {
						parentNode.classList.toggle('half', false);
						parentNode.classList.toggle('all', false);
					}
				}
			}
			this.loopUpdateParents(parentNode.parentNode.closest('.tree-node'));
		}
	}

	//更新全部子节点
	upDateAllChildren(node, value) {
		const children = document.querySelectorAll(
			`[data-${uuidKey}='${node.dataset[uuidKey.toLowerCase()]}'] .tree-node`);
		Array.from(children).forEach(child => {
			this.isChildNode(child) && child.classList.toggle('selected', value);
			if (this.isParentNode(child)) {
				child.classList.toggle('all', value);
				child.classList.toggle('half', false);
			}
		})
	}

	//根据id从map获取完整的数据对象
	getDataById(id) {
		const nodeData = this.mapping.get(+id);
		console.log('id', id, nodeData);
		return nodeData;
	}

	//获取选中的节点
	getSelection() {
		const children = Array.from(document.querySelectorAll(`.p-tree .tree-node.childnode.selected`) || []).map(
			(ele) => this
			.getDataById(ele.dataset[uuidKey.toLowerCase()]));
		const parents = Array.from(document.querySelectorAll(`.p-tree .tree-node.half, .p-tree .tree-node.all`) ||
		[]).map(
			(ele) => this
			.getDataById(ele.dataset[uuidKey.toLowerCase()]));
		const all = [...children, ...parents];
		return {
			parents,
			children,
			all
		}

	}
}

export default PTree;
