<template>
	<view class="item-chapter" :style="{ height: size + 'px', lineHeight: size + 'px' }">
		<text class="name">{{item.title || ''}}</text>
		<text class="state">未离线</text>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			size: Number
		},
	}
</script>

<style lang="scss" scoped>
	.item-chapter{
		position: relative;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx;
		font-size: $uni-font-size-base;
		color: $uni-text-color-delay;
		
		.state{
			font-size: $uni-font-size-mini;
			color: $uni-text-color-grey;
		}
	}
	
	.item-chapter:after{
		border: 0 solid $uni-border-color-delay;
		border-bottom-width: 1px;
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		pointer-events: none;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		width: 199.8%;
		height: 199.7%;
		-webkit-transform: scale(0.5, 0.5);
		transform: scale(0.5, 0.5);
		z-index: 2;
	}
</style>
