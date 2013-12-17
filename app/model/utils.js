"use strict";

var mongoose = require('mongoose');
	
function isObjectId(id){
	try {
		mongoose.Types.ObjectId(id);
		return true;
	}catch(err){
		return false;
	}
};

exports.isObjectId = isObjectId;