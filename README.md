# md2html

<img src="logo.svg" width="100">

an obsidian.md plugin for converting your markdown notes to html

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

- vist the [releases](https://github.com/xero/obsidian-md2html/releases/) page, and grab the latest version
- copy `main.js`, `styles.css`, `manifest.json` to your vault's plugin folder under md2html
	- `~vault/.obsidian/plugins/md2html/`
