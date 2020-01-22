/*
  A date formatter filter for Nunjucks
*/
module.exports = function (date) {
	const month = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`],
	 d = new Date(date);
	return `${d.getDate()} ${month[d.getMonth()].substr(0, 3)} ${d.getUTCFullYear()}`;
};
