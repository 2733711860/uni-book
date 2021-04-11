<template>
	<view class="read-page">
		<view class="read-view" @click="showTool = !showTool">
			<u-parse :html="content"></u-parse>
		</view>
		
		<read-tool v-model="showTool"></read-tool>
	</view>
</template>

<script>
	import readTool from '../../components/read/read-tool.vue';
	export default {
		components: {
			readTool
		},
		
		data() {
			return {
				showTool: false,
				content: `
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
					<p>露从今夜白，月是故乡明</p>
				`
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.read-page{
		height: 100%;
		font-size: 32rpx;
		line-height: 1.8;
		
		.read-view{
			height: 100%;
		}
	}
</style>
