const pa11y = require('pa11y')

const runTest = async () => {
	const results = await Promise.all([
		// Basic pa11y test with no options
		pa11y(`http://localhost:65519`),
	])

	// Display Results
	console.log(results)
}

runTest()