import { App, Editor, Notice, Plugin, PluginSettingTab } from "obsidian";
import { Marked } from "marked";
import { codeToHtml } from "shiki";
import markedFootnote from "marked-footnote";
import markedAlert from "marked-alert";
import markedShiki from "marked-shiki";
const marked = new Marked(
	{
		async: true,
		pedantic: false,
		gfm: true,
		breaks: true,
	},
	markedFootnote(),
	markedAlert({
		className: "callout",
		variants: [
			{
				type: "abstract",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 12H3"/><path d="M16 18H3"/><path d="M16 6H3"/><path d="M21 12h.01"/><path d="M21 18h.01"/><path d="M21 6h.01"/></svg>',
				title: "abstract",
				titleClassName: "callout-abstract",
			},
			{
				type: "attention",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>',
				title: "attention",
				titleClassName: "callout-attention",
			},
			{
				type: "bug",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>',
				title: "bug",
				titleClassName: "callout-bug",
			},
			{
				type: "caution",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16h.01"/><path d="M12 8v4"/><path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"/></svg>',
				title: "caution",
				titleClassName: "callout-caution",
			},
			{
				type: "check",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
				title: "check",
				titleClassName: "callout-check",
			},
			{
				type: "danger",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="12" r="1"/></svg>',
				title: "danger",
				titleClassName: "callout-danger",
			},
			{
				type: "default",
				/* shield-x */
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m14.5 9.5-5 5"/><path d="m9.5 9.5 5 5"/></svg>',
				title: "default",
				titleClassName: "callout-default",
			},
			{
				type: "done",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5"/><path d="m9 11 3 3L22 4"/></svg>',
				title: "done",
				titleClassName: "callout-done",
			},
			{
				type: "error",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
				title: "error",
				titleClassName: "callout-error",
			},
			{
				type: "example",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V7"/><path d="m16 12 2 2 4-4"/><path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3"/></svg>',
				title: "example",
				titleClassName: "callout-example",
			},
			{
				type: "fail",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 2 20 20"/><path d="M8.35 2.69A10 10 0 0 1 21.3 15.65"/><path d="M19.08 19.08A10 10 0 1 1 4.92 4.92"/></svg>',
				title: "fail",
				titleClassName: "callout-fail",
			},
			{
				type: "failure",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"/><path d="M6 6h.01"/><path d="M6 18h.01"/><path d="m13 6-4 6h6l-4 6"/></svg>',
				title: "failure",
				titleClassName: "callout-failure",
			},
			{
				type: "faq",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
				title: "faq",
				titleClassName: "callout-faq",
			},
			{
				type: "gear",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2"/><path d="M18 6h.01"/><path d="M6 18h.01"/><path d="M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z"/><path d="M18 11.66V22a4 4 0 0 0 4-4V6"/></svg>',
				title: "gear",
				titleClassName: "callout-gear",
			},
			{
				type: "help",
				/* book marked */
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v8l3-3 3 3V2"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>',
				title: "help",
				titleClassName: "callout-help",
			},
			{
				type: "hint",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
				title: "hint",
				titleClassName: "callout-hint",
			},
			{
				type: "important",
				/* favorite star */
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>',
				title: "important",
				titleClassName: "callout-important",
			},
			{
				type: "info",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
				title: "info",
				titleClassName: "callout-info",
			},
			{
				type: "missing",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17h.01"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"/></svg>',
				title: "missing",
				titleClassName: "callout-missing",
			},
			{
				type: "note",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>',
				title: "note",
				titleClassName: "callout-note",
			},
			{
				type: "question",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-help"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
				title: "question",
				titleClassName: "callout-question",
			},
			{
				type: "quote",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>',
				title: "quote",
				titleClassName: "callout-quote",
			},
			{
				type: "success",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>',
				title: "success",
				titleClassName: "callout-success",
			},
			{
				type: "summary",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12h6"/><path d="M15 6h6"/><path d="m3 13 3.553-7.724a.5.5 0 0 1 .894 0L11 13"/><path d="M3 18h18"/><path d="M4 11h6"/></svg>',
				title: "summary",
				titleClassName: "callout-summary",
			},
			{
				type: "tip",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
				title: "tip",
				titleClassName: "callout-tip",
			},
			{
				type: "tldr",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 7-5 5"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="m9.5 7 5 5"/></svg>',
				title: "tldr",
				titleClassName: "callout-tldr",
			},
			{
				type: "todo",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-check"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>',
				title: "todo",
				titleClassName: "callout-todo",
			},
			{
				type: "warning",
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
				title: "warning",
				titleClassName: "callout-warning",
			},
		],
	}),
	markedShiki({
		async highlight(code, lang) {
			return await codeToHtml(code, { lang, theme: "evangelion" });
		},
		container: `<div class="block-language-%l expressive-code"><figure class="frame"><figcaption class="header">%l</figcaption></figure>%s</div>`,
	}),
);
export default class MD2HTML extends Plugin {
	async onload() {
		this.addCommand({
			id: "md2html-selection",
			name: "convert selection",
			editorCallback: async (editor: Editor) => {
				const dom = await marked.parse(editor.getSelection());
				editor.replaceSelection(dom);
				new Notice("selection converted to html", 3500);
			},
		});
		this.addCommand({
			id: "md2html-doc",
			name: "convert document",
			editorCallback: async (editor: Editor) => {
				const dom = await marked.parse(editor.getValue());
				editor.setValue(dom);
				new Notice("document converted to html", 3500);
			},
		});
		this.addCommand({
			id: "md2html-new",
			name: "convert to new file",
			editorCallback: async (editor: Editor) => {
				const dom = await marked.parse(editor.getValue());
				const file = this.app.workspace.getActiveFile();
				this.app.vault.create("html-" + file?.name, dom);
				new Notice("document converted to new html file", 3500);
			},
		});
		this.addCommand({
			id: "md2html-clip",
			name: "convert to clipboard",
			editorCallback: async (editor: Editor) => {
				const dom = await marked.parse(editor.getValue());
				navigator.clipboard.writeText(dom);
				new Notice("converted html saved to the clipboard", 3500);
			},
		});

		this.addSettingTab(new md2htmlSettingTab(this.app, this));
	}

