<template>
	<view class="result-page">
		<card-three hideTitle></card-three>
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
				
			}
		},
		
		mounted() {
			// uni.setNavigationBarTitle({
			// 	title: '神秘复苏'
			// })
		},
		
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.result-page{
		padding: 30rpx 20rpx;
	}
</style>
