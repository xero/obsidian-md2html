module.exports = {
	plugins: {
		"postcss-import": {
			from: "src/main.css",
		},
		"postcss-nested": {},
		"postcss-css-variables": {},
		"postcss-csso": {
			restructure: true,
			forceMediaMerge: true,
			comments: false,
		},
	},
};
