'use client'

import { useState } from 'react'
import type { BirthData } from '@/lib/shichuu-suimei'
import { generateShareUrl } from '@/lib/url-utils'

interface ShareButtonsProps {
  birthData: BirthData
}

/**
 * SNSシェアボタンコンポーネント
 */
export default function ShareButtons({ birthData }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  // 共有URL
  const shareUrl = typeof window !== 'undefined' ? generateShareUrl(birthData) : ''
  const shareText = '私の四柱推命の結果をシェア！ | Stew of Stars'

  // URLをコピー
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  // Web Share API（モバイル対応）
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareText,
          url: shareUrl,
        })
      } catch (err) {
        console.error('Failed to share:', err)
      }
    }
  }

  // Twitter/X
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`

  // Facebook
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`

  // LINE
  const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(`${shareText} ${shareUrl}`)}`

  // はてなブックマーク
  const hatenaUrl = `https://b.hatena.ne.jp/entry/${encodeURIComponent(shareUrl)}`

  return (
    <div className="rounded-2xl bg-white/90 p-6 shadow-2xl backdrop-blur-sm dark:bg-purple-950/70">
      <h3 className="mb-4 text-center text-xl font-bold text-purple-700 dark:text-purple-300">
        🔗 結果をシェア
      </h3>

      {/* Web Share API（モバイル対応） */}
      {'share' in navigator && (
        <button
          onClick={handleNativeShare}
          className="mb-4 w-full rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
        >
          📱 シェアする
        </button>
      )}

      {/* SNSボタン */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {/* Twitter/X */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 font-semibold text-white transition-opacity hover:opacity-80"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="hidden sm:inline">X</span>
        </a>

        {/* Facebook */}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-opacity hover:opacity-80"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span className="hidden sm:inline">Facebook</span>
        </a>

        {/* LINE */}
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-3 font-semibold text-white transition-opacity hover:opacity-80"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          <span className="hidden sm:inline">LINE</span>
        </a>

        {/* はてなブックマーク */}
        <a
          href={hatenaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition-opacity hover:opacity-80"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.47 0C22.42 0 24 1.58 24 3.53v16.94c0 1.95-1.58 3.53-3.53 3.53H3.53C1.58 24 0 22.42 0 20.47V3.53C0 1.58 1.58 0 3.53 0h16.94zM8.95 15.95H6.44V8.05h2.51v7.9zm10.56-3.26c0-2.15-1.39-3.11-3.1-3.11-1.71 0-3.1.96-3.1 3.11v.72c0 2.15 1.39 3.11 3.1 3.11 1.71 0 3.1-.96 3.1-3.11v-.72zm-3.1-5.94c1.94 0 5.37.84 5.37 5.12v.72c0 4.28-3.43 5.12-5.37 5.12-1.94 0-5.37-.84-5.37-5.12v-.72c0-4.28 3.43-5.12 5.37-5.12zm-8.86-.55c-.76 0-1.38.62-1.38 1.38s.62 1.38 1.38 1.38 1.38-.62 1.38-1.38-.62-1.38-1.38-1.38z" />
          </svg>
          <span className="hidden sm:inline">はてな</span>
        </a>
      </div>

      {/* URLコピーボタン */}
      <div className="mt-4">
        <button
          onClick={handleCopyUrl}
          className="w-full rounded-lg bg-purple-100 px-4 py-3 font-semibold text-purple-800 transition-colors hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-200 dark:hover:bg-purple-900"
        >
          {copied ? '✓ コピーしました！' : '📋 URLをコピー'}
        </button>
      </div>

      {/* URL表示 */}
      <div className="mt-3 overflow-hidden text-ellipsis rounded-lg bg-purple-50 p-3 text-center text-xs text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
        {shareUrl}
      </div>
    </div>
  )
}
