'use strict';
/* 
 
 上传图片
 
 */

const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('upload-file');
	const res = await collection.add(event);
	return res;
};
