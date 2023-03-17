import type { Accessor } from 'solid-js'
import type { ChatMessage } from '@/types'
import MarkdownIt from 'markdown-it'
// @ts-ignore
import mdKatex from 'markdown-it-katex'
import mdHighlight from 'markdown-it-highlightjs'
import IconRefresh from './icons/Refresh'

interface Props {
  role: ChatMessage['role']
  message: Accessor<string> | string
  showRetry?: Accessor<boolean>
  onRetry?: () => void
}

export default ({ role, message, showRetry, onRetry }: Props) => {
  const roleClass = {
    system: 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300',
    user: 'bg-gradient-to-l from-red-500 to-red-500',
    assistant: 'bg-gradient-to-r from-green-500 to-green-500',
  }
  const roleName = {
    system: 'system',
    user: 'me',
    assistant: 'GPT',
  }
  const htmlString = () => {
    const md = MarkdownIt().use(mdKatex).use(mdHighlight)

    if (typeof message === 'function') {
      return md.render(message())
    } else if (typeof message === 'string') {
      return md.render(message)
    }
    return ''
  }
  return (
    <div class="py-2 -mx-4 px-4 transition-colors">
      <div class="flex gap-3 rounded-lg" class:op-80={role === 'user'}>
        <div class={`shrink-0 w-7 h-7 mt-4 rounded-full ${roleClass[role]}`}></div>
        <div class="message prose text-white break-words overflow-visible" innerHTML={htmlString()} />
      </div>
      { showRetry?.() && onRetry && (
        <div class="flex items-center justify-end px-3 mb-2">
          <div onClick={onRetry} class="flex items-center gap-1 px-2 py-0.5 op-70 border border-slate text-white rounded-md text-sm cursor-pointer hover:bg-slate/10">
            <IconRefresh />
            <span>Regenerate</span>
          </div>
        </div>
      )}
    </div>
  )
}
