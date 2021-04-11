<template>
	<view class="index-home">
		<swiper :indicator-dots="true" :autoplay="true" :circular="true" :interval="5000" :duration="1000"
			class="swiper-img">
			<swiper-item>
				<image src="../../static/img/14.jpg" class="swiper-img"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/img/4.jpg" class="swiper-img"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/img/5.jpg" class="swiper-img"></image>
			</swiper-item>
		</swiper>
		
		<card-one></card-one>
		<card-two></card-two>
		<card-three></card-three>
	</view>
</template>

<script>
	import cardOne from '../card/card-one.vue';
	import cardTwo from '../card/card-two.vue';
	import cardThree from '../card/card-three.vue';
	export default {
		components: {
			cardOne, cardTwo, cardThree
		}
	}
</script>

<style lang="scss" scoped>
	.index-home {

		.swiper-img {
			width: 100%;
			height: 300rpx;
			border-radius: 20rpx;
		}
	}
</style>
