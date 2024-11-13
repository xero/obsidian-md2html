const ready = (fn) => document.readyState !== "loading"
    ? fn() : document.addEventListener("DOMContentLoaded", fn);
ready(() => {
  const save = (x) => {
    navigator.clipboard.writeText(x.c.replace(/\u007f/g, "\n")).then(
      () => { alert(x.m) },
      () => { alert("error! could not copy code") }
    );
  };
  const btns = document.getElementsByClassName("copy");
for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    const x = {
      c: btn.children[0].dataset.code,
      m: btn.children[0].dataset.copied
    };
    if (document.body.addEventListener) {
      btn.addEventListener("click", () => { save(x) }, false);
    } else {
      btn.attachEvent("onclick", () => { save(x) });
    }
  }
});
