module.exports = {
	extends: ['airbnb-base', 'prettier'],

	parser: '@babel/eslint-parser',

	env: {
		browser: true,
		jquery: true,
		es6: true,
		node: true,
	},

	rules: {
		'import/no-extraneous-dependencies': ['error', { devDependencies: ['gulpfile.babel.js', 'gulp/**/*'] }],
		indent: ['error', 'tab'],
		'no-console': 'off',
		'eol-last': 'off',
		'no-unused-vars': 'off',
		'no-trailing-spaces': 'off',
		'no-plusplus': 'off',
		'operator-linebreak': ['error', 'after'],
		'implicit-arrow-linebreak': 'off',
		'comma-dangle': 'off',
		'no-restricted-globals': 'off',
		'no-tabs': 'off',
		'func-names': 'off',
		'spaced-comment': 'off',
		'import/extensions': 'off',
	},
};
