<template>
	<view class="page">
		<view class="index-top">
			<view class="index-tab">
				<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" font-size="26"
					bg-color="initial" active-color="#fff" inactive-color="#dedede"></u-tabs>
			</view>
		</view>

		<scroll-view scroll-y="true" class="index-content">
			<index-home v-if="current == 0" class="page-content"></index-home>
			<index-boy v-if="current == 1" class="page-content"></index-boy>
		</scroll-view>
	</view>
</template>

<script>
	import indexHome from '../../components/index/index-home.vue';
	import indexBoy from '../../components/index/index-boy.vue';
	import { appMixin } from '@/mixins/appMixin.js';
	export default {
		mixins: [ appMixin ],
		
		components: {
			indexHome,
			indexBoy
		},

		data() {
			return {
				keyword: '',
				list: [{
					name: '精选'
				}, {
					name: '男频'
				}, {
					name: '女频'
				}, {
					name: '分类'
				}],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
			};
		},
		
		// #ifdef APP-PLUS
		onNavigationBarButtonTap(e) {
			if (e.index == 1) { // 扫码
				this.scan(1);
			} else if (e.index == 2) { // 分享
				this.shareInfo();
			} else if (e.index == 0) { // 日历
				
			}
		},
		// #endif
		
		onNavigationBarSearchInputClicked() {
			this.$openPage({
				name: 'search'
			})
		},

		methods: {
			change(index) {
				this.current = index;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: linear-gradient(to bottom, $uni-top-bg-color 0%, $uni-top-bg-color 180rpx, $uni-bg-color-basic 180rpx, $uni-bg-color-basic 100%);

		.index-top {
			width: 700rpx;
			margin: 0 auto;
		}

		.index-content {
			flex: 1;
			overflow-y: auto;

			.page-content {
				padding: 10rpx 25rpx;
				background: linear-gradient(to bottom, $uni-top-bg-color 0%, $uni-top-bg-color 150rpx, $uni-bg-color-basic 150rpx, $uni-bg-color-basic 100%);
			}
		}
	}
</style>
