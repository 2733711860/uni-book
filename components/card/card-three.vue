<template>
	<view class="card-page">
		<view class="card-title">武侠仙侠</view>
		<view class="card-content">
			<view class="card-book" v-for="i in 3" :key="i">
				<image src="../../static/img/4.jpg" class="book-img"></image>
				<view class="book-msg">
					<view class="book-name">
						九鼎记
					</view>
					<view class="book-detail">
						九鼎记九鼎记九鼎记九鼎记九鼎记九鼎记九鼎记九鼎记九鼎记
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
</script>

<style scoped lang="scss">
	.card-page{
		background-color: $uni-bg-color;
		border-radius: 15rpx;
		box-shadow: $uni-border-boxshadow;
		padding: 30rpx;
		margin-top: 30rpx;
		
		.card-title{
			font-size: $uni-font-size-lg;
			font-weight: 550;
		}
		
		.card-content{
			display: flex;
			flex-wrap: wrap;
			
			.card-book{
				display: flex;
				width: 100%;
				margin-top: 30rpx;
				
				.book-img{
					width: 100rpx;
					height: 120rpx;
					border-radius: 10rpx;
				}
				
				.book-msg{
					flex: 1;
					overflow: hidden;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding: 0 20rpx;
					
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
	}
</style>
