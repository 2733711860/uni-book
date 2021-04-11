<template>
	<view class="card-page">
		<view class="card-title">热门推荐</view>
		<view class="card-content">
			<view class="card-book" v-for="i in 6" :key="i" @click="goPage">
				<image src="../../static/img/4.jpg" class="book-img"></image>
				<view class="book-msg">
					<view class="book-name">
						九鼎记九鼎九鼎记
					</view>
					<view class="book-author">
						番茄
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			goPage() {
				// this.$openPage('detail');
				this.$openPage({
					name: 'detail',
					query: {
						id: 123,
						name: '李四'
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.card-page {
		background-color: $uni-bg-color;
		border-radius: 15rpx;
		box-shadow: $uni-border-boxshadow;
		padding: 30rpx;
		margin-top: 30rpx;

		.card-title {
			font-size: $uni-font-size-lg;
			font-weight: 550;
		}

		.card-content {
			display: flex;
			flex-wrap: wrap;

			.card-book {
				display: flex;
				width: 310rpx;
				margin-top: 30rpx;

				.book-img {
					width: 100rpx;
					height: 120rpx;
					border-radius: 10rpx;
				}

				.book-msg {
					flex: 1;
					overflow: hidden;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding: 0 20rpx;

					.book-name,
					.book-author {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.book-name {
						display: -webkit-box;
						word-break: break-all;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						white-space: pre-line;
						font-size: $uni-font-size-sm;
					}

					.book-author {
						font-size: $uni-font-size-mini;
						color: $uni-text-color-grey;
					}
				}
			}
		}
	}
</style>
