<template>
	<view class="chapter-popup-view">
		<view class="chapter-popup" :style="{ bottom: showChapter ? '0' : '-80%' }">
			<view class="chapter-dom">
				<view class="top">
					<view class="top">
						<text>目录</text>
						<u-icon name="close" @click="showChapter = false"></u-icon>
					</view>
					<view class="chapter-brief">
						<text>共{{chapterList.length}}章</text>
						<view class="right">
							<text>正序</text>
							<i class="iconfont icon-paixu"></i>
						</view>
					</view>
				</view>
				
				<view class="chapter-content">
					<virtual-list :items="chapterList" :size="size" :remain="18">
						<template v-slot:default="slotItem">
							<list-item :item="slotItem.item" :size="size"></list-item>
						</template>
					</virtual-list>
				</view>
			</view>
		</view>
		
		<view class="popup-bg" v-if="showChapter" @click="showChapter = false">
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import listItem from './xc-list-item.vue';
	import virtualList from './xc-virtual-list.vue';
	export default {
		components: {
			listItem, virtualList
		},
		
		data() {
			return {
				showChapter: this.value,
				size: 0
			}
		},

		props: {
			value: {
				type: Boolean,
				default: false
			}
		},
		
		computed: {
			...mapGetters([
				'bookList'
			]),
			
			chapterList() { // 当前书的章节列表
				let list = this.bookList.find(item => item.bookId == this.$parseURL().bookId) &&
					this.bookList.find(item => item.bookId == this.$parseURL().bookId).chapters ?
					this.bookList.find(item => item.bookId == this.$parseURL().bookId).chapters : [];
				return list;
			}
		},

		watch: {
			value() {
				this.showChapter = this.value;
			},
			showChapter() {
				this.$emit('input', this.showChapter);
			}
		},
		
		mounted() {
			this.size = +uni.upx2px(100);
		},
		
		methods: {
			goPage(item) {
				let curBook = this.bookList.find(item => item.bookId == this.$parseURL().bookId);
				let chapterIndex = curBook.chapters.findIndex(item => item.chapterId == item.chapterId);
				curBook.currentIndex = chapterIndex;
				this.setBook(curBook);
				this.$openPage({
					name: 'read',
					query: {
						bookId: this.$parseURL().bookId
					}
				})
			},
			
			...mapActions([
				'setBook'
			])
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/iconfont/iconfont.css';
	.chapter-popup{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
		background-color: $uni-bg-color;
		transition: all 0.3s;
		height: 80%;
		border-top-right-radius: 40rpx;
		border-top-left-radius: 40rpx;
	}
	
	.popup-bg{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		z-index: 8;
		background-color: $uni-bg-color-mask;
	}
	
	
	.chapter-dom{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		
		.top{
			
			.top{
				height: 90rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 0 20rpx;
				border-bottom: 2rpx solid $uni-bg-color-basic;
			}
			
			.chapter-brief{
				height: 80rpx;
				padding: 0 20rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				color: $uni-text-color-grey;
				border-bottom: 2rpx solid $uni-bg-color-basic;
				
				.right{
					display: flex;
					flex-direction: row;
					align-items: center;
					.iconfont{
						margin-left: 15rpx;
					}
				}
			}
		}
		
		.chapter-content{
			flex: 1;
			overflow-y: auto;
			
			.is-down{
				color: $uni-text-color-grey;
				font-size: $uni-font-size-mini;
			}
		}
	}
</style>
