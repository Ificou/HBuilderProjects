<template>
	<view class="content">
		<view style="width: 699upx;padding-left: 25.5upx;padding-right: 25.5upx;">
			<view style="width: 100%;height: 50upx;display: flex;flex-direction: row;justify-content: flex-end;font-size: 30upx;">
				<view>消息</view>
				<view style="margin-left: 45upx;">设置</view>
			</view>
		</view>
		<scroll-view :scroll-y="true" :style="{height: height, marginTop: '25upx', background: '#F8F8F8'}">
			<view style="width: 699upx;padding-left: 25.5upx;padding-right: 25.5upx;background: #FFFFFF;">
				<view style="height: 114upx;width: 100%;display: flex;flex-direction: row;">
					<view style="width: 114upx;height: 100%;">
						<image :src="image.user" @longpress="chooseImage('user')" style="width: 100%;height: 100%;border-radius: 50%;"></image>
					</view>
					<view style="width: 600upx;height: 100%;margin-left: 22.5upx;">
						<view style="width: 100%;height: 50%;display: flex;flex-direction: row;align-items: center;">
							<view style="font-size: 37.5upx;font-weight: bold;" @longpress="changeContent('user-name')">{{mydata.userName}}</view>
							<view style="height: 37.5upx;background: #141414;border-radius: 6upx;padding:0 7.5upx;margin-left: 27upx;">
								<view @longpress="changeContent('level')" style="font-size: 22upx;color: #F3D763;display: flex;justify-content: flex-end;height: 30upx;line-height: 30upx;padding-top: 5upx;">
									<image :src="imageLevel" style="height: 28upx;width: 35upx;"></image>
									{{mydata.level}}
								</view>
							</view>
						</view>
						<view style="width: 100%;height: 50%;display: flex;flex-direction: row;align-items: center;color: #969696;">
							<view @longpress="changeContent('key-word')" v-if="showKey">邀请口令: {{mydata.keyWord}}</view>
							<view @longpress="changeContent('key-word')" v-else>邀请口令: <text style="font-size: 18upx;font-family: 'verdana';">******</text></view>
							<view style="margin-left: 30upx;text-decoration: underline;">复制</view>
							<view style="margin-left: 30upx;text-decoration: underline;" @click="showKey = !showKey">{{showKey? '隐藏': '显示'}}</view>
						</view>
					</view>
				</view>
				
				<view style="width: calc(100% - 54upx);height: 190upx;background-image: linear-gradient(to right, #E7496F, #E93323);
				margin-top: 15upx;border-radius: 15upx;padding: 25upx 27upx;color: #FFFFFF;">
					<view style="display: flex;flex-direction: row;align-items: center;">
						<view style="width: 480upx;">
							<view style="font-size: 27upx;" @longpress="changeContent('cash-money')">可提现&nbsp;￥<text style="font-size: 36upx;font-weight: bold;">{{mydata.cashMoney}}</text></view>
							<view style="font-size: 21upx;">每月25号提现上个自然月确认收货的订单收入</view>
						</view>
						<view style="width: 162upx;">
							<view class="center" style="width: 100%;height: 50upx;border-radius: 20upx;
							background: #FFFFFF;color: #E93323;" @tap="goCash">
								立即提现
							</view>
						</view>
					</view>
					<view style="display: flex;flex-direction: row;width: 100%;margin-top: 30upx;align-items: center;">
						<view style="width: 210upx;flex-direction: column;height: 75upx;" class="center" @tap="goIncome">
							<view style="font-size: 32upx;font-weight: bold;" @longpress="changeContent('today-money')">￥{{mydata.todayMoney}}</view>
							<view style="font-size: 25upx;">今日预估<text class="moneySize" style="margin-left: 18upx">&gt;</text></view>
						</view>
						<view style="height: 50upx;border-right: 2upx solid #F09699;"></view>
						<view style="width: 210upx;flex-direction: column;height: 75upx;" class="center" @tap="goIncome">
							<view style="font-size: 32upx;font-weight: bold;" @longpress="changeContent('month-money')">￥{{mydata.monthMoney}}</view>
							<view style="font-size: 25upx;">本月预估<text class="moneySize" style="margin-left: 18upx">&gt;</text></view>
						</view>
						<view style="height: 50upx;border-right: 2upx solid #F09699;"></view>
						<view style="width: 210upx;flex-direction: column;height: 75upx;" class="center" @tap="goIncome">
							<view style="font-size: 32upx;font-weight: bold;" @longpress="changeContent('last-money')">￥{{mydata.lastMoney}}</view>
							<view style="font-size: 25upx;">上月预估<text class="moneySize" style="margin-left: 18upx">&gt;</text></view>
						</view>
					</view>
					
				</view>
					
				<view style="width: calc(100% - 54upx);height: 90upx;border-radius: 15upx;background-image: linear-gradient(to right, #313131, #141414);
				margin-top: 15upx;padding: 0 27upx;display: flex;flex-direction: row;align-items: center;color:#D7BE6F">
					<view v-if="mydata.level == '合伙人'" style="width: 60%;font-size: 30upx;font-weight: bold;font-family: '楷体';">
						<image src="../../static/haosheng/level_2.png" class="image_level"></image>
						<span style="margin-left: 10upx;">0元升级享更多特权</span>
					</view>
					<view v-if="mydata.level == '团长'" style="width: 60%;font-size: 30upx;font-weight: bold;font-family: '楷体';">
						<image src="../../static/haosheng/level_3.png" class="image_level"></image>
						<span style="margin-left: 10upx;">0元升级享更多特权</span>
					</view>
					<view v-if="mydata.level == '高级团长'" style="width: 60%;font-size: 30upx;font-weight: bold;font-family: '楷体';">
						<image src="../../static/haosheng/level_3.png" class="image_level"></image>
						<span style="margin-left: 10upx;">高级团长特权</span>
					</view>
					<view style="width: 40%;height: 100%;align-items: center;display: flex;justify-content: flex-end;">
						<view v-if="mydata.level == '合伙人'" class="level" style="border-radius: 25upx;border: 1upx solid #D7BE6F;">升级团长</view>
						<view v-if="mydata.level == '团长'" class="level" style="border-radius: 25upx;border: 1upx solid #D7BE6F;">升级高级团长</view>
						<view v-if="mydata.level == '高级团长'" class="level">查看特权&nbsp;&nbsp;&gt;&gt;</view>
					</view>
				</view>
				
				<view style="width: 100%;height: 230upx;">
					<view style="width: 100%;height: 90upx;display: flex;flex-direction: row;align-items: center;">
						<view style="width: 60%;font-size: 30upx;font-weight: bold;">会员详情</view>
						<view style="width: 40%;text-align: right;">
							查看概况
							<span class="rightArrow">&gt;</span>
						</view>
					</view>
					<view style="width: 100%;height: 90upx;margin-top: 15upx;display: flex;flex-direction: row;">
						<view style="width: 25%;font-size: 30upx;" v-for="(item, index) in mydata.detail" :key="index">
							<view style="width: 100%;" class="center">
								<image style="width: 45upx;height: 45upx;" :src="item.image"></image>
							</view>
							<view style="width: 100%;font-size: 25upx;margin-top: 15upx;" class="center">{{item.title}}</view>
							<view @longpress="changeContent('detailCash')" class="center detailSize" 
							style="color: #EA3323;width: 100%;height: 30upx" v-if="item.title == '提现'">{{showKey ? mydata.detailCash : ''}}</view>
							<view @longpress="changeContent('detailTeam')" class="center detailSize" 
							style="color: #EA3323;width: 100%;height: 30upx;" v-if="item.title == '团队'">{{showKey ? mydata.detailTeam : '***'}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view style="width: 100%;height: 150upx;background: #F8F8F8;" class="center">
				<swiper class="swiperSize" :indicator-dots="false" :autoplay="true" :interval="5000" :duration="500">
					<swiper-item>
						<image class="swiperSize swiperRadius" @longpress="changeContent('image-center')" :src="mydata.imageCenter">
						</image>
					</swiper-item>
					<swiper-item>
						<image class="swiperSize swiperRadius" @longpress="changeContent('image-center2')" :src="mydata.imageCenter2">
						</image>
					</swiper-item>
					<swiper-item>
						<image class="swiperSize swiperRadius" @longpress="changeContent('image-center3')" :src="mydata.imageCenter3">
						</image>
					</swiper-item>
				</swiper>
			</view>
			<view style="width: 699upx;padding-left: 25.5upx;padding-right: 25.5upx;background: #FFFFFF;">
				<view style="width: 100%;height: 225upx;">
					<view style="width: 100%;height: 90upx;display: flex;flex-direction: row;align-items: center;">
						<view style="width: 60%;font-size: 30upx;font-weight: bold;">我的秒杀单</view>
						<view style="width: 40%;text-align: right;">查看更多订单
						<span class="rightArrow">&gt;</span>
						</view>
					</view>
					<view style="width: 100%;height: 90upx;margin-top: 15upx;display: flex;flex-direction: row;align-items: center;">
						<view style="width: 25%;font-size: 30upx;" v-for="(item, index) in mydata.orders" :key="index">
							<view style="width: 100%;" class="center">
								<image style="width: 55upx;height: 45upx;" :src="item.image"></image>
							</view>
							<view style="width: 100%;font-size: 25upx;margin-top: 25upx;" class="center">{{item.title}}</view>
						</view>
					</view>
				</view>
				
				<view style="width: 100%;height: 225upx;">
					<view style="width: 100%;height: 90upx;display: flex;flex-direction: row;align-items: center;">
						<view style="width: 60%;font-size: 30upx;font-weight: bold;">会员中心</view>
					</view>
					<view style="width: 100%;height: 90upx;margin-top: 15upx;display: flex;flex-direction: row;align-items: center;">
						<view style="width: 33%;font-size: 30upx;" v-for="(item, index) in mydata.center" :key="index">
							<view style="width: 100%;" class="center">
								<image style="width: 75upx;height: 75upx;" :src="item.image"></image>
							</view>
							<view style="width: 100%;font-size: 25upx;" class="center">{{item.title}}</view>
							<view @longpress="changeContent('centerWx')" v-if="index == 1" style="width: 100%;font-size: 25upx;color:#9F9F9F;" class="center">
							{{showKey ? mydata.centerWx == '' ? item.content : mydata.centerWx : '****'}}
							</view>
							<view v-else style="width: 100%;font-size: 25upx;color:#9F9F9F;" class="center">{{item.content}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view style="width: 100%;height: 15upx;background: #F8F8F8;"></view>
			
			<view style="width: 699upx;padding-left: 25.5upx;padding-right: 25.5upx;background: #FFFFFF;">
				<view style="width: 100%;">
					<view style="width: 100%;height: 90upx;display: flex;flex-direction: row;align-items: center;">
						<view style="width: 60%;font-size: 30upx;font-weight: bold;">我的服务</view>
					</view>
					<view style="width: 100%;margin-top: 15upx;display: flex;flex-direction: row;align-items: center;flex-flow:row wrap;">
						<view style="width: 25%;font-size: 30upx;height: 150upx;" v-for="(item, index) in mydata.services" 
						:key="index">
							<view style="width: 100%;" class="center">
								<image v-if="item.title == '收入榜单'" @tap="goRank" style="width: 60upx;height: 55upx;" :src="item.image"></image>
								<image v-else style="width: 60upx;height: 55upx;" :src="item.image"></image>
							</view>
							<view style="width: 100%;font-size: 25upx;margin-top: 10upx;" class="center">{{item.title}}</view>
							<view style="width: 100%;font-size: 20upx;color:#9F9F9F;" class="center">{{item.content}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view style="width: 100%;height: 15upx;background: #F8F8F8;"></view>
		</scroll-view>
		<view style="width: 100%;height: 90upx;">
			<image @longpress="chooseImage('tab')" :src="image.bottomTab" style="width: 100%;height: 100%;"></image>
		</view>
		<Prompt ref="prompt" @onConfirm="onConfirm" @onCancel="onCancel" title="请输入您需要填写的内容" :text="promptText" />
	</view>
</template>

<script>
	import Prompt from '../../components/prompt.vue'
	export default {
		data() {
			return {
				image: {
					user: uni.getStorageSync('user-image'),
					bottomTab: '../../static/haosheng/tabs.png'
				},
				promptText: '',
				key: '',
				showKey: false,
				imageLevel: '../../static/haosheng/level_3.png',
				height: (uni.getSystemInfoSync().screenHeight * 750/uni.getSystemInfoSync().screenWidth - 240) + 'upx',
				mydata: {
					userName: '牛先生',
					keyWord: '******',
					cashMoney: '0',
					todayMoney: '0',
					monthMoney: '0',
					lastMoney: '0',
					imageCenter: 'https://i.niupic.com/images/2019/11/13/_430.jpg',
					imageCenter2: 'https://i.niupic.com/images/2019/11/13/_430.jpg',
					imageCenter3: 'https://i.niupic.com/images/2019/11/13/_430.jpg',
					level: '高级团长',
					detailCash: '',
					detailTeam: '',
					centerWx: '',
					detail: [
						{title: '提现', image: '../../static/haosheng/1-1.png'},
						{title: '团队', image: '../../static/haosheng/1-2.png'},
						{title: '淘宝订单', image: '../../static/haosheng/1-3.png'},
						{title: '其他订单', image: '../../static/haosheng/1-4.png'}
					],
					orders: [
						{title: '待付款', image: '../../static/haosheng/2-1.png'},
						{title: '待发货', image: '../../static/haosheng/2-2.png'},
						{title: '待收货', image: '../../static/haosheng/2-3.png'},
						{title: '退款/售后', image: '../../static/haosheng/2-4.png'}
					],
					center: [
						{title: '邀请好友', content: '自用省钱分享赚钱', image: '../../static/haosheng/3-1.png'},
						{title: '导师微信', content: 'yhdq166188', image: '../../static/haosheng/3-2.png'},
						{title: '新手教程', content: '初入好省必读攻略', image: '../../static/haosheng/3-3.png'}
					],
					services: [
						{title: '收入榜单', content: '大神收入在此', image: '../../static/haosheng/4-2.png'},
						{title: '个人商城', content: '焕新上线', image: '../../static/haosheng/4-3.png'},
						{title: '收藏夹', content: '收藏喜欢的商品', image: '../../static/haosheng/4-4.png'},
						{title: '拼多多', content: '小程序高额返佣', image: '../../static/haosheng/4-5.png'},
						{title: '好省秒杀', content: '小程序', image: '../../static/haosheng/4-6.png'},
						{title: '常见问题', content: '有问题点这里', image: '../../static/haosheng/4-7.png'},
						{title: '找回订单', content: '找回无佣金订单', image: '../../static/haosheng/4-8.png'},
						{title: '地推物料', content: '地推拉新赚钱', image: '../../static/haosheng/4-9.png'},
						{title: '商家报名', content: '专业打造爆款', image: '../../static/haosheng/4-10.png'},
						{title: '关于好省', content: 'V2.4.7', image: '../../static/haosheng/4-11.png'}
					]
				}
			}
		},
		components: {
			Prompt,
		},
		onLoad() {
			this.init();
		},
		methods: {
			init: function(){
				if(uni.getStorageSync('user-image')){
					this.image.user = uni.getStorageSync('user-image');
				}
				if(uni.getStorageSync('bottomTab')){
					this.image.bottomTab = uni.getStorageSync('bottomTab');
				}
				if (uni.getStorageSync('user-name')) {
					this.mydata.userName = uni.getStorageSync('user-name');
				}
				if (uni.getStorageSync('key-word')) {
					this.mydata.keyWord = uni.getStorageSync('key-word');
				}
				if (uni.getStorageSync('cash-money')) {
					this.mydata.cashMoney = uni.getStorageSync('cash-money');
				}
				if (uni.getStorageSync('today-money')) {
					this.mydata.todayMoney = uni.getStorageSync('today-money');
				}
				if (uni.getStorageSync('month-money')) {
					this.mydata.monthMoney = uni.getStorageSync('month-money');
				}
				if (uni.getStorageSync('last-money')) {
					this.mydata.lastMoney = uni.getStorageSync('last-money');
				}
				if (uni.getStorageSync('level')) {
					this.mydata.level = uni.getStorageSync('level');
				}
				if (uni.getStorageSync('image-center')) {
					this.mydata.imageCenter = uni.getStorageSync('image-center');
				}
				if (uni.getStorageSync('image-center2')) {
					this.mydata.imageCenter2 = uni.getStorageSync('image-center2');
				}
				if (uni.getStorageSync('image-center3')) {
					this.mydata.imageCenter3 = uni.getStorageSync('image-center3');
				}
				if (uni.getStorageSync('detailCash')) {
					this.mydata.detailCash = uni.getStorageSync('detailCash');
				}
				if (uni.getStorageSync('detailTeam')) {
					this.mydata.detailTeam = uni.getStorageSync('detailTeam');
				}
				if (uni.getStorageSync('centerWx')) {
					this.mydata.centerWx = uni.getStorageSync('centerWx');
				}
				if (this.mydata.level == '高级团长') {
					this.imageLevel = '../../static/haosheng/level_3.png';
				} else if (this.mydata.level == '团长') {
					this.imageLevel = '../../static/haosheng/level_2.png';
				} else {
					this.imageLevel = '../../static/haosheng/level_1.png';
				}
			},
			chooseImage: function(type){
				var that = this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						uni.saveFile({
							tempFilePath: res.tempFilePaths[0],
							success(res) {
								if (type == 'user') { 
									uni.setStorageSync('user-image', res.savedFilePath);
									that.image.user = res.savedFilePath;
								}
								if (type == 'tab') {
									uni.setStorageSync('bottomTab', res.savedFilePath);
									that.image.bottomTab = res.savedFilePath;
								}
							}
						})
				    }
				});
			},
			goCash: function(){
				uni.navigateTo({
				    url: 'cash'
				});
			},
			goRank: function(){
				uni.navigateTo({
				    url: 'rank'
				});
			},
			goIncome: function(){
				uni.navigateTo({
				    url: 'income'
				});
			},
			changeContent: function(key){
				this.key = key;
				this.$refs.prompt.show();
			},
			onConfirm:function(e){
				let _cost = e;
				if (_cost == '') {
					console.log('你还未输入');
					return;
				}
				else{
					uni.setStorageSync(this.key, _cost + '');
					this.$refs.prompt.hide();
					this.init();
				}
			},
			onCancel:function(){
				this.$refs.prompt.hide();
				this.$refs.prompt.cost = '';
			}
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
		font-size: 24upx;
	}
	.content {
		/* 控制消息离顶部高度 增加或减少需要调整data（）中的高度相应值*/
		margin-top: 75upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 750upx;
	}
	.center{
		display: flex;justify-content: center;align-items: center;
	}
	.rightArrow{margin-left: 10upx;font-weight: bold;color: #C3C3C3;font-size: 30upx;}
	.image_level{
		height: 30upx;width: 35upx;
	}
	.level{height: 50upx;line-height: 50upx;padding: 0 20upx;}
	/* 轮播图宽高 */
	.swiperSize{width: 705upx;height: 105upx;}
	/* 轮播图弧形尺寸 一般为高度的一半左右 */
	.swiperRadius{border-radius: 45upx;}
	/* 调整预估金额字体粗细 (bold为最粗，由粗到细为 900 to 100)*/
	.moneySize{font-weight: bold;}
	/* 会员详情下面的小红字大小 */
	.detailSize{font-size: 18upx;}
</style>
