# md2html

<img src="logo.svg" width="200">

a plugin for converting your markdown notes to html inside [obsidian](https://obsidian.md)!

## usage

open the command pallet (default is control+p `^p` or command+p `⌘p`)

and search **"md2html"**, this will give you 4 options:

- **convert document**: replaces current note's markdown with html
- **convert selection**: replaces currently selected text to html
- **convert to clipboard**: converts the current note's content to html and saves it to the clipboard
- **convert to new file**: converts the current notes's content to html and saves it to a new file named: `html-{note name}.md`

> **_tip!_** these can be mapped as shortcuts in the hotkey settings tab

## installing

### manual

- vist the [releases](https://github.com/xero/obsidian-md2html/releases/) page, and grab two files from the latest version
- copy `main.js`, and `manifest.json` to your vault's plugin folder under `md2html`
	- `~vault/.obsidian/plugins/md2html/`

## powered by

- [marked](https://www.npmjs.com/package/marked)
- [marked-alert](https://www.npmjs.com/package/marked-alert)
- [marked-footnote](https://www.npmjs.com/package/marked-footnote)
- [marked-shiki](https://www.npmjs.com/package/marked-shiki)
- [obsidian](https://www.npmjs.com/package/obsidian)
- [patch-package](https://www.npmjs.com/package/patch-package)
- [shiki](https://www.npmjs.com/package/shiki)
- [typescript](https://www.npmjs.com/package/typescript)

# license

![kopimi logo](https://gist.githubusercontent.com/xero/cbcd5c38b695004c848b73e5c1c0c779/raw/6b32899b0af238b17383d7a878a69a076139e72d/kopimi-sm.png)

all files and scripts in this repo are released [CC0](https://creativecommons.org/publicdomain/zero/1.0/) / [kopimi](https://kopimi.com)! in the spirit of _freedom of information_, i encourage you to fork, modify, change, share, or do whatever you like with this project! `^c^v`
