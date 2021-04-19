<template>
	<view class="detail-page">
		<view class="detail-top">
			<view :style="{height:statusBarHeight}"></view>
			<view class="detail-top-content">
				<image src="../../static/img/14.jpg" class="book-img"></image>
				<view class="detail-msg">
					<view class="book-name">
						{{bookObj.bookName}}
					</view>
					<view class="book-author">
						{{bookObj.bookAuthor || ''}}
					</view>
					<view class="book-detail">
						{{bookObj.bookDesc || ''}}
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
				<u-parse :html="bookObj.bookDesc" @load="parseLoaded"></u-parse>
			</u-read-more>
			<!-- #endif -->
			
			<!-- #ifndef MP-WEIXIN -->
			<u-read-more :toggle="true" show-height="200">
				<rich-text :nodes="bookObj.bookDesc"></rich-text>
			</u-read-more>
			<!-- #endif -->
			
			<view class="new-chapter" @click="showChapter = true">
				<text class="title">章节</text>
				<text class="newChapter">{{newsChapter ? newsChapter.title : ''}}</text>
				<u-icon name="clock"></u-icon>
				<text>{{updatedTime}}</text>
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
	import { appMixin } from '@/mixins/appMixin.js';
	import { mapGetters, mapActions } from 'vuex';
	import { formatDate } from '@/utils/utils.js';
	export default {
		mixins: [ appMixin ],
		
		components: {
			cardTwo, cardThree, chapterOne
		},
		
		data() {
			return {
				rateValue: 4,
				showChapter: false,
				statusBarHeight: ''
			}
		},
		
		computed: {
			...mapGetters([
				'bookList'
			]),
			
			bookObj() { // 当前书
				let curBook = this.bookList.find(item => item.bookId == this.$parseURL().bookId) ?
					this.bookList.find(item => item.bookId == this.$parseURL().bookId) : {};
				return curBook;
			},
			
			newsChapter() { // 最新章节
				let chapterList = this.bookObj.chapters || [];
				return chapterList[chapterList.length - 1];
			},
			
			updatedTime() { // 更新时间
				return this.bookObj.updatedTime || ''
			}
		},
		
		onNavigationBarButtonTap(e) {
			if (e.index == 0) { // 加入书架
				console.log('加入书架');
			} else if (e.index == 1) { // 分享
				this.shareInfo();
			}
		},
		
		created() {
			// console.log(this.$parseURL().name)
			uni.getSystemInfo({
				success: res => {
					// 获取状态栏高度给顶部占位节点
					this.statusBarHeight = res.statusBarHeight + 'px';
				}
			})
			uni.setNavigationBarTitle({
				title: '斗破苍穹'
			})
		},
		
		mounted() {
			this.getBookDetail();
		},
		
		methods: {
			parseLoaded() {
				this.$refs.uReadMore.init();
			},
			
			getChapter() {
				uni.showLoading({
					title: '加载中...'
				});
				this.$api.getBookChapter({
					bookId: this.$parseURL().bookId
				}).then(res => {
					this.setBook({
						bookId: this.$parseURL().bookId,
						chapters: res.data
					});
					uni.hideLoading();
				}).catch(err => {
					uni.hideLoading();
				})
			},
			
			getBookDetail() {
				uni.showLoading({
					title: '加载中...'
				});
				this.$api.getBookDetail({
					bookId: this.$parseURL().bookId
				}).then(res => {
					let obj = {
						"bookId": res.data.bookId,
						"bookName": res.data.bookName,
						"bookAuthor": res.data.bookAuthor,
						"bookDesc": res.data.bookDesc,
						"bookImg": res.data.bookImg,
						"updatedTime": res.data.updatedTime,
						"chapters": []
					}
					this.setBook(obj);
					uni.hideLoading();
					this.getChapter();
				}).catch(err => {
					uni.hideLoading();
				})
			},
			
			...mapActions([
				'setBook'
			])
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
