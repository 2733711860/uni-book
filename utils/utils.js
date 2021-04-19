//格式化时间
export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
}

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}

// 切割数组成多个数组  arr-数组；num-每页多少条
export function handleArray(arr, num) {
	let arrLength = arr.length; // 数组长度
	let newArr = [];
	let index = 0;
	for (let i = 0; i < arrLength; i++) {
		if (i % num === 0 && i !== 0) { // 可以被 10 整除
			newArr.push(arr.slice(index, i));
			index = i;
		};
		if ((i + 1) === arrLength) {
			newArr.push(arr.slice(index, (i + 1)));
		}
	};
	return newArr;
}
