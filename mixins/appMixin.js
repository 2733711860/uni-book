import share from "@/utils/share.js";

export const appMixin = {
	data() {
		return {}
	},

	onBackPress() {
		//监听back键，关闭弹出菜单
		if (this.shareObj.shareMenu.isVisible()) {
			this.shareObj.shareMenu.hide();
			this.shareObj.alphaBg.hide();
			return true
		}
	},

	methods: {
		/*
		 分享功能
		 */
		shareInfo() {
			let shareInfo = {
				href: "https://uniapp.dcloud.io",
				title: "分享测试",
				desc: "分享测试",
				imgUrl: "/static/logo.png"
			};
			let shareList = [{
					icon: "/static/img/sharemenu/wx.png",
					text: "微信好友",
				},
				{
					icon: "/static/img/sharemenu/pyq.png",
					text: "朋友圈"
				},
				{
					icon: "/static/img/sharemenu/weibo.png",
					text: "微博"
				},
				{
					icon: "/static/img/sharemenu/qq.png",
					text: "QQ"
				},
				{
					icon: "/static/img/sharemenu/copy.png",
					text: "复制"
				},
				{
					icon: "/static/img/sharemenu/more.png",
					text: "更多"
				},
			];
			this.shareObj = share(shareInfo, shareList, (index) => {
				console.log("点击按钮的序号: " + index);
				let shareObj = {
					href: shareInfo.href || "",
					title: shareInfo.title || "",
					summary: shareInfo.desc || "",
					success: (res) => {
						console.log("success:" + JSON.stringify(res));
					},
					fail: (err) => {
						console.log("fail:" + JSON.stringify(err));
					}
				};
				switch (index) {
					case 0:
						shareObj.provider = "weixin";
						shareObj.scene = "WXSceneSession";
						shareObj.type = 0;
						shareObj.imageUrl = shareInfo.imgUrl || "";
						uni.share(shareObj);
						break;
					case 1:
						shareObj.provider = "weixin";
						shareObj.scene = "WXSenceTimeline";
						shareObj.type = 0;
						shareObj.imageUrl = shareInfo.imgUrl || "";
						uni.share(shareObj);
						break;
					case 2:
						shareObj.provider = "sinaweibo";
						shareObj.type = 0;
						shareObj.imageUrl = shareInfo.imgUrl || "";
						uni.share(shareObj);
						break;
					case 3:
						shareObj.provider = "qq";
						shareObj.type = 1;
						shareObj.imageUrl = shareInfo.imgUrl || "";
						uni.share(shareObj);
						break;
					case 4:
						uni.setClipboardData({
							data: shareInfo.href,
							complete() {
								uni.showToast({
									title: "已复制到剪贴板"
								})
							}
						})
						break;
					case 5:
						plus.share.sendWithSystem({
							type: "web",
							title: shareInfo.title || "",
							thumbs: [shareInfo.imgUrl || ""],
							href: shareInfo.href || "",
							content: shareInfo.desc || "",
						})
						break;
				};
			})
			this.$nextTick(() => {
				this.shareObj.alphaBg.show();
				this.shareObj.shareMenu.show();
			})
		},
		
		/* 
		 扫码功能
		 */
		scan(type = 1) {
			console.log(type);
			if (type == 1) { // 允许从相机和相册扫码
				uni.scanCode({
					success: (res) => {
						console.log('允许从相机和相册扫码');
						console.log(res);
					}
				});
			} else if (type == 2) { // 只允许通过相机扫码
				uni.scanCode({
					onlyFromCamera: true,
					success: (res) => {
						console.log('只允许通过相机扫码');
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			} else if (type == 3) { // 调起条码扫描
				uni.scanCode({
					scanType: 'barCode',
					success: (res) => {
						console.log('调起条码扫描');
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			}
		},
		
		/* 
		 三方授权登录
		 */
		authLogin(provider = 'weixin') {
			uni.login({
			  provider: provider,
			  success: (loginRes) => {
			    console.log(loginRes);
			  },
				fail: (err) => {
					console.log(err);
				}
			});
		},
		
		/* 
		 检测登录状态
		 */
		checkLoginState() {
			// #ifndef APP-PLUS || H5
			uni.checkSession({
				success: (res) => {
					console.log(res);
				}
			})
			// #endif
		},
		
		/* 
		 获取用户信息
		 */
		getUserInfo(params) {
			let {
				provider = params.provider || '', // 登录服务提供商
				withCredentials = params.withCredentials || false // 是否带上登录态信息
			} = params;
			uni.getUserInfo({
				provider,
				withCredentials,
				success: (res) => {
					console.log(res)
				}
			})
		}
	}
}
