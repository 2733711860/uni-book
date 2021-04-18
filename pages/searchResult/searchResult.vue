<template>
	<view class="result-page">
		<card-three hideTitle :list="resultList"></card-three>
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
				resultList: []
			}
		},
		
		mounted() {
			this.getSearch()
		},
		
		methods: {
			getSearch() {
				this.$api.searchBook({
					keyWord: this.$parseURL().keyword
				}).then(res => {
					this.resultList = res.data;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.result-page{
		padding: 30rpx 20rpx;
	}
</style>
