<template>
	<view :class="[{ listClass: !isList }, 'card-page']">
		<view :class="[{ listBook: !isList }, 'card-book']" v-for="i in 5" :key="i" @click="goPage">
			<image src="../../static/img/4.jpg" class="book-img"></image>
			<view class="book-msg">
				<view class="book-name">
					九鼎记九鼎记
				</view>
				<view class="book-author">
					番茄
				</view>
				<view class="book-detail" v-if="isList">
					九鼎记九鼎记九鼎记
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isList: {
				type: Boolean,
				default: true
			}
		},
		
		methods: {
			goPage() {
				this.$openPage({
					name: 'read'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.card-page{
		background-color: $uni-bg-color;
		padding: 30rpx 30rpx 1rpx 30rpx;
		transition: all 0.5s;
		
		.card-book{
			display: flex;
			margin-bottom: 30rpx;
			transition: all 0.5s;
			
			.book-img{
				width: 120rpx;
				height: 150rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
				transition: all 0.5s;
			}
			
			.book-msg{
				flex: 1;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				transition: all 0.5s;
				
				.book-name, .book-author, .book-detail{
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				
				.book-name{
					font-size: $uni-font-size-sm;
				}
				
				.book-author, .book-detail{
					font-size: $uni-font-size-mini;
					color: $uni-text-color-grey;
				}
			}
		}
	}
	
	.listClass{
		display: flex;
		flex-wrap: wrap;
		padding: 30rpx 30rpx 0 30rpx;
		
		.listBook{
			display: flex;
			align-items: center;
			flex-direction: column;
			width: 33.3%;
			
			.book-img{
				width: 190rpx;
				height: 250rpx;
				margin-right: 0;
			}
			
			.book-msg{
				width: 190rpx;
				.book-name{
					height: 50rpx;
					line-height: 50rpx;
				}
			}
		}
	}
</style>
