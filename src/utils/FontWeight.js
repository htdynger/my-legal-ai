import { Mark, mergeAttributes } from "@tiptap/core";

export const FontWeight = Mark.create({
  name: "fontWeight",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      weight: {
        default: null,
        parseHTML: (element) => element.style.fontWeight || null,
        renderHTML: (attributes) => {
          if (!attributes.weight) return {};
          return {
            style: `font-weight: ${attributes.weight}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [{ style: "font-weight" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setFontWeight:
        (weight) =>
        ({ commands }) => {
          return commands.setMark(this.name, { weight });
        },
      unsetFontWeight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
