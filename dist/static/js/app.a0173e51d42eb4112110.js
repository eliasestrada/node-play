webpackJsonp([1,2],[,,,,,function(t,e,n){"use strict";var a=n(6),i=n(57),s=n(49),u=n.n(s),r=n(51),l=n.n(r),o=n(13),I=n.n(o);a.a.use(i.a),e.a=new i.a({routes:[{path:"/",name:"Assets",component:u.a,props:{filter:"ok"}},{path:"/play/:id",name:"Play",component:l.a},{path:"/uploader",name:"Uploader",component:I.a},{path:"/working",name:"Working",component:u.a,props:{filter:"working"}}]})},,,,,,,,function(t,e,n){n(40);var a=n(1)(n(37),n(53),"data-v-48d40dbd",null);t.exports=a.exports},function(t,e,n){n(39);var a=n(1)(n(33),n(52),null,null);t.exports=a.exports},,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";e.a={asset_root:"/play"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(2),i=n.n(a),s=n(50),u=n.n(s),r=n(13),l=n.n(r);e.default={name:"Assets",props:["filter"],data:function(){return{assets:[],errors:[]}},components:{Media:u.a,Uploader:l.a},created:function(){var t=this;i.a.get("/api/list").then(function(e){t.assets=e.data.assets}).catch(function(e){t.errors.push(e)})}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(2),i=n.n(a),s=n(5),u=n(32);e.default={name:"Media",props:["mediaid","idx","filter"],data:function(){return{status:null,name:null,id:null,owner:null,hls3:null,dash:null,thumb:[],hls4:null,playready:null,widevine:null,errors:[],play:function(){s.a.push({name:"Play",params:{id:this.mediaid}})}}},created:function(){var t=this;i.a.get("/api/status/"+this.mediaid).then(function(e){t.status=e.data.status,t.owner=e.data.owner,t.dash=e.data.dash,t.hls3=e.data.hls3,t.thumb=e.data.thumb,t.name=e.data.name,t.id=t.mediaid}).catch(function(e){t.errors.push(e)})},computed:{imgurl:function(){return u.a.asset_root+"/"+this.owner+"/"+this.id+"/"+this.thumb[1]}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(2),i=n.n(a),s=n(44),u=n.n(s),r=new u.a;e.default={name:"Play",props:["mediaid","idx"],data:function(){return{status:null,name:null,id:null,owner:null,hls3:null,dash:null,thumb:[],hls4:null,playready:null,widevine:null,errors:[],play:function(){alert(this.dash)}}},created:function(){var t=this;i.a.get("/api/status/"+this.$route.params.id).then(function(e){t.status=e.data.status,t.owner=e.data.owner,t.dash=e.data.dash,t.hls3=e.data.hls3,t.thumb=e.data.thumb,t.id=e.data.id,t.name=e.data.name,r.play(window.location.protocol+"//"+window.location.host+"/play/"+t.owner+"/"+t.id+"/",e.data)}).catch(function(e){t.errors.push(e)})}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(38),i=(n.n(a),n(2)),s=n.n(i),u=null;e.default={name:"Uploader",data:function(){return{errors:[],ids:[]}},created:function(){var t=this;u=new a.UploadManager,console.log("NEW UPLOADMANAGER"),u.setOptions({url:window.location.protocol+"//"+window.location.host+"/upload",owner:"uploader"}),u.on("new",function(e){s.a.get("/api/upload/"+e).then(function(n){var a=n.data.id,i=u.uploader[e]._opt.url;i+="/"+a,u.uploader[e]._opt.url=i;var s=t.ids.length;u.uploader[e]._opt.tag=s,t.ids.push({id:e,status:"paused",serverid:a,idx:s,perc:0})}).catch(function(e){t.errors.push(e)})}),u.on("progress",function(e,n){var a=u.uploader[n]._opt.tag;t.ids[a].perc=e}),u.on("completed",function(e){var n=u.uploader[e]._opt.tag;t.ids[n].perc="100",t.ids[n].status="compleated"})},methods:{selectFiles:function(t){u.selectFiles(t.target)},resumeUpload:function(t){var e=this.ids[t].id;u.uploader[e].resume(),this.ids[t].status="running"},pauseUpload:function(t){var e=this.ids[t].id;u.uploader[e].pause(),this.ids[t].status="paused"}}}},,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,function(t,e){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+Cgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHZlcnNpb249IjEuMSIKICAgeD0iMHB4IgogICB5PSIwcHgiCiAgIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiCiAgIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMDAgMTAwMCIKICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIKICAgaWQ9InN2ZzQxMzYiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTEgcjEzNzI1IgogICBzb2RpcG9kaTpkb2NuYW1lPSJsb2dvLnN2ZyI+PGRlZnMKICAgICBpZD0iZGVmczQxNTQiIC8+PHNvZGlwb2RpOm5hbWVkdmlldwogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxIgogICAgIG9iamVjdHRvbGVyYW5jZT0iMTAiCiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAiCiAgICAgZ3VpZGV0b2xlcmFuY2U9IjEwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjExMzciCiAgICAgaWQ9Im5hbWVkdmlldzQxNTIiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjAuODM1OTgzMyIKICAgICBpbmtzY2FwZTpjeD0iNTAwIgogICAgIGlua3NjYXBlOmN5PSI0OTQuMDUyODEiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzQxMzYiIC8+PG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNDEzOCI+IFN2ZyBWZWN0b3IgSWNvbnMgOiBodHRwOi8vd3d3Lm9ubGluZXdlYmZvbnRzLmNvbS9pY29uIDxyZGY6UkRGPjxjYzpXb3JrCiAgICAgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlCiAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPjxkYzp0aXRsZT48L2RjOnRpdGxlPjwvY2M6V29yaz48L3JkZjpSREY+PC9tZXRhZGF0YT48ZwogICAgIGlkPSJnNDE0MCIKICAgICB0cmFuc2Zvcm09Im1hdHJpeCgtMSwwLDAsLTEsMTAwMCw5OTkuOTk3NSkiPjxnCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjEsMCwwLC0wLjEsMCw1MTEpIgogICAgICAgaWQ9Imc0MTQyIj48cGF0aAogICAgICAgICBkPSJtIDE4NDAsNDM2MC4yIGMgLTY5LjQsLTM4LjMgLTEyNC40LC0xNTcuOSAtMTAwLjUsLTIyMi41IDcuMiwtMjEuNSAzNS45LC02NC42IDYyLjIsLTkzLjMgbCA0Ny44LC01NSAzMTUwLjUsMCAzMTUwLjUsMCA0Ny44LDU1IGMgOTMuMyw5OC4xIDc0LjEsMjU2IC00MC43LDMxNS44IC0xMDIuOCw1Mi43IC02MjE5LjUsNTIuNyAtNjMxNy42LDAgeiIKICAgICAgICAgaWQ9InBhdGg0MTQ0IgogICAgICAgICBzdHlsZT0iZmlsbDojNDBhYTZiO2ZpbGwtb3BhY2l0eToxIgogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPjxwYXRoCiAgICAgICAgIGQ9Im0gMTAzOC42LDM1NDkuMyBjIC0xNjIuNywtNzEuOCAtMTU3LjksLTI5Ni42IDQuOCwtMzYzLjYgMTE5LjYsLTUwLjIgNzc5My42LC01MC4yIDc5MTMuMiwwIDE2Ny41LDY5LjQgMTY3LjUsMjk0LjIgMCwzNjMuNiAtMTE3LjIsNDcuOCAtNzgwNS42LDQ3LjggLTc5MTgsMCB6IgogICAgICAgICBpZD0icGF0aDQxNDYiCiAgICAgICAgIHN0eWxlPSJmaWxsOiM0MGFhNmI7ZmlsbC1vcGFjaXR5OjEiCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+PHBhdGgKICAgICAgICAgZD0ibSAxNjcuOSwyNjk3LjcgYyAtMjYuMywtMjYuMyAtNTIuNiwtNzEuOCAtNTkuOCwtMTAwLjUgLTcuMiwtMzEuMSAtOS42LC0xNTQyLjkgLTcuMiwtMzM2MSBsIDcuMiwtMzMwNS45IDU1LC01NSA1NSwtNTUgNDc4MS45LDAgNDc4MS45LDAgNTUsNTUgNTUsNTUgNy4yLDMzMDUuOSBjIDIuNCwxODE4IDAsMzMyOS45IC03LjIsMzM2MSAtNy4yLDI4LjcgLTMzLjUsNzQuMiAtNTkuOCwxMDAuNSAtNDcuOCw0Ny44IC0xMDAuNSw0Ny44IC00ODMyLjEsNDcuOCAtNDczMS43LDAgLTQ3ODQuMywwIC00ODMyLjEsLTQ3LjggeiBtIDkzMjQuNSwtMzQxMy42IC03LjIsLTMwNTcuMiAtNDQ4NS4yLDAgLTQ0ODUuMywwIC03LjIsMzA1Ny4yIC00LjgsMzA1NC44IDQ0OTcuMywwIDQ0OTcuMiwwIC00LjgsLTMwNTQuOCB6IgogICAgICAgICBpZD0icGF0aDQxNDgiCiAgICAgICAgIHN0eWxlPSJmaWxsOiM0MGFhNmI7ZmlsbC1vcGFjaXR5OjEiCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+PHBhdGgKICAgICAgICAgZD0ibSA2MjY5LjgwMTQsLTE5MTYuMzA3MyA2Mi4yLDc0LjIgMCwxMTIxLjgwMDAxIGMgMCwxMTg0LjEgLTQuOCwxMjM0LjQgLTEwNy42LDEyNzUgLTEyMiw0NS40IC0yMTUuMyw3LjIgLTEyODQuNiwtNTI2LjI5OTk5NyBDIDQzNDQuMTAxNSwtMjY4LjIwNzI5IDM4MjAuMzAxNSwtNTM4LjUwNzI5IDM3NzcuMjAxNSwtNTY5LjYwNzI5IGMgLTkwLjksLTcxLjggLTEwMi45LC0xNzQuNiAtMjguNywtMjQ4LjggMjYuMywtMjYuMyA1NTUsLTMwMS40MDAwMSAxMTc0LjQ5OTksLTYxMC4wMDAwMSA3OTksLTM5OS40IDExNDUuOSwtNTYyLjEgMTIwMy4zLC01NjIuMSA2Mi4yLDAgOTgsMTkuMSAxNDMuNSw3NC4yIHoiCiAgICAgICAgIGlkPSJwYXRoNDE1MCIKICAgICAgICAgc3R5bGU9ImZpbGw6IzQwYWE2YjtmaWxsLW9wYWNpdHk6MSIKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgLz48L2c+PC9nPjwvc3ZnPg=="},function(t,e,n){t.exports=n.p+"static/img/play-icon.88bd6a5.png"},function(t,e,n){n(43);var a=n(1)(n(34),n(56),"data-v-d6d65bdc",null);t.exports=a.exports},function(t,e,n){n(42);var a=n(1)(n(35),n(55),"data-v-ce173fb6",null);t.exports=a.exports},function(t,e,n){n(41);var a=n(1)(n(36),n(54),"data-v-70bc9b03",null);t.exports=a.exports},function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("img",{attrs:{src:n(47),id:"logo"}}),t._v(" "),a("div",[a("router-link",{attrs:{to:"/"}},[t._v("Home")]),t._v(" | \n        "),a("router-link",{attrs:{to:"/uploader"}},[t._v("Uploader")]),t._v(" |\n        "),a("router-link",{attrs:{to:"/working"}},[t._v("Working")])],1),t._v(" "),a("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Uploader"},[n("h1",[t._v("Uploader")]),t._v(" "),n("input",{attrs:{id:"file_input",multiple:"",type:"file"},on:{change:t.selectFiles}}),t._v(" "),t.ids.length?n("ul",{attrs:{id:"example-1"}},t._l(t.ids,function(e){return n("li",[n("p",[t._v(t._s(e.id))]),t._v(" "),n("p",[t._v(t._s(e.status))]),t._v(" "),n("p",[t._v(t._s(e.perc))]),t._v(" "),"paused"==e.status?n("a",{on:{click:function(n){t.resumeUpload(e.idx)}}},[t._v("start")]):t._e(),t._v(" "),"running"==e.status?n("a",{on:{click:function(n){t.pauseUpload(e.idx)}}},[t._v("pause")]):t._e()])})):t._e(),t._v(" "),t.errors&&t.errors.length?n("ul",t._l(t.errors,function(e){return n("li",[t._v("\n          "+t._s(e.message)+"\n        ")])})):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Play"},[n("h3",[t._v("Play "+t._s(t.name))]),t._v(" "),t._m(0),t._v(" "),t.errors&&t.errors.length?n("ul",t._l(t.errors,function(e){return n("li",[t._v("\n          "+t._s(e.message)+"\n        ")])})):t._e()])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"playbody"},[n("div",{attrs:{id:"playerhost"}})])}]}},function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return"ok"==t.status&&"ok"==t.filter||"ok"!=t.status&&"working"==t.filter?a("div",{staticClass:"Media"},[a("h3",[t._v(t._s(t.name))]),t._v(" "),"ok"!=t.filter?a("p",[t._v(t._s(t.id)+" - "+t._s(t.status))]):t._e(),t._v(" "),t.thumb&&t.thumb.length?a("img",{staticClass:"pthumb",attrs:{src:t.imgurl}}):t._e(),t._v(" "),t.dash||t.hls3?a("img",{staticClass:"picon",attrs:{src:n(48)},on:{click:function(e){t.play()}}}):t._e(),t._v(" "),t.errors&&t.errors.length?a("ul",t._l(t.errors,function(e){return a("li",[t._v("\n          "+t._s(e.message)+"\n        ")])})):t._e()]):t._e()},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Assets"},[n("h3",[t._v("Media")]),t._v(" "),t.assets&&t.assets.length?n("div",t._l(t.assets,function(e,a){return n("Media",{key:e.mediaid,tag:"div",attrs:{mediaid:e.id,idx:a,filter:t.filter}})})):t._e(),t._v(" "),t.assets.length||"ok"!=t.filter?t._e():n("Uploader"),t._v(" "),t.errors&&t.errors.length?n("ul",t._l(t.errors,function(e){return n("li",[t._v("\n          "+t._s(e.message)+"\n        ")])})):t._e()],1)},staticRenderFns:[]}},,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(6),i=n(14),s=n.n(i),u=n(5);a.a.config.productionTip=!1,new a.a({el:"#app",router:u.a,template:"<App/>",components:{App:s.a}})}],[59]);
//# sourceMappingURL=app.a0173e51d42eb4112110.js.map