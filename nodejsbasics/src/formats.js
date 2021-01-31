function FilterFormat(change) {
	const nf = [];
	const str = [];
	if (change.lhs.del === 0 && change.rhs.add > 0) {
		op = 'added line no(from -- to) ';
	}
	else if (change.lhs.del > 0 && change.rhs.add === 0) {
		op = 'deleted line no(from -- to) ';
	}
	else {
		op = 'Modified line(from --- to) ';
	}
	function findLineNO(side, key) {
		//console.log(side[key])
		str.push(side.at + 1);
		if (side[key] > 1) {
			str.push('--');
			str.push(side[key]+side.at);
		}
	}
	str.push(op);
	findLineNO(change.rhs, 'add');
	nf.push(str.join(''));
	for (let i = change.lhs.at; i < change.lhs.at + change.lhs.del; ++i) {
		nf.push('<p style="color:red">')
		nf.push('Deleted File line no '+(i+1));
		nf.push('<br>')
		nf.push(change.lhs.getPart(i).text);
		nf.push('</p>')
	}
	if (change.rhs.add && change.lhs.del) {
		nf.push('---');
	}
	for (let i = change.rhs.at; i < change.rhs.at + change.rhs.add; ++i) {
		nf.push('<p style="color:green">')
		nf.push('Added File line no '+(i+1));
		nf.push('<br>')
		nf.push(change.rhs.getPart(i).text);
		nf.push('</p>')
	}
	return nf.join('\n');
}

var formats = {
	getNormalFormat: function (changes) {
		var i, out = [];
		for (i = 0; i < changes.length; ++i) {
			out.push(FilterFormat(changes[i]));
		}
		return out;
	}
}

module.exports = {formats};