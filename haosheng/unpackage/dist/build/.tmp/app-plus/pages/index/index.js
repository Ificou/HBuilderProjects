(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"19f4":function(e,t,n){"use strict";var a=n("9ce9"),i=n.n(a);i.a},7898:function(e,t,n){"use strict";n.r(t);var a=n("c01f"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);t["default"]=i.a},"9ce9":function(e,t,n){},c01f:function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){return n.e("components/prompt").then(n.bind(null,"e540"))},o={data:function(){return{image:{user:e.getStorageSync("user-image")},promptText:"",key:"",showKey:!1,imageLevel:"../../static/haosheng/level_3.png",height:750*e.getSystemInfoSync().screenHeight/e.getSystemInfoSync().screenWidth-230+"upx",mydata:{userName:"牛先生",keyWord:"******",cashMoney:"0",todayMoney:"0",monthMoney:"0",lastMoney:"0",imageCenter:"https://i.niupic.com/images/2019/11/13/_430.jpg",imageCenter2:"https://i.niupic.com/images/2019/11/13/_430.jpg",imageCenter3:"https://i.niupic.com/images/2019/11/13/_430.jpg",level:"高级团长",detailCash:"",detailTeam:"",centerWx:"",detail:[{title:"提现",image:"../../static/haosheng/1-1.png"},{title:"团队",image:"../../static/haosheng/1-2.png"},{title:"淘宝订单",image:"../../static/haosheng/1-3.png"},{title:"其他订单",image:"../../static/haosheng/1-4.png"}],orders:[{title:"待付款",image:"../../static/haosheng/2-1.png"},{title:"待发货",image:"../../static/haosheng/2-2.png"},{title:"待收货",image:"../../static/haosheng/2-3.png"},{title:"退款/售后",image:"../../static/haosheng/2-4.png"}],center:[{title:"邀请好友",content:"自用省钱分享赚钱",image:"../../static/haosheng/3-1.png"},{title:"导师微信",content:"yhdq166188",image:"../../static/haosheng/3-2.png"},{title:"新手教程",content:"初入好省必读攻略",image:"../../static/haosheng/3-3.png"}],services:[{title:"收入榜单",content:"大神收入在此",image:"../../static/haosheng/4-2.png"},{title:"个人商城",content:"焕新上线",image:"../../static/haosheng/4-3.png"},{title:"收藏夹",content:"收藏喜欢的商品",image:"../../static/haosheng/4-4.png"},{title:"拼多多",content:"小程序高额返佣",image:"../../static/haosheng/4-5.png"},{title:"好省秒杀",content:"小程序",image:"../../static/haosheng/4-6.png"},{title:"常见问题",content:"有问题点这里",image:"../../static/haosheng/4-7.png"},{title:"找回订单",content:"找回无佣金订单",image:"../../static/haosheng/4-8.png"},{title:"地推物料",content:"地推拉新赚钱",image:"../../static/haosheng/4-9.png"},{title:"商家报名",content:"专业打造爆款",image:"../../static/haosheng/4-10.png"},{title:"关于好省",content:"V2.4.7",image:"../../static/haosheng/4-11.png"}]}}},components:{Prompt:i},onLoad:function(){this.init()},methods:{init:function(){e.getStorageSync("user-image")&&(this.image.user=e.getStorageSync("user-image")),e.getStorageSync("user-name")&&(this.mydata.userName=e.getStorageSync("user-name")),e.getStorageSync("key-word")&&(this.mydata.keyWord=e.getStorageSync("key-word")),e.getStorageSync("cash-money")&&(this.mydata.cashMoney=e.getStorageSync("cash-money")),e.getStorageSync("today-money")&&(this.mydata.todayMoney=e.getStorageSync("today-money")),e.getStorageSync("month-money")&&(this.mydata.monthMoney=e.getStorageSync("month-money")),e.getStorageSync("last-money")&&(this.mydata.lastMoney=e.getStorageSync("last-money")),e.getStorageSync("level")&&(this.mydata.level=e.getStorageSync("level")),e.getStorageSync("image-center")&&(this.mydata.imageCenter=e.getStorageSync("image-center")),e.getStorageSync("image-center2")&&(this.mydata.imageCenter2=e.getStorageSync("image-center2")),e.getStorageSync("image-center3")&&(this.mydata.imageCenter3=e.getStorageSync("image-center3")),e.getStorageSync("detailCash")&&(this.mydata.detailCash=e.getStorageSync("detailCash")),e.getStorageSync("detailTeam")&&(this.mydata.detailTeam=e.getStorageSync("detailTeam")),e.getStorageSync("centerWx")&&(this.mydata.centerWx=e.getStorageSync("centerWx")),"高级团长"==this.mydata.level?this.imageLevel="../../static/haosheng/level_3.png":"团长"==this.mydata.level?this.imageLevel="../../static/haosheng/level_2.png":this.imageLevel="../../static/haosheng/level_1.png"},chooseImage:function(){var t=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(n){e.saveFile({tempFilePath:n.tempFilePaths[0],success:function(n){e.setStorageSync("user-image",n.savedFilePath),t.image.user=n.savedFilePath}})}})},goCash:function(){e.navigateTo({url:"cash"})},goRank:function(){e.navigateTo({url:"rank"})},goIncome:function(){e.navigateTo({url:"income"})},changeContent:function(e){this.key=e,this.$refs.prompt.show()},onConfirm:function(t){var n=t;""!=n?(e.setStorageSync(this.key,n+""),this.$refs.prompt.hide(),this.init()):console.log(a("你还未输入"," at pages\\index\\index.vue:350"))},onCancel:function(){this.$refs.prompt.hide(),this.$refs.prompt.cost=""}}};t.default=o}).call(this,n("6e42")["default"],n("0de9")["default"])},c468:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.showKey=!e.showKey})},i=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return i})},d976:function(e,t,n){"use strict";n.r(t);var a=n("c468"),i=n("7898");for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);n("19f4");var g=n("2877"),s=Object(g["a"])(i["default"],a["a"],a["b"],!1,null,null,null);t["default"]=s.exports},f301:function(e,t,n){"use strict";(function(e){n("ad83"),n("921b");a(n("66fd"));var t=a(n("d976"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])}},[["f301","common/runtime","common/vendor"]]]);