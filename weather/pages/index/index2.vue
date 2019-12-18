<template>
	<view class="content">
		<view :style="{width: '750upx', height: height, background: '#211F44'}">
			<view style="display: flex;flex-direction: row;padding-top: 20upx;">
				<view style="flex: 1;display: flex;justify-content: center;">
					<image src="../../static/list.png" class="top-image"></image>
				</view>
				<view style="flex: 5;display: flex;justify-content: center;">
					{{currentCity.name}}
				</view>
				<view style="flex: 1;display: flex;justify-content: center;">
					<image src="../../static/add.png" class="top-image" @tap="goSearch"></image>
				</view>
			</view>
			<swiper style="padding-top: 170upx;height: 450upx;" :indicator-dots="false" :autoplay="true" :interval="5000" :duration="500">
				<swiper-item>
					<view style="display: flex;justify-content: center;">
						<image src="../../static/rain.png" class="center-weather"></image>
					</view>
					<view style="display: flex;height: 170upx;justify-content: center;">
						<view style="height: 100%; font-size: 100upx;display: flex;align-items: flex-end;">{{weather[0].daytemp}}°</view>
						<view style="height: 100%; font-size: 70upx;display: flex;align-items: flex-end;">/{{weather[0].nighttemp}}°</view>
					</view>
					<view style="display: flex;justify-content: center;height: 100upx;line-height: 100upx;">
						星期{{weather[0].week}}
					</view>
				</swiper-item>
			</swiper>
			
			<view style="background: #282449;height: 300upx;margin-top: 80upx;">
				<swiper style="height: 100%;" :indicator-dots="false" :autoplay="true" :interval="5000" :duration="500">
					<swiper-item v-for="temp in swiperNum" style="height: 100%;display: flex;flex-direction: row;">
						<view style="flex-direction: column;flex: 1;" class="center">
							<view style="flex: 1;" class="center">WED</view>
							<view style="flex: 1;" class="center">
								<image src="../../static/sun.png" class="top-image"></image>
							</view>
							<view style="flex: 1;" class="center">WED</view>
						</view>
						<view style="flex-direction: column;flex: 1;" class="center">
							<view style="flex: 1;" class="center">WED</view>
							<view style="flex: 1;" class="center">
								<image src="../../static/sun.png" class="top-image"></image>
							</view>
							<view style="flex: 1;" class="center">WED</view>
						</view>
						<view style="flex-direction: column;flex: 1;" class="center">
							<view style="flex: 1;" class="center">WED</view>
							<view style="flex: 1;" class="center">
								<image src="../../static/sun.png" class="top-image"></image>
							</view>
							<view style="flex: 1;" class="center">WED</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: (uni.getSystemInfoSync().screenHeight * 750/uni.getSystemInfoSync().screenWidth) + 'upx',
				url: {
					city: 'http://www.wendangku.net/doc/461567915a8102d277a22f10.html',
					weather: 'http://t.weather.sojson.com/api/weather/city/101220101'
				},
				currentCity: {name: '北京', adcode: '110000'},
				weather: [],
				swiperNum: parseInt((this.weather + 2)/3)
			}
		},
		onLoad() {
			this.init();
		},
		onShow() {
			this.init();
		},
		methods: {
			init: function(){
				let _this = this;
				if(uni.getStorageSync('currentCity')){
					this.currentCity = JSON.parse(uni.getStorageSync('currentCity'));
				}
				uni.request({
					url: 'https://restapi.amap.com/v3/weather/weatherInfo?key=dff70ee6815f4e1ebb883dc90448cdfe&city='+this.currentCity.adcode+'&extensions=all',
					success(res) {
						_this.weather = res.data.forecasts[0].casts;
						for(let i in _this.weather){
							switch(_this.weather[i].week) {
								case 1:
									_this.weather[i].week = 'MON'
									break;
								case 2:
									_this.weather[i].week = 'TUE'
									break;
								case 3:
									_this.weather[i].week = 'WED'
									break;
								case 4:
									_this.weather[i].week = 'THU'
									break;
								case 5:
									_this.weather[i].week = 'FRI'
									break;
								case 6:
									_this.weather[i].week = 'SAT'
									break;
								case 7:
									_this.weather[i].week = 'SUN'
									break;
							} 
						}
					}
				})
			},
			goSearch: function(){
				uni.navigateTo({
					url: '../search/search'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
	}
	.top-image{
		width: 50upx;
		height: 50upx;
	}
	.center-weather{
		width: 200upx;
		height: 200upx;
	}
	.center{
		display: flex;justify-content: center;align-items: center;
	}
</style>
