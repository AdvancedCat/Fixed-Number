/**
 * [getDigitLength 获取一个数字小数点后的位数，支持科学计数法]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function getDigitLength(num){
	let temps = num.toString().split(/[eE]/),
	    len = (temps[0].split('.')[1] || '').length - (+temps[1] || 0)

	return len > 0 ? len : 0
}

/**
 * [transToInt 将浮点数转变为整数，丢弃小数点]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function transToInt(num){
	let numStr = num.toString()
	let xNum = Number(num)

	if(numStr.indexOf('e') == -1 && numStr.indexOf('E') == -1){
		return Number(numStr.replace('.', ''))
	}

	let dLen = getDigitLength(xNum)
	return dLen > 0 ? xNum * Math.pow(10, dLen) : xNum
}

/************************ 公开API *****************************/

/**
 * [amend 修正浮点数的值]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 * 0.30000000004 -> 0.3
 */
function amend(num, precision = 12){
	return parseFloat(parseFloat(num).toPrecision(precision))
}

/**
 * [multi description]
 * @return {[type]} [description]
 */
function multi(){
	let args = Array.prototype.slice.call(arguments),
		result = 1,
		baseCount = 0

	if(args.length == 0){
		return 0
	}

	args.forEach((arg)=>{
		baseCount += getDigitLength(arg)
		result *= transToInt(arg)
	})

	return result / Math.pow(10, baseCount)
}

/**
 * [plus 多数据相加]
 * @return {[type]} [description]
 */
function plus(){
	let args = Array.prototype.slice.call(arguments),
		result = 0,
		maxDigitLen = 0,
		factor = 0, i

	if(args.length == 0){
		return result
	}

	args.forEach((arg)=>{
		let dLen = getDigitLength(arg)
		maxDigitLen = dLen > maxDigitLen ? dLen : maxDigitLen
	})

	factor = Math.pow(10, maxDigitLen)

	args.forEach((arg)=>{
		result += multi(arg, factor)
	})

	return result / factor
}

function minus(){
	let args = Array.prototype.slice.call(arguments),
		result = 0,
		maxDigitLen = 0,
		factor = 0, i

	if(args.length == 0){
		return result
	}

	args.forEach((arg)=>{
		let dLen = getDigitLength(arg)
		maxDigitLen = dLen > maxDigitLen ? dLen : maxDigitLen
	})

	factor = Math.pow(10, maxDigitLen)
	result = multi(args[0], factor)

	for(i=1; i<args.length; i++){
		result -= multi(args[i], factor)
	}

	return result / factor
}

function divide(){
	let args = Array.prototype.slice.call(arguments),
		factor = 0, i,
		argsLen = args.length,
		n1 = 0, n2 = 0, r = 0, rest

	if(argsLen == 0){
		return r
	}
	r = args[0]
	if(argsLen == 1){
		return r
	}

	n1 = transToInt(args[0])
	n2 = transToInt(args[1])
	r = multi( (n1 / n2), Math.pow( 10, getDigitLength(args[1]) - getDigitLength(args[0])) )

	if(argsLen == 2){
		return r
	}

	rest = args.slice(2)
	return divide.apply(null, [r].concat(rest))
}

export { amend, getDigitLength, transToInt, multi, plus, minus, divide }
export default { amend, getDigitLength, transToInt, multi, plus, minus, divide }