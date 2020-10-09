const pa11y = require(`pa11y`),
	fs = require(`file-system`);

const runTest = async () => {
	const results = await Promise.all([
		// Basic pa11y test with no options
		pa11y(`http://localhost:8080/html-and-css-tricks`, {
			standard: `WCAG2AAA`,
			screenCapture: `./tests/results/pa11y_post.png`,
		}),
		pa11y(`http://localhost:8080`, {
			standard: `WCAG2AAA`,
			screenCapture: `./tests/results/pa11y_home_mobile.png`,
			viewport: {
				width: 320,
				height: 480,
				isMobile: true,
			},
		}),
		pa11y(`http://localhost:8080`, {
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
