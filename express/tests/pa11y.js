const pa11y = require('pa11y'),
	fs = require('file-system'),
	puppeteer = require('puppeteer-core')

const runTest = async () => {
	const browser = await puppeteer.launch({
		ignoreHTTPSErrors: true,
		executablePath: '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe',
		args: ['--no-sandbox'],
	})

	const results = await Promise.all([
		pa11y(`http://localhost:65519`, {
			browser: browser,
			standard: 'WCAG2AAA',
			screenCapture: `${__dirname}/results/pa11y_home_desktop.png`,
			viewport: {
				width: 1280,
				height: 1024,
			},
		}),
		pa11y(`http://localhost:65519`, {
			browser: browser,
			standard: 'WCAG2AAA',
			screenCapture: `${__dirname}/results/pa11y_home_mobile.png`,
			viewport: {
				width: 320,
				height: 480,
				isMobile: true,
			},
		}),
		pa11y(`http://localhost:65519/html-and-css-tricks`, {
			browser: browser,
			standard: 'WCAG2AAA',
			screenCapture: `${__dirname}/results/pa11y_post.png`,
		}),
	])

	fs.writeFile('tests/results/pa11y.json', JSON.stringify(results), err => {
		console.log(err)
	})

	browser.close()
}

runTest()
