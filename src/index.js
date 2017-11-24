(function(){

'use strict';

//  From underscore source 
var root = 
	typeof self == 'object' && self.self === self && self ||
    typeof global == 'object' && global.global === global && global ||
    this ||
    {};

// store previous FN
var previousFN = root.FN;

var FN = {};


if (typeof exports != 'undefined' && !exports.nodeType) {
	if (typeof module != 'undefined' && !module.nodeType && module.exports) {
	    exports = module.exports = FN;
	}
	exports.FN = FN;
} else {
	root.FN = FN;
}

/**
 * [getDigitLength 获取一个数字小数点后的位数，支持科学计数法]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function getDigitLength(num){
	let eSplits = num.toString().split(/[eE]/),
	    len = (eSplits[0].split('.')[1] || '').length - (+eSplits[1] || 0);

	return len > 0 ? len : 0;
}

/**
 * [transToInt 将浮点数转变为整数，丢弃小数点]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function transToInt(num){
	let numStr = num.toString(),
		xNum = Number(num),
		dLen = 0;

	if(numStr.indexOf('e') == -1 && numStr.indexOf('E') == -1){
		return Number(numStr.replace('.', ''));
	}

	dLen = getDigitLength(xNum);
	return dLen > 0 ? xNum * Math.pow(10, dLen) : xNum;
}

/************************ open API *****************************/

/**
 * 0.30000000004 -> 0.3
 */
function amend(num, precision = 12){
	return parseFloat(parseFloat(num).toPrecision(precision));
}


function plus(){
	let args = Array.prototype.slice.call(arguments),
		argsLen = args.length,
		result = 0,
		maxDigitLen = 0,
		factor = 0, 
		i;

	if(argsLen == 0){
		return result;
	}

	for(i=0; i<argsLen; i++){
		let dLen = getDigitLength(args[i]);
		maxDigitLen = dLen > maxDigitLen ? dLen : maxDigitLen;
	}

	factor = Math.pow(10, maxDigitLen);

	for(i=0; i<argsLen; i++){
		result += multi(args[i], factor);
	}

	return result / factor;
}

function minus(){
	let args = Array.prototype.slice.call(arguments),
		argsLen = args.length,
		result = 0,
		maxDigitLen = 0,
		factor = 0, 
		i;

	if(args.length == 0){
		return result;
	}

	for(i=0; i<argsLen; i++){
		let dLen = getDigitLength(args[i]);
		maxDigitLen = dLen > maxDigitLen ? dLen : maxDigitLen;
	}

	factor = Math.pow(10, maxDigitLen);
	result = multi(args[0], factor);

	for(i=1; i<args.length; i++){
		result -= multi(args[i], factor);
	}

	return result / factor;
}


function multi(){
	let args = Array.prototype.slice.call(arguments),
		argsLen = args.length,
		result = 1,
		baseCount = 0, 
		i;

	if(argsLen == 0){
		return 0;
	}

	for(i=0; i<argsLen; i++){
		baseCount += getDigitLength(args[i]);
		result *= transToInt(args[i]);
	}

	return result / Math.pow(10, baseCount);
}

function divide(){
	let args = Array.prototype.slice.call(arguments),
		factor = 0, i,
		argsLen = args.length,
		n1 = 0, n2 = 0, r = 0, rest;

	if(argsLen == 0){
		return r;
	}
	r = args[0];
	if(argsLen == 1){
		return r;
	}

	n1 = transToInt(args[0]);
	n2 = transToInt(args[1]);
	r = multi( (n1 / n2), Math.pow( 10, getDigitLength(args[1]) - getDigitLength(args[0])) );

	if(argsLen == 2){
		return r;
	}

	rest = args.slice(2);
	return divide.apply(null, [r].concat(rest));
}


function toFixed(num, ratio){
	let base = Math.pow(10, ratio || 0),
		numStr = num.toString(),
		xNum = Number(numStr);
	return divide(Math.round( multi(xNum, base) ), base);
}

function noConflict(){
	root.FN = previousFN;
	return this;
}

FN = {
	getDigitLength,
	transToInt,
	amend,
	plus,
	minus,
	multi,
	divide,
	toFixed,
	noConflict
};


if (typeof define == 'function' && define.amd) {
	define('FN', [], function() {
	  return FN;
	});
}

})();
