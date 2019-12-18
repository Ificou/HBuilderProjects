<template>
	<view class="content">
		<view style="width: 100%;height: 50upx;padding-bottom: 35upx;display: flex;flex-direction: row;
		font-size: 30upx;border-bottom: 1upx solid #F8F8F8;">
			<view style="width: 100upx;font-size: 35upx;font-weight: bold;" @tap="goBack">
				<image src="../../static/haosheng/zuojiantou.svg" style="height: 35upx;width: 35upx;padding-left: 38upx;"></image>
			</view>
			<view style="width: 550upx;text-align: center;">好省收入TOP榜</view>
			<view style="width: 100upx;"></view>
		</view>
		<scroll-view :scroll-y="true"  :style="{height: height, width: '100%'}">
			<view style="width: 100%;position: relative;">
				<image :src="image.rankToday" @longtap="chooseImage('rank-today-image')" style="width: 100%;" mode="widthFix"></image>
				<swiper style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;" :indicator-dots="false" :autoplay="false" :interval="5000" :duration="500">
					<swiper-item>
						<image :src="image.rankToday" @longtap="chooseImage('rank-today-image')" style="width: 100%;" mode="widthFix"></image>
					</swiper-item>
					<swiper-item>
						<image :src="image.rankMonth" @longtap="chooseImage('rank-month-image')" style="width: 100%;" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				image: {
					rankToday: uni.getStorageSync('rank-today-image'),
					rankMonth: uni.getStorageSync('rank-month-image')
				},
				height: (uni.getSystemInfoSync().screenHeight * 750/uni.getSystemInfoSync().screenWidth - 150) + 'upx'
			}
		},
		onLoad() {
			this.image.rankToday = uni.getStorageSync('rank-today-image');
			this.image.rankMonth = uni.getStorageSync('rank-month-image');
		},
		methods: {
			chooseImage: function(key){
				var that = this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						uni.saveFile({
							tempFilePath: res.tempFilePaths[0],
							success(res) {
								uni.setStorageSync(key, res.savedFilePath);
								if (key == 'rank-today-image') {
									that.image.rankToday = res.savedFilePath;
								} else {
									that.image.rankMonth = res.savedFilePath;
								}
							}
						})
				    }
				});
			},
			goBack: function(){
				uni.navigateBack({
				    delta: 1
				});
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
</style>
