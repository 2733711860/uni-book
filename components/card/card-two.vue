<template>
	<view class="card-page">
		<view class="card-title">精品好书</view>
		<view class="card-content">
			<view class="card-book" v-for="i in 4" :key="i" @click="goPage">
				<image src="../../static/img/14.jpg" class="book-img"></image>
				<text class="book-name">
					九鼎记九鼎记九鼎记九鼎记
				</text>
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
			flex-direction: row;
			justify-content: space-around;
			
			.card-book{
				margin-top: 30rpx;
				width: 130rpx;
				overflow: hidden;
				
				.book-img{
					width: 100%;
					height: 170rpx;
					border-radius: 10rpx;
				}
				
				.book-name{
					font-size: $uni-font-size-sm;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>
