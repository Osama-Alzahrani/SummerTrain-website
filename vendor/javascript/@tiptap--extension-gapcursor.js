import{getExtensionField as r,callOrReturn as o,Extension as a}from"@tiptap/core";import{gapCursor as t}from"@tiptap/pm/gapcursor";const e=a.create({name:"gapCursor",addProseMirrorPlugins(){return[t()]},extendNodeSchema(a){var t;const e={name:a.name,options:a.options,storage:a.storage};return{allowGapCursor:(t=o(r(a,"allowGapCursor",e)))!==null&&t!==void 0?t:null}}});export{e as Gapcursor,e as default};
