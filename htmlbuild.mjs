import * as fs from "node:fs";

const path = "./src/notes/";
fs.readdir(path, (err, files) => {
	if (err) {
		console.error("Error reading directory:", err);
		return;
	}

	files.forEach((file) => {
		const dom = fs.readFileSync(path + file).toString();
		const name = file
			.replace("html-", "")
			.replace(".md", "")
			.replace(/ /g, "_");
		const out = `./dist/${name}.html`;
		const head = fs
			.readFileSync("./src/html/header.html").toString()
			.replace(/:title:/g, name);
		const foot = fs.readFileSync("./src/html/footer.html").toString();
		const html = head + dom
				.replace(/<div class="mod-footer mod-ui"><\/div><\/div><\/div><\/div>/, foot);
		fs.writeFileSync(out, html);
	});
});
