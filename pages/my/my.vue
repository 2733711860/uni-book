<template>
	<view class="my-page">
		<view class="user-icon">
			<i class="iconfont icon-fenxiang" @click="uploadImg"></i>
			<view>阅读新人</view>
		</view>

		<view class="user-msg">
			<view class="item">
				<text>100</text>
				<text class="name">书豆</text>
			</view>
			<view class="item">
				<text>100</text>
				<text class="name">书豆</text>
			</view>
			<view class="item">
				<text>100</text>
				<text class="name">书豆</text>
			</view>
		</view>

		<view class="midcard">
			<u-cell-item title="我的阅历" value="每日打卡"></u-cell-item>
			<view class="user-msg">
				<view class="item">
					<text>100</text>
					<text class="name">今日阅读（分钟）</text>
				</view>
				<view class="item">
					<text>23</text>
					<text class="name">连续阅读（天）</text>
				</view>
				<view class="item">
					<text>73%</text>
					<text class="name">击败书友</text>
				</view>
			</view>
		</view>

		<view class="bottom-view">
			<u-cell-item icon="setting-fill" title="上传图片" @click="uploadImg"></u-cell-item>
			<u-cell-item icon="setting-fill" title="下载图片" @click="downloadImage"></u-cell-item>
			<u-cell-item icon="setting-fill" title="地址信息" @click="getLocation"></u-cell-item>
			<u-cell-item icon="setting-fill" title="微信登录" @click="authLogin"></u-cell-item>
			<u-cell-item icon="setting-fill" title="登录状态检测" @click="checkLoginState"></u-cell-item>
			<u-cell-item icon="setting-fill" title="获取用户信息" @click="getUserInfo"></u-cell-item>
			<u-cell-item icon="setting-fill" title="分享" @click="shareInfo"></u-cell-item>
			<u-cell-item icon="setting-fill" title="扫码" @click="scan"></u-cell-item>
		</view>
	</view>
</template>

<script>
	import { appMixin } from '@/mixins/appMixin.js';
	export default {
		mixins: [ appMixin ],
		
		data() {
			return {
				downLoadUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-904902d1-459b-4816-9470-94a5bf1625da/4c4d7035-da2b-4525-b610-f312f52df0ca.jpg'
			}
		},
		methods: {
			uploadImg() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						if (res.tempFilePaths.length > 0) {
							uni.showLoading({
								title: '上传中...'
							});

							let filePath = res.tempFilePaths[0];
							uniCloud.uploadFile({
								filePath: filePath, // 要上传的文件对象
								cloudPath: Date.now() + '.jpg', // 保存在云端的文件名
								success: (res) => {
									console.log(res);
									this.downLoadUrl = res.fileID; // 云端返回的图片地址
									uniCloud.callFunction({
										name: 'uploadImage', // 云函数名称
										data: {
											imageUrl: this.downLoadUrl,
											createTime: Date.now()
										},
										success: (res) => {
											console.log(res)
											uni.showToast({
												title: '上传成功'
											})
										},
										fail: (err) => {
											console.log(err);
										},
										complete: () => {
											uni.hideLoading()
										}
									})
								},
								fail: (err) => {
									console.log(err);
								}
							})
						}
					}
				})
			},

			downloadImage() {
				const downloadTask = uni.downloadFile({
					url: this.downLoadUrl,
					success: (res) => {
						console.log(res);
						if (res.statusCode === 200) {
							console.log('下载成功');
						}
					}
				});
				downloadTask.onProgressUpdate((res) => {
					console.log('下载进度' + res.progress);
					console.log('已经下载的数据长度' + res.totalBytesWritten);
					console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
					// 测试条件，取消下载任务。
					// if (res.progress > 50) {
					// 	downloadTask.abort();
					// }
				});
			},
			
			getLocation() {
				uni.getLocation({
					type: 'wgs84',
					// #ifdef APP-PLUS
					geocode: true,
					// #endif
					success: (res) => {
						console.log('地址信息：', res);
						uni.openLocation({
							latitude: res.latitude,
							longitude: res.longitude,
							success: function () {
								console.log('success');
							}
						});
					},
					fail: (err) => {
						console.log('地址获取失败：', err);
					},
					complete: () => {
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-page {
		height: 100%;

		.user-icon {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 40rpx 0;

			.iconfont {
				font-size: 100rpx;
			}
		}

		.user-msg {
			display: flex;
			justify-content: space-around;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 20rpx 0;

				.name {
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;
				}
			}
		}

		.bottom-view,
		.midcard {
			background-color: $uni-bg-color;
			width: 700rpx;
			margin: 40rpx auto;
			border-radius: 15rpx;
			box-shadow: $uni-border-boxshadow;
		}

		.bottom-view {
			/* #ifdef H5 */
			margin: 40rpx auto 140rpx auto;
			/* #endif */
		}

		.midcard {
			padding: 0 15rpx 15rpx 15rpx;
		}
	}
</style>
