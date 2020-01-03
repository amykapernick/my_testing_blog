const pa11y = require('pa11y'),
	fs = require('file-system'),
	puppeteer = require('puppeteer-core')

const runTest = async () => {
	const browser = await puppeteer.launch({
		ignoreHTTPSErrors: true,
		executablePath: '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe',
		args: ['--no-sandbox'],
	})

	try {
		const results = await Promise.all([
			pa11y(`http://localhost:65519`, {
				browser: browser,
			}),
		])

		fs.writeFile('tests/results/pa11y.json', JSON.stringify(results), err => {
			console.log(err)
		})
	} catch (err) {
		console.error(err.message)
	}

	browser.close()
}

runTest()
