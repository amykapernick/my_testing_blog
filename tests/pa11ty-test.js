const pa11y = require(`pa11y`),
	puppeteer = require(`puppeteer-core`),
	fs = require(`file-system`);

const runTest = async () => {
	// Define the browser settings at the start of your runTest function
	const browser = await puppeteer.launch({
			ignoreHTTPSErrors: true,
			executablePath: `/c/Program Files (x86)/Google/Chrome/Application/chrome.exe`,
			args: [`--no-sandbox`],
		}),
		results = await Promise.all([
		// Basic pa11y test with no options
			pa11y(`http://localhost:63985/on-submitting-to-conferences/`, {
				browser,
				standard: `WCAG2AAA`,
				screenCapture: `./tests/results/pa11y_post.png`,
			}),
			pa11y(`http://localhost:63985`, {
				browser,
				standard: `WCAG2AAA`,
				screenCapture: `./tests/results/pa11y_home_mobile.png`,
				viewport: {
					width: 320,
					height: 480,
					isMobile: true,
				},
			}),
			pa11y(`http://localhost:63985`, {
				browser,
				standard: `WCAG2AAA`,
				screenCapture: `./tests/results/pa11y_home_desktop.png`,
				viewport: {
					width: 1280,
					height: 1024,
				},
			}),
		]);

	fs.writeFile(`tests/results/pa11y.json`, JSON.stringify(results), (err) => {
		console.log(err);
	});
};

runTest();
