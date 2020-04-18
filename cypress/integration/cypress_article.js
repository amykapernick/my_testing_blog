describe(`Check the Page Title`, () => {
	before(() => {
		cy.visit(`http://localhost:8080`);
	});

	it(`contains "My Testing Blog" in the title`, () => {
		cy.title().should(`contain`, `My Testing Blog`);
	});

	it(`Contains posts in blog feed`, () => {
		cy.get(`.feed`).find(`article`);
	});

	it(`All post titles are visible`, () => {
		cy.get(`.feed article`).find(`h2`).should(`be.visible`);
	});
});

const sizes = [`iphone-x`, `ipad-mini`, `ipad-2`, `macbook-13`, `macbook-15`];

describe(`Site Heading`, () => {
	before(() => {
		cy.visit(`http://localhost:8080`);
	});

	sizes.forEach((size) => {
		it(`Site title should be visible on ${size} screen`, () => {
			cy.viewport(size);

			cy.get(`h1`).should(`be.visible`);
		});
	});
});

describe(`Check articles are accessible`, () => {
	before(() => {
		cy.visit(`http://localhost:8080`);
	});

	it(`Can access blog post by clicking on post title and return to homepage`, () => {
		cy.get(`.feed article:first`).find(`h2 a`).click();
		cy.get(`h1 a`).click();
	});
});

describe(`Can access social links`, () => {
	before(() => {
		cy.visit(`http://localhost:8080`);
	});

	it(`Can access social profiles in footer`, () => {
		// cy.get(`footer nav`).find(`a`).click({ multiple: true });
	});
});

describe(`Can access contact page and submit form`, () => {
	before(() => {
		cy.visit(`http://localhost:8080`);
	});

	it(`Can access contact page`, () => {
		cy.get(`footer .contact`).click();
	});

	it(`Can fill out form`, () => {
		cy.get(`input[name="name"]`).type(`Diana Prince`);
		cy.get(`input[name="email"]`).type(`diana@theamazons.com`);
		cy.get(`textarea[name="message"]`).type(`Just wanted to say hi 👋`);
	});

	it(`Can submit form`, () => {
		cy.get(`form button[type="submit"]`).click();
	});
});
