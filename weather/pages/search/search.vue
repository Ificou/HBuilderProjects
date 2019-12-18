<template>
	<view :style="{width: '750upx', height: height, background: '#211F44',paddingTop: '50upx'}">
		<mSearch @search="search" background-color="#211F44" border="0px solid #ffffff"></mSearch>
		<scroll-view class="scroll-view_H" scroll-y="true">
			<view style="padding-left: 50upx;height: 60upx;line-height: 60upx;" @tap="changeCity(item)"
			v-for="item in citys">{{item.name}}</view>
		</scroll-view>
	</view>
</template>

<script>
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	export default {
		components: {
			mSearch
		},
		data() {
			return {
				height: (uni.getSystemInfoSync().screenHeight * 750/uni.getSystemInfoSync().screenWidth - 50) + 'upx',
				citys: []
			}
		},
		onLoad() {
			
		},
		methods: {
			search: function(val){
				let _this = this;
				if(!val){
					uni.navigateBack({
						
					});
				} else {
					uni.request({
						url: 'http://restapi.amap.com/v3/config/district?key=dff70ee6815f4e1ebb883dc90448cdfe&keywords='+val+'&subdistrict=0&extensions=base',
						success(res) {
							_this.citys = res.data.districts;
						}
					})
				}
			},
			changeCity: function(val){
				uni.setStorageSync('currentCity', JSON.stringify(val));
				let citys = [];
				if(uni.getStorageSync('citys')){
					citys = JSON.parse(uni.getStorageSync('citys'));
				}
				let flagAdd = true;
				for(let i in citys){
					if(citys[i].adcode == val.addcode) {
						flagAdd = false;
						break;
					}
				}
				if(flagAdd){
					citys.push(val)
				}
				uni.setStorageSync('citys', JSON.stringify(citys));
				uni.navigateBack({
					
				});
			}
		}
	}
</script>

<style>
	page{
		color: #FFFFFF;
		font-size: 35upx;
	}
</style>