	onunload() {}
}

class md2htmlSettingTab extends PluginSettingTab {
	plugin: MD2HTML;

	constructor(app: App, plugin: MD2HTML) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl("p").outerHTML =
			'<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="80" height="59" viewBox="0 0 60 39" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;float:right;display:inline-block;"><path d="M59.49,9.142L50.63,0.666C50.593,0.628 50.539,0.609 50.494,0.579C50.456,0.552 50.422,0.522 50.376,0.503C50.281,0.465 50.175,0.442 50.068,0.442L34.116,0.442C32.593,0.442 31.355,1.68 31.355,3.202L31.355,15.996L28.545,15.996L28.545,9.73C28.545,9.51 28.454,9.301 28.294,9.145L19.443,0.662C19.405,0.624 19.352,0.605 19.306,0.575C19.268,0.548 19.234,0.518 19.188,0.499C19.093,0.461 18.987,0.438 18.881,0.438L2.932,0.438C1.409,0.438 0.171,1.676 0.171,3.199L0.171,36.057C0.171,37.58 1.409,38.818 2.932,38.818L25.792,38.818C27.315,38.818 28.553,37.58 28.553,36.057L28.553,27.923L31.363,27.923L31.363,36.057C31.363,37.58 32.601,38.818 34.123,38.818L56.983,38.818C58.506,38.818 59.744,37.58 59.744,36.057L59.744,9.723C59.737,9.502 59.645,9.293 59.49,9.142Z" style="fill-rule:nonzero;"/><path d="M26.935,36.061C26.935,36.695 26.422,37.208 25.788,37.208L2.928,37.208C2.298,37.208 1.781,36.695 1.781,36.061L1.781,3.199C1.781,2.568 2.294,2.052 2.928,2.052L18.076,2.052L18.076,9.818C18.076,10.262 18.436,10.626 18.884,10.626L26.935,10.626L26.935,15.992L22.112,15.992L22.112,14.014C22.112,13.729 21.964,13.467 21.721,13.322C21.478,13.178 21.178,13.171 20.927,13.303L10.864,18.669C10.602,18.81 10.439,19.083 10.439,19.379C10.439,19.675 10.602,19.953 10.864,20.093L20.927,25.459C21.178,25.592 21.482,25.584 21.721,25.44C21.964,25.296 22.112,25.03 22.112,24.749L22.112,22.77L38.6,22.763C39.045,22.763 39.405,22.402 39.405,21.954L39.405,20.515L46.947,24.536L39.405,28.558L39.405,27.118C39.405,26.674 39.045,26.31 38.597,26.31L25.606,26.31C25.162,26.31 24.797,26.67 24.797,27.118C24.797,27.563 25.158,27.927 25.606,27.927L26.939,27.927L26.939,36.061L26.935,36.061Z" style="fill:rgb(135,255,175);fill-rule:nonzero;"/><path d="M56.976,37.204L34.116,37.204C33.485,37.204 32.969,36.692 32.969,36.057L32.969,27.923L37.792,27.923L37.792,29.902C37.792,30.187 37.94,30.449 38.183,30.593C38.312,30.669 38.452,30.707 38.597,30.707C38.726,30.707 38.859,30.676 38.976,30.612L49.039,25.246C49.301,25.106 49.465,24.832 49.465,24.532C49.465,24.232 49.301,23.959 49.039,23.818L38.976,18.453C38.726,18.32 38.426,18.327 38.183,18.472C37.94,18.616 37.792,18.882 37.792,19.163L37.792,21.149L21.303,21.156C20.859,21.156 20.498,21.517 20.498,21.965L20.498,23.405L12.961,19.379L20.498,15.358L20.498,16.797C20.498,17.241 20.859,17.606 21.307,17.606L34.306,17.606C34.75,17.606 35.114,17.245 35.114,16.797C35.114,16.353 34.754,15.988 34.306,15.988L32.973,15.988L32.973,3.199C32.973,2.568 33.485,2.052 34.12,2.052L49.267,2.052L49.267,9.818C49.267,10.262 49.628,10.626 50.076,10.626L58.127,10.626L58.127,36.061C58.123,36.692 57.61,37.204 56.976,37.204Z" style="fill:rgb(135,95,175);fill-rule:nonzero;"/><path d="M50.877,3.138L57.018,9.012L50.877,9.012L50.877,3.138Z" style="fill:rgb(135,117,153);fill-rule:nonzero;"/><path d="M19.689,3.138L25.83,9.012L19.689,9.012L19.689,3.138Z" style="fill:rgb(172,218,187);fill-rule:nonzero;"/></svg><h1>md2html</h1><hr style="border: none; border-top: 2px solid; border-image: linear-gradient( to right, #87ff5f, #875faf, rgba(20, 14, 30, 0.1)); border-image-slice: 1; margin-bottom: 1em; margin-top: 1em; padding: 0px; clear: both;"><h1>usage</h1><p>open the command pallet (default is control+p <code> ^p </code> or command+p  <code> ⌘p </code>)<br>and type <strong>"<code>md2html</code>"</strong>, this will give you 4 options:<br><br></p><p style="padding: 10px; background-color:rgba(0,0,0,0.3); color: #eee; margin-bottom: 20px"><strong>convert document</strong>: replaces current note\'s markdown with html<br><strong>convert selection</strong>: replaces currently selected text to html<br><strong>convert to clipboard</strong>: converts the current note\'s content to html and saves it to the clipboard<br><strong>convert to new file</strong>: converts the current notes\'s content to html and saves it to a new file named:<code style="background-color: #000">html-{note name}.md</code></p><p><strong><em>tip! </em></strong> these can be mapped as shortcuts in the hotkey settings tab.</p><h1>support</h1><p style="float: right"><a href="https://github.com/sponsors/xero" target="_blank"><svg width="100" height="100" viewBox="0 0 2000 2000" xmlns="http://www.w3.org/2000/svg"><path d="m1051 947c-62-26-282 92-432 106s-252 14-304 46-60 38-74 80 336 112 336 112l564 236s380 86 360-6-78-142-138-304l-40-184z" fill="#261e2b"/><path d="m1299.7 1083 9.7-54.3-258.4-81.7c-28.9-12.1-92.1 7-166.6 32.4 33.2 5.5 75.8 24.3 81.2 61 .3 2-9.3 22-28 45.3 0 0-66.1-69.9-129.7-80.1-1.7.6-3.4 1.1-5.1 1.7l-56.6 87.8 102 124.7 158 43.3 219.3-76.7zm-852.8-15.5c-17.1 1.7-32.9 3.6-47.5 5.8 3.5 5.6-1 17.5-8 29.2-9.5 16-33 31-35 59s20 51.5 51 67c21.4 10.7 52.3 29.7 69.4 40.5 3.9.9 7.7 1.8 11.5 2.7zm993.3 315.5-168.2-19-52 87 23 52c50-21 87.5-13.5 101-11.5s48 12 60.5-10 7.1-11.5 11.6-21.5 14.5-20.5 35-17c11.7 2 26.4 13.4 32 22-10.3-21.8-29.1-57-42.9-82z" fill="#19121d"/><path d="m920.6 275.6c82.5-65.4 192.7-140.9 441-67.5 197.1 58.3 261 184.5 280.5 219s94.5 151.5 37.5 330-147 238.5-226.5 270-213 16.5-337.5-15-214.5-76.5-270-141-85.5-213-66-324 79.5-207 141-271.5z" fill="#261e2b"/><path d="m1619.5 493.7c-.3-2.2-.7-4.7-1.2-7.3.1 2.3.5 4.8 1.2 7.3zm60.1 263.4c33.8-105.9 21.2-190.2 1.2-248.4-13.2 17.7-22.5 19-35.8 15-11.2-3.4-22-16.7-25.5-30 2.8 18.4 2.8 25.1 7.5 72.7 5.3 53.3-5.3 124-28 183.3s-54.7 103.3-58 128.7-29.3 70.7-29.3 70.7l-46.1 72.9c76.2-33 159.9-95.7 214-264.9z" fill="#19121d"/><path d="m1646.6 424.6c1.6 5.3 3.8 10.4 5.8 15.6 1.1 2.5 2.2 5.1 3.2 7.6l3.3 7.6c4.3 10.1 8.8 20.1 13 30.2s8.1 20.4 11.3 30.8c3.3 10.4 6.2 21 8.6 31.7 9.5 42.8 11 87.2 5.4 130.6-2.8 21.7-7.4 43.2-13.4 64.3-1.6 5.2-3.1 10.5-4.8 15.7l-5.2 15.6-5.5 15.5-5.9 15.3c-8.2 20.3-17.4 40.2-27.9 59.4-5.2 9.6-10.9 19-16.8 28.2l-4.6 6.8-2.3 3.4-2.4 3.3-4.8 6.7-5 6.5c-6.7 8.6-13.8 17.1-21.3 25-7.5 8-15.3 15.7-23.6 22.8-16.5 14.3-34.5 27-53.7 37.7-9.6 5.3-19.4 10.2-29.4 14.7-10 4.4-20.1 8.7-30.6 12-20.9 6.6-42.7 10-64.5 11.8-10.9.9-21.9 1.4-32.8 1.5-11 .2-21.9-.1-32.9-.5s-21.9-1.1-32.8-2-21.8-2.1-32.7-3.3c-21.8-2.5-43.5-5.8-65.2-9.5s-43.2-8.1-64.7-12.6l2.5-10c20.9 6.2 42.1 11.5 63.4 16.4s42.8 8.9 64.4 12.3c21.6 3.2 43.4 5.7 65.2 7.1 10.9.6 21.9 1.1 32.8 1.1s21.9-.3 32.8-1c10.9-.8 21.8-2.1 32.6-3.9s21.5-4.2 31.9-7.5c10.5-3.2 20.6-7.5 30.6-12s19.7-9.5 29.2-15c9.4-5.5 18.6-11.5 27.4-18 2.2-1.6 4.3-3.3 6.5-4.9s4.3-3.4 6.4-5.1l3.1-2.6c1-.9 2-1.8 3.1-2.7 2-1.8 4.1-3.6 6.1-5.5 16-14.8 30.2-31.4 42.7-49l4.7-6.6 4.5-6.8 2.2-3.4 2.1-3.5 4.2-6.9c5.4-9.4 10.8-18.7 15.6-28.4 1.2-2.4 2.5-4.8 3.6-7.2l3.4-7.3c2.4-4.8 4.5-9.8 6.8-14.7 1.1-2.4 2.2-4.9 3.2-7.4l3.1-7.5c2-5 3.9-10.1 5.9-15.1l5.7-15.2 2.7-7.7 2.7-7.6 5.1-15.4c1.6-5.1 3.2-10.3 4.7-15.4 6-20.6 11.1-41.5 14.7-62.8.9-5.3 1.7-10.6 2.4-16l.9-8c.3-2.7.7-5.4.9-8 .5-5.4 1-10.8 1.2-16.2l.4-8.1.1-8.1c.4-21.7-1.5-43.5-5.4-65l-1.7-8c-.5-2.7-1.2-5.3-1.8-8l-.9-4-1.1-4c-.7-2.6-1.4-5.3-2.2-7.9l-2.4-7.8-2.7-7.8c-1.9-5.1-3.8-10.3-5.9-15.3-4.2-10.1-9-20-14.8-29.3-1.5-2.3-2.9-4.6-4.4-6.9-1.6-2.3-3.1-4.5-4.7-6.7-3.3-4.4-6.6-8.7-10.4-13l9.1-5.1z" fill="#2d2035"/><path d="m833.7 784.3c-4-32 3-36.7-19.6-64.7-20.6-25.6-28.5-99-26.7-208.4-3.1 11.8-5.7 23.7-7.8 35.9-19.5 111 10.5 259.5 66 324 10.1 11.7 21.4 22.8 33.8 33.3z" fill="#19121d"/><path d="m805.1 731.6c-28.5-34.5-162.1-88.8-171-33-6 37.5 123.4 7.4 166.9 46.4zm675-430.5c34.5-36 192-60 243-28.5s-6 247.5-58.5 286.5zm-375-72c-33-94.5-185-148.6-215-130.6-22.5 13.5-118 193.6-52 304.6zm483 648c39-4.5 181.5 13.5 160.5 55.5s-96-37.5-154.5-33c0 0-10.5-24-6-22.5zm-13.5 51c-10.1-4.2 4.5-13.5 19.5-10.5s130 51.9 94.5 84c-31.5 28.5-67.5-54-114-73.5z" fill="#261e2b"/><path d="m1585.1 754.1c22.5-42 34.5-81 6-156s-103.5-85.5-141-75-91.5 48-196.5 36-145.5-84-220.5-111-133.5-6-168 76.5 4.5 168 0 183-24 13.5-36 52.5c-9.5 30.9-5.8 75.1 21.6 116.7 55.8 61.4 144.1 104.7 264.9 135.3 124.5 31.5 258 46.5 337.5 15 1.6-.7 3.3-1.3 5-2 41.6-23.5 55.3-56.5 67-89.5 15-42-6-46.5-3-64.5 3-25.5 40.5-75 63-117z" fill="#ffd2ad"/><path d="m1170 826.5c-6.5 5.5-11 11-5 17.5s16 17 39 15 16-14 11.5-19-45.5-13.5-45.5-13.5zm-197-23.5c9.3 9.3 41.3 2.7 46 1.3 21.3 29.3 108 84 182 94.7s127.3-8 144-17.3c0 10 18.7 28.7 32 29.3-20 5.3-36-1.3-40.7-12-24 16.7-63.3 32.7-94.7 30.7-31.3-2-197.3-72.7-209.3-86s-18.7-28.7-18.7-28.7c-20.6 5.3-40.6-12-40.6-12z" fill="#ffc7a5"/><path d="m1525.2 935.3c-34.3 58.7-59.7 77.7-87.2 79.7-14 1-38 2-38 2-18-26-169-64-169-64s-179 10-192 16c-61.2-13.5-158-69.9-200.1-113.1 3.3 7 7.2 14 11.7 20.9 55.8 61.4 144.1 104.7 264.9 135.3 124.5 31.5 258 46.5 337.5 15 1.6-.7 3.3-1.3 5-2 41.6-23.5 55.3-56.5 67-89.5.1-.1.1-.2.2-.3zm-3.4-61.1c0-1 .1-2 .3-3.1 3-25.5 40.5-75 63-117s34.5-81 6-156-103.5-85.5-141-75-91.5 48-196.5 36-145.5-84-220.5-111-133.5-6-168 76.5 4.5 168 0 183c-.9 2.9-2.3 5.2-4.2 7.3 42.2-6.5 101.5 14.3 116.1 36.7 22-2.7 46 4.7 58.7 14s27.3 21.3 36.7 31.3c9.3 10 52.1-15.1 121.4 5.5 69.3 20.7 83.2 50.5 102.6 47.8 19.3-2.7 35.3-25.3 66-21.3s30.8 12.6 47.3 10.7c14.3-1.6 73.3-4.6 112.1 34.6z" fill="#ffc7a5"/><path d="m1321.1 835.1c-13.5-43.5-15-93 1.5-139.5s78-69 106.5-39 22.5 75-15 148.5c-12 18-22.5 30-22.5 30-18-6-25.5-10.5-39-6s-31.5 6-31.5 6z" fill="#d5e9e6"/><path d="m1319.6 830.1c.5 1.7 1 3.3 1.5 5 0 0 12.2-1 24.1-3.9-13.2 1.2-21 .3-25.6-1.1zm109.5-173.5c-27-28.5-83.8-9.7-103.6 32l.2.3c29.3-23.3 64.7-42.7 89.3-23.3 24.7 19.3 20 73.3 7.3 102.7-12.1 28-10.8 50.5-53.6 59.5 6.3 1.2 13 4 22.9 7.3 0 0 10.5-12 22.5-30 37.5-73.5 43.5-118.5 15-148.5z" fill="#c1d9d5"/><path d="m1322.6 695.6c3-11.9 9.6-22.9 18.2-32 8.7-9.1 19.4-16.2 31.4-20.7 6-2.2 12.3-3.7 18.8-4.3 6.5-.5 13.1-.1 19.6 1.6.8.2 1.6.5 2.4.7.8.3 1.6.5 2.4.8l2.3 1c.8.3 1.6.7 2.3 1.1l2.2 1.2c.8.4 1.4.9 2.2 1.3.7.5 1.4.9 2.1 1.4l2 1.6 1 .8.9.9 1.8 1.8c1.2 1.2 2.2 2.4 3.3 3.6 2.1 2.5 4.1 5.1 5.8 7.9 1.8 2.8 3.2 5.7 4.6 8.7 1.2 3 2.4 6.1 3.2 9.3 1.6 6.3 2.4 12.8 2.5 19.2 0 6.4-.6 12.7-1.7 18.9s-2.6 12.3-4.4 18.2-3.9 11.7-6.2 17.5c-2.3 5.7-4.8 11.3-7.5 16.8-5.4 11-11.3 21.7-17.8 32.1 4.5-11.3 9.2-22.6 13.2-34 2.1-5.7 4-11.4 5.8-17.1s3.4-11.5 4.8-17.3c2.8-11.6 4.6-23.3 4.2-34.9-.2-5.8-1-11.4-2.5-16.8-.7-2.7-1.7-5.3-2.8-7.9-1.2-2.5-2.4-5-4-7.4-1.4-2.4-3.2-4.6-4.9-6.8-.9-1.1-1.9-2.1-2.8-3.1l-1.4-1.4-.7-.7-.8-.6c-4.1-3.4-8.9-6.1-14.2-7.6s-10.9-2.1-16.5-1.9c-5.7.2-11.3 1.3-16.9 2.9-11.1 3.3-21.5 9.1-30.5 16.8-8.9 7.6-16.3 17.3-21.4 28.4z" fill="#8f564a"/><path d="m1058.6 781.1c18-33 42-84 34.5-135s-36-94.5-72-85.5-63 66-40.5 165c6 24 27 31.5 27 31.5 19.5 0 51 24 51 24z" fill="#d5e9e6"/><path d="m1058.6 781.1c18-33 42-84 34.5-135s-36-94.5-72-85.5-63 66-40.5 165c6 24 27 31.5 27 31.5 19.5 0 51 24 51 24z" fill="#d5e9e6"/><path d="m1076 732.5c-.2 22-11.1 50.8-48.5 29l31.1 19.6 19.4-35.1zm17.1-86.4c-7.5-51-36-94.5-72-85.5-29.9 7.5-53.6 48-47.9 118.3 3.3-40 8.7-69 25.8-87.9 18.7-20.7 46-21.3 67.3 9.3 21.3 30.7 28 63.3 25.3 92.7l.8-2c2.3-14.7 2.9-29.8.7-44.9z" fill="#c1d9d5"/><path d="m1093.1 646.1c-3-12.6-6.8-24.9-12.1-36.4s-11.8-22.5-20.4-31.2c-2.1-2.2-4.4-4.2-6.8-6-1.2-.9-2.4-1.7-3.7-2.5-.6-.4-1.3-.7-1.9-1.1l-1-.5-1-.5c-2.6-1.3-5.3-2.2-8.1-2.9-.7-.1-1.4-.3-2.1-.4l-2.1-.3c-.7-.1-1.4-.1-2.1-.1h-1.1l-1.1.1c-5.6.2-11.2 1.9-16.3 4.6-5 2.8-9.6 6.5-13.5 11s-7.2 9.6-10 15-5 11.2-6.9 17.1-3.2 12-4.3 18.2-1.8 12.5-2.3 18.8c-1 12.6-.8 25.4 0 38.2.7 12.8 2.3 25.6 4.1 38.4-3.9-12.3-6.8-25-9-37.9-2-12.9-3.2-25.9-3-39.1 0-3.3.2-6.6.4-9.9.1-1.6.3-3.3.4-4.9s.3-3.3.6-4.9c.8-6.6 2.1-13.1 3.9-19.6 1.8-6.4 4.1-12.8 7.1-18.9s6.7-11.9 11.3-17.2c4.6-5.2 10.1-9.8 16.4-13.2l2.4-1.2 1.2-.6 1.3-.5 2.5-.9 2.6-.7c.9-.3 1.7-.4 2.6-.6s1.8-.4 2.7-.5l2.7-.3c.9-.1 1.8-.1 2.7-.1h1.4c.5 0 .9.1 1.4.1.9.1 1.8.1 2.7.2l2.7.4c.9.1 1.8.4 2.6.6 3.5.9 6.9 2.2 10 4l1.2.6 1.1.7c.7.5 1.5.9 2.2 1.4 1.4 1 2.9 2 4.2 3.2 2.7 2.2 5.1 4.7 7.4 7.2 8.9 10.3 14.9 22.4 19.2 34.8 4.4 12.5 7 25.4 7.8 38.3z" fill="#8f564a"/><path d="m1198.8 848.8c-14.7 0-33.3-9.9-33.7-16.1-.3-3.6.5-6.4 2.4-8.5 2.5-2.7 7.2-4.2 13.1-4.2 4.2 0 8.8.7 13.4 2.2 5.7 1.7 14.8 8.5 16.8 15.5.9 3 .2 5.6-1.9 8.1-1.9 1.9-5.4 3-10.1 3z" fill="#af4e3e"/><path d="m1180.5 824c3.8 0 8 .7 12.2 2 1.9.6 5.2 2.3 8.5 5.1 2.9 2.5 5 5.3 5.6 7.6.4 1.4.4 2.7-1.1 4.3-.7.8-2.9 1.7-6.9 1.7-5.7 0-13.3-1.9-19.7-5-6.7-3.2-9.7-6.4-10.1-7.6-.2-3.5 1-4.8 1.4-5.3 1.7-1.7 5.4-2.8 10.1-2.8m0-8c-11.5 0-20.4 5.1-19.4 17 .7 9.3 22.3 19.8 37.7 19.8 5.5 0 10.2-1.3 12.9-4.5 10.5-12-6.6-26.9-16.7-30-4.9-1.5-9.9-2.3-14.5-2.3z" fill="#8e4637"/><path d="m1309.7 847c2.4-3.4 5.6-6.2 9.1-8.6s7.2-4.3 11.1-5.9c7.8-3.2 16.1-5.1 24.4-5.8 8.4-.7 16.9-.2 25.1 1.9 4.1 1.1 8.1 2.6 11.8 4.6 3.7 2.1 7.1 4.6 9.8 7.8-7-4.3-14.7-6.6-22.5-7.8s-15.8-1.2-23.7-.5-15.7 2.1-23.4 4.2c-3.8 1.1-7.6 2.4-11.2 4-3.7 1.7-7.2 3.7-10.5 6.1zm-245.7-52c-2.2-3.6-4.9-6.7-7.8-9.6s-6-5.5-9.2-8c-6.4-5-13.4-9.3-20.6-13s-14.8-6.7-22.6-8.5-16-2.4-24.2-.2c3.6-2.3 7.7-3.7 12-4.4s8.7-.6 13-.1c8.6 1 16.9 3.9 24.5 7.8s14.7 8.9 20.9 14.8c3.1 3 5.9 6.2 8.4 9.7 2.5 3.6 4.6 7.4 5.6 11.5z" fill="#e3956f"/><path d="m1063.4 755.3c-18.1 0-32.9-23.2-32.9-51.8 0-28.5 14.8-51.8 32.9-51.8s32.9 23.2 32.9 51.8c0 28.5-14.8 51.8-32.9 51.8z" fill="#af4e3e"/><path d="m1063.4 655.7c15.7 0 28.9 21.9 28.9 47.8s-13.2 47.8-28.9 47.8-28.9-21.9-28.9-47.8 13.2-47.8 28.9-47.8m0-8c-20.4 0-36.9 25-36.9 55.8s16.5 55.8 36.9 55.8 36.9-25 36.9-55.8-16.5-55.8-36.9-55.8z" fill="#8e4637"/><path d="m1333.1 809.8c-2.2 0-4.4-.3-6.4-1-8.1-2.6-14.2-9.9-17.3-20.8-3.2-11.4-2.6-25.1 1.6-38.6 7.4-23.4 24.5-40.3 40.6-40.3 2.2 0 4.4.3 6.4 1 17.3 5.5 24.3 32.1 15.6 59.3-7.3 23.5-24.4 40.4-40.5 40.4z" fill="#af4e3e"/><path d="m1351.7 705.2v8c1.8 0 3.6.3 5.2.8 6.7 2.2 11.9 8.6 14.6 18 3 10.7 2.4 23.5-1.6 36.3-6.8 21.4-22.6 37.5-36.8 37.5-1.8 0-3.6-.3-5.2-.8-14.9-4.8-20.9-29.6-13-54.3 6.8-21.4 22.6-37.5 36.8-37.5zm0 0c-17.5 0-36.3 17.5-44.4 43.1-9.4 29.3-1.2 58.2 18.2 64.3 2.5.8 5.1 1.2 7.7 1.2 17.5 0 36.3-17.5 44.4-43.1 9.4-29.3 1.2-58.2-18.2-64.3-2.6-.8-5.1-1.2-7.7-1.2z" fill="#8e4637"/><ellipse cx="1341.3" cy="713.7" fill="#fff" rx="10" ry="14.5" transform="matrix(.99869273 -.05111586 .05111586 .99869273 -34.728242 69.495223)"/><ellipse cx="1045.1" cy="659.1" fill="#fff" rx="10" ry="14.5" transform="matrix(.85726617 -.5148735 .5148735 .85726617 -190.189293 632.127835)"/><path d="m978 811c2.9 1.2 6 1.4 9 1.2 1.5-.1 3-.3 4.5-.6s3-.7 4.4-1.1c2.9-.8 5.8-1.8 8.6-3s5.6-2.5 8.7-2.9l1.1-.6.8 1.2c2 3.1 4.5 5.9 7.1 8.6 2.5 2.7 5.3 5.3 8.1 7.9 5.6 5.1 11.4 9.9 17.4 14.4 6 4.6 12.1 9 18.4 13.2s12.6 8.3 19.1 12.1c13 7.7 26.3 14.8 40 20.9 13.7 6.2 27.8 11.5 42.2 15.6 7.2 2.1 14.5 3.8 21.8 5.2 1.8.3 3.7.6 5.5.9l2.8.5 2.8.3 11.2 1.3c14.9 1.5 30 1.8 45 1.1 3.7-.3 7.5-.5 11.2-.8l11.2-1.3c3.7-.6 7.4-1.1 11.1-1.8l5.5-1.1c1.8-.4 3.7-.7 5.5-1.2l5.5-1.3c1.8-.4 3.6-1 5.4-1.5 3.6-1 7.2-2.2 10.7-3.4l5.3-2c1.8-.6 3.5-1.4 5.2-2.2 1.7-.7 3.4-1.6 5.1-2.4l2.4-1.3c.8-.4 1.5-1 2.2-1.4l2.6-1.6.1 2.8c.2 1.5.5 2.9.9 4.3s.9 2.7 1.6 4c1.3 2.6 3.3 4.9 5.7 6.8s5.1 3.4 8 4.6c2.9 1.1 6 2 9.2 2.4-1.6.1-3.2 0-4.8-.1-1.6-.2-3.2-.5-4.8-.9-3.2-.8-6.3-2-9.1-3.8s-5.4-4.2-7.2-7.2c-.9-1.5-1.6-3.1-2.1-4.8-.4-1.7-.6-3.4-.6-5.1l2.7 1.2c-.8.6-1.6 1.3-2.5 1.9l-2.5 1.6c-1.7 1-3.4 2-5.1 2.9s-3.4 1.8-5.2 2.6l-5.3 2.4c-3.6 1.4-7.2 2.9-10.8 4.1-1.8.6-3.6 1.3-5.5 1.8l-5.6 1.7c-1.8.6-3.7 1-5.6 1.5l-5.6 1.4c-3.8.8-7.6 1.5-11.4 2.3-3.8.6-7.6 1.1-11.5 1.7-3.8.5-7.7.8-11.5 1.2-15.4 1.3-30.9 1-46.3-.2l-11.5-1.3-2.9-.3-2.9-.5c-1.9-.3-3.8-.6-5.8-.9-7.6-1.4-15.2-3.2-22.7-5.3-29.8-8.7-57.8-22.2-83.8-38.7-13-8.3-25.4-17.4-37.2-27.3-5.8-5-11.5-10.2-16.9-15.7-2.7-2.8-5.3-5.6-7.7-8.6s-4.8-6.1-6.7-9.6l1.9.6c-2.5 2.3-5.5 3.4-8.6 4.3s-6.2 1.7-9.4 2.2-6.4.7-9.7.4c-2.9-.5-6.2-1.4-8.7-3.3z" fill="#965549"/><path d="m1014 806c14 24 98 91 183 103s140-16 147-22l-25 12.7c-54.2 10.6-126.6 67-193.6 41.5s-79.8-96.8-111.7-134" fill="#4f1f3b"/><path d="m1069.6 898.1c13.7 17.9 31 33.6 55.8 43.1 26.5 10.1 53.9 7.4 80.7-.3-14.2-10.8-36.2-22.5-53-29.5-21.8-9.1-54.5-16.6-83.5-13.3z" fill="#d1546f"/><path d="m919 1313.3c17.6-20.6 33.9-40.1 50.6-59.2 62.1-70.7 142.9-91.3 227.7-58.4 83.6 32.4 135.5 110 132.9 200.3-3.3 111.6-46.9 206.9-126.5 283.2-87.5 83.9-179.5 163.1-269.5 244.5-9.1 8.3-17.1 11.5-28.4 2.2-103.5-85-206.1-170.7-294.5-272.1-65.4-75.1-101.9-161.5-103.8-261.4-1.7-87.6 52.1-164.9 135.1-196.8 83.9-32.3 162.9-12.4 224.1 56.9 17.4 19.3 34 39.4 52.3 60.8z" fill="#ea4aaa"/><path d="m921 1109.2c23.3-27.3 45-53.3 67.3-78.6 82.5-93.8 189.7-121.2 302.4-77.6 111.1 43 180 146.1 176.5 266-4.4 148.2-62.3 274.8-168 376.1-116.2 111.4-238.4 216.6-357.9 324.6-12.1 11-22.7 15.3-37.7 2.9-137.4-112.9-273.8-226.7-391.1-361.4-86.8-99.7-135.3-214.5-137.9-347.2-2.2-116.3 69.2-219 179.4-261.4 111.4-42.9 216.4-16.4 297.6 75.5 23 26 45.2 52.8 69.4 81.1z" fill="#ea4aaa"/><path d="m1408.8 1039.1c47.9 156.9-28 323-131.9 450.6-38.9 3.3-93.8 45.3-117.8 73.3-21.4 24.9-38.2 55.8-40 76-57.1 43.8-151.8 75.9-188 78-140 8-277-63-449-217 0 0-4-14 3-21s29 4 38-38-8-94-34-144c-29.2-56.1-85.1-89-97.1-98-10.6-8-13.4-9.7-13.9-34.1-2.6 16-3.8 32.4-3.5 49.1 2.5 132.7 51.1 247.5 137.9 347.2 117.3 134.7 253.6 248.6 391.1 361.4 15 12.3 25.6 8 37.7-2.9 119.5-108 241.7-213.2 357.9-324.6 105.7-101.3 163.6-227.9 168-376.1 2-68-19.4-130.6-58.4-179.9z" fill="#d03592"/><path d="m1399 1472c-13 22-56 9-98 14s-107 49-132 91-28 66-16 71 28-6 29-13c-2 34 82 67 127 73s140-20 179-87 12-125-24-193zm-1078-376c-83 36-102 99-94 183s111 181 215 145c0 27 18 26 26 25s20-16 25-34 10-83-10-124-110-77-109-105 5-40 5-40-34-64-58-50z" fill="#261e2b"/><path d="m655.7 989.4c-15.9-22.8-77.2-19-132.5 19.6s-83.9 97.4-68 120.1c15.9 22.8 73.6 9.9 129-28.7 55.3-38.4 87.3-88.2 71.5-111zm440.4 67.7c28.1-20 39.5-46.7 30-60s-39.4-5-67.5 15-47 51.2-37.5 64.5 46.9.5 75-19.5z" fill="#f692ce"/><g fill="#19121d"><path d="m467 1401c-14.7-2-20-31.3-14.7-46.7-4 6.7-34 44.7-125.3 4.7-78.2-34.2-94.8-89.5-97.6-154.5-4.1 20.5-5.3 45-2.4 74.5 8 84 111 181 215 145 0 27 18 26 26 25s20-16 25-34c4.6-16.6 9.2-73-5.7-113.9 13.5 89.8-6 101.9-20.3 99.9zm1021 220c21.1-36.3 20.2-77.6 8.2-116.3-2.3-7.6-16.3-41.5-16.2-33.6.7 30.8-6.4 94.6-46.5 130.5-69.6 62.3-129.1 60.9-158.6 48.4s-75-52.5-59.5-86c-7 7-26 40.5-31.5 51.5s-14.5 15.5-19 13.5-9-7.5-5.5-21.5c2.8-11.2 15.2-41 46.9-72.9-15.5 13.3-28.8 27.9-37.4 42.4-25 42-28 66-16 71s28-6 29-13c-2 34 82 67 127 73s140.1-20 179.1-87z"/><path d="m1399 1472c-13 22-56 9-98 14-7.8.9-16.5 3.2-25.5 6.6 33.5-7.4 58.1-2.6 68.5-1.1 13.5 2 48 12 60.5-10 5.8-10.3 7.4-15.2 7.9-18.6zm85.1-5c-3.5-6.9-16.4-31.9-20.1-39l-20.9 12c28 3 36.5 20.6 41 27zm-1051.4-224.8c-29.2-21-59.3-40-58.7-56.2 1-28 5-40 5-40s2.6-16.3-7-20c-14 10-14.9 27.1-15.5 35.5-2 28 20 51.5 51 67 7.6 3.8 16.3 8.6 25.2 13.7zm429-862.5s-5.4 3.4-16.3-4.9c-25.1 41.9-46.2 89.3-58.9 140.4 25.1-71.8 63.7-127.3 75.2-135.5z"/><path d="m861.7 379.7s-7.3 4.7-22-10c-11.8-11.8-23.1-32.6-22.6-85.6-4.3 41.7.2 83.9 21.1 119l7.6-5c6.9-9.6 12.5-16 15.9-18.4zm819.3 128.6c-13.3 18-22.7 19.3-36 15.3-3.3-1-6.5-2.8-9.5-5.2l29.1 40.7c37.6-27.9 77.5-146.7 78.4-223.4-9.6 68.1-49.4 155.7-62 172.6zm-57-6.3c-.3-2.2-.6-.3-1-3 .1 2.4.4.5 1 3zm-3.1-3.9c-.6-1.5-1-2.9-1.4-4.4.2 1.1.3 2.1.4 3zm-819.9 246.9 3.9-12.6-2.3-3.7-1.5-1.5c0 2.5-.2 9.3-4 7.1-4.7-2.7-37.3-18-60-22s-71.3 0-84-2.7c-9.8-2.1-17.1-8.9-16-19.8-1.3 2.5-2.3 5.4-2.8 8.7-6.2 37.6 123.2 7.5 166.7 46.5z"/></g><path d="m812.6 772.1c-19.5-19.5-163.6-48-160.5-3 3 43.5 96-9 159 18 0 0 0-10.5 1.5-15z" fill="#261e2b"/><path d="m812.6 772.1c-1.6-1.6-3.9-3.2-6.9-4.8.9 3.6 1.7 10.2-4 11.7 0 0-14.7-10-45.3-12.7-30.7-2.7-69.3 17.3-88.7 13.3-14.5-3-16.2-12.3-11.2-23.3-3.1 3.4-4.7 7.5-4.4 12.7 3 43.5 96-9 159 18 0 .1 0-10.4 1.5-14.9zm920.4 160.9c-18 6.7-60-22.7-96-39.3-2.6-2.1-4-9.9 1.9-15.1-21.1-2.3-40-2.8-50.8-1.5-4.5-1.5 6 22.5 6 22.5 58.5-4.5 133.5 75 154.5 33 3.8-7.7 2.2-14.6-3.3-20.7 1.6 8.3-.2 16.6-12.3 21.1zm-37.7 54.5c-3.8 4.8-12 6-29 2.1-26-6-38-38.7-58.7-50.7.5-3.5 2.1-10.7 8.5-13.3-10.5-4.5-18.7-7.5-22.1-8.1-15-3-29.6 6.3-19.5 10.5 46.5 19.5 82.5 102 114 73.5 4.9-4.3 7-9.1 6.8-14zm-71.6-507.2c6.7 4.7 23.3-18 30-26.7s26-36.7 31.3-60 6.7-71.3-4-83.3-62.7-5.3-94.7 11.3c-32 16.7-50.7 36-62 35.3s-28-6-30.7-9.3c2 8 26.7 18.7 37.3 20.7s46.7 30 64.7 53.3 22 44 22.7 51.3c.7 7.4 5.4 7.4 5.4 7.4zm-52-214.6c-31.3 10.7-60 24.7-67.3 34.7s-12 23.3-12.7 28.7c0-16.7 15.3-50 7.3-58l15.6 10c17.7-9.4 57.1-15.4 57.1-15.4zm-695.4 98c8-8.7 18-18.7 14.7-30.7s-26-41-17.3-87.3c7.1-38 27.3-92.7 39.3-98.7s48 13 72 35c32.9 30.1 32 61 52.7 69.7s34 11.3 44 7.3c-18 14-46 10.6-61.3 9.3-16-1.3-48.7 15.3-66.7 23.3-17 7.5-34.7 22.7-42.7 37.3s-11.3 25.4-34.7 34.8zm205.4-174c10 14 23.3 34.7 19.3 47.3s-8 20-2 17.3 16-18 34.7-28 79.3-37.3 92-39.3c-8.7-5.3-45.3-5.8-59.3-6.7-30.7-2-84.7 9.4-84.7 9.4z" fill="#19121d"/></svg></a></p><p>if you dig this plugin, consider donating to support my opensource work. click the octocat to view sponsorship options</p>';
	}
}
