var Dater = function () {
	// var dType={2016-08-23 12:12:34
	// 	yymmdd:
	// 	yymmddhhmmss:
	// 	yymmddhhmm:
	// }
	var accessDateReg = /^[1-9]\d{2,3}(\W)\d{2}\1\d{2}\s*(?:\d{2}\:\d{2}(?:\:\d{2})?)?/;
	var yymmdd = /^([1-9]\d{2,3}(\W)\d{2}\2\d{2})/;
	var yymmddhhmm = /^([1-9]\d{2,3}(\W)\d{2}\2\d{2}\s*(?:\d{2}\:\d{2}))/;
	var yymmddhhmmss = /^([1-9]\d{2,3}(\W)\d{2}\2\d{2}\s*\d{2}\:\d{2}\:\d{2})/;
	var normalize = function (d, type, sp) {
		d = d.replace(/^\s+|\s+$/, '');
		var md = d.match(accessDateReg), noredDate = '';
		if (md) {
			var type = type || 'yymmdd';
			if (type == 'yymmddhhmm') {
				noredDate = d.match(yymmddhhmm)[1];
			} else if (type == 'yymmddhhmmss') {
				noredDate = d.match(yymmddhhmmss)[1];
			} else {
				noredDate = d.match(yymmdd)[1];
			}
			if (sp) {
				return noredDate.replace(/\W/, sp);
			} else {
				return noredDate;
			}
		} else {
			throw 'not access Date type';
		}
	}
	var add = function (d, num, type) {
		if (/^([1-9]\d{2,3}(\W)\d{1,2}\2\d{1,2})/.test(d)) {
			var str = d.match(/\d+/g);
			var date = new Date();
			date.setFullYear(str[0], str[1] * 1 - 1, type == 1 ? str[2] * 1 + num : str[2] * 1 - num, str[3], str[4], str[5]);
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
		} else {
			return 0;
		}

	}
	return {
		normalize: normalize,
		add: add
	}
}();

module.exports = Dater;
