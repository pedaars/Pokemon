module.exports = {
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	extends: [
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
		'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
	],
	parserOptions: {
		ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'react/jsx-uses-react': 'error', // Prevents React being marked as unused.
		'react/jsx-uses-vars': 'error', // Prevents variables used in JSX being marked as unused.
		'@typescript-eslint/explicit-function-return-type': 'off', // disable the rule for all files, ensures that the return value is assigned to a variable of the correct type.
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-use-before-define': 0,
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
	},
};
