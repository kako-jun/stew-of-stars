'use client'

import { useEffect } from 'react'
import type { FiveElement } from '@/lib/shichuu-suimei'

interface ElementBalance {
  element: FiveElement
  count: number
  status: 'excess' | 'balanced' | 'lacking'
  interpretation: string
  practicalAdvice?: string[]
}

interface ElementDetailModalProps {
  isOpen: boolean
  onClose: () => void
  balance: ElementBalance | null
}

const elementEmojis: Record<FiveElement, string> = {
  木: '🪵',
  火: '🔥',
  土: '🌍',
  金: '🔶',
  水: '💧',
}

/**
 * 五行要素の詳細を表示するモーダル
 */
export default function ElementDetailModal({ isOpen, onClose, balance }: ElementDetailModalProps) {
  // ESCキーで閉じる
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !balance) return null

  const statusLabel = balance.status === 'excess' ? '過多' : balance.status === 'lacking' ? '不足' : 'バランス'
  const statusColor =
    balance.status === 'excess'
      ? 'bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      : balance.status === 'lacking'
        ? 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        : 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-purple-950"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-5xl">{elementEmojis[balance.element]}</span>
            <div>
              <h2 className="text-3xl font-bold text-purple-800 dark:text-purple-200">
                {balance.element}
              </h2>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                カウント: {balance.count}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-purple-600 transition-colors hover:bg-purple-100 dark:text-purple-300 dark:hover:bg-purple-900"
            aria-label="閉じる"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ステータスバッジ */}
        <div className="mb-4">
          <span className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${statusColor}`}>
            {statusLabel}
          </span>
        </div>

        {/* 解釈 */}
        <div className="mb-6 rounded-lg bg-purple-50 p-4 dark:bg-purple-900/30">
          <h3 className="mb-2 font-bold text-purple-800 dark:text-purple-200">解釈</h3>
          <p className="leading-relaxed text-purple-700 dark:text-purple-300">
            {balance.interpretation}
          </p>
        </div>

        {/* 具体的なアドバイス */}
        {balance.practicalAdvice && balance.practicalAdvice.length > 0 && (
          <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/30">
            <h3 className="mb-3 font-bold text-purple-800 dark:text-purple-200">
              {balance.status === 'lacking' ? '💡 具体的な取り入れ方' : '💡 具体的なバランスの取り方'}
            </h3>
            <ul className="space-y-2">
              {balance.practicalAdvice.map((advice, index) => (
                <li key={index} className="flex items-start text-purple-700 dark:text-purple-300">
                  <span className="mr-2 mt-1 text-purple-500">•</span>
                  <span>{advice}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 閉じるボタン */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  )
}
