module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-prettier/recommended'],

	plugins: ['stylelint-scss', 'stylelint-order'],

	rules: {
		'plugin/rational-order': [true, { 'empty-line-between-groups': true }],
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': true,
		'declaration-empty-line-before': null,
		'order/properties-order': [],
		indentation: 'tab',
		'no-missing-end-of-source-newline': null,
		'selector-pseudo-element-colon-notation': 'single',
		'block-no-empty': null,
		'function-name-case': null,
		'no-empty-source': null,
		'length-zero-no-unit': null,
		'no-eol-whitespace': null,
		'value-list-max-empty-lines': null,
		'color-hex-case': null,
	},
};
