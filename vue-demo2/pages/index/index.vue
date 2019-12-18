<template>
	<view>
		<view class="tab">
			<view :key="index" :class="item.class" v-for="(item, index) in items" 
			@tap="changeItem(index)">{{item.name}}</view>
		</view>
		<view style="margin-top: 10upx;">
			<view :key="a" v-for="a in 3" style="margin-top: 10upx;display: flex;flex-direction: row;height: 150upx;padding: 10upx;background: #FFFFFF;">
				<view style="display: flex;flex: 1;height: 100%;justify-content: center;align-items: center;">
					<image style="width: 80%;height: 80%;" src="logo.png"></image>
				</view>
				<view style="flex: 3;padding-left: 10upx;">
					<view class="content" style="font-size: 35upx;height: 50upx;">期末项目提交要求.xxx</view>
					<view class="content color" style="font-size: 25upx;height: 40upx;">期末项目提交要求.xxx</view>
					<view class="content color" style="font-size: 25upx;height: 40upx;">期末项目提交要求.xxx</view>
				</view>
				<view style="flex: 1;">
					<view style="height: 50%;width: 100%;display: flex;justify-content: center;align-items: center;"><image style="width: 50upx;height: 50upx;" src="../../static/logo.png"></image></view>
					<view style="height: 50%;width: 100%;display: flex;justify-content: center;align-items: center;"><image style="width: 50upx;height: 50upx;" src="../../static/logo.png"></image></view>
				</view>
			</view>
		</view>
		<view style="width: 100%;position: fixed;bottom: 0;background: #F7F7F7;">
			<image style="height: 100upx;width: 100upx;margin-left: 325upx;" src="../../static/upload.svg"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				containStyle: {
					height: this.screenHeight + 'px',
					background: '#F7F7F7'
				},
				items: [
					{name: '任务', class: 'item'},
					{name: '文件', class: 'item selected'},
					{name: '成员', class: 'item'}
				]
			}
		},
		onLoad() {
		},
		methods: {
			changeItem: function(e){
				for(let i in this.items){
					if(e == i) {
						this.items[i].class='item selected'
					} else {
						this.items[i].class='item'
					}
				}
			}
		}
	}
</script>
<style>
	page{background: #F7F7F7;}
	.tab{display: flex; flex-direction: row;}
	.item{display: flex;flex: 1;justify-content: center;}
	.selected{border-bottom: 2px solid #007AFF;}
	.center{display: flex;justify-content: center;align-items: center;}
	.content{display: flex;justify-content: flex-start;align-items: center;}
	.color{color: #B2B2B2;}
</style>
