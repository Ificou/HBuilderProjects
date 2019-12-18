<template>
	<view class="content">
		<view style="width: 100%;height: 50upx;padding-bottom: 35upx;display: flex;flex-direction: row;
		font-size: 30upx;border-bottom: 1upx solid #F8F8F8;">
			<view style="flex: 1;font-size: 35upx;font-weight: bold;padding-left: 25.5upx;" @tap="goBack">
				<image src="../../static/haosheng/zuojiantou.svg" style="height: 35upx;width: 35upx;"></image>
			</view>
			<view style="flex: 1;font-size: 35upx;" class="center">收益详情</view>
			<view style="flex: 1;display: flex;justify-content: flex-end;padding-right: 25.5upx;">
				<image src="../../static/haosheng/bangzhu.svg" style="height: 35upx;width: 35upx;"></image>
			</view>
		</view>
		
		<view style="width: 100%;height: 230upx;">
			<view class="center" style="height: 60upx;line-height: 60upx;font-size: 30upx;">累计佣金</view>
			<view class="center" style="color: #EA3E2D;" @longpress="changeMoney('incomeMoney')">
				<view>￥<span style="font-size: 42upx;font-weight: bold;">{{mydata.incomeMoney}}</span></view>
			</view>
			<view style="display: flex;flex-direction: row;margin-top: 50upx;padding: 0 25upx">
				<view style="width: 25%;" :class="{center: true, red: selectedIndex == index}" 
				v-for="(item, index) in mydata.menus" :key="index" @tap="selectMenu(index)">
					{{item.title}}
				</view>
			</view>
		</view>
		<scroll-view :scroll-y="true" :style="{height: height}">
			<view style="width: 100%;height: 15upx;background: #F8F8F8;"></view>
			<view style="width: 100%;height: 120upx;background: #FFFFFF;display: flex;flex-direction: row;align-items: center;">
				<view style="flex: 1;padding-left: 38upx;">今日总效果预估</view>
				<view style="flex: 1;color: #FD0106;text-align: right;padding-right: 38upx;" @longpress="changeMoney('incomeTotal')">
					￥<span style="font-size: 42upx;font-weight: bold;">{{mydata.incomeTotal}}</span>
				</view>
			</view>
			<view style="width: 100%;height: 15upx;background: #F8F8F8;"></view>
			<view style="padding: 34upx 38upx;width: 674upx;">
				<view style="border-left: 8upx solid #333333;padding-left: 21upx;font-size: 30upx;height:30upx;line-height: 30upx;">我的</view>
				<view style="width: 100%;height: 58upx;line-height: 58upx;display: flex;flex-direction: row;
				background: #F8F8F8;margin-top: 20upx;">
					<view style="flex: 1;"></view>
					<view style="flex: 1;">预估收入</view>
					<view style="flex: 1;">付款订单</view>
				</view>
				<view class="incomeList"
					v-for="(item, index) in mydata.today" :key="index">
					<view style="flex: 1;">{{item.title}}</view>
					<view style="flex: 1;color: #EA3E2D;font-weight: bold;" @longpress="changeContent(index, 'income')">￥{{item.income}}</view>
					<view style="flex: 1;" @longpress="changeContent(index, 'order')">{{item.order}}</view>
				</view>
			</view>
			
			<view style="width: 100%;height: 15upx;background: #F8F8F8;"></view>
			
			<view style="padding: 34upx 38upx;width: 674upx;">
				<view style="border-left: 8upx solid #333333;padding-left: 21upx;font-size: 30upx;height:30upx;
				line-height: 30upx;">其他</view>
				<view style="width: 100%;height: 58upx;line-height: 58upx;display: flex;flex-direction: row;
				background: #F8F8F8;margin-top: 20upx;">
					<view style="flex: 1;"></view>
					<view style="flex: 1;">预估收入</view>
					<view style="flex: 1;"></view>
				</view>
				<view class="incomeList"
					v-for="(item, index) in mydata.other" :key="index">
					<view style="flex: 1;">{{item.title}}</view>
					<view style="flex: 1;color: #EA3E2D;font-weight: bold;" @longpress="changeOther(index, 'income')">￥{{item.income}}</view>
					<view style="flex: 1;"></view>
				</view>
			</view>
		</scroll-view>
		<Prompt ref="prompt" @onConfirm="onConfirm" @onCancel="onCancel" title="请输入您需要填写的内容" :text="promptText" />
	</view>
