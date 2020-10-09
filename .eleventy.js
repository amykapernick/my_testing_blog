const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight"),
{ DateTime } = require('luxon'),
markdownIt = require('markdown-it')

const slugs = (string) => (string.toLowerCase().replace(/(#|:|!|\?)/g, '').replace(/\s/g, '-').replace(/--/g, '-'))


module.exports = eleventyConfig => {
	// Static resources
	eleventyConfig.addPassthroughCopy({ 'resources/img': 'img' })
	eleventyConfig.addPassthroughCopy({ 'resources/fonts': 'fonts' })
	eleventyConfig.addPassthroughCopy({ 'resources/css': 'css' })
	eleventyConfig.addPassthroughCopy({'tests': 'tests'})
	eleventyConfig.addPassthroughCopy('.eslintrc.js')

	// Watch files
	eleventyConfig.addWatchTarget('resources/scss/')
	eleventyConfig.addWatchTarget('index.njk')

	eleventyConfig.addFilter('shortDate', dateObj => {
		return DateTime.fromJSDate(dateObj).toFormat('dd LLL')
	})

	eleventyConfig.addShortcode('slug', (title) => {
		return slugs(title)
	})

	eleventyConfig.addPlugin(syntaxHighlight)

	eleventyConfig.setTemplateFormats(['html', 'md', 'js', 'njk', 'png', 'jpg', 'css'])


	eleventyConfig.setLibrary('md', 
		markdownIt({
			html: true,
			breaks: true,
			linkify: true
		})
	)

	eleventyConfig.setBrowserSyncConfig({
		notify: true,
		watch: true,
	})
}