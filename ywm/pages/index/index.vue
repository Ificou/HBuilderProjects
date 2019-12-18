<template>
	<view class="content">
		<view style="width: 650upx;display: flex;justify-content: flex-start;flex-direction: column;">
			<view class="full">联系人ID：</view>
			<view class="full">{{userId}}</view>
			<button style="width: 200upx;height: 55upx;line-height: 60upx;font-size: 28upx;
			position:absolute;left: 240upx;"
			 @tap="getUserId"  >点击获取Id</button>
			<view class="full" style="margin-top: 50upx;">手机号码：</view>
			<view class="full" style="height: 80upx;border-bottom: 1upx solid #6A6A6A;
			display: flex;flex-direction: row;align-items: center;">
				<image v-if="!existUser" src="../../static/mobile.svg" style="width: 40upx;height: 80upx;"></image>
				<input :disabled="existUser" v-model="userPhone" style="width: 300upx;height: 100%;font-size: 30upx;padding: 0 50upx;" maxlength="11"
				@blur="verifyPhone" @input="userPhone=userPhone.replace(/[^0-9]/ig,'')"/>
				<button v-if="!existUser" style="width: 200upx;height: 60upx;line-height: 60upx;font-size: 28upx;"
				 type="primary" @tap="getCode" :disabled="codeStatus">{{message}}</button>
			</view>
			<view v-if="!existUser" class="full" style="margin-top: 20upx;">验证码：</view>
			<view class="full" style="height: 80upx;border-bottom: 1upx solid #6A6A6A;
			display: flex;flex-direction: row;align-items: center;">
				<image v-if="!existUser" src="../../static/lock.svg" style="width: 40upx;height: 80upx;"></image>
				<input :disabled="existUser" v-model="code" style="width: 450upx;height: 100%;font-size: 30upx;" />
			</view>
			<view class="full" v-if="existUser" style="margin-top: 20upx;">该联系人已绑定手机号码</view>
			<button v-if="!existUser" type="primary" style="margin-top: 70upx;width: 300upx;" @tap="submitCode">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: '',
				message: '获取验证码',
				codeStatus: false,
				second: 10,
				userPhone: '',
				code: '',
				responseMessage: '',
				existUser: false,
				codeKey: ''
			}
		},
		onLoad() {
			this.getUserId();
		},
		methods: {
			//获取用户id
			getUserId: function(){
				let _this = this;
				uni.login({
				      success: res => {
				        console.log('用户code为：' + res.code); // 先login得到code
				        if (res.code) {
				          var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + 'wx66b32becf65be16c' + '&secret=' + '13b126d651dca56edc67a89cf3f67922' + '&js_code=' + res.code + '&grant_type=authorization_code';
				          uni.request({
				            url: url,
				            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
				            success: function (res) {
				              // res.data.openid 即为所求openid
				              _this.userId = res.data.openid;
				            },
				          });
				        } 
				      }
				    })
				// 获取用户信息
				uni.getUserInfo({
				  provider: 'weixin',
				  success: function (infoRes) {
					console.log('用户昵称为：' + infoRes.userInfo.nickName);
				  }
				});
			},
			getCode: function(){
				if(this.verifyPhone()) {
					let _this = this;
					this.codeStatus = true;
					this.second = 10;

					//发送短信验证码接口
					uni.request({
						// http://haydwx.com/hawxwap/ywmobile/getCode.do
					    url: "http://localhost:8080/user/sendCode",
					    dataType: "JSON",
						method: "POST",
						data: {userId: this.userId, userPhone: this.userPhone},
					    success: function(res) {
							if (res.data.code == 1) { //如果code == 1用户存在
								//隐藏按钮，显示已注册信息
								_this.existUser = true;
							} else {
								_this.codeKey = res.data.data;
								let set = setInterval(function(){
									if(_this.second > 0) {
										_this.second --;
										_this.message = _this.second + 's';
									} else {
										_this.message = '获取验证码';
										_this.codeStatus = false;
										clearInterval(set);
									}
								}, 1000)
							}
					        console.log(res);
					    }
					});
				}
			},
			verifyPhone: function(){
				// 验证手机号
				let reg = /^1[0-9]{10}$/
				if (this.userPhone == '' || this.userPhone.length <= 10 || !reg.test(this.userPhone)) {
					uni.showToast({
					    title: '手机号格式不正确',
					    duration: 2000,
						icon: 'none'
					});
					return false
				}
				return true
			},
			submitCode: function(){
				let _this = this;
				//提交验证码接口并校验是否通过认证
				uni.showLoading({
					title: '绑定成功'
				});
				console.log(JSON.stringify({userId: _this.userId, userPhone: _this.userPhone, codeKey: _this.codeKey, inputCode: _this.code}));
				uni.request({
				    url: "http://localhost:8080/user/checkCode",
				    dataType: "JSON",
					method: "POST",
					data: {userId: _this.userId, userPhone: _this.userPhone, codeKey: _this.codeKey, inputCode: _this.code},
				    success: function(res) {
				        if(res.data.data != false) {
							uni.showLoading({
								title: '绑定成功'
							});
						} else {
							uni.showLoading({
								title: '验证码错误'
							});
						}
				    }
				});
			}
		}
	}
</script>

<style>
	.content {
		padding-top: 10upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #6A6A6A;
	}
	
	.full{width: 100%;}
</style>
