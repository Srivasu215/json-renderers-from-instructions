// src/v2/registerGlobal/meta.js
var e = {
	version: "1.2.0",
	description: "Browser DOM component renderer built on top of spec-repo and @keshavsoft/json-to-dom"
}, t = (t) => {
	let n = t;
	typeof globalThis < "u" && n && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.fromInstructions = {
		meta: e,
		render: n
	});
}, n = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.type;
	if (n === void 0) throw Error("Missing compulsory key: \"type\"");
	if (typeof n != "string") throw TypeError("type must be a string");
	return !0;
}, r = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.data;
	if (n === void 0) throw Error("Missing compulsory key: \"data\"");
	if (!Array.isArray(n)) throw TypeError("data must be an Array");
	return !0;
}, i = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.columns;
	if (n === void 0) throw Error("Missing compulsory key: \"columns\"");
	if (!Array.isArray(n)) throw TypeError("columns must be an Array");
	return !0;
}, a = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.showLog;
	if (n !== void 0 && typeof n != "boolean") throw TypeError("showLog must be a boolean");
	return !0;
}, o = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("Config must be an object");
	return n(t), r(t), i(t), a(t), !0;
}, s = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.targetHtmlId;
	if (n === void 0) throw Error("Missing compulsory key: \"targetHtmlId\"");
	if (typeof n != "string") throw TypeError("targetHtmlId must be a string");
	if (n.trim().length === 0) throw Error("targetHtmlId must be a non-empty string");
	return !0;
}, c = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.appendPosition;
	if (n === void 0) throw Error("Missing compulsory key: \"appendPosition\"");
	if (typeof n != "string") throw TypeError("appendPosition must be a string");
	return !0;
}, l = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.classToApply;
	if (n === void 0) throw Error("Missing compulsory key: \"classToApply\"");
	if (typeof n != "string") throw TypeError("classToApply must be a string");
	return !0;
}, u = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("Config must be an object");
	return s(t), c(t), l(t), !0;
}, d = {
	type: "table",
	targetHtmlId: "",
	data: [],
	columns: [],
	classToApply: "",
	appendPosition: "replace",
	showLog: !1
}, f = (e) => {
	let t = typeof e == "object" && e ? e.inKey ?? e.key : e;
	return t && t in d ? d[t] : { ...d };
};
Object.assign(f, d);
// node_modules/json-renderers-guard/src/v5/index.js
var p = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("Config must be an object");
	return o(t), u(t), !0;
};
p.getSpec = f, p.configSpec = d, p.guardSpec = o, p.guardMount = u;
// node_modules/@keshavsoft/json-to-dom/src/v42/register/meta.js
var m = {
	version: "42.1.4",
	name: "json-to-dom"
}, h = (e) => {
	e && (globalThis.ks ??= {}, globalThis.ks.jsonToDom = {
		meta: m,
		appendToDom: e
	});
}, ee = {
	version: "v12",
	description: "JSON-to-DOM engine powered by decoupled external-action traversal engine"
}, te = (e) => {
	if (typeof globalThis > "u" || !e) return;
	globalThis.ks ??= {};
	let t = typeof e == "function" ? e : e.buildSpecElement, n = e.buildSpecElementWithValidate, r = {
		meta: ee,
		buildSpecElement: t,
		...n ? { buildSpecElementWithValidate: n } : {}
	};
	globalThis.ks["json-to-tag"] = r, globalThis.ks.jsonToTag = r;
}, g = ({ inItems: e, inFunc: t }) => {
	let n = e, r = t;
	return Array.isArray(n) ? n.map((e) => v({
		inSpec: e,
		inFunc: r
	})).flat(Infinity).filter(Boolean) : [];
}, _ = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	if (!n || typeof n != "object" || Array.isArray(n)) return null;
	let i = typeof r == "function" ? r(n) : null;
	if (Array.isArray(n.children)) {
		let e = g({
			inItems: n.children,
			inFunc: r
		});
		if (i && typeof i.append == "function" && Array.isArray(e)) {
			let t = e.filter(Boolean);
			t.length && i.append(...t);
		}
	}
	return i;
}, v = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	return n == null ? null : typeof Node < "u" && n instanceof Node ? n : Array.isArray(n) ? g({
		inItems: n,
		inFunc: r
	}) : typeof n == "object" ? _({
		inSpec: n,
		inFunc: r
	}) : typeof n == "string" || typeof n == "number" ? typeof document < "u" ? document.createTextNode(String(n)) : String(n) : null;
}, y = ({ inNode: e, inErrors: t }) => {
	let n = e, r = t;
	return !n || typeof n != "object" || Array.isArray(n) ? (r.push({ reason: "Node must be a plain object" }), !1) : !0;
}, b = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName;
	return !o || typeof o != "string" || o.trim() === "" ? (a.push({ reason: "Missing or empty 'tagName'" }), !1) : i && typeof i == "object" && !(i[o] || Object.keys(i).includes(o)) ? (a.push({
		tagName: o,
		reason: `Unrecognized tagName '${o}' not found in spec catalog`
	}), !1) : !0;
}, ne = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && s.allowsTextContent === !1 && r.textContent ? (a.push({
		tagName: o,
		reason: `Tag '${o}' does not allow direct textContent`
	}), !1) : !0;
}, re = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && s.allowsChildren === !1 && Array.isArray(r.children) && r.children.length > 0 ? (a.push({
		tagName: o,
		reason: `Tag '${o}' does not allow children (void element)`
	}), !1) : "children" in r && !Array.isArray(r.children) ? (a.push({
		tagName: o,
		reason: "'children' must be an array"
	}), !1) : !0;
}, ie = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && Array.isArray(s.childTags) && s.childTags.length > 0 && Array.isArray(r.children) && r.children.forEach((e) => {
		e && e.tagName && !s.childTags.includes(e.tagName) && a.push({
			tagName: e.tagName,
			reason: `Tag '${e.tagName}' is not an allowed child of '${o}' (allowed: ${s.childTags.join(", ")})`
		});
	}), !0;
}, ae = ({ inNode: e, inErrors: t }) => {
	let n = e, r = t, i = n.tagName;
	return "attributes" in n && (!n.attributes || typeof n.attributes != "object" || Array.isArray(n.attributes)) ? (r.push({
		tagName: i,
		reason: "'attributes' must be a key-value object"
	}), !1) : !0;
}, oe = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n;
	y({
		inNode: r,
		inErrors: a
	}) && (b({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), ne({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), re({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), ie({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), ae({
		inNode: r,
		inErrors: a
	}));
}, se = {
	buildBodyTr: {
		tagName: "tr",
		attributes: { class: "align-middle" },
		children: []
	},
	buildColGroup: {
		tagName: "col",
		attributes: { width: "${width}" }
	},
	buildHeader: {
		tagName: "th",
		textContent: "${columnName}",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	buildFooter: {
		tagName: "td",
		children: [{
			tagName: "input",
			attributes: {
				type: "text",
				placeholder: "enter ${columnName}",
				name: "${columnName}",
				id: "${columnName}",
				list: "${columnName}",
				class: "form-control"
			}
		}]
	},
	buildBodyCell: {
		tagName: "td",
		textContent: "${rowValue}",
		attributes: { class: "py-3 px-3 text-secondary" }
	},
	button: {
		tagName: "button",
		textContent: "${columnName}",
		attributes: { class: "btn btn-primary btn-sm" }
	},
	buttonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "${agg:count}",
			attributes: { class: "btn btn-primary btn-sm" }
		}]
	},
	optionsButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "show",
			attributes: { class: "btn btn-primary btn-sm ks-btn-show" }
		}]
	},
	buildOption: {
		tagName: "option",
		textContent: "${rowValue}",
		attributes: { value: "${rowValue}" }
	},
	buildSelect: {
		tagName: "select",
		attributes: { id: "LedgerName" },
		children: []
	},
	buildDataList: {
		tagName: "datalist",
		attributes: { "data-name": "${columnName}" },
		children: []
	},
	emptyCell: {
		tagName: "td",
		children: []
	},
	headerSerialCell: {
		tagName: "th",
		textContent: "#",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForSerial: {
		tagName: "col",
		attributes: { width: "50px" }
	},
	colGroupForOption: {
		tagName: "col",
		attributes: { width: "100px" }
	},
	headerForOption: {
		tagName: "th",
		textContent: "options",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	tdWithButtonSaveWarning: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "save",
			attributes: { class: "btn btn-warning btn-sm ks-btn-save" }
		}]
	},
	tableSearch: {
		tagName: "div",
		attributes: { class: "row mb-3 justify-content-end" },
		children: [{
			tagName: "div",
			attributes: { class: "col-md-4" },
			children: [{
				tagName: "div",
				attributes: { class: "input-group" },
				children: [{
					tagName: "span",
					attributes: { class: "input-group-text bg-white" },
					children: [{
						tagName: "i",
						attributes: { class: "bi bi-search" },
						textContent: "🔍"
					}]
				}, {
					tagName: "input",
					attributes: {
						type: "text",
						id: "tableSearch",
						class: "form-control",
						placeholder: "Search table..."
					}
				}]
			}]
		}]
	}
}, ce = {
	$schema: "./tags.schema.json",
	div: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["title", "role"],
		childTags: []
	},
	input: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"placeholder",
			"value",
			"name",
			"disabled",
			"readonly",
			"required",
			"list"
		]
	},
	checkbox: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		]
	},
	colgroup: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["span"],
		childTags: ["col"]
	},
	col: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"span",
			"style",
			"width"
		]
	},
	label: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["for"],
		childTags: []
	},
	form: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"action",
			"method",
			"autocomplete",
			"enctype",
			"name",
			"novalidate",
			"target"
		],
		childTags: []
	},
	select: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"name",
			"disabled",
			"required",
			"multiple",
			"size"
		],
		childTags: ["option"]
	},
	p: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h1: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h2: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	span: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	img: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"src",
			"alt",
			"width",
			"height",
			"loading"
		]
	},
	button: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"type",
			"disabled",
			"name",
			"value"
		],
		childTags: []
	},
	table: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"border",
			"cellpadding",
			"cellspacing"
		],
		childTags: [
			"caption",
			"colgroup",
			"thead",
			"tbody",
			"tfoot",
			"tr"
		]
	},
	thead: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tbody: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tfoot: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tr: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["td", "th"]
	},
	th: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"scope",
			"colspan",
			"rowspan"
		],
		childTags: []
	},
	td: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["colspan", "rowspan"],
		childTags: []
	},
	datalist: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["option"]
	},
	option: {
		allowsTextContent: !0,
		allowsChildren: !1,
		allowedAttributes: [
			"value",
			"label",
			"selected",
			"disabled"
		]
	},
	header: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["role"],
		childTags: []
	},
	a: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"href",
			"target",
			"rel",
			"title",
			"download"
		],
		childTags: []
	},
	i: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["aria-hidden"],
		childTags: []
	},
	small: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	ul: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["type"],
		childTags: ["li"]
	},
	li: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["value"],
		childTags: []
	},
	hr: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: []
	}
}, le = {
	table: {
		simple: {
			base: {
				tagName: "div",
				attributes: { "data-role": "table-parent" },
				children: [{
					tagName: "table",
					attributes: { class: "table table-hover table-striped align-middle border mb-0" },
					children: [
						{
							tagName: "colgroup",
							attributes: { "data-role": "table-colgroup" },
							children: []
						},
						{
							tagName: "thead",
							attributes: {
								class: "table-dark",
								"data-role": "table-header"
							},
							children: [{
								tagName: "tr",
								attributes: { "data-role": "table-header-row" },
								children: []
							}]
						},
						{
							tagName: "tbody",
							attributes: { "data-role": "table-body" },
							children: []
						},
						{
							tagName: "tfoot",
							attributes: { "data-role": "table-footer" },
							children: [{
								tagName: "tr",
								attributes: { "data-role": "table-footer-row" },
								children: []
							}]
						}
					]
				}]
			},
			single: [{
				narration: "Build column widths",
				destinationPath: {
					fileName: "base",
					dataRole: "table-colgroup",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildColGroup",
				func: "fromCollection"
			}, {
				narration: "Build table header",
				destinationPath: {
					fileName: "base",
					dataRole: "table-header-row",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildHeader",
				func: "fromCollection"
			}],
			double: [{
				narration: "Build table body",
				destinationPath: {
					fileName: "base",
					dataRole: "table-body",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				func: "twoDimensional"
			}]
		},
		withFooter: {
			base: {
				tagName: "table",
				attributes: { class: "table table-hover table-striped align-middle border mb-0" },
				children: [
					{
						tagName: "colgroup",
						attributes: { "data-role": "table-colgroup" },
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header"
						},
						children: [{
							tagName: "tr",
							attributes: { "data-role": "table-header-row" },
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: { "data-role": "table-body" },
						children: []
					},
					{
						tagName: "tfoot",
						attributes: { "data-role": "table-footer" },
						children: [{
							tagName: "tr",
							attributes: { "data-role": "table-footer-row" },
							children: []
						}]
					}
				]
			},
			single: [
				{
					narration: "Build column widths",
					destinationPath: {
						fileName: "base",
						dataRole: "table-colgroup",
						filePath: ["children"]
					},
					sourcePath: {
						fileName: "data",
						filePath: ["columns"]
					},
					templateKey: "buildColGroup",
					func: "fromCollection"
				},
				{
					narration: "Build table header",
					destinationPath: {
						fileName: "base",
						dataRole: "table-header-row",
						filePath: ["children"]
					},
					sourcePath: {
						fileName: "data",
						filePath: ["columns"]
					},
					templateKey: "buildHeader",
					func: "fromCollection"
				},
				{
					narration: "Build footer input cells",
					destinationPath: {
						fileName: "base",
						dataRole: "table-footer-row",
						filePath: ["children"]
					},
					sourcePath: {
						fileName: "data",
						filePath: ["columns"]
					},
					templateKey: "buildFooter",
					func: "fromCollection"
				}
			],
			double: [{
				narration: "Build table body",
				destinationPath: {
					fileName: "base",
					dataRole: "table-body",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				func: "twoDimensional"
			}]
		},
		bodyOnly: {
			base: {
				tagName: "tbody",
				attributes: { "data-role": "table-body" },
				children: []
			},
			single: [],
			double: [{
				narration: "Build table body",
				destinationPath: {
					fileName: "base",
					dataRole: "table-body",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				func: "twoDimensional"
			}]
		},
		footerOnly: {
			base: {
				tagName: "tfoot",
				attributes: { "data-role": "table-footer" },
				children: [{
					tagName: "tr",
					attributes: { "data-role": "table-footer-row" },
					children: []
				}]
			},
			single: [{
				narration: "Build footer input cells",
				destinationPath: {
					fileName: "base",
					dataRole: "table-footer-row",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildFooter",
				func: "fromCollection"
			}],
			double: []
		},
		headerOnly: {
			base: {
				tagName: "table",
				attributes: { class: "table table-hover table-striped align-middle border mb-0" },
				children: [
					{
						tagName: "colgroup",
						attributes: { "data-role": "table-colgroup" },
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header"
						},
						children: [{
							tagName: "tr",
							attributes: { "data-role": "table-header-row" },
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: { "data-role": "table-body" },
						children: []
					}
				]
			},
			single: [{
				narration: "Build column widths",
				destinationPath: {
					fileName: "base",
					dataRole: "table-colgroup",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildColGroup",
				func: "fromCollection"
			}, {
				narration: "Build table header",
				destinationPath: {
					fileName: "base",
					dataRole: "table-header-row",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildHeader",
				func: "fromCollection"
			}],
			double: []
		}
	},
	select: {
		base: {
			tagName: "select",
			attributes: {
				id: "${columnName}",
				"data-name": "${columnName}"
			},
			children: []
		},
		single: [{
			narration: "Build select options",
			destinationPath: {
				fileName: "base",
				filePath: ["children"]
			},
			sourcePath: {
				fileName: "data",
				filePath: ["data"]
			},
			templateKey: "buildOption",
			func: "fromCollection"
		}],
		double: []
	},
	dataList: {
		simple: {
			base: {
				tagName: "div",
				attributes: { "data-role": "datalist-parent" },
				children: []
			},
			single: [{
				narration: "Build datalist control from columns",
				destinationPath: {
					fileName: "base",
					dataRole: "datalist-parent",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildDataList",
				func: "fromCollection"
			}, {
				narration: "Build datalist options from data",
				destinationPath: {
					fileName: "base",
					dataRole: "datalist-control",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["data"]
				},
				templateKey: "buildOption",
				func: "fromCollection"
			}],
			double: []
		},
		base: {
			tagName: "div",
			attributes: { "data-role": "datalist-parent" },
			children: []
		},
		single: [{
			narration: "Build datalist control from columns",
			destinationPath: {
				fileName: "base",
				dataRole: "datalist-parent",
				filePath: ["children"]
			},
			sourcePath: {
				fileName: "data",
				filePath: ["columns"]
			},
			templateKey: "buildDataList",
			func: "fromCollection"
		}, {
			narration: "Build datalist options from data",
			destinationPath: {
				fileName: "base",
				dataRole: "datalist-control",
				filePath: ["children"]
			},
			sourcePath: {
				fileName: "data",
				filePath: ["data"]
			},
			templateKey: "buildOption",
			func: "fromCollection"
		}],
		double: []
	},
	selectOptionsOnly: {
		base: [],
		single: [{
			narration: "Build options array",
			destinationPath: {
				fileName: "base",
				filePath: []
			},
			sourcePath: {
				fileName: "data",
				filePath: ["data"]
			},
			templateKey: "buildOption",
			func: "fromCollection"
		}],
		double: []
	},
	searchInput: {
		base: {
			tagName: "div",
			attributes: { class: "d-flex align-items-center gap-2" },
			children: [{
				tagName: "label",
				textContent: "${label}",
				attributes: {
					class: "form-label mb-0 text-nowrap fw-semibold",
					for: "${id}"
				}
			}, {
				tagName: "input",
				attributes: {
					type: "search",
					placeholder: "${placeholder}",
					class: "form-control",
					id: "${id}"
				}
			}]
		},
		single: [],
		double: []
	},
	form: { base: {
		tagName: "div",
		attributes: { class: "card shadow-sm border-0" },
		children: [{
			tagName: "div",
			attributes: { class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center" },
			children: [{
				tagName: "h2",
				textContent: "${title}",
				attributes: { class: "h5 fw-bold mb-0 text-dark" }
			}]
		}, {
			tagName: "div",
			attributes: { class: "card-body p-4" },
			children: [{
				tagName: "form",
				attributes: {
					id: "${formId}",
					"data-role": "form-body"
				},
				children: []
			}]
		}]
	} }
}, ue = se;
// node_modules/json-to-tag-validate/src/v4/index.js
function de({ inJson: e, inCatalog: t, inSpec: n }) {
	let r = e, i = t ?? n ?? ce, a = [];
	return v({
		inSpec: r,
		inFunc: (e) => {
			oe({
				inNode: e,
				inCatalog: i,
				inErrors: a
			});
		}
	}), {
		isValid: a.length === 0,
		errors: a
	};
}
// node_modules/@keshavsoft/json-to-tag/src/v12/element/createElement.js
var fe = "http://www.w3.org/2000/svg", pe = /* @__PURE__ */ new Set(/* @__PURE__ */ "svg.path.symbol.use.g.circle.ellipse.rect.line.polyline.polygon.text.tspan.defs.clippath.mask.pattern.marker.lineargradient.radialgradient.stop.image.filter.fegaussianblur.femerge.femergenode".split(".")), me = ({ inTagName: e }) => {
	let t = e?.toLowerCase();
	if (!t) return null;
	if (t === "checkbox") {
		let e = document.createElement("input");
		return e.type = "checkbox", e;
	}
	return pe.has(t) ? document.createElementNS(fe, t) : document.createElement(t);
}, he = ({ inElement: e, inTextContent: t }) => (!e || t == null || (e.textContent = t), e), ge = ({ inElement: e, inProperties: t }) => (e && t && typeof t == "object" && Object.assign(e, t), e), _e = "http://www.w3.org/1999/xlink", ve = ({ inElement: e, inAttributes: t }) => {
	let n = e, r = t;
	if (!n || !r || typeof r != "object") return n;
	let i = typeof SVGElement < "u" ? n instanceof SVGElement : n.namespaceURI === "http://www.w3.org/2000/svg";
	return Object.entries(r).forEach(([e, t]) => {
		if (e === "class") i ? n.setAttribute("class", String(t)) : n.className = t;
		else if (e === "xlink:href" || e === "href") {
			if (t != null) {
				let e = String(t);
				if (i) try {
					n.setAttributeNS(_e, "href", e);
				} catch {}
				n.setAttribute("href", e), n.setAttribute("xlink:href", e);
			}
		} else typeof t == "boolean" ? t ? n.setAttribute(e, "") : n.removeAttribute(e) : t != null && n.setAttribute(e, String(t));
	}), n;
}, ye = ({ inElement: e, inClassList: t }) => {
	if (!e || !t) return e;
	let n = typeof t == "string" ? t.split(/\s+/).filter(Boolean) : Array.isArray(t) ? t.filter((e) => typeof e == "string" && e.trim()) : [];
	return n.length && e.classList.add(...n), e;
}, x = (e) => {
	if (!e || typeof e != "object" || Array.isArray(e) || !e.tagName) return null;
	let t = me({ inTagName: e.tagName });
	return t ? (he({
		inElement: t,
		inTextContent: e.textContent,
		inTagName: e.tagName
	}), ge({
		inElement: t,
		inProperties: e.properties
	}), ve({
		inElement: t,
		inAttributes: e.attributes
	}), ye({
		inElement: t,
		inClassList: e.classList
	}), t) : null;
}, S = (e = {}) => v({
	inSpec: e?.spec ?? e?.inSpec ?? e,
	inFunc: x
});
te({
	buildSpecElement: S,
	buildSpecElementWithValidate: (e = {}) => {
		let t = e?.spec ?? e?.inSpec ?? e, n = de({ inJson: t });
		return n.isValid || console.warn("[json-to-tag] Specification validation issues:", n.errors), v({
			inSpec: t,
			inFunc: x
		});
	}
});
// node_modules/spec-to-dom/src/v2/register/meta.js
var C = {
	version: "2.1.1",
	name: "spec-to-dom"
}, w = (e) => {
	e && (globalThis.ks ??= {}, globalThis.ks.specToDom = {
		meta: C,
		appendToDom: e
	});
}, T = ({ buildSpec: e, targetHtmlId: t, appendPosition: n, showLog: r }) => {
	let i = e, a = t, o = n, s = r;
	s && console.log("renderToDom 1 (content):", i);
	let c = document.getElementById(a);
	return c ? (Array.isArray(i) || i instanceof NodeList || i instanceof HTMLCollection ? o === "prepend" ? c.prepend(...i) : c.append(...i) : o === "prepend" ? c.prepend(i) : (c.innerHTML = "", c.append(i)), s && console.log("renderToDom 2 (mounted):", c), c) : null;
};
w(T);
// node_modules/@keshavsoft/json-to-dom/src/v42/index.js
var E = ({ jsonSpec: e, targetHtmlId: t, appendPosition: n, showLog: r }) => T({
	buildSpec: S(e),
	targetHtmlId: t,
	appendPosition: n,
	showLog: r
});
h(E);
// ../json-renderers-run-instructions/node_modules/json-write-path/src/v4/utils/toArray.js
var D = (e) => Array.isArray(e) ? e : [e], O = (e, t, n) => {
	e[t] = n;
}, k = {
	set: O,
	push: (e, t, n) => {
		e[t].push(...D(n));
	},
	unshift: (e, t, n) => {
		e[t].unshift(...D(n));
	},
	pushToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.push(...structuredClone(D(n)));
		});
	},
	unshiftToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.unshift(...structuredClone(D(n)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, A = (e) => typeof e == "object" && !!e && !Array.isArray(e), j = (e, t) => {
	if (!A(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = F(t, i);
	return n;
}, M = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => F(t, e));
}, N = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, P = (e, t) => N(e, t), be = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, xe = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, Se = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: xe,
		applyTemplate: e
	});
}, F = (e, t, n) => {
	let r = e, i = t;
	be(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? N(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = P(a?.textContent, r)), "attributes" in a && (a.attributes = j(a?.attributes, r)), "children" in a && (a.children = M(a?.children, r))), a);
};
Se(F);
// ../json-renderers-run-instructions/node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var I = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, Ce = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, we = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: Ce,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, L = (e, t) => {
	let n = e, r = t;
	return I(n, r), n.map((e) => F(e, r));
};
we((e, t) => {
	let n = e;
	return I(n, t), n.map((e) => F(e, e[t]));
}, L);
// ../json-renderers-run-instructions/node_modules/json-transformer-funcs-two-dimensions/src/v8/addRowData.js
var Te = (e, t) => e.map((e) => ({
	...e,
	rowData: t[e.columnName]
})), Ee = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inColumns must be an Array");
	if (e.length === 0) throw Error("inColumns cannot be empty");
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (!n || typeof n != "object") throw TypeError(`inColumns[${t}] must be an object`);
		if (typeof n.columnName != "string" || !n.columnName.trim()) throw TypeError(`inColumns[${t}].columnName must be a non-empty string`);
	}
	if (!Array.isArray(t)) throw TypeError("inData must be an Array");
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (!n || typeof n != "object") throw TypeError(`inData[${e}] must be an object`);
	}
	return !0;
}, De = ({ columns: e, data: t, columnSpec: n, rowSpec: r }) => {
	Ee(e, t);
	let i = e;
	return t.map((e) => {
		let t = F(e, r);
		return t.children = L(Te(i, e), n), t;
	});
}, R = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = R(n, t);
		if (e) return e;
	}
	return null;
}, Oe = (e, t, n) => {
	let r = t.fileName, i = R(e[r], t.dataRole), a = t.dataRole ? i : e[t.fileName], o = [...t.filePath ?? []], s = o.pop();
	return {
		parent: o.reduce((e, t) => e[t], a),
		key: s
	};
}, z = (e, t, n, r) => {
	r && console.log("v4 index :", e, t, n);
	let { parent: i, key: a } = Oe(e, t, r);
	(k[t.action] || O)(i, a, n);
}, B = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = B(n, t);
		if (e) return e;
	}
	return null;
}, ke = (e, t) => {
	let n = e[t.fileName], r = t.dataRole ? B(n, t.dataRole) : n;
	return (t.filePath ?? []).reduce((e, t) => e[t], r);
}, V = {
	buildBodyTr: {
		tagName: "tr",
		attributes: { class: "align-middle" },
		children: []
	},
	buildColGroup: {
		tagName: "col",
		attributes: { width: "${width}" }
	},
	buildHeader: {
		tagName: "th",
		textContent: "${columnName}",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	buildFooter: {
		tagName: "td",
		children: [{
			tagName: "input",
			attributes: {
				type: "text",
				placeholder: "enter ${columnName}",
				name: "${columnName}",
				id: "${columnName}",
				list: "${columnName}",
				class: "form-control"
			}
		}]
	},
	buildBodyCell: {
		tagName: "td",
		textContent: "${rowValue}",
		attributes: { class: "py-3 px-3 text-secondary" }
	},
	button: {
		tagName: "button",
		textContent: "${columnName}",
		attributes: { class: "btn btn-primary btn-sm" }
	},
	buttonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "${agg:count}",
			attributes: { class: "btn btn-primary btn-sm" }
		}]
	},
	optionsButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "show",
			attributes: { class: "btn btn-primary btn-sm ks-btn-show" }
		}]
	},
	buildOption: {
		tagName: "option",
		textContent: "${rowValue}",
		attributes: { value: "${rowValue}" }
	},
	buildSelect: {
		tagName: "select",
		attributes: { id: "LedgerName" },
		children: []
	},
	buildDataList: {
		tagName: "datalist",
		attributes: { "data-name": "${columnName}" },
		children: []
	},
	emptyCell: {
		tagName: "td",
		children: []
	},
	headerSerialCell: {
		tagName: "th",
		textContent: "#",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForSerial: {
		tagName: "col",
		attributes: { width: "50px" }
	},
	colGroupForOption: {
		tagName: "col",
		attributes: { width: "100px" }
	},
	headerForOption: {
		tagName: "th",
		textContent: "options",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	tdWithButtonSaveWarning: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "save",
			attributes: { class: "btn btn-warning btn-sm ks-btn-save" }
		}]
	},
	tableSearch: {
		tagName: "div",
		attributes: { class: "row mb-3 justify-content-end" },
		children: [{
			tagName: "div",
			attributes: { class: "col-md-4" },
			children: [{
				tagName: "div",
				attributes: { class: "input-group" },
				children: [{
					tagName: "span",
					attributes: { class: "input-group-text bg-white" },
					children: [{
						tagName: "i",
						attributes: { class: "bi bi-search" },
						textContent: "🔍"
					}]
				}, {
					tagName: "input",
					attributes: {
						type: "text",
						id: "tableSearch",
						class: "form-control",
						placeholder: "Search table..."
					}
				}]
			}]
		}]
	}
}, Ae = {
	applyTemplate: F,
	fromCollection: L
}, je = (e, t, n) => e?.sourcePath === null ? null : ke(t, e.sourcePath), Me = (e, t, n) => {
	let r = t?.spec ?? V, i = e.templateKey, a = e?.func, o = r[i], s = je(e, t, n), c = a === null ? o : Ae[e.func](s, o);
	return s === null ? o : c;
}, Ne = (e, t, n) => {
	let r = n;
	r && console.log("runSingleInstruction 1 :", e, t);
	let i = Me(e, t, n);
	r && console.log("runSingleInstruction 2 :", i), z(t, e.destinationPath, i);
}, Pe = (e, t, n, r) => {
	e.forEach((e) => {
		Ne(e, t, n, r);
	});
}, Fe = {
	applyTemplate: F,
	fromCollection: L,
	twoDimensional: De
}, Ie = (e, t, n, r) => {
	console.log("localShowLog : ", n);
	let i = t?.spec ?? V, a = Fe[e.func]({
		columns: t.data.columns,
		data: t.data.data,
		columnSpec: i.buildBodyCell,
		rowSpec: i.buildBodyTr
	});
	z(t, e.destinationPath, a);
}, Le = (e, t, n, r) => {
	e.forEach((e) => {
		Ie(e, t, n, r);
	});
}, Re = ({ single: e = [], double: t = [], registry: n = {}, showLog: r = !1 } = {}) => {
	if (!Array.isArray(e)) throw TypeError("single instructions must be an array");
	if (!Array.isArray(t)) throw TypeError("double instructions must be an array");
	if (!n || typeof n != "object" || Array.isArray(n)) throw TypeError("registry must be an object");
	return e.length > 0 && Pe(e, n, r), t.length > 0 && Le(t, n), n;
}, H = (e) => Array.isArray(e) ? e : [e], U = (e, t, n) => {
	e[t] = n;
}, ze = {
	set: U,
	push: (e, t, n) => {
		e[t].push(...H(n));
	},
	unshift: (e, t, n) => {
		e[t].unshift(...H(n));
	},
	pushToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.push(...structuredClone(H(n)));
		});
	},
	unshiftToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.unshift(...structuredClone(H(n)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, Be = (e) => typeof e == "object" && !!e && !Array.isArray(e), Ve = (e, t) => {
	if (!Be(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = G(t, i);
	return n;
}, He = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => G(t, e));
}, W = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, Ue = (e, t) => W(e, t), We = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, Ge = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, Ke = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.applyTemplate ??= e, globalThis.ks.transformerFuncs ??= {}, globalThis.ks.transformerFuncs.primitive = {
		meta: Ge,
		applyTemplate: e
	});
}, G = (e, t, n) => {
	let r = e, i = t;
	We(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? W(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = Ue(a?.textContent, r)), "attributes" in a && (a.attributes = Ve(a?.attributes, r)), "children" in a && (a.children = He(a?.children, r))), a);
};
Ke(G);
// node_modules/json-transformer-funcs-one-dimension/src/v8/guard/index.js
var qe = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, Je = (e, t) => {
	let n = e, r = t;
	return qe(n, r), n.map((e) => G(e, r));
}, K = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = K(n, t);
		if (e) return e;
	}
	return null;
}, Ye = (e, t, n) => {
	let r = t.fileName, i = K(e[r], t.dataRole), a = t.dataRole ? i : e[t.fileName], o = [...t.filePath ?? []], s = o.pop();
	return {
		parent: o.reduce((e, t) => e[t], a),
		key: s
	};
}, Xe = (e, t, n, r) => {
	r && console.log("v4 index :", e, t, n);
	let { parent: i, key: a } = Ye(e, t, r);
	(ze[t.action] || U)(i, a, n);
}, q = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = q(n, t);
		if (e) return e;
	}
	return null;
}, Ze = (e, t) => {
	let n = e[t.fileName], r = t.dataRole ? q(n, t.dataRole) : n;
	return (t.filePath ?? []).reduce((e, t) => e[t], r);
}, Qe = {
	applyTemplate: G,
	fromCollection: Je
}, $e = (e, t, n) => e?.sourcePath === null ? null : Ze(t, e.sourcePath), et = (e, t, n) => {
	let r = t?.spec ?? ue, i = e.templateKey, a = e?.func, o = r[i], s = $e(e, t, n), c = a === null ? o : Qe[e.func](s, o);
	return s === null ? o : c;
}, tt = (e, t, n) => {
	let r = n;
	r && console.log("runSingleInstruction 1 :", e, t);
	let i = et(e, t, n);
	r && console.log("runSingleInstruction 2 :", i), Xe(t, e.destinationPath, i);
}, J = (e, t, n, r) => {
	e.forEach((e) => {
		tt(e, t, n, r);
	});
}, Y = (e, t, n) => {
	let r = !(!e || typeof e != "object" || Array.isArray(e)), i = `guards/base: ${r ? "passed" : "failed"}`;
	return Array.isArray(n) && n.push(i), t && console.log(i), r;
}, nt = (e, t, n) => {
	let r = !(!e || typeof e != "object" || Array.isArray(e)), i = `guards/options: ${r ? "passed" : "failed"}`;
	return Array.isArray(n) && n.push(i), t && console.log(i), r;
}, rt = (e, t, n) => {
	let r = typeof e == "boolean", i = `guards/showLog: ${r ? "passed" : "failed"}`;
	return Array.isArray(n) && n.push(i), t && console.log(i), r;
}, it = (e, t, n) => {
	let r = Array.isArray(e), i = `guards/returnLog: ${r ? "passed" : "failed"}`;
	return r ? e.push(i) : Array.isArray(n) && n.push(i), t && console.log(i), r;
}, at = ({ options: e, base: t, showLog: n, returnLog: r }) => ({
	base: Y(t, n, r),
	options: nt(e, n, r),
	showLog: rt(n, n, r),
	returnLog: it(r, n, r)
}), ot = [
	{
		narration: "Prepend the serial column width to the table colgroup.",
		destinationPath: {
			fileName: "base",
			dataRole: "table-colgroup",
			filePath: ["children"],
			action: "unshift"
		},
		sourcePath: null,
		templateKey: "colGroupForSerial",
		func: null
	},
	{
		narration: "Prepend the serial header cell to the table header row.",
		destinationPath: {
			fileName: "base",
			dataRole: "table-header-row",
			filePath: ["children"],
			action: "unshift"
		},
		sourcePath: null,
		templateKey: "headerSerialCell",
		func: null
	},
	{
		narration: "Prepend the serial number cell into each table body row.",
		destinationPath: {
			fileName: "base",
			dataRole: "table-body",
			filePath: ["children"],
			action: "unshiftSerialToRows"
		},
		sourcePath: null,
		templateKey: "buildBodyCell",
		func: null
	},
	{
		narration: "Prepend the serial footer cell to the table footer row.",
		destinationPath: {
			fileName: "base",
			dataRole: "table-footer-row",
			filePath: ["children"],
			action: "unshift"
		},
		sourcePath: null,
		templateKey: "headerSerialCell",
		func: null
	}
], st = [
	{
		narration: "Append the options column width to the table colgroup.",
		destinationPath: {
			fileName: "base",
			dataRole: "table-colgroup",
			filePath: ["children"],
			action: "push"
		},
		sourcePath: null,
		templateKey: "colGroupForOption",
		func: null
	},
	{
		narration: "Append the options header cell to the table header row.",
		destinationPath: {
			fileName: "base",
			dataRole: "table-header-row",
			filePath: ["children"],
			action: "push"
		},
		sourcePath: null,
		templateKey: "headerForOption",
		func: null
	},
	{
		narration: "Append the options button cell into each table body row.",
		destinationPath: {
			fileName: "base",
			dataRole: "table-body",
			filePath: ["children"],
			action: "pushToRows"
		},
		sourcePath: null,
		templateKey: "optionsButtonCell",
		func: null
	},
	{
		narration: "Append the options footer cell to the table footer row.",
		destinationPath: {
			fileName: "base",
			dataRole: "table-footer-row",
			filePath: ["children"],
			action: "push"
		},
		sourcePath: null,
		templateKey: "tdWithButtonSaveWarning",
		func: null
	}
], ct = [{
	narration: "Prepend the search row to top of the table.",
	destinationPath: {
		fileName: "base",
		dataRole: "table-parent",
		filePath: ["children"],
		action: "unshift"
	},
	sourcePath: null,
	templateKey: "tableSearch",
	func: null
}], X = (e, t) => !e || typeof e != "object" ? !1 : e.attributes?.["data-role"] === t || Array.isArray(e.children) && e.children.some((e) => X(e, t)), Z = (e, t) => e.filter(({ destinationPath: e }) => X(t, e?.dataRole)), lt = ({ options: e = {}, base: t, showLog: n = !1, returnLog: r = [] } = {}) => {
	let i = at({
		options: e,
		base: t,
		showLog: n,
		returnLog: r
	});
	if (!Object.values(i).every(Boolean)) return t;
	let a = e, o = t, s = n, c = r;
	return (a.showSerial || a.serial) && J(Z(ot, o), { base: o }, s, c), (a.showOptions || a.options) && J(Z(st, o), { base: o }, s, c), a.showSearch && J(Z(ct, o), { base: o }, s, c), o;
}, Q = ({ definitions: e, type: t = "simple", data: n = [], columns: r = [], options: i = {}, showLog: a = !1 } = {}) => {
	let o = t;
	o && o.includes(".") && (o = o.split(".")[1] || "simple"), o && o !== "table" || (o = "simple");
	let s = e?.table || {}, c = s[o] || s.simple;
	if (!c) throw Error(`Unknown table type: "${o}". Available types: ${Object.keys(s).join(", ")}`);
	let l = structuredClone(c.base), u = {
		data: {
			columns: r,
			data: n
		},
		base: l,
		...i
	};
	return Re({
		single: c.single,
		double: c.double,
		registry: u,
		showLog: a
	}), lt({
		options: i,
		base: l
	}), l;
}, $ = (e = {}) => {
	p(e);
	let t = e?.showLog, n = e?.options || {};
	t && console.log("[v48 build-table] input config:", {
		type: e.type,
		options: n,
		columns: e.columns,
		data: e.data,
		appendPosition: e.appendPosition
	});
	let r = Q({
		definitions: le,
		type: e.type,
		data: e.data,
		columns: e.columns,
		options: n,
		showLog: t
	});
	t && console.log("[v48 build-table] generated spec:", r);
	let i = E({
		jsonSpec: r,
		targetHtmlId: e.targetHtmlId,
		appendPosition: e.appendPosition,
		showLog: t
	});
	return t && console.log("[v48 build-table] mounted DOM element:", i), i;
};
t($);
export { Q as buildTableSpec, $ as default, $ as render };
