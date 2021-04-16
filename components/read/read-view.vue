<template>
	<view class="read-view-page">
		<!-- 上一页 -->
		<view class="container prePage" 
			:style="preAnimation">
			<view class="chapter">第一章 神秘复苏</view>
			<view class="content">
				<view class="inner-box" :style="{ height: `${innerHeight}px` }">
					<view class="book-inner" id="preContent"
						v-html="pageDetail.preContent" 
						:style="{ 
							fontSize: `${fontSize}px`, 
							lineHeight: `${lineHeight * fontSize}px`,
							transform: `translateY(-${(pageNum < 1 ? 1 : (pageNum-2)) * innerHeight}px)`
						}">
					</view>
				</view>
			</view>
			<view class="bottom-bar">
				<view>14:31</view>
				<view>{{ pageDetail.preHasReadPage }}/{{ pageDetail.curPageTotal }}</view>
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
						v-html="pageDetail.curContent" 
						:style="{ 
							fontSize: `${fontSize}px`, 
							lineHeight: `${lineHeight * fontSize}px`,
							transform: `translateY(-${(pageNum - 1) * innerHeight}px)` 
						}">
					</view>
				</view>
			</view>
			<view class="bottom-bar">
				<view>14:31</view>
				<view>{{ pageDetail.curHasReadPage }}/{{ pageDetail.curPageTotal }}</view>
				<!-- <view><battery :level="batteryLevel" :charging="batteryState === 2"></battery></view> -->
			</view>
		</view>
		
		<!-- 下一页 -->
		<view class="container nextPage" :style="nextAnimation">
			<view class="chapter">第一章 神秘复苏</view>
			<view class="content">
				<view class="inner-box" :style="{ height: `${innerHeight}px` }">
					<view class="book-inner" id="nextContent"
						v-html="pageDetail.nextContent" 
						:style="{ 
							fontSize: `${fontSize}px`, 
							lineHeight: `${lineHeight * fontSize}px`,
							transform: `translateY(-${(pageNum) * innerHeight}px)`
						}">
					</view>
				</view>
			</view>
			<view class="bottom-bar">
				<view>14:31</view>
				<view>{{ pageDetail.nextHasReadPage }}/{{ pageDetail.curPageTotal }}</view>
				<!-- <view><battery :level="batteryLevel" :charging="batteryState === 2"></battery></view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import bookStore from './bookStore.json';
	import hastext from './hastext.json'
	import chapters from './chapter.json'
	import { mapGetters, mapActions } from 'vuex';
	export default {
		data() {
			return {
				preAnimation: {},
				nowAnimation: {},
				nextAnimation: {},
				animationData: [],
				animationTime: '0s', // 翻页动画时间
				
				pageDetail: { // 三页数据
					preContent: '',
					curContent: '',
					nextContent: '',
					prePageTotal: '', // 上一章总页码
					curPageTotal: '', // 当前章总页码
					nextPageTotal: '', // 下一章总页码
					preHasReadPage: '', // 上页页码
					curHasReadPage: '', // 当前页码
					nextHasReadPage: '', // 下页页码
					curChapterIndex: '', // 当前章节索引
					preChapterName: '',
					curChapterName: '',
					nextChapterName: '',
					preChapterContent: '',
					curChapterContent: '',
					nextChapterContent: ''
				},
				
				chapterIndex: -1, // 当前章节索引
				
				pageNum: -1, // 当前页
				
				windowWidth: 0, // 可用屏幕宽度
				windowHeight: 0, // 可用屏幕高度
				pixelRatio: '', //设备像素比
				
				fontSize: 16,
				lineHeight: 1.5,
				innerHeight: 600,
				
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
			
			chapterList() {
				let curBook = this.bookList.find(item => item.bookId == this.$parseURL().bookId);
				return curBook.chapters;
			}
		},
		
		watch: {
			pageNum() { // 页码一发生变化，总动获取三页内容
				this.getThreePageContent();
			}
		},
		
		async created() {
			this.init();
			this.chapterIndex = 0;
			await this.getThreeChapter();
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
			init() { // 刚进入页面初始化
				let curChapterData = this.chapterList.find(item => item.chapterId == this.$parseURL().chapterId); // 当前章节信息
				console.log(curChapterData);
				if (curChapterData.content) { // 已经缓存
					
				} else {
					
				}
			},
			
			
			
			async getThreePageContent() { // 获取三页数据
				let list = await this.getContents();
				this.pageDetail = {
					preContent: list[0],
					curContent: list[1],
					nextContent: list[2],
					prePageTotal: '', // 上一章总页码
					curPageTotal: '', // 当前章总页码
					nextPageTotal: '', // 下一章总页码
					preHasReadPage: this.pageNum - 1,
					curHasReadPage: this.pageNum, // 当前章已阅读多少页
					nextHasReadPage: this.pageNum + 1,
					curChapterIndex: this.chapterIndex, // 当前章节索引
					preChapterName: this.chapterIndex <= 0 ? '' : this.chapterList[this.chapterIndex - 1].name,
					curChapterName: this.chapterList[this.chapterIndex].name,
					nextChapterName: this.chapterList[this.chapterIndex + 1] ? this.chapterList[this.chapterIndex + 1].name : ''
				}
				this.pageDetail.curPageTotal = await this.getPageSize('curContent');
				// console.log(this.pageDetail);
			},
			
			getContents() { // 获取三页正文
				return new Promise(resolve => {
					// 需要封装成如json的数组，数组里必须三个数据 {content: ''}
					let list = [];
					let prevContent = '';
					let nowContent = this.pageDetail.curContent;
					let nexContent = '';
					list.push(prevContent, nowContent, nexContent);
					resolve(list)
				})
			},
			
			async getThreeChapter() { // 获取三章数据
				let needGetIndexList = [
					this.chapterIndex <= 0 ? 0 : (this.chapterIndex - 1),
					this.chapterIndex,
					(this.chapterIndex + 1) >= this.chapterList.length ? this.chapterIndex : (this.chapterIndex + 1)
				];
				needGetIndexList = [...new Set(needGetIndexList)];
				needGetIndexList.forEach(index => {
					let hasChapter = this.bookList.find(item => item.chapterid == this.chapterList[index].chapterid);
					if (!hasChapter) {
						this.getContentByApi();
					}
				})
			},
			
			getContentByApi() { // 通过接口获取章节内容
				this.$api.getBookContent().then(res => {
					let oneBook = {
						bookName: '斗破苍穹',
						chapters: this.chapterList,
					}
					console.log(res);
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
			
			touchStart(e) {
				this.touchX = e.touches[0].clientX;
				this.touchStartX = e.touches[0].clientX;
				this.touchY = e.touches[0].clientY;
				this.touchStartY = e.touches[0].clientY;
			},
			
			touchEnd(e) {
				if (e.changedTouches[0].clientX - this.touchStartX < 0) { // 左滑，下一页
					this.getNextPage();
				} else if (e.changedTouches[0].clientX - this.touchStartX > 0 && this.pageNum > 1) { // 右滑，上一页
					this.getPrevPage();
				} else if (
					e.changedTouches[0].clientX > this.windowWidth / 3 &&
					e.changedTouches[0].clientX < (this.windowWidth / 3) * 2 &&
					e.changedTouches[0].clientY > this.windowHeight / 3 &&
					e.changedTouches[0].clientY < (this.windowHeight / 3) * 2
				) {
					console.log('菜单');
				} else if (e.changedTouches[0].clientX < this.windowWidth / 2 && this.pageNum > 1) { // 点击左侧1/3，上一页
					this.getPrevPage();
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
				if (delta > 0 && this.pageNum <= 1) {
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
				if (this.pageNum == this.pageDetail.curPageTotal) { // 本章最后一页
					if (this.pageDetail.curChapterIndex + 1 >= this.chapterList.length) { // 最后一章
						console.log('最后一章，最后一页，已经阅读完毕');
						return;
					} else {
						console.log('非最后一章的最后一页，即将进入下一章');
						this.changeChanpter();
					}
				} else {
					this.pageNum++;
					// console.log('不是最后一页');
				}
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
				this.pageNum--;
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
			
			changeChanpter() { // 切换章节
				this.chapterIndex++;
				this.pageNum = 1;
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
			}
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
