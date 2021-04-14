<template>
	<view class="shelf-page">
		<!-- #ifdef H5 -->
		<scroll-view scroll-y class="scrollview">
			<card-four :isList="isList"></card-four>
		</scroll-view>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<card-four :isList="isList"></card-four>
		<!-- #endif -->
	</view>
</template>

<script>
	import cardFour from '@/components/card/card-four.vue';
	export default {
		components: {
			cardFour
		},
		
		data() {
			return {
				isList: true
			}
		},
		
		onNavigationBarButtonTap(e) {
			if (e.index == 0) { // 书架管理
			} else if (e.index == 1) { // 书架布局
				uni.showActionSheet({
					itemList: [ '列表模式', '图墙模式' ],
					success: (res) => {
						this.isList = res.tapIndex == 0 ? true :false;
					}
				})
			} else if (e.index == 2) { // 搜索
				this.$openPage({
					name: 'search'
				})
			}
		},
		
		onPullDownRefresh() { // 下拉刷新
			console.log('下拉');
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 2000)
		},
		
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.shelf-page, .scrollview{
		height: 100%;
	}
</style>
