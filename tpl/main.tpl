<link rel="stylesheet" href="css/page.css"/>
<div id="data-cont">
	<div class="data-node data-node-0 tech-hide" data-inde="0"></div>
	<div class="data-node data-node-1 tech-hide" data-inde="1"></div>
	<div class="data-node data-node-2 tech-hide" data-inde="2"></div>
	<div class="data-node data-node-3 tech-hide" data-inde="3"></div>
	<div class="data-node data-node-4 hide" data-inde="4"></div>
	<div class="data-node data-node-5 hide" data-inde="5"></div>
	<div class="data-node data-node-6 hide" data-inde="6"></div>
	<div class="data-node data-node-7 hide" data-inde="7"></div>
	<div class="data-node data-node-8 hide" data-inde="8"></div>
	<div class="data-node data-node-9 hide" data-inde="9"></div>
</div>
<div id="main-content">
<ul class="entries-ul">
	{{#each list}}
		<li class="li-item li-item-{{@index}}" title="{{name}}" data-index="{{@index}}">
			<img src="./img/bill-icon.png" alt="{{picName}}">
			<div class="item-name-filed">{{name}}</div>
		</li>
	{{/each}}
	</ul> 
</div>