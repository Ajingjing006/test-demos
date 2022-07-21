<script id="tpl-10010000" type="text/x-handlebars-template">
	//第一行,入口列表模版
	<style>
		.entries-ul .li-item {
			display: inline-block;
			width: 60px;
			margin: 2px;
			outline: 1px solid pink;
			padding: 10px 0px 0px;
			position: relative;
			overflow: hidden;
		}
		.entries-ul .li-item > img {
			width: 35px;
			height: auto;
		}
		.entries-ul .li-item .item-name-filed {
			text-align: center;
			font-size: 12px;
			color: #222;
		}
	</style>
	<ul class="entries-ul">
	{{#each list}}
		<li class="li-item li-item-{{@index}}" title="{{name}}" data-index="{{@index}}">
			<img src="./img/bill-icon.png" alt="{{picName}}">
			<div class="item-name-filed">{{name}}</div>
		</li>
	{{/each}}
	</ul> 
</script>