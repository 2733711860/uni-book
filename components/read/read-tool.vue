<template>
	<view class="read-tool">
		<!-- 顶部 -->
		<view class="topBox" :style="{ color: fontColor, backgroundColor: menuBg, top: showTool ? '0' : '-150px' }">
			<view :style="{height:statusBarHeight}"></view>
			<view class="top-content">
				<view class="left">
					<u-icon name="arrow-left" @click="goBack"></u-icon>
					<text class="book-name">夺取伟哥夺取伟哥夺取伟哥夺取伟哥夺取伟哥夺取伟哥</text>
				</view>
				<view class="right">
					<u-icon name="bookmark" class="book-mark"></u-icon>
					<u-icon name="plus-circle"></u-icon>
				</view>
			</view>
		</view>
		
		<!-- 底部 -->
		<view class="bottomBox" :style="{ color: fontColor, backgroundColor: menuBg, bottom: showTool ? '0' : '-150px' }">
			<view class="top">
				<text>上一章</text>
				<u-slider v-model="chapterValue" min="1" max="100" step="1" disabled class="slider"></u-slider>
				<text>下一章</text>
			</view>
			
			<view class="bottom">
				<view class="item-menu" v-for="(item, index) in bottomMenu" :key="index">
					<u-icon :name="item.icon" class="icon"></u-icon>
					<text class="name">{{ item.text }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: '',
				fontColor: 'rgb(100,103,120)', // 菜单字体颜色
				menuBg: '#fff', // 菜单背景色
				showTool: this.value,
				chapterValue: 10, // 章节进度（当前章节）
				bottomMenu: [
					{ text: '目录', icon: 'list' }, { text: '护眼', icon: 'eye' },
					{ text: '夜间', icon: 'list' }, { text: '设置', icon: 'setting' },
					{ text: '下载', icon: 'download' }
				]
			}
		},
		
		props: {
			value: {
				type: Boolean,
				default: false
			}
		},
		
		watch: {
			value() {
				this.showTool = this.value;
			},
			showTool() {
				this.$emit('input', this.showTool);
			}
		},
		
		created() {
			this.setFullscreen(true);
			uni.getSystemInfo({
				success: res => {
					// 获取状态栏高度给顶部占位节点
					this.statusBarHeight = res.statusBarHeight + 'px';
				}
			})
		},
		
		onShow() {
			this.setFullscreen(true); // 页面显示的时候将通知栏隐藏掉
		},
		
		onHide() {
			this.setFullscreen(false); // 页面隐藏的时候将通知栏显示出来
		},
		
		onUnload() {
			this.setFullscreen(false); // 页面卸载的时候将通知栏显示出来
		},
		
		methods: {
			setFullscreen(res) { // 通知栏显示与隐藏
				// #ifdef APP-PLUS
				plus.navigator.setFullscreen(res);
				// #endif
			},
			
			goBack() { // 返回上一页
				this.$goBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.read-tool{
		.topBox{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			opacity: 1;
			z-index: 9;
			transition: all 0.5s;
			
			.top-content{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 90rpx;
				padding: 0 20rpx;
				
				.left{
					flex: 1;
					overflow: hidden;
					display: flex;
					
					.book-name{
						flex: 1;
						overflow: hidden;
						margin: 0 10rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						font-size: $uni-font-size-sm;
					}
				}
				
				.right{
					.book-mark{
						margin-right: 10rpx;
					}
				}
			}
		}
		
		.bottomBox{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			opacity: 1;
			z-index: 9;
			transition: all 0.5s;
			padding: 20rpx;
			
			.top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 60rpx;
				font-size: $uni-font-size-sm;
				
				.slider{
					flex: 1;
					margin: 0 20rpx;
				}
			}
			
			.bottom{
				display: flex;
				justify-content: space-between;
				padding-top: 20rpx;
				
				.item-menu{
					display: flex;
					flex-direction: column;
					align-items: center;
					
					.icon{
						font-size: $uni-font-size-lg;
					}
					.name{
						margin-top: 5rpx;
						font-size: $uni-font-size-sm;
					}
				}
			}
		}
	}
</style>
