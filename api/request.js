function get(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			data: data,
			method: "GET",
			dataType: 'json',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				resolve(res.data);
			},
			error: function(e) {
				reject('网络出错');
			}
		});
	})
}

function post(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			data: data,
			method: "POST",
			dataType: 'json',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function(res) {
				resolve(res.data);
			},
			error: function(e) {
				reject('网络出错');
			}
		});
	})
}

module.exports = {
	get,
	post
}
