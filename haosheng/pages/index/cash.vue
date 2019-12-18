<template>
	<view class="content">
		<view style="width: 100%;background-image: linear-gradient(to right, #E7496F, #EA3323);color: #FFFFFF;">
			<view style="width: 100%;height: 50upx;padding-bottom: 35upx;display: flex;flex-direction: row;
			font-size: 30upx;padding-top: 50upx;">
				<view style="flex: 1;font-size: 35upx;font-weight: bold;" @tap="goBack">
					<image src="../../static/haosheng/arrow_white.svg" style="height: 35upx;width: 35upx;padding-left: 38upx;color: #fff;"></image>
				</view>
			</view>
			<view style="display: flex;flex-direction: row;align-items: center;padding: 0 25.5upx;">
				<view style="flex: 1;">
					<view style="display: flex;align-items: center;">可提现金额<image src="../../static/haosheng/help_white.svg" style="height: 25upx;width: 25upx;margin-left: 10upx;"></image></view>
				</view>
				<view style="flex: 1;display: flex;justify-content: flex-end;">
					<view class="center" style="width: 162upx;height: 60upx;border-radius: 20upx;background: #FFFFFF;color: #E93323;">
						立即提现
					</view>
				</view>
			</view>
			<view style="font-size: 60upx;height: 208upx;line-height: 208upx;padding: 0 25.5upx;font-weight: bold;"
			 @longpress="changeKey('cash-cashMoney')">{{mydata.cashMoney}}</view>
			<view @longpress="changeKey('cashRemark')" style="word-wrap:break-word;background-color: rgba(0, 0, 0, 0.2);padding: 20upx 27upx;font-size: 23upx;">
				{{mydata.cashRemark}}
			</view>
		</view>
		
		<scroll-view :scroll-y="true" :style="{height: height, background:'#F8F8F8'}">
			<view style="width: 100%;height: 15upx;"></view>
			<view style="display: flex;flex-direction: row;background: #FFFFFF;margin-bottom: 1upx;">
				<view style="flex: 1;height: 75upx;line-height: 60upx;display: flex;flex-direction: column;" :class="{center: true, red: selectedIndex == index}" 
				v-for="(item, index) in mydata.menus" :key="index" @tap="selectMenu(index)">
					<view >{{item.title}}</view>
					<view :class="{red_line: selectedIndex == index}" style="width: 40upx;height: 5upx;"></view>
				</view>
			</view>
			
			<view v-if="selectedIndex == 0" style="height: 120upx;display: flex;flex-direction: row;
			background: #FFFFFF;padding: 0 28upx;margin-bottom: 1upx;" v-for="(item, index) in mydata.records" :key="index">
				<view style="flex: 3;height: 100%;display: flex;align-items: center;justify-content: flex-end;flex-direction: column;">
					<view class="content_bold" style="width: 100%;height: 45upx;" @longpress="changeContent(index, 'title')">{{item.title}}</view>
					<view class="content_time" style="width: 100%;height: 45upx;color: #CFCFCF;" @longpress="changeContent(index, 'cashTime')">{{item.cashTime}}</view>
				</view>
				<view style="flex: 2;height: 100%;display: flex;align-items: center;justify-content: flex-end;font-size: 40upx;font-weight: bold;" @longpress="changeContent(index, 'cash')">{{item.cash}}</view>
			</view>
			<view v-if="selectedIndex == 1" style="height: 150upx;display: flex;flex-direction: row;
			background: #FFFFFF;padding: 0 28upx;margin-bottom: 1upx;" v-for="(item, index) in mydata.cashRecords" :key="index">
				<view style="flex: 3;height: 100%;display: flex;align-items: center;justify-content: flex-end;flex-direction: column;">
					<view class="content_bold" style="width: 100%;height: 45upx;" @longpress="changeCashRecords(index, 'user')">提现人：{{item.user}}</view>
					<view class="content_bold" style="width: 100%;height: 45upx;" @longpress="changeCashRecords(index, 'id')">支付宝：{{item.id}}</view>
					<view class="content_time" style="width: 100%;height: 45upx;color: #CFCFCF;" @longpress="changeCashRecords(index, 'cashTime')">{{item.cashTime}}</view>
				</view>
				<view style="flex: 2;height: 100%;display: flex;align-items: center;">
					<view style="flex-direction: column;display: flex;width: 100%;">
						<view style="width: 100%;height: 45upx;display: flex;justify-content: flex-end;font-size: 40upx;font-weight: bold;" @longpress="changeCashRecords(index, 'cash')">{{item.cash}}</view>
						<view style="width: 100%;height: 45upx;display: flex;justify-content: flex-end;color: #CFCFCF;margin-top: 10upx;">已到账</view>
					</view>
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
				height: (uni.getSystemInfoSync().screenHeight * 750/uni.getSystemInfoSync().screenWidth - 530) + 'upx',
				selectedIndex: 0,
				key: '',
				tempObject: {
					index: 0,
					title: '',
					type: 'records'
				},
				mydata: {
					menus: [
						{title: '收入'},
						{title: '提现记录'}
					],
					cashMoney: 0,
					cashRemark: '如果您的订单收入累计不超过20元，当您确认收货后，收入会在24小时内到账；超过20元后，当月确认收货的收入会在次月25号到账',
					records: [
						{title: '2019年11月订单佣金', cash: '343.63', cashTime: '预计2019年12月25日到账'},
						{title: '2019年11月订单佣金', cash: '343.63', cashTime: '预计2019年12月25日到账'},
						{title: '2019年11月订单佣金', cash: '343.63', cashTime: '预计2019年12月25日到账'},
						{title: '订单佣金', cash: '343.63', cashTime: '2019-10-09 12:13:00'},
						{title: '订单佣金', cash: '343.63', cashTime: '2019-10-09 12:13:00'},
						{title: '订单佣金', cash: '343.63', cashTime: '2019-10-09 12:13:00'},
						{title: '订单佣金', cash: '343.63', cashTime: '2019-10-09 12:13:00'},
						{title: '订单佣金', cash: '343.63', cashTime: '2019-10-09 12:13:00'},
						{title: '订单佣金', cash: '343.63', cashTime: '2019-10-09 12:13:00'},
						{title: '订单佣金', cash: '343.63', cashTime: '2019-10-09 12:13:00'}
					],
					cashRecords: [
						{user: '订单佣金', id: '订单佣金', cash: '343.63', cashTime: '预计2019年12月25日到账'},
						{user: '月订单佣金', id: '订单佣金', cash: '343.63', cashTime: '预计2019年12月25日到账'},
						{user: '订单佣金', id: '订单佣金', cash: '343.63', cashTime: '预计2019年12月25日到账'},
						{user: '订单佣金', id: '订单佣金', cash: '343.63', cashTime: '2019-10-09 12:13:00'},
						{user: '订单佣金', id: '订单佣金', cash: '343.63', cashTime: '2019-10-09 12:13:00'},
						{user: '订单佣金', id: '订单佣金', cash: '343.63', cashTime: '2019-10-09 12:13:00'},
						{user: '订单佣金', id: '订单佣金', cash: '343.63', cashTime: '2019-10-09 12:13:00'},
						{user: '订单佣金', id: '订单佣金', cash: '343.63', cashTime: '2019-10-09 12:13:00'},
						{user: '订单佣金', id: '订单佣金', cash: '343.63', cashTime: '2019-10-09 12:13:00'},
						{user: '订单佣金', id: '订单佣金', cash: '343.63', cashTime: '2019-10-09 12:13:00'}
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
				if(uni.getStorageSync('cash-data')){
					this.mydata.records = JSON.parse(uni.getStorageSync('cash-data'));
				}
				if(uni.getStorageSync('cash-cashRecords')){
					this.mydata.cashRecords = JSON.parse(uni.getStorageSync('cash-cashRecords'));
				}
				if(uni.getStorageSync('cash-cashMoney')){
					this.mydata.cashMoney = uni.getStorageSync('cash-cashMoney');
				}
				if(uni.getStorageSync('cashRemark')){
					this.mydata.cashRemark = uni.getStorageSync('cashRemark');
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
				this.tempObject.type = 'records';
				this.$refs.prompt.show();
			},
			changeCashRecords: function(index, title){
				this.tempObject.index = index;
				this.tempObject.title = title;
				this.tempObject.type = 'cashRecords';
				this.$refs.prompt.show();
			},
			changeKey: function(key){
				this.key = key;
				this.tempObject.type = 'other';
				this.$refs.prompt.show();
			},
			onConfirm:function(e){
				let _cost = e;
				if (_cost == '') {
					console.log('你还未输入');
					return;
				} else {
					if(this.tempObject.type == 'records') {
						this.mydata.records[this.tempObject.index][this.tempObject.title] = _cost;
						uni.setStorageSync('cash-data', JSON.stringify(this.mydata.records));
					} else if(this.tempObject.type == 'cashRecords') {
						this.mydata.cashRecords[this.tempObject.index][this.tempObject.title] = _cost;
						uni.setStorageSync('cash-cashRecords', JSON.stringify(this.mydata.cashRecords));
					} else {
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
	.red_line{background: #EA3323;}
	/* 调整提现左侧字体大小 */
	.content_bold{font-weight: bold;font-size: 30upx;}
	/* 调整提现左侧时间字体大小 */
	.content_time{font-size: 28upx;}
</style>
