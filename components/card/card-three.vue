<template>
	<view class="card-page">
		<view class="card-title" v-if="!hideTitle">武侠仙侠</view>
		<view class="card-content">
			<view class="card-book" v-for="(item, index) in list" :key="index" @click="goPage(item)">
				<image :src="item.bookImg" class="book-img"></image>
				<view class="book-msg">
					<view class="book-name">
						{{item.bookName}}
					</view>
					<view class="book-author">
						{{item.bookAuthor}}
					</view>
					<view class="book-detail">
						{{item.bookDesc}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			hideTitle: {
				type: Boolean,
				default: false
			},
			list: {
				type: Array,
				default: () => []
			}
		},
		
		methods: {
			goPage(item) {
				this.$openPage({
					name: 'detail',
					query: {
						bookId: item.bookId
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
		
		.card-title{
			font-size: $uni-font-size-lg;
			font-weight: 550;
			padding: 30rpx;
		}
		
		.card-content{
			display: flex;
			flex-wrap: wrap;
			
			.card-book{
				display: flex;
				width: 100%;
				padding: 20rpx 30rpx;
				
				.book-img{
					width: 120rpx;
					height: 150rpx;
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
