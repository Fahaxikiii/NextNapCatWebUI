import React from 'react'
import Editor, { OnMount } from '@monaco-editor/react'
import monaco from '@/monaco'
import { loader } from '@monaco-editor/react'
import { useTheme } from '@/hooks/use-theme'

loader.config({ monaco })

export interface CodeEditorProps extends React.ComponentProps<typeof Editor> {
  test?: string
}

export type CodeEditorRef = monaco.editor.IStandaloneCodeEditor

const CodeEditor = React.forwardRef<CodeEditorRef, CodeEditorProps>(
  (props, ref) => {
    const { isDark } = useTheme()

    const handleEditorDidMount: OnMount = (editor, monaco) => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(editor)
        } else {
          ;(ref as React.MutableRefObject<CodeEditorRef>).current = editor
        }
      }
      if (props.onMount) {
        props.onMount(editor, monaco)
      }
    }

    return (
      <Editor
        {...props}
        onMount={handleEditorDidMount}
        theme={isDark ? 'vs-dark' : 'light'}
      />
    )
  }
)

export default CodeEditor
