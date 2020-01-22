module.exports = eleventyConfig => {
	return {
		dir: {
			data: '_data',
		},
		templateFormats: ['njk', 'html'],
		htmlTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
	}
}
