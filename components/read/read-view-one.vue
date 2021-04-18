<template>
	<view class="read-view-one">
		<view class="container nowPage" 
			:style="{
				paddingTop: statusBarHeight+'px',
				color: textColor, 
				backgroundColor: pageBg, 
			}">
			<view class="chapter">{{ currentChapterName }}</view>
			<view class="content" id="content"
				@touchstart="touchStart"
				@touchend="touchEnd">
				<view class="inner-box" :style="{ height: `${innerHeight}px` }">
					<view class="book-inner" id="curContent"
						v-html="contentText" 
						:style="{ 
							fontSize: fontSize + 'px',
							lineHeight: lineHeight * fontSize + 'px',
							transform: `translateY(-${(currentPage - 1) * innerHeight}px)` 
						}">
					</view>
				</view>
			</view>
			<view class="bottom-bar">
				<view>{{systemTimeStr}}</view>
				<view>{{ currentPage }}/{{ curTotalPage }}</view>
				<!-- <view><battery :level="batteryLevel" :charging="batteryState === 2"></battery></view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import { formatDate } from '@/utils/utils.js';
	export default {
		data() {
			return {
				innerHeight: 600,
				
				currentIndex: -1, // 当前章节索引
				currentPage: -1, // 当前页
				curTotalPage: 1, // 总页码
				
				windowWidth: 0, // 可用屏幕宽度
				windowHeight: 0, // 可用屏幕高度
				contentHeight: 0, //阅读区域高度
				pixelRatio: '', //设备像素比
				systemTimeStr: '', //系统时间字符串
				statusBarHeight: '',
				
				touchStartX: 0,
				touchStartY: 0,
			}
		},
		
		props: {
			textColor: {
				type: String,
				default: '#333'
			},
			pageBg: {
				type: String,
				default: 'rgb(247,247,247)'
			}
		},
		
		computed: {
			...mapGetters([
				'bookList',
				'fontSize',
				'lineHeight'
			]),
			
			curBook() { // 当前书
				return this.bookList.find(item => item.bookId == this.$parseURL().bookId);
			},
			
			chapterList() { // 章节列表
				return this.curBook.chapters;
			},
			
			contentText() { // 当前正文
				return this.curBook.chapters[this.currentIndex] ?
					(this.curBook.chapters[this.currentIndex].content || '') : '';
			},
			
			currentChapterName() {
				return this.curBook.chapters[this.currentIndex] ?
					this.curBook.chapters[this.currentIndex].title : '';
			},
			
			progress() { // 章节的阅读进度
				return this.currentPage / this.curTotalPage;
			}
		},
		
		watch: {
			async currentIndex() { // 章节一发生变化，自动缓存三章
				let list = [];
				if (this.currentIndex == 0) {
					list.push(this.currentIndex, this.currentIndex + 1);
				} else if (this.currentIndex == this.chapterList.length - 1) {
					list.push(this.currentIndex - 1, this.currentIndex);
				} else {
					list.push(this.currentIndex - 1, this.currentIndex, this.currentIndex + 1);
				}
				list.forEach(item => {
					let nowText = this.chapterList[item] ? (this.chapterList[item].content || '') : '';
					if (!nowText) {
						this.getContentByChapter(this.chapterList[item].chapterId);
					}
				})
			},
			
			async contentText() { // 正文一发生变化，就重新获取总页数
				await this.getPageSize();
			},
			
			async lineHeight() { // 更改行高，重新计算页面
				let progress = this.progress;
				this.calcHeight(); // 计算innerHeight，用于截取至整行
				await this.getPageSize(); // 计算本章页码
				this.currentPage = Math.floor(this.curTotalPage * progress) == 0 ? 1 : Math.floor(this.curTotalPage * progress);
			},
			
			async fontSize() { // 更改字体，重新计算页面
				let progress = this.progress;
				this.calcHeight(); // 计算innerHeight，用于截取至整行
				await this.getPageSize(); // 计算本章页码
				this.currentPage = Math.floor(this.curTotalPage * progress) == 0 ? 1 : Math.floor(this.curTotalPage * progress);
			}
		},
		
		async created() {
			this.getSystemInfo();
			await this.calcHeight();
			this.currentIndex = this.curBook.currentIndex; // 当前章节索引
			this.currentPage = this.curBook.currentPage; // 当前页码
		},
		
		methods: {
			getContentByChapter(chapterId) { // 获取章节正文
				return new Promise(resolve => {
					this.$api.getBookContent({
						chapterId,
						bookId: this.$parseURL().bookId
					}).then(res => {
						let bookObj = this.curBook;
						let index = this.chapterList.findIndex(item => item.chapterId == chapterId);
						bookObj.chapters[index].content = res.data.cpContent;
						this.setBook(bookObj);
						resolve();
					})
				})
			},
			
			touchStart(e) {
				this.touchStartX = e.touches[0].clientX;
				this.touchStartY = e.touches[0].clientY;
			},
			
			touchEnd(e) {
				if (e.changedTouches[0].clientX - this.touchStartX < 0) { // 左滑，下一页
					this.getNextPage();
				} else if (e.changedTouches[0].clientX - this.touchStartX > 0) { // 右滑，上一页
					this.getPrevPage();
				} else if (
					e.changedTouches[0].clientX > this.windowWidth / 3 &&
					e.changedTouches[0].clientX < (this.windowWidth / 3) * 2 &&
					e.changedTouches[0].clientY > this.windowHeight / 3 &&
					e.changedTouches[0].clientY < (this.windowHeight / 3) * 2
				) {
					setTimeout(() => {
						this.$emit('showMenu');
					})
				} else if (e.changedTouches[0].clientX < this.windowWidth / 2) { // 点击左侧1/2，上一页
					this.getPrevPage();
				} else if (e.changedTouches[0].clientX > this.windowWidth / 2) { // 点击右侧1/2，下一页
					this.getNextPage();
				}
				this.touchStartX = 0;
				this.touchStartY = 0;
			},
			
			getNextPage() { // 下一页
				if (this.currentPage == this.curTotalPage) { // 最后一页
					if (this.currentIndex + 1 >= this.chapterList.length) { // 最后一张
						uni.showToast({
							title: '阅读完毕',
							icon: 'none'
						})
					} else {
						this.currentIndex++;
						this.currentPage = 1;
					}
				} else {
					this.currentPage++;
				}
			},
			
			getPrevPage() { // 上一页
				if (this.currentPage == 1 && this.currentIndex == 0) { // 第一章第一页
					uni.showToast({
						title: '第一章第一页',
						icon: 'none'
					})
				} else if (this.currentPage == 1 && this.currentIndex != 0) { // 非第一章的第一页
					// this.currentIndex--;
					this.changeChapter();
				} else {
					this.currentPage--;
				}
			},
			
			async changeChapter() { // 第一页进入上一页，进入上一章
				this.currentIndex--;
				await this.getPageSize();
				this.currentPage = this.curTotalPage;
			},
			
			getSystemInfo() { // 获取系统设备信息
				const { windowWidth, windowHeight, pixelRatio, statusBarHeight } = uni.getSystemInfoSync();
				console.log(statusBarHeight); 
				this.statusBarHeight = statusBarHeight;
				this.windowWidth = windowWidth;
				this.windowHeight = windowHeight;
				this.pixelRatio = pixelRatio;
				
				// 获取时间
				this.setInterval(() => {
					this.systemTimeStr = formatDate(new Date(), 'hh:mm');
				}, 1000)()
			},
			
			setInterval(f, time) { // 用setInterval模拟setInterval，防止占内存
				return function walk() {
					setTimeout(function () {
						f();
						walk(); 
					}, time);
				};
			},
			
			/**
			 * 计算innerHeight，用于截取至整行
			 **/
			calcHeight() {
				if (this.contentHeight) {
					let lineHeight = this.fontSize * this.lineHeight;
					// #ifdef APP-PLUS || MP-WEIXIN
					lineHeight = Math.floor(lineHeight * this.pixelRatio) / this.pixelRatio;
					// #endif
					let lineNum = Math.floor((this.contentHeight + Math.floor((lineHeight - this.fontSize) / 2)) / lineHeight);
					this.innerHeight = lineNum * lineHeight;
				} else {
					return new Promise((resolve, reject) => {
						this.$nextTick(() => {
							const query = uni.createSelectorQuery().in(this);
							query.select('#content').boundingClientRect(data => {
								let height = data.height;
								this.contentHeight = height;
								let lineHeight = this.fontSize * this.lineHeight;
								// #ifdef APP-PLUS || MP-WEIXIN
								lineHeight = Math.floor(lineHeight * this.pixelRatio) / this.pixelRatio;
								// #endif
								let lineNum = Math.floor((height + Math.floor((lineHeight - this.fontSize) / 2)) / lineHeight);
								this.innerHeight = lineNum * lineHeight;
								resolve();
							})
							.exec();
						});
					});
				}
			},
			
			getPageSize() { // 获取章节页码
				return new Promise(resolve => {
					setTimeout(() => {
						const query = uni.createSelectorQuery().in(this);
						query.select(`#curContent`).boundingClientRect(data => {
							let height = data.height;
							// #ifdef APP-PLUS || MP-WEIXIN
							height = Math.round(height * this.pixelRatio) / this.pixelRatio;
							// #endif
							this.curTotalPage = Math.ceil(height / this.innerHeight) || 1;
							resolve();
						}).exec();
					}, 150)
				})
			},
			
			...mapActions([
				'setBook'
			])
		}
	}
</script>

<style lang="scss" scoped>
	.read-view-one{
		height: 100%;
		.container{
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			align-items: center;
			padding: 0px 40rpx;
			height: 100%;
			width: 100%;
			background-color: #fff;
			overflow: hidden;
			transition: all 0.5s;
			
			.chapter {
				font-size: $uni-font-size-mini;
				// color: #746e65;
				height: 60rpx;
				width: 100%;
				line-height: 60rpx;
			}
			
			.content {
				flex: 1 1 auto;
				overflow: hidden;
				.inner-box {
					overflow: hidden;
					.book-inner {
						text-indent: 2em;
						
						letter-spacing: 2rpx;
						text-align: justify;
					}
				}
			}
			
			.bottom-bar {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: $uni-font-size-mini;
				// color: #746e65;
				height: 80rpx;
				width: 100%;
			}
		}
	}
</style>
