var sass = require('node-sass')
var path = require('path')

module.exports = () => {
	const result = sass.renderSync({
		file: path.join(__dirname, '../resources/scss/main.scss'),
	})

	if (!result.css) {
		console.log('Error compiling stylesheet')
		return '/* Error compiling styleesheet */'
	}

	return result.css.toString()
}
