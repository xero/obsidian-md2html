const ready = (fn) =>
	document.readyState !== "loading"
		? fn()
		: document.addEventListener("DOMContentLoaded", fn);
ready(() => {
	// listener factory
	const heyListen = (el, cb) => {
		document.body.addEventListener
			? el.addEventListener("click", cb, false)
			: el.attachEvent("onclick", cb);
	};
	// save code buttons
	const btns = document.getElementsByClassName("copy");
	if(btns) {
		for (let i = 0; i < btns.length; i++) {
			heyListen(btns[i], () => {
				navigator.clipboard.writeText(
					btns[i].children[0].dataset.code.replace(/\u007f/g, "\n")
				).then(
					() => { alert(btns[i].children[0].dataset.copied); },
					() => { alert("Error! Failed to copy code"); },
				);
			});
		}
	}
	// footnotes
	const feet = document.getElementsByClassName("footnote-link");
	if(feet) {
		for (let f = 0; f < feet.length; f++) {
			heyListen(feet[f], () => {
				document.getElementById(
					feet[f].attributes.href.value.replace("#", "")
				).classList.add("shimmer");
			});
		}
	}
	// scroll to top
	heyListen(document.getElementById("thetop"), () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	});
	// table of contents accordion
	const navToggle = () => {
		document.getElementById("tocicon").classList.toggle("folded");
		document.getElementById("toclist").classList.toggle("active");
	};
	heyListen(document.getElementById("toc"), navToggle);
	const linx = document.getElementsByClassName("navlink");
	if(linx) {
		for (let l = 0; l < linx.length; l++) {
			heyListen(linx[l], () => {
				navToggle();
				document.querySelector(
					`a[name='${linx[l].attributes.href.value.replace("#", "")}']`
				).nextSibling.nextSibling.classList.add("shimmer");
			});
		}
	}
});
