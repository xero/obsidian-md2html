module.exports = {
	plugins: {
		"postcss-import": {
			from: "src/css/main.css",
		},
		"postcss-nested": {},
		"postcss-css-variables": {},
		"autoprefixer": {},
		"postcss-csso": {
			restructure: true,
			forceMediaMerge: true,
			comments: false,
		},
	},
};
