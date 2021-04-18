<template>
	<view class="read-view-page">
		<!-- 上一页 -->
		<view class="container prePage" 
			:style="preAnimation">
			<view class="chapter">第一章 神秘复苏</view>
			<view class="content">
				<view class="inner-box" :style="{ height: `${innerHeight}px` }">
					<view class="book-inner" id="preContent"
						v-html="prePageMsg.content" 
						:style="{ 
							fontSize: `${fontSize}px`, 
							lineHeight: `${lineHeight * fontSize}px`,
							transform: `translateY(-${(currentPage < 1 ? 1 : (currentPage-2)) * innerHeight}px)`
						}">
					</view>
				</view>
			</view>
			<view class="bottom-bar">
				<view>14:31</view>
				<view>{{ prePageMsg.pageNum }}/{{ prePageMsg.totalPage }}</view>
				<!-- <view><battery :level="batteryLevel" :charging="batteryState === 2"></battery></view> -->
			</view>
		</view>
		
		<!-- 当前页 -->
		<view class="container nowPage"
			:style="nowAnimation"
			@touchstart="touchStart"
			@touchend="touchEnd"
			@touchmove="touchMove"
			@touchcancel="touchcancel">
			<view class="chapter">第一章 神秘复苏</view>
			<view class="content">
				<view class="inner-box" :style="{ height: `${innerHeight}px` }">
					<view class="book-inner" id="curContent"
						v-html="curPageMsg.content" 
						:style="{ 
							fontSize: `${fontSize}px`, 
							lineHeight: `${lineHeight * fontSize}px`,
							transform: `translateY(-${(currentPage - 1) * innerHeight}px)` 
						}">
					</view>
				</view>
			</view>
			<view class="bottom-bar">
				<view>14:31</view>
				<view>{{ curPageMsg.pageNum }}/{{ curPageMsg.totalPage }}</view>
				<!-- <view><battery :level="batteryLevel" :charging="batteryState === 2"></battery></view> -->
			</view>
		</view>
		
		<!-- 下一页 -->
		<view class="container nextPage" :style="nextAnimation">
			<view class="chapter">第一章 神秘复苏</view>
			<view class="content">
				<view class="inner-box" :style="{ height: `${innerHeight}px` }">
					<view class="book-inner" id="nextContent"
						v-html="nextPageMsg.content" 
						:style="{ 
							fontSize: `${fontSize}px`, 
							lineHeight: `${lineHeight * fontSize}px`,
							transform: `translateY(-${(currentPage) * innerHeight}px)`
						}">
					</view>
				</view>
			</view>
			<view class="bottom-bar">
				<view>14:31</view>
				<view>{{ nextPageMsg.pageNum }}/{{ nextPageMsg.totalPage }}</view>
				<!-- <view><battery :level="batteryLevel" :charging="batteryState === 2"></battery></view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	export default {
		data() {
			return {
				preAnimation: {},
				nowAnimation: {},
				nextAnimation: {},
				animationData: [],
				animationTime: '0s', // 翻页动画时间
				
				currentIndex: -1, // 当前章节索引
				currentPage: -1, // 当前页
				
				windowWidth: 0, // 可用屏幕宽度
				windowHeight: 0, // 可用屏幕高度
				pixelRatio: '', //设备像素比
				
				fontSize: 16,
				lineHeight: 1.5,
				innerHeight: 600,
				
				prePageMsg: { // 上页
					chapterName: '',
					content: '',
					pageNum: '',
					totalPage: ''
				},
				
				curPageMsg: { // 当页
					chapterName: '',
					content: '',
					pageNum: '',
					totalPage: ''
				},
				
				nextPageMsg: { // 下页
					chapterName: '',
					content: '',
					pageNum: '',
					totalPage: ''
				},
				
				
				touchX: 0,
				touchStartX: 0,
				touchY: 0,
				touchStartY: 0,
			}
		},
		
		computed: {
			...mapGetters([
				'bookList'
			]),
			
			curBook() { // 当前书
				return this.bookList.find(item => item.bookId == this.$parseURL().bookId);
			},
			
			chapterList() { // 章节列表
				return this.curBook.chapters;
			}
		},
		
		async created() {
			this.currentIndex = this.curBook.currentIndex; // 当前章节索引
			this.currentPage = this.curBook.currentPage; // 当前页码
			this.initPage();
		},
		
		async mounted() {
			await this.getSystemInfo();
			
			this.animationData = [
				`(${-this.windowWidth}px, 0)`, 
				`(0, 0)`,
				`(${this.windowWidth}px, 0)`
			];
			this.animationTime = '0s';
			this.getAnimation(this.animationData);
		},
		
		methods: {
			async initPage() { // 刚进入页面初始化
				let curChapterData = this.chapterList[this.currentIndex]; // 当前章节信息
				if (!curChapterData.content) { // 本章未缓存，调接口缓存
					await this.getContentByChapter(curChapterData.chapterId);
				}
				this.getPreCurNextPageMsg();
			},
			
			getContentByChapter(chapterId) { // 获取章节正文
				return new Promise(resolve => {
					this.$api.getBookContent({
						chapterId,
						bookId: this.$parseURL().bookId
					}).then(res => {
						let bookObj = this.curBook;
						bookObj.chapters[this.currentIndex].content = res.data.cpContent;
						this.setBook(bookObj);
						resolve();
					})
				})
			},
			
			async getPreCurNextPageMsg() { // 获取三页数据
				let curChapterData = this.chapterList[this.currentIndex]; // 当前章节信息
				this.curPageMsg = { // 当页
					chapterName: curChapterData.title,
					content: curChapterData.content,
					pageNum: this.currentPage,
					totalPage: ''
				}
				this.curPageMsg.totalPage = await this.getPageSize('curContent'); // 获取本章总页数
				if (this.currentPage == 1) { // 第一页
					this.prePageMsg = {
						chapterName: this.chapterList[this.currentIndex - 1] ? this.chapterList[this.currentIndex - 1].title : curChapterData.title,
						content: this.chapterList[this.currentIndex - 1] ? this.chapterList[this.currentIndex - 1].content : curChapterData.content,
						pageNum: '',
						totalPage: ''
					}
				} else { // 不是第一页
					this.prePageMsg = {
						chapterName: curChapterData.title,
						content: curChapterData.content,
						pageNum: this.currentPage - 1,
						totalPage: this.curPageMsg.totalPage
					}
				}
				if (this.currentPage == this.curPageMsg.totalPage) { // 最后一页
					this.nextPageMsg = {
						chapterName: this.chapterList[this.currentIndex + 1] ? this.chapterList[this.currentIndex + 1].title : curChapterData.title,
						content: this.chapterList[this.currentIndex + 1] ? this.chapterList[this.currentIndex + 1].content : curChapterData.content,
						pageNum: 1,
						totalPage: ''
					}
				} else { // 不是最后一页
					this.nextPageMsg = {
						chapterName: curChapterData.title,
						content: curChapterData.content,
						pageNum: this.currentPage + 1,
						totalPage: this.curPageMsg.totalPage
					}
				}
			},
			
			getPageSize(id) { // 获取章节页码
				return new Promise(resolve => {
					setTimeout(() => {
						const query = uni.createSelectorQuery().in(this);
						query.select(`#${id}`).boundingClientRect(data => {
							let height = data.height;
							// #ifdef APP-PLUS || MP-WEIXIN
							height = Math.round(height * this.pixelRatio) / this.pixelRatio;
							// #endif
							let pagesize = Math.ceil(height / this.innerHeight) || 1;
							resolve(pagesize);
						}).exec();
					}, 100)
				})
			},
			
			getSystemInfo() { // 获取系统设备信息
				return new Promise(resolve => {
					const { windowWidth, windowHeight, pixelRatio } = uni.getSystemInfoSync();
					this.windowWidth = windowWidth;
					this.windowHeight = windowHeight;
					this.pixelRatio = pixelRatio;
					resolve();
				})
			},
			
			touchStart(e) {
				this.touchX = e.touches[0].clientX;
				this.touchStartX = e.touches[0].clientX;
				this.touchY = e.touches[0].clientY;
				this.touchStartY = e.touches[0].clientY;
			},
			
			touchEnd(e) {
				if (e.changedTouches[0].clientX - this.touchStartX < 0) { // 左滑，下一页
					this.getNextPage();
				} else if (e.changedTouches[0].clientX - this.touchStartX > 0) { // 右滑，上一页
					if (this.currentPage == 1 && this.currentIndex == 0) {
					} else {
						this.getPrevPage();
					}
				} else if (
					e.changedTouches[0].clientX > this.windowWidth / 3 &&
					e.changedTouches[0].clientX < (this.windowWidth / 3) * 2 &&
					e.changedTouches[0].clientY > this.windowHeight / 3 &&
					e.changedTouches[0].clientY < (this.windowHeight / 3) * 2
				) {
					console.log('菜单');
				} else if (e.changedTouches[0].clientX < this.windowWidth / 2) { // 点击左侧1/3，上一页
					if (this.currentPage == 1 && this.currentIndex == 0) {
					} else {
						this.getPrevPage();
					}
				} else if (e.changedTouches[0].clientX > this.windowWidth / 2) { // 点击右侧1/3，下一页
					this.getNextPage();
				}
				this.touchX = 0;
				this.touchStartX = 0;
				this.touchY = 0;
				this.touchStartY = 0;
			},
			
			touchMove(e) {
				let delta = e.touches[0].clientX - this.touchStartX;
				if (delta > 0 && this.currentPage == 1 && this.currentIndex == 0) {
					return
				}
				this.animationData = [
					`(${-this.windowWidth + delta}px, 0)`,
					`(${delta}px, 0)`,
					`(${this.windowWidth + delta}px, 0)`
				]
				this.animationTime = '0s';
				this.getAnimation(this.animationData);
			},
			
			touchcancel(e) {
			},
			
			getNextPage() { // 下一页
				if (this.currentPage == this.curPageMsg.totalPage) { // 本章最后一页
					if (this.currentIndex + 1 >= this.chapterList.length) { // 最后一章
						console.log('最后一章，最后一页，已经阅读完毕');
						return;
					} else {
						console.log('非最后一章的最后一页，即将进入下一章');
						this.currentIndex++;
						this.currentPage = 1;
					}
				} else {
					this.currentPage++;
				}
				this.initPage();
				this.animationData[0] = this.animationData[1];
				this.animationData[1] = this.animationData[2];
				this.animationData[2] = `(${this.windowWidth}px, 0)`;
				this.animationTime = '0s';
				this.getAnimation(this.animationData);
				setTimeout(() => {
					this.animationData = [
						`(${-this.windowWidth}px, 0)`, 
						`(0, 0)`,
						`(${this.windowWidth}px, 0)`
					];
					this.getAnimation(this.animationData);
				}, 50)
			},
			
			getPrevPage() { // 上一页
				this.currentPage--;
				this.animationData[2] = this.animationData[1];
				this.animationData[1] = this.animationData[0];
				this.animationData[0] = `(${-this.windowWidth}px, 0)`;
				this.animationTime = '0s';
				this.getAnimation(this.animationData);
				setTimeout(() => {
					this.animationData = [
						`(${-this.windowWidth}px, 0)`, 
						`(0, 0)`,
						`(${this.windowWidth}px, 0)`
					];
					this.getAnimation(this.animationData);
				}, 50)
			},
			
			getAnimation(arr) {
				this.preAnimation = {
					transform: `translate${arr[0]}`,
					transition: this.animationTime,
				};
				this.nowAnimation = {
					transform: `translate${arr[1]}`,
					transition: this.animationTime,
				};
				this.nextAnimation = {
					transform: `translate${arr[2]}`,
					transition: this.animationTime,
				};
				this.animationTime = '0.3s';
			},
			
			...mapActions([
				'setBook'
			])
		}
	}
</script>

<style lang="scss" scoped>
	.read-view-page{
		height: 100%;
		
		.prePage{
			z-index: 5;
		}
		.nowPage{
			z-index: 4;
		}
		.nextPage{
			z-index: 3;
		}
		
		.container{
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			align-items: center;
			padding: 0px 40rpx;
			height: 100%;
			width: 100%;
			background-color: #fff;
			overflow: hidden;
			
			.chapter {
				font-size: 12px;
				color: #746e65;
				height: 30px;
				width: 100%;
				line-height: 30px;
			}
			
			.content {
				flex: 1 1 auto;
				overflow: hidden;
				.inner-box {
					overflow: hidden;
					.book-inner {
						text-indent: 2em;
						text-align: justify;
					}
				}
			}
			.bottom-bar {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 12px;
				color: #746e65;
				height: 30px;
				width: 100%;
			}
		}
	}
</style>
