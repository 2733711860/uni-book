<template>
	<view class="read-tool">
		<!-- 顶部 -->
		<view class="topBox" :style="{ color: fontColor, backgroundColor: menuBg, top: showTool ? '0' : '-150px' }">
			<view :style="{height:statusBarHeight}"></view>
			<view class="top-content">
				<view class="left">
					<u-icon name="arrow-left" @click="goBack"></u-icon>
					<text class="book-name">夺取伟哥</text>
				</view>
				<view class="right">
					<u-icon name="bookmark" class="book-mark"></u-icon>
					<u-icon name="plus-circle"></u-icon>
				</view>
			</view>
		</view>
		
		<!-- 底部 -->
		<view class="bottomBox commonFix" :style="{ color: fontColor, backgroundColor: menuBg, bottom: showTool ? '0' : '-150px' }">
			<view class="top">
				<text>上一章</text>
				<slider
					:value="chapterValue" 
					min="1" 
					max="100" 
					disabled
					block-size="12" 
					class="slider" 
					:activeColor="fontColor" 
					:backgroundColor="pageBg" 
					:block-color="fontColor"/>
				<text>下一章</text>
			</view>
			
			<view class="bottom">
				<view class="item-menu" v-for="(item, index) in bottomMenu" :key="index" @click="clickMenu(item)">
					<u-icon :name="item.icon" class="icon"></u-icon>
					<text class="name">{{ item.text }}</text>
				</view>
			</view>
		</view>
		
		<!-- 设置 -->
		<view class="settingBox commonFix" :style="{ color: fontColor, backgroundColor: menuBg, bottom: showSetting ? '0' : '-150px' }">
			<view class="progress">
				<view class="font">
					<text>字体</text>
					<slider 
						:value="textFontSize" 
						min="12" 
						max="26" 
						block-size="12" 
						class="slider" 
						:activeColor="fontColor" 
						:backgroundColor="pageBg" 
						:block-color="fontColor"
					  @changing="changeFontSize" 
						@change="changeFontSize"/>
				</view>
				<view class="liheight">
					<text>行高</text>
					<slider 
						:value="textLineHeight" 
						min="10" 
						max="40"
						step="10"
						block-size="12" 
						class="slider" 
						:activeColor="fontColor" 
						:backgroundColor="pageBg" 
						:block-color="fontColor"
						@changing="changeLineHeight" 
						@change="changeLineHeight"/>
				</view>
			</view>
			
			<view class="brightness">
				<i class="iconfont icon-bright"></i>
				<slider 
					value="60" 
					block-size="12" 
					class="slider" 
					:activeColor="fontColor" 
					:backgroundColor="pageBg" 
					:block-color="fontColor"
					@changing="changeBright"
					@change="changeBright" />
				<i class="iconfont icon-bright"></i>
				<view class="system-bright">
					<text>随系统</text>
					<switch @change="changeSystemBright" style="transform:scale(0.7)" />
				</view>
			</view>
			
			<scroll-view scroll-x="true" style="width: 100%; overflow: hidden; white-space: nowrap;">
				<view class="item-bg" 
					v-for="(item, index) in bgColorList"
					:key="index"
					@click="setThemeIndex(index)"
					:style="{ backgroundColor: item.color, border: themeIndex == index ? `2px solid ${item.borderColor}` : 'none' }"></view>
			</scroll-view>
		</view>
		
		<!-- 背景 -->
		<view class="bgBox" v-if="showTool || showSetting" @click="closeTool"></view>
	</view>
</template>

