!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";n(1),n(5),n(7),n(8),n(6);var r,o,i,a,s,l=document.querySelectorAll(".title");l=Array.from(l);var c=!0,p=!1,d=void 0;try{for(var f,u=l[Symbol.iterator]();!(c=(f=u.next()).done);c=!0){var m=f.value;m.addEventListener("dragstart",function(e){e.dataTransfer.dropEffect="move",s=this.parentNode;var t=e.clientX,n=e.clientY;r=s.getBoundingClientRect().left+s.offsetWidth/2,o=s.getBoundingClientRect().top,i=t-r,a=n-o}),m.addEventListener("drag",function(e){s.style.left=e.clientX-i+"px",s.style.top=e.clientY-a+"px"}),m.addEventListener("dragend",function(e){s.style.left=e.clientX-i+"px",s.style.top=e.clientY-a+"px"}),document.addEventListener("dragover",function(e){e.preventDefault()})}}catch(e){p=!0,d=e}finally{try{!c&&u.return&&u.return()}finally{if(p)throw d}}},function(e,t,n){var r=n(2);"string"==typeof r&&(r=[[e.id,r,""]]);n(4)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,n){t=e.exports=n(3)(),t.push([e.id,"body{margin:0;padding:0;background:#333;font:14px Micorsoft Yahei}table{border-collapse:collapse}.circuit,table{box-sizing:border-box}.circuit{position:absolute;left:50%;top:250px;transform:translateX(-50%);border-radius:50%;border:1px solid #ccc}.circuit3{width:480px;height:480px}.circuit2{width:380px;height:380px}.circuit1,.circuit2{top:50%;left:50%;transform:translate(-50%,-50%)}.circuit1{width:280px;height:280px}.circuit0{width:180px;height:180px}.circuit0,.planet{top:50%;left:50%;transform:translate(-50%,-50%)}.planet{width:80px;height:80px;border:none;background:skyblue}.plane{position:absolute;left:50%;margin-left:-20px;margin-top:-10px;width:40px;height:20px;background:pink;border-radius:0 10px 10px 0;line-height:20px;text-align:center;font-size:12px;overflow:hidden;z-index:1}.plane0{top:150px;transform-origin:50% 100px}.plane1{top:100px;transform-origin:50% 150px}.plane2{top:50px;transform-origin:50% 200px}.plane3{top:0;transform-origin:50% 250px}.energy{position:absolute;left:0;top:0;width:100%;height:100%}.full-energy{transition:.5s;background-color:#9acd32}.medium-energy{transition:.5s;background-color:#ff0}.low-energy{transition:.5s;background-color:red}.energy-percent{position:absolute;top:0;left:8px;z-index:2}.animation-scale0,.animation-scale1,.animation-scale2,.animation-scale3{animation:move-rotate linear infinite;animation-play-state:paused}@keyframes move-rotate{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.message-panel{box-sizing:border-box;position:absolute;top:0;left:50%;z-index:1;margin-left:-300px;width:600px;height:180px;font-size:12px;background:hsla(0,0%,100%,.5)}.control-panel .title,.message-panel .title{box-sizing:border-box;height:32px;line-height:32px;padding:0 12px;font-size:16px;font-weight:700;text-align:center;color:#ff0;background:red;-webkit-user-select:none}.message-panel .mes{margin:5px 12px 0}.message-panel .message-table{width:80%;margin:1.5em auto}.message-table td,.message-table th{height:1.5em;border:1px solid #ccc}.message-table th{height:2em;color:#fff;background:#666;font-weight:400}.message-table td{text-align:center}.alertMes{color:red}.control-panel{box-sizing:border-box;position:absolute;left:50%;transform:translateX(-50%);bottom:20px;width:600px;height:240px;font-size:14px;background:hsla(0,0%,100%,.5);text-align:center}.control-panel .plane-controls{line-height:1.5;padding:.5em;text-align:left}.plane-controls .plane-control:nth-child(2n+1){float:right}.plane-controls .plane-control:nth-child(2n){float:left}.control-panel button{border:1px solid #ccc;width:64px;height:24px;background:#fff;margin-left:6px;border-radius:4px}.control-panel .build-plane{display:block;width:96px;margin:.2em auto 0}.separte-line{width:100%;height:0;border-top:1px solid #333;margin:.5em 0 0}.control-panel .plane-control{margin-top:10px}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<t.length;o++){var a=t[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=u[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(c(r.parts[i],t))}else{for(var a=[],i=0;i<r.parts.length;i++)a.push(c(r.parts[i],t));u[r.id]={id:r.id,refs:1,parts:a}}}}function o(e){for(var t=[],n={},r=0;r<e.length;r++){var o=e[r],i=o[0],a=o[1],s=o[2],l=o[3],c={css:a,media:s,sourceMap:l};n[i]?n[i].parts.push(c):t.push(n[i]={id:i,parts:[c]})}return t}function i(e,t){var n=h(),r=b[b.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),b.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function a(e){e.parentNode.removeChild(e);var t=b.indexOf(e);t>=0&&b.splice(t,1)}function s(e){var t=document.createElement("style");return t.type="text/css",i(e,t),t}function l(e){var t=document.createElement("link");return t.rel="stylesheet",i(e,t),t}function c(e,t){var n,r,o;if(t.singleton){var i=y++;n=v||(v=s(t)),r=p.bind(null,n,i,!1),o=p.bind(null,n,i,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=l(t),r=f.bind(null,n),o=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(t),r=d.bind(null,n),o=function(){a(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}function p(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=x(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function d(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function f(e,t){var n=t.css,r=t.sourceMap;r&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var o=new Blob([n],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(o),i&&URL.revokeObjectURL(i)}var u={},m=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},g=m(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=m(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,y=0,b=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=g()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=o(e);return r(n,t),function(e){for(var i=[],a=0;a<n.length;a++){var s=n[a],l=u[s.id];l.refs--,i.push(l)}if(e){var c=o(e);r(c,t)}for(var a=0;a<i.length;a++){var l=i[a];if(0===l.refs){for(var p=0;p<l.parts.length;p++)l.parts[p]();delete u[l.id]}}}};var x=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}Object.defineProperty(t,"__esModule",{value:!0}),t.transformBin2Obj=t.monitorSignal=t.receiveHandleCommand=t.receiveInitOrder=t.handleCommand=void 0;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=n(6),a=r(i),s=n(7),l=r(s),c=function(e){var t=[30,50,70],n=[5,7,9],r=[2,3,4],o={index:e[0],speed:t[e[1]],power:n[e[1]],powerType:r[e[2]]};return o},p=function(e,t){if("object"===("undefined"==typeof t?"undefined":o(t))){var n=Number(e),r=Number(t.engine),i=Number(t.power),s=new Uint8Array([n,r,i]);a.init(s)}else if("string"==typeof t){var l;switch(t){case"takeoff":l=0;break;case"stop":l=1;break;case"destroy":l=2}var s=new Uint8Array([e,l]);a.emit(s)}},d=function(e){var t=e[0];switch(e[1]){case 0:l.takeoff(t);break;case 1:l.stop(t);break;case 2:l.destroy(t)}},f=function(e,t){var n,r,o,i,a,s;switch(n=e,t.speed){case 30:r=0;break;case 50:r=1;break;case 70:r=2}switch(t.powerGene){case 2:o=0;break;case 3:o=1;break;case 4:o=2}i=t.takeoff?1:0,a=t.power,s=t.init?1:0;var l=new Uint8Array([n,r,o,i,a,s]);return l},u=function(e){var t={};switch(t.planeNumber=e[0],e[1]){case 0:t.engineType="前进号";break;case 1:t.engineType="奔腾号";break;case 2:t.engineType="超越号"}switch(e[2]){case 0:t.powerType="劲量型";break;case 1:t.powerType="光能型";break;case 2:t.powerType="永久型"}return t.takeoff=e[3]?"飞行中":"停止中",t.curPower=e[4],t.init=e[5],t};t.handleCommand=p,t.receiveInitOrder=c,t.receiveHandleCommand=d,t.monitorSignal=f,t.transformBin2Obj=u},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}Object.defineProperty(t,"__esModule",{value:!0}),t.monitor=t.emit=t.init=void 0;var o=n(7),i=r(o),a=n(8),s=r(a),l=.9,c=function(e){f(function(){i.init(e)})},p=function(e){f(function(){i.receiveCommand(e)})},d=function(e){f(function(){s.updateMonitor(e)})},f=function e(t){var n=Math.random();if(n<l)setTimeout(function(){var e="指令成功";console.log(e),t()},300);else{var r="指令丢包";console.warn(r),e(t)}};t.init=c,t.emit=p,t.monitor=d},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}Object.defineProperty(t,"__esModule",{value:!0}),t.receiveCommand=t.destroy=t.stop=t.takeoff=t.init=void 0;var o=n(5),i=r(o),a=n(6),s=r(a),l=[{init:!1,takeoff:!1,power:100,timer:null,speed:0,powerCost:0,powerGene:0},{init:!1,takeoff:!1,power:100,timer:null,speed:0,powerCost:0,powerGene:0},{init:!1,takeoff:!1,power:100,timer:null,speed:0,powerCost:0,powerGene:0},{init:!1,takeoff:!1,power:100,timer:null,speed:0,powerCost:0,powerGene:0}],c=function(e){e=i.receiveInitOrder(e);var t=e.index;if(!l[t].init){var n=document.createElement("div");n.classList.add("plane"),n.classList.add("plane"+t),n.innerHTML='<span class="energy-percent">100%</span><div class="energy full-energy"></div>',document.querySelector(".circuit3").appendChild(n),l[t].init=!0,l[t].speed=e.speed,l[t].powerCost=e.power,l[t].powerGene=e.powerType,m(t)}},p=function(e){if(l[e].init&&!l[e].takeoff){var t=document.querySelector(".plane"+e),n=t.lastElementChild,r=t.firstElementChild,o=document.querySelector(".circuit"+e),i=o.getBoundingClientRect().width;t.classList.add("animation-scale"+e),t.style.animationDuration=i*Math.PI/l[e].speed+"s",t.style.animationPlayState="running",l[e].takeoff=!0,l[e].timer=window.setInterval(function(){g(e),n.style.width=l[e].power+"%",r.innerText=l[e].power+"%",l[e].power<20?(n.classList.remove("full-energy"),n.classList.remove("medium-energy"),n.classList.add("low-energy")):l[e].power>=20&&l[e].power<60?(n.classList.remove("low-energy"),n.classList.remove("full-energy"),n.classList.add("medium-energy")):(n.classList.remove("low-energy"),n.classList.remove("medium-energy"),n.classList.add("full-energy")),0===l[e].power&&d(e),100===l[e].power&&clearInterval(l[e].timer)},1e3)}},d=function(e){if(l[e].init&&l[e].takeoff){var t=document.querySelector(".plane"+e);t.style.animationPlayState="paused",l[e].takeoff=!1}},f=function(e){if(l[e].init){var t=document.querySelector(".plane"+e);t.parentNode.removeChild(t),l[e].init=!1,l[e].takeoff=!1,l[e].power=100,l[e].timer=null,l[e].speed=0,l[e].powerCost=0,l[e].powerGene=0}},u=function(e){i.receiveHandleCommand(e)},m=function(e){l[e].monitorTimer=setInterval(function(){s.monitor(i.monitorSignal(e,l[e])),l[e].init===!1&&(clearInterval(l[e].monitorTimer),l[e].monitorTimer=null)},1e3)},g=function(e){l[e].power+=l[e].powerGene,l[e].takeoff&&(l[e].power-=l[e].powerCost),l[e].power=l[e].power>=100?100:l[e].power,l[e].power=l[e].power<=0?0:l[e].power};t.init=c,t.takeoff=p,t.stop=d,t.destroy=f,t.receiveCommand=u},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}Object.defineProperty(t,"__esModule",{value:!0}),t.updateMonitor=void 0;var o=n(5),i=r(o),a=document.querySelector(".plane-controls"),s=(document.getElementsByName("engine-type"),document.getElementsByName("power-type"),[!1,!1,!1,!1]);a.addEventListener("click",function(e){if("build-plane"===e.target.className){var t={},n=document.querySelector("input[name=engine-type]:checked").value,r=document.querySelector("input[name=power-type]:checked").value;t.engine=n,t.power=r;for(var o=0;o<s.length;o++)if(s[o]===!1){s[o]=!0,i.handleCommand(o,t);break}}if("takeoff"===e.target.className&&s[e.target.parentNode.dataset.index]===!0){var a=e.target.parentNode.dataset.index;i.handleCommand(a,"takeoff")}if("stop"===e.target.className&&s[e.target.parentNode.dataset.index]===!0){var a=e.target.parentNode.dataset.index;i.handleCommand(a,"stop")}if("destroy"===e.target.className&&s[e.target.parentNode.dataset.index]===!0){var a=e.target.parentNode.dataset.index;i.handleCommand(a,"destroy"),s[a]=!1}});var l=function(e){e=i.transformBin2Obj(e),c(e)},c=function(e){var t=document.querySelector(".message-table"),n=t.querySelectorAll("tr"),r=n[e.planeNumber+1],o=r.querySelectorAll("td");o[1].innerText=e.engineType,o[2].innerText=e.powerType,o[3].innerText=e.takeoff,o[4].innerText=e.curPower,e.init||(o[1].innerText=o[2].innerText=o[3].innerText=o[4].innerText="未初始化")};t.updateMonitor=l}]);