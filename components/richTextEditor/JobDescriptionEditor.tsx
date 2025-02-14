'use client'

import React, { useEffect } from 'react'
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import MenuBar from './MenuBar';

const JobDescriptionEditor = ({ field }: { field: any }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"]
            }),
            Typography
        ],
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-4 max-w-none dark:prose-invert",
            }
        },
        onUpdate: ({ editor }) => {
            field.onChange(JSON.stringify(editor.getJSON()))
        },
        content: field.value ? JSON.parse(field.value) : "",
        immediatelyRender: false,
    });

    useEffect(() => {
        if (editor && field.value && editor.getHTML() !== field.value) {
          editor.commands.setContent(JSON.parse(field.value));
        }
    }, [editor, field.value]);
  return (
    <div className="w-full">
        <div className="border rounded-lg overflow-hidden bg-card">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    </div>
  )
}

export default JobDescriptionEditor