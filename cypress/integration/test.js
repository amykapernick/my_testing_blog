describe(`Blog Homepage`, () => {
	before(() => {
		cy.visit(`http://localhost:8080`);
	});

	it(`Contains "My Testing Blog" in the title`, () => {
		cy.title().should(`contain`, `My Testing Blog`);
	});

	it(`Contains posts in blog feed`, () => {
		cy.get(`.feed`).find(`article`);
	});

	it(`All posts contain a title`, () => {
		cy.get(`article`).get(`h2`);
	});

	it(`Can access posts via article title`, () => {
		cy.get(`article h2 a`)
			.first()
			.click();
	});
});

describe(`Mobile Blog Post Template`, () => {
	before(() => {
		cy.viewport(`samsung-s10`);
		cy.visit(`http://localhost:8080/html-and-css-tricks`);
	});
	it(`has visible post title`, () => {
		cy.get(`h1`).should(`be.visible`);
	});
	it(`Can navigate back to home`, () => {
		cy.get(`.site-title`).click();
	});
});
