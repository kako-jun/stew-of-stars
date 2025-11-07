'use client'

import { useEffect, useState } from 'react'

interface StewAnimationProps {
  onComplete: () => void
}

export default function StewAnimation({ onComplete }: StewAnimationProps) {
  const [phase, setPhase] = useState<'falling' | 'cooking' | 'complete'>('falling')
  const [fallingItems, setFallingItems] = useState<string[]>([])

  // 落とすアイテム（星、干支、五行のシンボル）
  const items = ['⭐', '✨', '🌟', '💫', '🐭', '🐮', '🐯', '🐰', '🐲', '🪵', '🔥', '🌍', '🔶', '💧']

  useEffect(() => {
    // Phase 1: アイテムが落ちてくる
    const fallingInterval = setInterval(() => {
      const randomItem = items[Math.floor(Math.random() * items.length)]
      setFallingItems((prev) => [...prev, randomItem])
    }, 300)

    // 3秒後にアイテムを落とすのを停止
    setTimeout(() => {
      clearInterval(fallingInterval)
      setPhase('cooking')
    }, 3000)

    // Phase 2: 煮込み中
    setTimeout(() => {
      setPhase('complete')
    }, 5000)

    // Phase 3: 完了
    setTimeout(() => {
      onComplete()
    }, 6000)

    return () => clearInterval(fallingInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="stardust-bg flex min-h-screen flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center">
        {/* シチュー鍋 */}
        <div className="relative flex items-center justify-center">
          <div className="text-9xl">🍲</div>

          {/* 湯気 */}
          {phase !== 'falling' && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <div className="animate-ping text-4xl opacity-75">💨</div>
            </div>
          )}

          {/* 落ちてくるアイテム */}
          {phase === 'falling' &&
            fallingItems.map((item, index) => (
              <div
                key={index}
                className="animate-fall absolute text-4xl"
                style={{
                  left: `${Math.random() * 100 - 50}px`,
                  top: `-${Math.random() * 100 + 50}px`,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {item}
              </div>
            ))}

          {/* 煮込み中のグツグツエフェクト */}
          {phase === 'cooking' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-bounce text-6xl">✨</div>
            </div>
          )}
        </div>

        {/* メッセージ */}
        <div className="mt-8 text-center">
          {phase === 'falling' && (
            <p className="animate-pulse text-xl font-semibold">
              星と干支と五行を鍋に落としています...
            </p>
          )}
          {phase === 'cooking' && (
            <p className="animate-pulse text-xl font-semibold">
              あなたの運命をじっくり煮込んでいます...
            </p>
          )}
          {phase === 'complete' && (
            <p className="animate-pulse text-xl font-semibold">完成！✨</p>
          )}
        </div>
      </div>

      {/* カスタムアニメーション用のスタイル */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(200px) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall 2s ease-in forwards;
        }
      `}</style>
    </div>
  )
}
