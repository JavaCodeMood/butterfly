KISSY.add("gallery/uploader/1.4/plugins/filedrop/filedrop",function(e,h,i){var g=h.all,d=e.UA,f=function(a){f.superclass.constructor.call(this,a);this.set("mode",j())},j=function(){if(7<=d.webkit||3.6<=d.firefox)return"supportDrop";if(d.ie)return"notSupportDropIe";if(7>d.webkit||3.6>d.firefox)return"notSupportDrop"};e.mix(f,{event:{AFTER_DROP:"afterdrop"}});e.extend(f,i,{pluginInitializer:function(a){var c=this,b=c.get("mode");if(!a)return!1;c.set("uploader",a);if("flash"==a.get("type"))return e.log("flash\u4e0a\u4f20\u65b9\u5f0f\u4e0d\u652f\u6301\u62d6\u62fd\uff01"),
c.set("isSupport",!1),!1;if("supportDrop"!=b)return e.log("\u8be5\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u62d6\u62fd\u4e0a\u4f20\uff01"),c.set("isSupport",!1),!1;b=a.get("target");c.set("target",b);c._createDropArea().on("click",c._clickHandler,c);a.on("afterDisabledChange",function(a){c[a.newVal&&"hide"||"show"]()});c.fire("render",{buttonTarget:c.get("buttonWrap")})},show:function(){this.get("dropContainer").show()},hide:function(){this.get("dropContainer").hide()},_createDropArea:function(){var a=this,c=g(a.get("target")),b=a.get("mode"),b=e.substitute(a.get("tpl")[b],
{name:a.get("name")}),b=g(b),d=b.all(".J_ButtonWrap");b.appendTo(c);b.on("dragover",function(a){a.stopPropagation();a.preventDefault()});b.on("drop",function(b){b.stopPropagation();b.preventDefault();a._dropHandler(b)});a.set("dropContainer",b);a.set("buttonWrap",d);a._setStyle();return b},_setStyle:function(){var a=this.get("dropContainer");if(!a.length)return!1;a.parent().css("position","relative");a.css({position:"absolute",top:"0",left:"0",width:"100%",height:"100%",zIndex:"1000"})},_clickHandler:function(){this.get("uploader").get("button").get("fileInput").fire("click")},
_dropHandler:function(a){var c=f.event,a=a.originalEvent.dataTransfer.files,b=[],d=this.get("uploader");if(!a.length||""==d)return!1;e.each(a,function(a){e.isObject(a)&&b.push({name:a.name,type:a.type,size:a.size,data:a})});this.fire(c.AFTER_DROP,{files:b});d._select({files:b})}},{ATTRS:{pluginId:{value:"filedrop"},target:{value:"",getter:function(a){return g(a)}},uploader:{value:""},dropContainer:{value:""},isSupport:{value:!0},tpl:{value:{supportDrop:'<div class="drop-wrapper"></div>',notSupportDropIe:'<div class="drop-wrapper"><p>\u60a8\u7684\u6d4f\u89c8\u5668\u53ea\u652f\u6301\u4f20\u7edf\u7684\u56fe\u7247\u4e0a\u4f20\uff0c</p><p class="suggest J_ButtonWrap">\u63a8\u8350\u4f7f\u7528chrome\u6d4f\u89c8\u5668\u6216firefox\u6d4f\u89c8\u5668</p></div>',
notSupportDrop:'<div class="drop-wrapper"><p>\u60a8\u7684\u6d4f\u89c8\u5668\u53ea\u652f\u6301\u4f20\u7edf\u7684\u56fe\u7247\u4e0a\u4f20\uff0c</p><p class="suggest J_ButtonWrap">\u63a8\u8350\u5347\u7ea7\u60a8\u7684\u6d4f\u89c8\u5668</p></div>'}},name:{value:""}}});return f},{requires:["node","base"]});