module.exports = {
	extends: [`airbnb-base`],
	plugins: [],
	rules: {
		'linebreak-style': 0,
		'no-tabs': 0,
		indent: [`error`, `tab`, {
			SwitchCase: 1,
			VariableDeclarator: 1
		}],
		'arrow-spacing': [`error`, { before: true, after: true }],
		'comma-dangle': [
			`error`,
			{
				objects: `only-multiline`,
				arrays: `only-multiline`,
				imports: `never`,
				exports: `never`,
				functions: `never`,
			},
		],
		'no-var': `error`,
		'no-unused-vars': 1,
		'one-var': [2, `consecutive`],
		quotes: [`error`, `backtick`],
		'no-param-reassign': [`error`, { props: false }]
	}
};
