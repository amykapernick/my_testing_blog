module.exports = eleventyConfig => {
	//Static resources
	eleventyConfig.addPassthroughCopy({ 'resources/img': 'img' })
	eleventyConfig.addPassthroughCopy({ 'resources/fonts': 'fonts' })
	eleventyConfig.addPassthroughCopy({ 'resources/css': 'css' })

	// Watch files
	eleventyConfig.addWatchTarget('resources/scss/')
	eleventyConfig.setBrowserSyncConfig({
		notify: true,
		watch: true,
	})

	return {
		dir: {
			data: '_data',
		},
		templateFormats: ['njk', 'html', 'css'],
		htmlTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
	}
}
