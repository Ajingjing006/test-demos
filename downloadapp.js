define(function(require, exports, module){
	var StatisticsView = require("text!../template/downloadApp.html");
	module.exports = Nuui.View.extend({
		template:_.template(StatisticsView),
		onRender:function(){
			var view = this;
			var isNotice = true;
			var pageParams = App.storage.mergeParams() || {};//值合并
			if(pageParams && pageParams.isNotice){
				var isNotice = pageParams.isNotice;
				App.clearStorage();
			}
			
//			微信页面跳转
			var pathname=Nuui.utils.getUrlParams("pathname","$");
			var hashHref=Nuui.utils.getUrlParams("hashHref","$");
			if((pathname&&hashHref)&&(pathname!="") && isNotice){
    			(function(){
    				hashHref=(new Nuui.utils.Base64()).decode(hashHref);
    				hashHref=hashHref.replace(/\$/g,"&");
    				
    				if(hashHref == "#life/index/index" || hashHref == "#financial/index/index" || hashHref == "#public/index/mine"){
						hashHref = "#public/index/index";
					}else if(hashHref == "#downloadApp/download/accountQuery"){
						hashHref = "#account/demand/demand";
					}
    				
    				if (window.RUN_ON_PRODUCT == true){
    					var schemaUrl = "bocom://https://wap.95559.com.cn"+pathname+hashHref;
    				} else{
    					var schemaUrl = "bocom://https://mbanktest.95559.com.cn"+pathname+hashHref;
			 		} 
//					var schemaUrl = "bocom://https://mbanktest.95559.com.cn"+pathname+hashHref;

					window.location.href = schemaUrl;
    			})();
			}
			
			
			//获取url中的参数
			var t=Nuui.utils.getUrlParams("t","$");
			var fileName;
			var theUrl;
			//获取手机系统  ad-安卓 ip-iphone
			var sysType;
			if(Nuui.android){
				sysType = "Android";
				App.request("MobileBank",{ //查询安卓最新包包名）
    				data:{"processCode":"MB1000"},
            	    connect: function(resp, status) {
	    				if(resp && resp.RSP_HEAD && resp.RSP_HEAD.TRAN_SUCCESS == "0"){
							Nuui.utils.alert(resp.RSP_HEAD.SHOW_CODE+":"+resp.RSP_HEAD.ERROR_MESSAGE);
							return ;
					    }
	    				fileName = resp.RSP_BODY.fileName;
	    				theUrl = 'http://download1.bankcomm.com/mobs/download/client/android/'+fileName;
    				}
    			});
			}else if(Nuui.iphone||Nuui.ipad){
				sysType = "IOS";
			};
			// 获取终端的相关信息
		    var Terminal = {
		        // 辨别移动终端类型
		        platform : function(){
		            var u = navigator.userAgent, app = navigator.appVersion;
		            return {
		                // android终端或者uc浏览器
		                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
		                // 是否为iPhone或者QQHD浏览器
		                iPhone: u.indexOf('iPhone') > -1 ,
		                // 是否iPad
		                iPad: u.indexOf('iPad') > -1 ,
		                // 是否为windows
		                windows: u.indexOf('Windows NT') > -1 ,
		                // 是否为mac
		                mac: u.indexOf('Mac')> -1,
		                // 是否为微信
		                wechat: u.indexOf('MicroMessenger') > -1
		            };
		        }(),
		        // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
		        language : (navigator.browserLanguage || navigator.language).toLowerCase()
		    };

	    	// 根据不同的终端，跳转到不同的地址
//		    var macDownloadUrl = 'https://itunes.apple.com/cn/app/%E4%BA%A4%E9%80%9A%E9%93%B6%E8%A1%8C/id337876534?mt=8';
		    var macDownloadUrl = 'https://itunes.apple.com/us/app/jiao-tong-yin-xing/id337876534';
		    if(Terminal.platform.wechat)
	        {
//	        	view.$("#shadow")[0].style.display="block";
//	        	view.$("#sharediv")[0].style.display="block";
	        }else if(Terminal.platform.iPhone || Terminal.platform.mac){
	        	/*//如果是用浏览器扫描的，可以直接下载app
	        	if (t) { // 2016/7/12 如果没有传参数(source 或 t)就不发送接口 
	        		App.request("MobileBank",{
						async:false,
						data:{"processCode": "SY0009","t":t,"systype":sysType},
						connect:function(resp, status){
							if(resp.RSP_HEAD.TRAN_SUCCESS == "1"){
					           
					           location.href = macDownloadUrl;
							}else{
								Nuui.utils.alert(resp.RSP_HEAD.SHOW_CODE+":"+resp.RSP_HEAD.ERROR_MESSAGE);
							}
						}
					});
	        	} else {
	        		location.href = macDownloadUrl;
	        	}*/
	        	
	        	setTimeout(function(){ // 2016/7/13  徐涛
	        		if(pathname&&hashHref){
	        			
	        		}else{
	        			view.$("#poptsp").triggerHandler("tap");
	        		}
	        	}, 200);
	        }
		    
		    function download()
		    {	
		    	
		    	if(Terminal.platform.wechat){
		        	var u=navigator.userAgent;
		        	var origin = window.location.origin;
					if (u.indexOf('Android')>-1 || u.indexOf('Linux')>-1){						
						App.navigate("#downloadApp/download/androidDownloadApp", true);
					}else if (u.indexOf('iPhone')>-1){
						window.location.href = macDownloadUrl;
					}	
				}else if(Terminal.platform.android || Terminal.platform.windows){
		            location.href = theUrl;
		            //theUrl = '${request.getContextPath()}/download/android'; 
		        }else if(Terminal.platform.iPhone || Terminal.platform.mac){
			        	Nuui.utils.confirm("在“App Store”中打开链接吗？",{
			        		title:" ",
			    			confirmButContent:"打开",
			    			cancelButContent:"取消"
			        	},function(flag){
			        		if(flag){
					            location.href = macDownloadUrl;
			        		}
			        	}
		        	);
		        }else{
		            //不支持的操作系统，默认下载Android平台
		            window.location.href = theUrl;
		        }
		    }
		    
			view.$("#poptsp").unbind("tap").bind("tap",function(){
				//判断是否在微信中扫描
				if (t) { // 2016/7/12 如果没有传参数(source 或 t)就不发送接口 
					//如果是用浏览器扫描的，可以直接下载app
						App.request("MobileBank",{
							async:false,
						data:{"processCode": "SY0009","t":t,"systype":sysType},
							connect:function(resp, status){
								if(resp.RSP_HEAD.TRAN_SUCCESS == "1"){
									download();
									/*if(sysType == "Android"){
										window.location.replace("http://download1.bankcomm.com/mobs/download/client/android/jtyh.apk");
									}else if(sysType == "IOS"){
										window.location.replace("https://itunes.apple.com/us/app/jiao-tong-yin-xing/id337876534");
									}*/
								}else{
									Nuui.utils.alert(resp.RSP_HEAD.SHOW_CODE+":"+resp.RSP_HEAD.ERROR_MESSAGE);
								}
							}
						});
					
				} else {
					download();
				}
				return false;
			});
			
			view.$(".reload").unbind("tap").bind("tap",function(){
				window.location.reload();
				return false;
			});
			

			
			
		},
		onShow:function(){
			var view=this;
			var wh=$(window).height();
//			苹果8最低情况下会遮不住利率的机型
			if(wh>489){
				view.$(".shadow").css("height",5.9+"rem");
			}
			
			if(wh>622){
				view.$(".shadow").css("height",7.28125+"rem");
			}
			
			view.$(".bodyPng").css("height",wh-1+"px");
			
			document.ontouchmove=function(){
				return false;
			}
		}
	});
});