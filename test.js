#!/usr/bin/env node
function clean(s) {
	const dom = {
		ul: '<ul class="has-list-bullet">',
		li: '<li><span class="list-bullet"></span>',
	};
	let toc = `<div class="toc"><h1>Contents</h1>`;
	let last = 0;
	let delta = 0;
	s = s
		.replace(/<h. data-heading=".*?" dir=/g, (m) => {
			const h = parseInt(m.substring(2, 3));
			const link = m
				.replace(/<h. data-heading="/, "")
				.replace('" dir=', "");
			const anchor = link.replace(/\W+/g, "-").toLowerCase();
			if (h == last) {
				toc += `${dom.li}<a class="h${h} l${last}" href="#${anchor}">${link}</a></li>`;
			} else if ((h < last && last > 0) || (h == 1 && last > 0)) {
				while (delta > 0) {
					toc += "</ul>";
					delta--;
				}
				toc += `${dom.ul}${dom.li}<a class="h${h} l${last}" href="#${anchor}">${link}</a></li>`;
			} else {
				toc += `${dom.ul}${dom.li}<a class="h${h} l${last}" href="#${anchor}">${link}</a></li>`;
				delta++;
			}
			last = h;
			return `<a name="${anchor}"></a><br>${m}`;
		})
		.replace(/internal-link" target="_blank"/g, 'internal-link" ')
		.replace(/display: none/g, "")
		.replace(/capacitor.*\/(?=(.*.(png|jpg|jpeg)))/gi, "")
		.replace(/--0/g, "color");
	while (delta > 0) {
		toc += "</ul>";
		delta--;
	}
	return toc;
}

const fs = require("fs");

const data = fs.readFileSync("test.html", "utf8");
console.log(clean(data));
