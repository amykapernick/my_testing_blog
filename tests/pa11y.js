const pa11y = require('pa11y'),
puppeteer = require('puppeteer-core'),
fs = require('file-system')

//Define the browser settings at the start of your runTest function
const browser = await puppeteer.launch({
	ignoreHTTPSErrors: true,
	executablePath: '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe',
	args: ['--no-sandbox'],
})

const runTest = async () => {
	const results = await Promise.all([
		// Basic pa11y test with no options
		pa11y(`http://localhost:65519`, {
			browser: browser
		}),
	])

	// Save Results
	fs.writeFile('tests/results/pa11y.json', JSON.stringify(results), err => {
		console.log(err)
	})

	browser.close()
}

runTest()