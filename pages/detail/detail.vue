<template>
	<view class="detail-page">
		<view class="detail-top">
			<view :style="{height:statusBarHeight}"></view>
			<view class="detail-top-content">
				<image src="../../static/img/14.jpg" class="book-img"></image>
				<view class="detail-msg">
					<view class="book-name">
						斗破苍穹
					</view>
					<view class="book-author">
						天蚕土豆
					</view>
					<view class="book-detail">
						斗破苍穹斗破苍穹斗破苍穹斗破苍穹斗破苍穹斗破苍穹斗破苍穹斗破苍穹
					</view>
				</view>
			</view>
		</view>
		
		<view class="book-fouc">
			<view class="on-shelf">
				<view class="top">
					<text>54</text>万
				</view>
				<text class="text-d">加入书架</text>
			</view>
			<view class="on-shelf">
				<view class="top">
					<text>40</text>万
				</view>
				<text class="text-d">正在读</text>
			</view>
			<view class="on-shelf">
				<view class="top">
					<u-rate v-model="rateValue" active-color="#FA3534" inactive-color="#b2b2b2" gutter="5"></u-rate>
				</view>
				<text class="text-d">10321人评分</text>
			</view>
		</view>
		
		<view class="brief">
			<!-- #ifdef MP-WEIXIN -->
			<u-read-more ref="uReadMore" :toggle="true" show-height="200">
				<u-parse :html="content" @load="parseLoaded"></u-parse>
			</u-read-more>
			<!-- #endif -->
			
			<!-- #ifndef MP-WEIXIN -->
			<u-read-more :toggle="true" show-height="200">
				<rich-text :nodes="content"></rich-text>
			</u-read-more>
			<!-- #endif -->
			
			<view class="new-chapter" @click="goChapter()">
				<text class="title">章节</text>
				<text class="newChapter">第三百章 灭世浮屠灭世浮屠灭世浮屠</text>
				<u-icon name="clock"></u-icon>
				<text>2021-04-07 16:01</text>
			</view>
		</view>
		
		<card-two class="like"></card-two>
		<card-three class="like bottHeight"></card-three>
		
		<view class="detail-bottom">
			<u-button type="success" size="medium" shape="circle" :ripple="true" plain>加入书架</u-button>
			<u-button type="success" size="medium" shape="circle" :ripple="true">立即阅读</u-button>
		</view>
		
		<chapter-one v-model="showChapter"></chapter-one>
	</view>
</template>

<script>
	import cardTwo from '../../components/card/card-two.vue';
	import cardThree from '../../components/card/card-three.vue';
	import chapterOne from '../../components/chapter-popup/chapter-one.vue';
	export default {
		components: {
			cardTwo, cardThree, chapterOne
		},
		
		data() {
			return {
				rateValue: 4,
				showChapter: false,
				statusBarHeight: '',
				content: `山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
								苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
								无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？`,
			}
		},
		
		created() {
			console.log(this.$parseURL().name)
			uni.getSystemInfo({
				success: res => {
					// 获取状态栏高度给顶部占位节点
					console.log(res.statusBarHeight);
					this.statusBarHeight = res.statusBarHeight + 'px';
				}
			})
			uni.setNavigationBarTitle({
				title: '斗破苍穹'
			})
		},
		
		methods: {
			parseLoaded() {
				this.$refs.uReadMore.init();
			},
			
			goChapter() { // 章节
				this.showChapter = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifdef APP-PLUS */
	$height: calc(380rpx + var(--status-bar-height));
	/* #endif */
	/* #ifndef APP-PLUS */
	$height: 380rpx;
	/* #endif */
	$bottomHeight: 120rpx;
	.detail-page{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 0;
		
		.detail-top{
			width: 100%;
			height: $height;
			background: linear-gradient(to bottom, rgba(255, 255, 255, .5) 0%, $uni-bg-color-basic 100%);
			
			.detail-top-content{
				padding-top: 90rpx;
				/* #ifdef APP-PLUS */
				padding: calc(40rpx + var(--status-bar-height)) 20rpx 20rpx 20rpx;
				/* #endif */
				/* #ifndef APP-PLUS */
				padding: 120rpx 20rpx 20rpx 20rpx;
				/* #endif */
				display: flex;
				overflow: hidden;
				
				.book-img{
					width: 160rpx;
					height: 220rpx;
					border-radius: 10rpx;
				}
				
				.detail-msg{
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					overflow: hidden;
					padding: 20rpx;
					
					.book-name{
						font-weight: 550;
						font-size: $uni-font-size-lg;
					}
					
					.book-author, .book-detail{
						font-size: $uni-font-size-sm;
						color: $uni-text-color-grey;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}
		
		.book-fouc{
			width: 700rpx;
			margin: 20rpx auto 0;
			display: flex;
			justify-content: space-between;
			padding: 30rpx;
			background-color: $uni-bg-color;
			border-radius: 15rpx;
			box-shadow: $uni-border-boxshadow;
			
			.on-shelf{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				width: 33.3%;
				
				.top{
					font-weight: 550;
					padding-bottom: 10rpx;
					
					text{
						font-size: $uni-font-size-title;
						padding-right: 5rpx;
					}
				}
				
				.text-d{
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;
				}
			}
		}
		
		.brief{
			width: 700rpx;
			margin: 20rpx auto 0;
			padding: 30rpx 30rpx 0 30rpx;
			background-color: $uni-bg-color;
			border-radius: 15rpx;
			box-shadow: $uni-border-boxshadow;
		}
		
		.brief{
			.new-chapter{
				display: flex;
				justify-content: space-between;
				padding: 30rpx 0;
				color: $uni-text-color-grey;
				font-size: $uni-font-size-sm;
				overflow: hidden;
				border-top: 1px solid $uni-border-color;
				
				.newChapter{
					flex: 1;
					padding: 0 10rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				
				.title{
					color: $uni-text-color;
					font-weight: 550;
					padding-right: 10rpx;
				}
			}
		}
		
		.like{
			width: 700rpx;
			margin: 20rpx auto 0;
		}
		
		.bottHeight{
			margin-bottom: 150rpx;
		}
		
		.detail-bottom{
			position: fixed;
			bottom: 0;
			height: $bottomHeight;
			width: 100%;
			display: flex;
			align-items: center;
			background-color: $uni-bg-color;
		}
	}
	.detail-page::before{
		content: '';
		width: 100%;
		height: $height;
		position: absolute;
		background: url("../../static/img/5.jpg");
		background-size: 100% $height;
		background-attachment: fixed;
		filter: blur(8px);
		z-index: -1;
		margin-top: -10px;
	}
</style>
