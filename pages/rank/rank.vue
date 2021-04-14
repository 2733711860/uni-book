<template>
	<view class="rank-page">
		<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false" active-color="#62c075"
		 swiperWidth="750"></u-tabs-swiper>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="swiper-view">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<scroll-view scroll-y @scrolltolower="onreachBottom" class="scrollview">
					<view class="scroll-content">
						<card-three hideTitle></card-three>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import cardThree from '@/components/card/card-three.vue';
	export default {
		components: {
			cardThree
		},
		
		data() {
			return {
				list: [
					{ name: '全部' }, { name: '玄幻' }, { name: '修真' },
					{ name: '武侠' }, { name: '仙侠' }, { name: '都市' },
					{ name: '现实' }, { name: '历史' }, { name: '军事' },
					{ name: '游戏' }, { name: '体育' }, { name: '科幻' },
					{ name: '悬疑' }, { name: '轻小说' }, { name: '名著' }
				],
				current: 0,
				swiperCurrent: 0,
			}
		},
		
		onNavigationBarSearchInputClicked() {
			this.$openPage({
				name: 'search'
			})
		},
		
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			
			// scroll-view到底部加载更多
			onreachBottom() {
				console.log(1111);
			}
		}
	}
</script>

<style scoped lang="scss">
	.rank-page{
		height: 100%;
		display: flex;
		flex-direction: column;
		
		.swiper-view{
			flex: 1;
			
			.scrollview{
				height: 100%;
				
				.scroll-content{
					padding: 0 20rpx 30rpx 20rpx;
				}
			}
		}
	}
</style>
