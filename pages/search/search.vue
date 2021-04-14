<template>
	<view class="search-page">
		<view class="item-view">
			<view class="title">
				<text>热门搜索</text>
			</view>
			<view class="search-tag">
				<text class="item-tag" v-for="i in 10" :key="i" @click="goPage">神秘复苏</text>
			</view>
		</view>
		
		<view class="item-view">
			<view class="title">
				<text>搜索历史</text>
				<u-icon name="trash" class="icon"></u-icon>
			</view>
			<view class="search-tag">
				<text class="item-tag" v-for="i in 9" :key="i">神秘复苏</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		
		onNavigationBarButtonTap(e) {
			if (e.index == 0) { // 取消搜索，返回上一页
				this.$goBack();
			}
		},
		
		methods: {
			goPage() {
				this.$openPage({
					name: 'searchResult'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-page{
		
		.item-view{
			padding: 0 30rpx;
			
			.title{
				padding: 30rpx 0;
				display: flex;
				justify-content: space-between;
				text{
					font-weight: 550;
				}
				.icon{
					font-size: $uni-font-size-subtitle;
				}
			}
			
			.search-tag{
				display: flex;
				flex-wrap: wrap;
				
				.item-tag{
					display: inline-block;
					padding: 8rpx 16rpx;
					background-color: $uni-bg-book-color;
					border-radius: 50rpx;
					margin: 0 20rpx 20rpx 0;
				}
			}
		}
	}
</style>
