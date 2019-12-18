<template>
	<view :style="{width: '750upx', height: height, background: '#211F44',paddingTop: '50upx'}">
		<view style="padding: 10upx 40upx;" v-for="item in citys" @tap="changeCity(item)">
			{{item.name}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: (uni.getSystemInfoSync().screenHeight * 750/uni.getSystemInfoSync().screenWidth - 50) + 'upx',
				citys: []
			}
		},
		onLoad() {
			if(uni.getStorageSync('citys')){
				this.citys = JSON.parse(uni.getStorageSync('citys'));
			}
			if(this.citys.length == 0){
				uni.navigateBack({
					
				});
			}
		},
		methods: {
			changeCity: function(val){
				uni.setStorageSync('currentCity', JSON.stringify(val));
				uni.navigateBack({
					
				});
			}
			
		}
	}
</script>

<style>
	page{
		color: #FFFFFF;
		font-size: 50upx;
	}
</style>
