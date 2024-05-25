import { ThemeRegistration } from "shiki/types.mjs";

const palette = {
  green: "#50fa7b",
  purple: "#bd93f9",
  white: "#f8f8f2",
  yellow: "#f1fa8c",
  pink: "#ff79c6",
  blueberry: "#6272a4",
  blue: "#8be9fd",
};

const transparent = "#00000000";

//  class: "#50fa7b",
//       identifier: "#bd93f9",
//       sign: "#f8f8f2",
//       string: "#f1fa8c",
//       keyword: "#ff79c6",
//       comment: "#6272a4",
//       jsxliterals: "#8be9fd",

export const ThemeZero: ThemeRegistration = {
  displayName: "Theme Zero",
  name: "zero",
  colors: {
    "actionBar.toggledBackground": transparent,
    "activityBarBadge.background": transparent,
    "checkbox.border": "#6B6B6B",
    "editor.background": transparent,
    "editor.foreground": palette.white,
    "editor.inactiveSelectionBackground": "#3A3D41",
    "editor.selectionHighlightBackground": "#ADD6FF26",
    "editorIndentGuide.activeBackground": "#707070",
    "editorIndentGuide.background": transparent,
    "input.placeholderForeground": "#A6A6A6",
    "list.activeSelectionIconForeground": "#FFF",
    "list.dropBackground": "#383B3D",
    "menu.background": transparent,
    "menu.border": "#454545",
    "menu.foreground": "#CCCCCC",
    "menu.separatorBackground": "#454545",
    "ports.iconRunningProcessForeground": "#369432",
    "sideBarSectionHeader.background": transparent,
    "sideBarSectionHeader.border": "#ccc3",
    "sideBarTitle.foreground": "#BBBBBB",
    "statusBarItem.remoteBackground": "#16825D",
    "statusBarItem.remoteForeground": "#FFF",
    "tab.lastPinnedBorder": "#ccc3",
    "terminal.inactiveSelectionBackground": "#3A3D41",
    "widget.border": "#303031",
  },
  semanticHighlighting: true,
  semanticTokenColors: {
    customLiteral: palette.yellow,
    newOperator: palette.pink,
    numberLiteral: palette.yellow,
    stringLiteral: palette.purple,
  },
  tokenColors: [
    {
      scope: [
        "meta.embedded",
        "source.groovy.embedded",
        "string meta.image.inline.markdown",
        "variable.legacy.builtin.python",
      ],
      settings: {
        foreground: palette.white,
      },
    },
    {
      scope: "emphasis",
      settings: {
        fontStyle: "italic",
      },
    },
    {
      scope: "strong",
      settings: {
        fontStyle: "bold",
      },
    },
    {
      scope: "header",
      settings: {
        foreground: "#000080",
      },
    },
    {
      scope: "comment",
      settings: {
        foreground: "#6A9955",
      },
    },
    {
      scope: "constant.language",
      settings: {
        foreground: palette.purple,
      },
    },
    {
      scope: [
        "constant.numeric",
        "variable.other.enummember",
        "keyword.operator.plus.exponent",
        "keyword.operator.minus.exponent",
      ],
      settings: {
        foreground: "#b5cea8",
      },
    },
    {
      scope: "constant.regexp",
      settings: {
        foreground: "#646695",
      },
    },
    {
      scope: "entity.name.tag",
      settings: {
        foreground: palette.pink,
      },
    },
    {
      scope: "entity.name.tag.css",
      settings: {
        foreground: "#d7ba7d",
      },
    },
    {
      scope: "entity.other.attribute-name",
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      scope: [
        "entity.other.attribute-name.class.css",
        "entity.other.attribute-name.class.mixin.css",
        "entity.other.attribute-name.id.css",
        "entity.other.attribute-name.parent-selector.css",
        "entity.other.attribute-name.pseudo-class.css",
        "entity.other.attribute-name.pseudo-element.css",
        "source.css.less entity.other.attribute-name.id",
        "entity.other.attribute-name.scss",
      ],
      settings: {
        foreground: "#d7ba7d",
      },
    },
    {
      scope: "invalid",
      settings: {
        foreground: "#f44747",
      },
    },
    {
      scope: "markup.underline",
      settings: {
        fontStyle: "underline",
      },
    },
    {
      scope: "markup.bold",
      settings: {
        fontStyle: "bold",
        foreground: palette.pink,
      },
    },
    {
      scope: "markup.heading",
      settings: {
        fontStyle: "bold",
        foreground: palette.pink,
      },
    },
    {
      scope: "markup.italic",
      settings: {
        fontStyle: "italic",
      },
    },
    {
      scope: "markup.strikethrough",
      settings: {
        fontStyle: "strikethrough",
      },
    },
    {
      scope: "markup.inserted",
      settings: {
        foreground: "#b5cea8",
      },
    },
    {
      scope: "markup.deleted",
      settings: {
        foreground: "#ce9178",
      },
    },
    {
      scope: "markup.changed",
      settings: {
        foreground: palette.pink,
      },
    },
    {
      scope: "punctuation.definition.quote.begin.markdown",
      settings: {
        foreground: "#6A9955",
      },
    },
    {
      scope: "punctuation.definition.list.begin.markdown",
      settings: {
        foreground: "#6796e6",
      },
    },
    {
      scope: "markup.inline.raw",
      settings: {
        foreground: "#ce9178",
      },
    },
    {
      scope: "punctuation.definition.tag",
      settings: {
        foreground: "#808080",
      },
    },
    {
      scope: ["meta.preprocessor", "entity.name.function.preprocessor"],
      settings: {
        foreground: palette.pink,
      },
    },
    {
      scope: "meta.preprocessor.string",
      settings: {
        foreground: "#ce9178",
      },
    },
    {
      scope: "meta.preprocessor.numeric",
      settings: {
        foreground: "#b5cea8",
      },
    },
    {
      scope: "meta.structure.dictionary.key.python",
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      scope: "meta.diff.header",
      settings: {
        foreground: palette.pink,
      },
    },
    {
      scope: "storage",
      settings: {
        foreground: palette.pink,
      },
    },
    {
      scope: "storage.type",
      settings: {
        foreground: palette.pink,
      },
    },
    {
      scope: ["storage.modifier", "keyword.operator.noexcept"],
      settings: {
        foreground: palette.pink,
      },
    },
    {
      scope: ["string", "meta.embedded.assembly"],
      settings: {
        foreground: "#ce9178",
      },
    },
    {
      scope: "string.tag",
      settings: {
        foreground: "#ce9178",
      },
    },
    {
      scope: "string.value",
      settings: {
        foreground: "#ce9178",
      },
    },
    {
      scope: "string.regexp",
      settings: {
        foreground: "#d16969",
      },
    },
    {
      scope: [
        "punctuation.definition.template-expression.begin",
        "punctuation.definition.template-expression.end",
        "punctuation.section.embedded",
      ],
      settings: {
        foreground: palette.pink,
      },
    },
    {
      scope: ["meta.template.expression"],
      settings: {
        foreground: palette.white,
      },
    },
    {
      scope: [
        "support.type.vendored.property-name",
        "support.type.property-name",
        "variable.css",
        "variable.scss",
        "variable.other.less",
        "source.coffee.embedded",
      ],
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      scope: "keyword",
      settings: {
        foreground: palette.pink,
      },
    },
    {
      scope: "keyword.control",
      settings: {
        foreground: palette.pink,
      },
    },
    {
      scope: "keyword.operator",
      settings: {
        foreground: palette.white,
      },
    },
    {
      scope: [
        "keyword.operator.new",
        "keyword.operator.expression",
        "keyword.operator.cast",
        "keyword.operator.sizeof",
        "keyword.operator.alignof",
        "keyword.operator.typeid",
        "keyword.operator.alignas",
        "keyword.operator.instanceof",
        "keyword.operator.logical.python",
        "keyword.operator.wordlike",
      ],
      settings: {
        foreground: palette.pink,
      },
    },
    {
      scope: "keyword.other.unit",
      settings: {
        foreground: "#b5cea8",
      },
    },
    {
      scope: [
        "punctuation.section.embedded.begin.php",
        "punctuation.section.embedded.end.php",
      ],
      settings: {
        foreground: palette.pink,
      },
    },
    {
      scope: "support.function.git-rebase",
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      scope: "constant.sha.git-rebase",
      settings: {
        foreground: "#b5cea8",
      },
    },
    {
      scope: [
        "storage.modifier.import.java",
        "variable.language.wildcard.java",
        "storage.modifier.package.java",
      ],
      settings: {
        foreground: palette.white,
      },
    },
    {
      scope: "variable.language",
      settings: {
        foreground: palette.pink,
      },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "support.constant.handlebars",
        "source.powershell variable.other.member",
        "entity.name.operator.custom-literal",
      ],
      settings: {
        foreground: "#DCDCAA",
      },
    },
    {
      scope: [
        "entity.other.attribute",
        "storage.type.numeric.go",
        "storage.type.byte.go",
        "storage.type.boolean.go",
        "storage.type.string.go",
        "storage.type.uintptr.go",
        "storage.type.error.go",
        "storage.type.rune.go",
        "storage.type.cs",
        "storage.type.generic.cs",
        "storage.type.modifier.cs",
        "storage.type.variable.cs",
        "storage.type.annotation.java",
        "storage.type.generic.java",
        "storage.type.java",
        "storage.type.object.array.java",
        "storage.type.primitive.array.java",
        "storage.type.primitive.java",
        "storage.type.token.java",
        "storage.type.groovy",
        "storage.type.annotation.groovy",
        "storage.type.parameters.groovy",
        "storage.type.generic.groovy",
        "storage.type.object.array.groovy",
        "storage.type.primitive.array.groovy",
        "storage.type.primitive.groovy",
      ],
      settings: {
        foreground: palette.blue,
      },
    },
    {
      scope: ["support.class", "support.type"],
      settings: {
        foreground: palette.blue,
      },
    },
    {
      scope: [
        "meta.type.cast.expr",
        "meta.type.new.expr",
        "support.constant.math",
        "support.constant.dom",
        "support.constant.json",
        "entity.other.inherited-class",
        "entity.name.scope-resolution",
        "entity.name.class",
        "entity.name.type",
        "entity.name.namespace",
      ],
      settings: {
        foreground: palette.green,
      },
    },
    {
      scope: [
        "keyword.control",
        "source.cpp keyword.operator.new",
        "keyword.operator.delete",
        "keyword.other.using",
        "keyword.other.directive.using",
        "keyword.other.operator",
        "entity.name.operator",
      ],
      settings: {
        foreground: "#C586C0",
      },
    },
    {
      scope: [
        "variable",
        "meta.definition.variable.name",
        "support.variable",
        "entity.name.variable",
        "constant.other.placeholder",
      ],
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      scope: ["variable.other.constant", "variable.other.enummember"],
      settings: {
        foreground: "#4FC1FF",
      },
    },
    {
      scope: ["meta.object-literal.key"],
      settings: {
        foreground: palette.green,
      },
    },
    {
      scope: [
        "support.constant.property-value",
        "support.constant.font-name",
        "support.constant.media-type",
        "support.constant.media",
        "constant.other.color.rgb-value",
        "constant.other.rgb-value",
        "support.constant.color",
      ],
      settings: {
        foreground: "#CE9178",
      },
    },
    {
      scope: [
        "punctuation.definition.group.regexp",
        "punctuation.definition.group.assertion.regexp",
        "punctuation.definition.character-class.regexp",
        "punctuation.character.set.begin.regexp",
        "punctuation.character.set.end.regexp",
        "keyword.operator.negation.regexp",
        "support.other.parenthesis.regexp",
      ],
      settings: {
        foreground: "#CE9178",
      },
    },
    {
      scope: [
        "constant.character.character-class.regexp",
        "constant.other.character-class.set.regexp",
        "constant.other.character-class.regexp",
        "constant.character.set.regexp",
      ],
      settings: {
        foreground: "#d16969",
      },
    },
    {
      scope: ["keyword.operator.or.regexp", "keyword.control.anchor.regexp"],
      settings: {
        foreground: "#DCDCAA",
      },
    },
    {
      scope: "keyword.operator.quantifier.regexp",
      settings: {
        foreground: "#d7ba7d",
      },
    },
    {
      scope: ["constant.character", "constant.other.option"],
      settings: {
        foreground: palette.pink,
      },
    },
    {
      scope: "constant.character.escape",
      settings: {
        foreground: "#d7ba7d",
      },
    },
    {
      scope: "entity.name.label",
      settings: {
        foreground: "#C8C8C8",
      },
    },
  ],
  type: "dark",
};
