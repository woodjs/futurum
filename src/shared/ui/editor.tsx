'use client'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Editor as TiptapEditor,
  EditorProvider,
  useCurrentEditor,
  Content,
  EditorEvents,
} from '@tiptap/react'
import {
  Bars2Icon,
  Bars3CenterLeftIcon,
  Bars3Icon,
  BoldIcon,
  BookmarkIcon,
  CodeBracketIcon,
  CodeBracketSquareIcon,
  ItalicIcon,
  LinkIcon,
  ListBulletIcon,
  NumberedListIcon,
  QueueListIcon,
  StrikethroughIcon,
} from '@heroicons/react/16/solid'
import Link from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import React, { FC, useCallback, useEffect, useId } from 'react'
import { cn } from '../lib/utils'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Label } from './label'
import { useTranslations } from 'next-intl'

interface IEditorMenuButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  active?: boolean
  disabled?: boolean
}

const EditorMenuButton: FC<IEditorMenuButtonProps> = ({
  active,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        `cursor-pointer rounded-md bg-slate-100 px-2 py-2 text-sm text-slate-400
        hover:bg-slate-200 [&>svg]:w-4`,
        active &&
          'bg-blue-200 text-blue-500 hover:bg-blue-300 hover:text-blue-600',
        className,
      )}
    />
  )
}

type TextNodeType = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const toggleTextNode = (editor: TiptapEditor, type?: TextNodeType) => {
  switch (type) {
    case 'h1':
      return editor.chain().focus().toggleHeading({ level: 1 }).run()
    case 'h2':
      return editor.chain().focus().toggleHeading({ level: 2 }).run()
    case 'h3':
      return editor.chain().focus().toggleHeading({ level: 3 }).run()
    case 'h4':
      return editor.chain().focus().toggleHeading({ level: 4 }).run()
    case 'h5':
      return editor.chain().focus().toggleHeading({ level: 5 }).run()
    case 'h6':
      return editor.chain().focus().toggleHeading({ level: 6 }).run()
    case 'p':
    default:
      return editor.chain().focus().setParagraph().run()
  }
}

