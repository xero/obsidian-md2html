module.exports = {
	plugins: {
		"postcss-import": {
			from: "src/main.css",
		},
		"tailwindcss/nesting": {},
		autoprefixer: {},
		"postcss-csso": {
			restructure: true,
			forceMediaMerge: true,
			comments: false
		}
	}
};
