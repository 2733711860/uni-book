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
						<text>共1579章</text>
						<view class="right">
							<text>正序</text>
							<i class="iconfont icon-paixu"></i>
						</view>
					</view>
				</view>
				
				<scroll-view scroll-y="true" class="chapter-content">
					<view class="chapter-view">
						<u-cell-group>
							<u-cell-item :title="item.title" :arrow="false" v-for="(item, index) in chapters" :key="index" @click="goPage(item, index)">
								<text slot="right-icon" class="is-down">未离线</text>
							</u-cell-item>
						</u-cell-group>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<view class="popup-bg" v-if="showChapter" @click="showChapter = false">
		</view>
	</view>
	
	
	
	<!-- <u-popup v-model="showChapter" mode="bottom" border-radius="25" height="80%">
		<view class="chapter-dom">
			<view class="top">
				<view class="top">
					<text>目录</text>
					<u-icon name="close" @click="showChapter = false"></u-icon>
				</view>
				<view class="chapter-brief">
					<text>共1579章</text>
					<view class="right">
						<text>正序</text>
						<i class="iconfont icon-paixu"></i>
					</view>
				</view>
			</view>
			
			<scroll-view scroll-y="true" class="chapter-content">
				<view class="chapter-view">
					<u-cell-group>
						<u-cell-item title="第一章 天地玄黄" :arrow="false" v-for="i in 100" :key="i" @click="goPage">
							<text slot="right-icon" class="is-down">未离线</text>
						</u-cell-item>
					</u-cell-group>
				</view>
			</scroll-view>
		</view>
	</u-popup> -->
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	export default {
		data() {
			return {
				showChapter: this.value
			}
		},

		props: {
			value: {
				type: Boolean,
				default: false
			},
			chapters: {
				type: Array,
				default: () => []
			}
		},
		
		computed: {
			...mapGetters([
				'bookList'
			])
		},

		watch: {
			value() {
				this.showChapter = this.value;
			},
			showChapter() {
				this.$emit('input', this.showChapter);
			}
		},
		
		methods: {
			goPage(item, index) {
				let curBook = this.bookList.find(item => item.bookId == this.$parseURL().bookId);
				curBook.currentIndex = index;
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
				justify-content: space-between;
				align-items: center;
				padding: 0 20rpx;
				border-bottom: 2rpx solid $uni-bg-color-basic;
			}
			
			.chapter-brief{
				height: 80rpx;
				padding: 0 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: $uni-text-color-grey;
				
				.right{
					.iconfont{
						margin-left: 15rpx;
					}
				}
			}
		}
		
		.chapter-content{
			flex: 1;
			overflow-y: auto;
			
			.chapter-view{
				
				.is-down{
					color: $uni-text-color-grey;
					font-size: $uni-font-size-mini;
				}
			}
		}
	}
</style>