<script>
	import zhuti from '@/utils/zhuti.json';
	import { mapGetters, mapActions } from 'vuex';
	export default {
		data() {
			return {
				statusBarHeight: '',
				fontColor: 'rgb(100,103,120)', // 菜单字体颜色
				pageBg: 'rgb(247,247,247)', // 页面背景色
				menuBg: '#fff', // 菜单背景色
				bgColorList: [], // 背景颜色列表
				showTool: this.value,
				systemBrightValue: '', // 系统亮度
				brightValue: '', // 选择的亮度
				systemBright: false, // 随系统亮度
				showSetting: false, // 显示设置
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
			},
			themeIndex() {
				this.getTheme();
			}
		},
		
		computed: {
			...mapGetters([
				'themeIndex',
				'fontSize',
				'lineHeight'
			]),
			
			textFontSize() { // 字体大小
				return this.fontSize
			},
			
			textLineHeight() { // 行高
				return this.lineHeight * 10;
			}
		},
		
		created() {
			this.bgColorList = zhuti.data.map(item => {
				return {
					color: item.pageBg,
					borderColor: item.fontColor
				}
			});
			this.getTheme();
			this.setFullscreen(true);
			uni.getSystemInfo({
				success: res => {
					// 获取状态栏高度给顶部占位节点
					this.statusBarHeight = res.statusBarHeight + 'px';
				}
			});
			// #ifndef H5
			uni.getScreenBrightness({ // 获取系统亮度
				success: (res) => {
					this.systemBrightValue = res.value;
					this.brightValue = res.value;
				}
			})
			// #endif
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
			clickMenu(item) {
				if (item.text == '护眼') {
					this.setThemeIndex(this.themeIndex == 2 ? 0 : 2);
				} else if (item.text == '夜间') {
					this.setThemeIndex(this.themeIndex == 1 ? 0 : 1);
				} else if (item.text == '设置') {
					this.showTool = false;
					this.showSetting = true;
				}
			},
			
			getTheme() { // 设置主题
				this.fontColor = zhuti.data[this.themeIndex].fontColor; // 菜单字体颜色
				this.menuBg = zhuti.data[this.themeIndex].menuBg; // 菜单背景色
				this.pageBg = zhuti.data[this.themeIndex].pageBg; // 页面背景色
			},
			
			setFullscreen(res) { // 通知栏显示与隐藏
				// #ifdef APP-PLUS
				plus.navigator.setFullscreen(res);
				// #endif
			},
			
			closeTool() { // 关闭设置或工具框
				if (this.showTool) this.showTool = false;
				if (this.showSetting) this.showSetting = false;
			},
			
			changeFontSize(e) { // 修改字体大小
				this.setFontsize(e.detail.value);
			},
			
			changeLineHeight(e) { // 修改行高
				this.setLineHeight(e.detail.value / 10);
			},
			
			changeBright(e) { // 修改亮度
				this.brightValue = e.detail.value;
				// #ifndef H5
				uni.setScreenBrightness({
					value: this.brightValue
				})
				// #endif
			},
			
			changeSystemBright(e) { // 系统亮度
				let value = e.detail.value ? this.systemBrightValue : this.brightValue;
				// #ifndef H5
				uni.setScreenBrightness({
					value: value
				})
				// #endif
			},
			
			goBack() { // 返回上一页
				this.$goBack();
			},
			
			...mapActions([
				'setThemeIndex',
				'setFontsize',
				'setLineHeight'
			])
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
				padding: 0 30rpx;
				
				.left{
					flex: 1;
					overflow: hidden;
					display: flex;
					font-size: $uni-font-size-lg;
					
					.book-name{
						flex: 1;
						overflow: hidden;
						margin: 0 10rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						// font-size: $uni-font-size-sm;
					}
				}
				
				.right{
					font-size: $uni-font-size-title;
					.book-mark{
						margin-right: 20rpx;
					}
				}
			}
		}
		
		.commonFix{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			opacity: 1;
			z-index: 9;
			transition: all 0.5s;
			padding: 20rpx 40rpx;
		}
		
		.bottomBox{
			
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
		
		.settingBox{
			
			.progress{
				display: flex;
				
				.font, .liheight{
					width: 50%;
					display: flex;
					align-items: center;
					
					.slider{
						flex: 1;
					}
				}
			}
			
			.brightness{
				display: flex;
				align-items: center;
				
				.slider{
					flex: 1;
				}
				
				.system-bright{
					padding-left: 50rpx;
					display: flex;
					align-items: center;
					
					text{
						margin-right: 20rpx;
					}
				}
			}
			
			.item-bg{
				display: inline-block;
				width: 150rpx;
				height: 60rpx;
				border-radius: 60rpx;
				margin-right: 20rpx;
			}
			
			.item-bg:last-child{
				margin-right: 0;
			}
		}
		
		.bgBox{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 8;
		}
	}
</style>
