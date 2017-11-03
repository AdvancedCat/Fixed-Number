
/**
 * [amend 修正浮点数的值]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 * 0.30000000004 -> 0.3
 */
function amend(num, precision = 12){
	return +parseFloat(num.toPrecision(precision))
}

/**
 * [getDigitLength 获取一个数字小数点后的位数，支持科学计数法]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function getDigitLength(num){
	let temps = num.toString().split(/[eE]/)
	let len = (temps[0].split('.')[1] || '').length - (+temps[1] || 0)

	return len > 0 ? len : 0
}

function transToInt(num){
	let numStr = num.toString()
	let xNum = Number(num)

	if(numStr.indexOf('e') == -1 && numStr.indexOf('E') == -1){
		return Number(numStr.replace('.', ''))
	}

	let dLen = getDigitLength(xNum)
	return dLen > 0 ? xNum * Math.pow(10, dLen) : xNum
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

export { amend, getDigitLength, transToInt, multi }
export default { amend, getDigitLength, transToInt, multi }