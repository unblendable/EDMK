(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-729ac556"],{"09f4":function(e,t,i){"use strict";i.d(t,"a",(function(){return l})),Math.easeInOutQuad=function(e,t,i,a){return e/=a/2,e<1?i/2*e*e+t:(e--,-i/2*(e*(e-2)-1)+t)};var a=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function s(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function n(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(e,t,i){var l=n(),r=e-l,o=20,d=0;t="undefined"===typeof t?500:t;var u=function e(){d+=o;var n=Math.easeInOutQuad(d,l,r,t);s(n),d<t?a(e):i&&"function"===typeof i&&i()};u()}},2423:function(e,t,i){"use strict";i.d(t,"c",(function(){return s})),i.d(t,"b",(function(){return n})),i.d(t,"d",(function(){return l})),i.d(t,"a",(function(){return r})),i.d(t,"e",(function(){return o}));var a=i("b775");function s(e){return Object(a["a"])({url:"/vue-element-admin/article/list",method:"get",params:e})}function n(e){return Object(a["a"])({url:"/vue-element-admin/article/detail",method:"get",params:{id:e}})}function l(e){return Object(a["a"])({url:"/vue-element-admin/article/pv",method:"get",params:{pv:e}})}function r(e){return Object(a["a"])({url:"/vue-element-admin/article/create",method:"post",data:e})}function o(e){return Object(a["a"])({url:"/vue-element-admin/article/update",method:"post",data:e})}},4468:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"คำค้นหา"},model:{value:e.listQuery.title,callback:function(t){e.$set(e.listQuery,"title",t)},expression:"listQuery.title"}}),e._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{placeholder:"ประเภท",clearable:""},model:{value:e.listQuery.type,callback:function(t){e.$set(e.listQuery,"type",t)},expression:"listQuery.type"}},e._l(e.user_type_options,(function(t){return i("el-option",{key:t.user_type_id,attrs:{label:e.user_type_th[t.user_type_name],value:t.user_type_id}})})),1),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.getUserList()}}},[e._v("\n      ค้นหา\n    ")]),e._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:function(t){return e.handleCreate()}}},[e._v("\n      เพิ่มผู้ใช้งาน\n    ")])],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.data_table,border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{label:"ประเภท",prop:"user_type_id",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(e.user_type_th[a.user_type_name]))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"ชื่อ-นามสกุล"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.title_text+a.firstname+" "+a.lastname))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"อีเมล",prop:"email"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.email))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"เบอร์โทรศัพท์",prop:"tel"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.tel))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"ชื่อผู้ใช้งาน",prop:"username"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.username))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"วันที่เพิ่มข้อมูล",prop:"created_at",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.created_at))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"Actions",align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row,s=t.$index;return[i("el-button",{attrs:{type:"primary",size:"mini",disabled:!0},on:{click:function(t){return e.handleUpdate(a)}}},[e._v("\n          แก้ไข\n        ")]),e._v(" "),"deleted"!=a.status?i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDelete(a,s)}}},[e._v("\n          ลบ\n        ")]):e._e()]}}])})],1),e._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),e._v(" "),i("el-dialog",{attrs:{title:"เพิ่มผู้ใช้งาน",visible:e.dialogFormVisible,top:"5vh"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("el-form",{ref:"dataForm",attrs:{model:e.dialogForm,"label-position":"left","label-width":"170px"}},[i("el-form-item",{attrs:{label:"ประเภทผู้ใช้งาน",required:""}},[i("el-select",{staticStyle:{width:"100%"},model:{value:e.dialogForm.user_type_id,callback:function(t){e.$set(e.dialogForm,"user_type_id",t)},expression:"dialogForm.user_type_id"}},e._l(e.user_type_options,(function(t){return i("el-option",{key:t.user_type_id,attrs:{label:e.user_type_th[t.user_type_name],value:t.user_type_id}})})),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"คำนำหน้า",required:""}},[i("el-select",{staticStyle:{width:"100%"},model:{value:e.dialogForm.title_id,callback:function(t){e.$set(e.dialogForm,"title_id",t)},expression:"dialogForm.title_id"}},e._l(e.title_name_options,(function(e){return i("el-option",{key:e.title_id,attrs:{label:e.title_text,value:e.title_id}})})),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"ชื่อ",required:""}},[i("el-input",{attrs:{maxlength:"50","show-word-limit":""},model:{value:e.dialogForm.firstname,callback:function(t){e.$set(e.dialogForm,"firstname",t)},expression:"dialogForm.firstname"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"นามสกุล",required:""}},[i("el-input",{attrs:{maxlength:"50","show-word-limit":""},model:{value:e.dialogForm.lastname,callback:function(t){e.$set(e.dialogForm,"lastname",t)},expression:"dialogForm.lastname"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"อีเมล"}},[i("el-input",{attrs:{maxlength:"50","show-word-limit":""},model:{value:e.dialogForm.email,callback:function(t){e.$set(e.dialogForm,"email",t)},expression:"dialogForm.email"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"เบอร์โทรศัพท์"}},[i("el-input",{attrs:{maxlength:"10","show-word-limit":""},model:{value:e.dialogForm.tel,callback:function(t){e.$set(e.dialogForm,"tel",t)},expression:"dialogForm.tel"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"ชื่อผู้ใช้งาน",required:""}},[i("el-input",{attrs:{maxlength:"25","show-word-limit":""},model:{value:e.dialogForm.username,callback:function(t){e.$set(e.dialogForm,"username",t)},expression:"dialogForm.username"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"รหัสผ่าน",required:""}},[i("el-input",{attrs:{type:"password",maxlength:"25","show-word-limit":""},model:{value:e.dialogForm.password,callback:function(t){e.$set(e.dialogForm,"password",t)},expression:"dialogForm.password"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"ยืนยันรหัสผ่าน",required:""}},[i("el-input",{attrs:{type:"password",maxlength:"25","show-word-limit":""},model:{value:e.dialogForm.repass,callback:function(t){e.$set(e.dialogForm,"repass",t)},expression:"dialogForm.repass"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("\n        ย้อนกลับ\n      ")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.createUser()}}},[e._v("\n        ยืนยัน\n      ")])],1)],1),e._v(" "),i("el-dialog",{attrs:{visible:e.dialogPvVisible,title:"Reading statistics"},on:{"update:visible":function(t){e.dialogPvVisible=t}}},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.pvData,border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{prop:"key",label:"Channel"}}),e._v(" "),i("el-table-column",{attrs:{prop:"pv",label:"Pv"}})],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogPvVisible=!1}}},[e._v("Confirm")])],1)],1)],1)},s=[],n=(i("55dd"),i("20d6"),i("5530")),l=i("2423"),r=i("6724"),o=i("ed08"),d=i("333d"),u=i("2f62"),c=[{key:"CN",display_name:"China"},{key:"US",display_name:"USA"},{key:"JP",display_name:"Japan"},{key:"EU",display_name:"Eurozone"}],m=c.reduce((function(e,t){return e[t.key]=t.display_name,e}),{}),p={name:"ComplexTable",components:{Pagination:d["a"]},directives:{waves:r["a"]},filters:{statusFilter:function(e){var t={published:"success",draft:"info",deleted:"danger"};return t[e]},typeFilter:function(e){return m[e]}},data:function(){return{tableKey:0,list:null,total:0,listLoading:!0,listQuery:{page:1,limit:20,importance:void 0,title:void 0,type:void 0,sort:"+id"},importanceOptions:[1,2,3],calendarTypeOptions:c,sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],statusOptions:["published","draft","deleted"],showReviewer:!1,dialogForm:{user_type_id:"",title_id:"",firstname:"",lastname:"",email:"",tel:"",username:"",password:"",repass:""},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Create"},dialogPvVisible:!1,pvData:[],rules:{type:[{required:!0,message:"type is required",trigger:"change"}],timestamp:[{type:"date",required:!0,message:"timestamp is required",trigger:"change"}],title:[{required:!0,message:"title is required",trigger:"blur"}]},downloadLoading:!1,user_type_th:{admin:"ผู้ดูแลระบบ",teacher:"ครูผู้สอน",student:"นักเรียน",staff:"เจ้าหน้าที่"},temp:{}}},created:function(){this.getList(),this.$store.dispatch("user/getUserType"),this.$store.dispatch("user/getTitleNameList"),this.getUserList()},computed:Object(n["a"])({},Object(u["d"])({user_type_options:function(e){return e.user.user_type_options},title_name_options:function(e){return e.user.title_name_options},data_table:function(e){return e.user.data_table}})),methods:Object(n["a"])(Object(n["a"])({},Object(u["b"])({getUserList:"user/getUserMemberList",removeUser:"user/removeUser"})),{},{getList:function(){var e=this;this.listLoading=!0,Object(l["c"])(this.listQuery).then((function(t){e.list=t.data.items,e.total=t.data.total,setTimeout((function(){e.listLoading=!1}),1500)}))},handleFilter:function(){this.listQuery.page=1,this.getList()},handleModifyStatus:function(e,t){this.$message({message:"操作Success",type:"success"}),e.status=t},sortChange:function(e){var t=e.prop,i=e.order;"id"===t&&this.sortByID(i)},sortByID:function(e){this.listQuery.sort="ascending"===e?"+id":"-id",this.handleFilter()},resetTemp:function(){this.temp={id:void 0,importance:1,remark:"",timestamp:new Date,title:"",status:"published",type:""}},handleCreate:function(){this.dialogForm={user_type_id:"",title_id:"",firstname:"",lastname:"",email:"",tel:"",username:"",password:"",repass:""},this.dialogFormVisible=!0},createData:function(){var e=this;this.$refs["dataForm"].validate((function(t){t&&(e.temp.id=parseInt(100*Math.random())+1024,e.temp.author="vue-element-admin",Object(l["a"])(e.temp).then((function(){e.list.unshift(e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Created Successfully",type:"success",duration:2e3})})))}))},handleUpdate:function(e){var t=this;this.temp=Object.assign({},e),this.temp.timestamp=new Date(this.temp.timestamp),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},updateData:function(){var e=this;this.$refs["dataForm"].validate((function(t){if(t){var i=Object.assign({},e.temp);i.timestamp=+new Date(i.timestamp),Object(l["e"])(i).then((function(){var t=e.list.findIndex((function(t){return t.id===e.temp.id}));e.list.splice(t,1,e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Update Successfully",type:"success",duration:2e3})}))}}))},handleDelete:function(e,t){this.removeUser({user_member_id:e.user_member_id,index:t})},handleFetchPv:function(e){var t=this;Object(l["d"])(e).then((function(e){t.pvData=e.data.pvData,t.dialogPvVisible=!0}))},handleDownload:function(){var e=this;this.downloadLoading=!0,Promise.all([i.e("chunk-6e83591c"),i.e("chunk-5164a781"),i.e("chunk-5bdd67a2"),i.e("chunk-54b312fe")]).then(i.bind(null,"4bf8d")).then((function(t){var i=["timestamp","title","type","importance","status"],a=["timestamp","title","type","importance","status"],s=e.formatJson(a);t.export_json_to_excel({header:i,data:s,filename:"table-list"}),e.downloadLoading=!1}))},formatJson:function(e){return this.list.map((function(t){return e.map((function(e){return"timestamp"===e?Object(o["f"])(t[e]):t[e]}))}))},getSortClass:function(e){var t=this.listQuery.sort;return t==="+".concat(e)?"ascending":"descending"},createUser:function(){if(this.dialogForm.user_type_id)if(this.dialogForm.title_id)if(this.dialogForm.firstname)if(this.dialogForm.lastname)if(this.dialogForm.username.length<4)this.$message({message:"กรุณาระบุชื่อผู้ใช้งานมากกว่า 4 ตัวอักษร",type:"warning"});else if(this.dialogForm.password.length<6)this.$message({message:"กรุณาระบุรหัสผ่านมากกว่า 6 ตัวอักษร",type:"warning"});else if(this.dialogForm.repass!==this.dialogForm.password)this.$message({message:"กรุณายืนยันรหัสผ่านให้ตรงกัน",type:"warning"});else{var e=this.dialogForm;this.$store.dispatch("user/createUser",e),this.dialogFormVisible=!1,this.dialogForm={user_type_id:"",title_id:"",firstname:"",lastname:"",email:"",tel:"",username:"",password:"",repass:""}}else this.$message({message:"กรุณาระบุนามสกุล",type:"warning"});else this.$message({message:"กรุณาระบุชื่อ",type:"warning"});else this.$message({message:"กรุณาระบุคำนำหน้าชื่อ",type:"warning"});else this.$message({message:"กรุณาระบุประเภทผู้ใช้งาน",type:"warning"})}})},f=p,g=i("2877"),h=Object(g["a"])(f,a,s,!1,null,null,null);t["default"]=h.exports},6724:function(e,t,i){"use strict";i("8d41");var a="@@wavesContext";function s(e,t){function i(i){var a=Object.assign({},t.value),s=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),n=s.ele;if(n){n.style.position="relative",n.style.overflow="hidden";var l=n.getBoundingClientRect(),r=n.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":(r=document.createElement("span"),r.className="waves-ripple",r.style.height=r.style.width=Math.max(l.width,l.height)+"px",n.appendChild(r)),s.type){case"center":r.style.top=l.height/2-r.offsetHeight/2+"px",r.style.left=l.width/2-r.offsetWidth/2+"px";break;default:r.style.top=(i.pageY-l.top-r.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",r.style.left=(i.pageX-l.left-r.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return r.style.backgroundColor=s.color,r.className="waves-ripple z-active",!1}}return e[a]?e[a].removeHandle=i:e[a]={removeHandle:i},i}var n={bind:function(e,t){e.addEventListener("click",s(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[a].removeHandle,!1),e.addEventListener("click",s(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[a].removeHandle,!1),e[a]=null,delete e[a]}},l=function(e){e.directive("waves",n)};window.Vue&&(window.waves=n,Vue.use(l)),n.install=l;t["a"]=n},"8d41":function(e,t,i){}}]);