const MenuBar = () => {
  const { editor } = useCurrentEditor()
  const t = useTranslations('Editor')
  const [alignment, setAlignment] = React.useState('left')

  const setLink = useCallback(() => {
    if (!editor) return null
    if (editor.isActive('link')) {
      // @ts-ignore
      return editor.chain().focus().extendMarkRange('link').unsetLink().run()
    }
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      // @ts-ignore
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    // @ts-ignore
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const [selectedNodeType, setSelectedNodeType] = React.useState('')

  useEffect(() => {
    if (!editor) return
    editor.on('selectionUpdate', editor => {
      const type = editor?.editor?.state?.selection?.$head?.parent?.type?.name
      const level =
        editor?.editor?.state?.selection?.$head?.parent?.attrs?.level
      const textAlign =
        editor?.editor?.state?.selection?.$head?.parent?.attrs?.textAlign ||
        'left'
      setAlignment(textAlign)

      switch (type) {
        case 'paragraph':
          setSelectedNodeType('p')
          break
        case 'heading':
          setSelectedNodeType(`h${level}`)
          break
        default:
          setSelectedNodeType('')
          break
      }
    })
    editor.on('update', editor => {
      const type = editor?.editor?.state?.selection?.$head?.parent?.type?.name
      const level =
        editor?.editor?.state?.selection?.$head?.parent?.attrs?.level
      const textAlign =
        editor?.editor?.state?.selection?.$head?.parent?.attrs?.textAlign ||
        'left'
      setAlignment(textAlign)
      switch (type) {
        case 'paragraph':
          setSelectedNodeType('p')
          break
        case 'heading':
          setSelectedNodeType(`h${level}`)
          break
        default:
          setSelectedNodeType('')
          break
      }
    })
    return () => {
      editor.off('selectionUpdate')
      editor.off('update')
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className='control-group'>
      <div className='mb-2 flex items-center gap-3'>
        <Select
          onValueChange={(value: string) =>
            toggleTextNode(editor, value as TextNodeType)
          }
          value={selectedNodeType}
        >
          <SelectTrigger className='max-w-[200px]'>
            <SelectValue placeholder={t('empty')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='p'>{t('p')}</SelectItem>
            <SelectItem value='h1'>{t('h1')}</SelectItem>
            <SelectItem value='h2'>{t('h2')}</SelectItem>
            <SelectItem value='h3'>{t('h3')}</SelectItem>
            <SelectItem value='h4'>{t('h4')}</SelectItem>
            <SelectItem value='h5'>{t('h5')}</SelectItem>
            <SelectItem value='h6'>{t('h6')}</SelectItem>
          </SelectContent>
        </Select>
        <div className='no-scrollbar flex w-full items-center gap-2 overflow-x-auto'>
          <EditorMenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
          >
            <BoldIcon />
          </EditorMenuButton>
          <EditorMenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
          >
            <ItalicIcon />
          </EditorMenuButton>
          <EditorMenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
          >
            <StrikethroughIcon />
          </EditorMenuButton>
          <EditorMenuButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            active={editor.isActive('code')}
          >
            <CodeBracketIcon />
          </EditorMenuButton>

          <EditorMenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
          >
            <ListBulletIcon />
          </EditorMenuButton>
          <EditorMenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
          >
            <NumberedListIcon />
          </EditorMenuButton>
          <EditorMenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive('codeBlock')}
          >
            <CodeBracketSquareIcon />
          </EditorMenuButton>
          <EditorMenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
          >
            <BookmarkIcon />
          </EditorMenuButton>
          <SelectPrimitive.Root
            value={alignment}
            onValueChange={value =>
              editor.chain().focus().setTextAlign(value).run()
            }
          >
            <SelectPrimitive.Trigger className='flex items-center'>
              <EditorMenuButton
                active={editor.isActive({ textAlign: alignment })}
              >
                {editor.isActive({ textAlign: 'left' }) && (
                  <Bars3CenterLeftIcon />
                )}
                {editor.isActive({ textAlign: 'center' }) && <Bars3Icon />}
                {editor.isActive({ textAlign: 'right' }) && (
                  <Bars3CenterLeftIcon className='rotate-180' />
                )}
                {!editor.isActive({ textAlign: 'left' }) &&
                  !editor.isActive({
                    textAlign: 'center',
                  }) &&
                  !editor.isActive({ textAlign: 'right' }) && <Bars2Icon />}
              </EditorMenuButton>
            </SelectPrimitive.Trigger>
            <SelectContent
              align='center'
              className='flex w-fit min-w-0 flex-row gap-2 px-1 pt-1'
            >
              <SelectPrimitive.Item value='left' asChild>
                <EditorMenuButton
                  active={editor.isActive({ textAlign: 'left' })}
                >
                  <Bars3CenterLeftIcon />
                </EditorMenuButton>
              </SelectPrimitive.Item>
              <SelectPrimitive.Item value='center' asChild>
                <EditorMenuButton
                  className='ml-2'
                  active={editor.isActive({ textAlign: 'center' })}
                >
                  <Bars3Icon />
                </EditorMenuButton>
              </SelectPrimitive.Item>
              <SelectPrimitive.Item value='right' asChild>
                <EditorMenuButton
                  className='ml-2'
                  active={editor.isActive({ textAlign: 'right' })}
                >
                  <Bars3CenterLeftIcon className='rotate-180' />
                </EditorMenuButton>
              </SelectPrimitive.Item>
            </SelectContent>
          </SelectPrimitive.Root>
          <EditorMenuButton onClick={setLink} active={editor.isActive('link')}>
            {<LinkIcon />}
          </EditorMenuButton>
        </div>
      </div>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // @ts-ignore
  TextStyle.configure({ types: [ListItem.name] }),
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
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: 'https',
  }),
]

interface IEditorProps {
  content: Content
  onContentChange?: (content: string) => void
  onUpdate?: (props: EditorEvents['update']) => void
  onFocus?: (props: EditorEvents['focus']) => void
  onBlur?: (props: EditorEvents['blur']) => void
  className?: string
  label?: string
  description?: string
  id?: string
}

const Editor: React.FC<IEditorProps> = ({
  content,
  className,
  label,
  description,
  id,
  onContentChange,
  onUpdate,
  ...props
}) => {
  const innerId = useId()
  return (
    <div>
      {label && (
        <Label className='mb-2 inline-block' htmlFor={id || innerId}>
          {label}
        </Label>
      )}
      <EditorProvider
        editorProps={{
          attributes: {
            class: cn(
              'prose prose-sm box-border min-h-[40px] w-full max-w-none rounded-[6px] border border-transparent-gray bg-white px-[16px] py-[12px] sm:prose-base focus-within:border-primary focus:outline-none',
              className,
            ),
            id: id || innerId,
          },
        }}
        slotBefore={<MenuBar />}
        extensions={[
          ...extensions,
          Placeholder.configure({
            placeholder: 'Write something ...',
          }),
        ]}
        content={content}
        onUpdate={props => {
          if (typeof onContentChange === 'function') {
            onContentChange(props.editor.getText())
          }
          if (typeof onUpdate === 'function') {
            onUpdate(props)
          }
        }}
        {...props}
      />
      {description && (
        <p className='mt-2 text-sm text-slate-400'>{description}</p>
      )}
    </div>
  )
}

export default Editor
