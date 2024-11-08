import { useCurrentEditor, useEditor, EditorContent, FloatingMenu, BubbleMenu, EditorProvider, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { orderedList } from '@tiptap/pm/schema-list'
import MenuBar from './MenuBar'
import FootBar from './FootBar'

const TextEditor = ({ handleSendEmail, handleCancelEmail }: { handleCancelEmail: any, handleSendEmail: any }) => {
    const extensions = [

        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help

            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help

            },
        }),
        Underline,
        TextAlign.configure({ types: ['heading', 'paragraph'] })
    ]

    const editorProps = {
        attributes: {
            class: 'prose max-w-none  bg-white [&_ol]:list-decimal [&_ul]:list-disc border-2 border-black focus:outline-none min-h-[500px] max-h-[600px] overflow-y-auto',

        }
    }

    const content = `<p>/*Ingrese el asunto del Email dentro de estas llaves*/</p>
        *        
        <p>Ingrese el texto del Email aquí</p>
        
    `

    return (
        <div className='absolute z-10 right-12 top-[300px] h-[600px]'>
            <EditorProvider slotBefore={<MenuBar />} slotAfter={<FootBar  handleCancelEmail={handleCancelEmail} handleSendEmail={handleSendEmail} />} editorProps={editorProps} extensions={extensions} content={content}></EditorProvider>
        </div>
    )
}



export default TextEditor