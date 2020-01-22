module.exports = eleventyConfig => {
	eleventyConfig.addFilter('date', require('./filters/dates.js'))

	return {
		dir: {
			data: '_data',
		},
	}
}