</template>

<script>
	import Prompt from '../../components/prompt.vue'
	export default {
		data() {
			return {
				image: {
					user: uni.getStorageSync('user-image')
				},
				key: '',
				height: (uni.getSystemInfoSync().screenHeight * 750/uni.getSystemInfoSync().screenWidth - 365) + 'upx',
				selectedIndex: 0,
				tempObject: {
					index: 0,
					title: '',
					type: 'data'
				},
				mydata: {
					incomeMoney: 0,
					incomeTotal: 0.16,
					menus: [
						{title: '今日预估'},
						{title: '本月预估'},
						{title: '上月预估'},
						{title: '上月收货'}
					],
					today: [
						{title: '淘宝', income: '0.00', order: '0'},
						{title: '秒杀', income: '0.00', order: '0'},
						{title: '拼多多', income: '0.00', order: '0'},
						{title: '京东', income: '0.00', order: '0'},
						{title: '唯品会', income: '0.00', order: '0'},
						{title: '商城返利', income: '0.00', order: '0'},
						{title: '苏宁', income: '0.00', order: '0'},
					],
					other: [
						{title: '淘宝', income: '0.00', order: '0'},
						{title: '秒杀', income: '0.00', order: '0'},
						{title: '拼多多', income: '0.00', order: '0'},
						{title: '京东', income: '0.00', order: '0'},
						{title: '唯品会', income: '0.00', order: '0'},
						{title: '商城返利', income: '0.00', order: '0'},
						{title: '苏宁', income: '0.00', order: '0'},
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
				if(uni.getStorageSync('income-data')){
					this.mydata.today = JSON.parse(uni.getStorageSync('income-data'));
				}
				if(uni.getStorageSync('income-other')){
					this.mydata.other = JSON.parse(uni.getStorageSync('income-other'));
				}
				if(uni.getStorageSync('incomeMoney')){
					this.mydata.incomeMoney = uni.getStorageSync('incomeMoney');
				}
				if(uni.getStorageSync('incomeTotal')){
					this.mydata.incomeTotal = uni.getStorageSync('incomeTotal');
				}
			},
			chooseImage: function(){
				var that = this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						uni.saveFile({
							tempFilePath: res.tempFilePaths[0],
							success(res) {
								uni.setStorageSync('user-image', res.savedFilePath);
								that.image.user = res.savedFilePath;
							}
						})
				    }
				});
			},
			selectMenu: function(index){
				this.selectedIndex = index
			},
			goBack: function(){
				uni.navigateBack({
				    delta: 1
				});
			},
			changeContent: function(index, title){
				this.tempObject.index = index;
				this.tempObject.title = title;
				this.tempObject.type = 'data';
				this.$refs.prompt.show();
			},
			changeOther: function(index, title){
				this.tempObject.index = index;
				this.tempObject.title = title;
				this.tempObject.type = 'other';
				this.$refs.prompt.show();
			},
			changeMoney: function(key){
				this.key = key;
				this.tempObject.type = 'money';
				this.$refs.prompt.show();
			},
			onConfirm:function(e){
				let _cost = e;
				if (_cost == '') {
					console.log('你还未输入');
					return;
				}
				else{
					if(this.tempObject.type == 'data') {
						this.mydata.today[this.tempObject.index][this.tempObject.title] = _cost;
						uni.setStorageSync('income-data', JSON.stringify(this.mydata.today));
					} else if (this.tempObject.type == 'other'){
						this.mydata.other[this.tempObject.index][this.tempObject.title] = _cost;
						uni.setStorageSync('income-other', JSON.stringify(this.mydata.other));
					} else if (this.tempObject.type == 'money'){
						this.mydata[this.key] = _cost;
						uni.setStorageSync(this.key, _cost + '');
					}
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
		font-size: 28upx;
	}
	.content {
		margin-top: 50upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 750upx;
	}
	.center{
		display: flex;justify-content: center;align-items: center;
	}
	.red{color: #EA3E2D}
	
	.incomeList{width: 100%;height: 65upx;line-height: 58upx;display: flex;flex-direction: row;}
</style>
