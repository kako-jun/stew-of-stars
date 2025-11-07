'use client'

import type { BirthData, FourPillars, FiveElement } from '@/lib/shichuu-suimei'
import {
  stemBranchToString,
  stemToElement,
  branchToElement,
  FIVE_ELEMENTS,
} from '@/lib/shichuu-suimei'
import { analyzePersonality } from '@/lib/interpretations'
import ElementRadarChart from './ElementRadarChart'

interface ResultDisplayProps {
  birthData: BirthData
  fourPillars: FourPillars
  onReset: () => void
}

export default function ResultDisplay({ birthData, fourPillars, onReset }: ResultDisplayProps) {
  // 五行の分布を計算
  const elementCounts: Record<FiveElement, number> = {
    木: 0,
    火: 0,
    土: 0,
    金: 0,
    水: 0,
  }

  // 年柱、月柱、日柱、時柱の天干と地支から五行をカウント
  const pillars = [fourPillars.year, fourPillars.month, fourPillars.day, fourPillars.hour]
  pillars.forEach((pillar) => {
    const stemElement = stemToElement(pillar.stem)
    const branchElement = branchToElement(pillar.branch)
    elementCounts[stemElement]++
    elementCounts[branchElement]++
  })

  // 性格分析を実行
  const personality = analyzePersonality(fourPillars, elementCounts)

  // 五行の絵文字マッピング
  const elementEmojis: Record<string, string> = {
    木: '🪵',
    火: '🔥',
    土: '🌍',
    金: '🔶',
    水: '💧',
  }

  return (
    <div className="stardust-bg flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl space-y-8">
        {/* タイトル */}
        <div className="text-center">
          <h1 className="mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-5xl font-bold text-transparent drop-shadow-lg dark:from-purple-400 dark:to-pink-400">
            ✨ あなたの命式 ✨
          </h1>
          <p className="text-lg font-semibold text-purple-700 dark:text-purple-300">
            Your Four Pillars
          </p>
        </div>

        {/* 生年月日情報 */}
        <div className="mystic-gradient rounded-2xl p-6 text-center shadow-xl">
          <p className="text-2xl font-bold text-white">
            {birthData.year}年 {birthData.month}月 {birthData.day}日 {birthData.hour}時
          </p>
        </div>

        {/* 四柱 */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <PillarCard title="年柱 (Year)" pillar={fourPillars.year} />
          <PillarCard title="月柱 (Month)" pillar={fourPillars.month} />
          <PillarCard title="日柱 (Day)" pillar={fourPillars.day} />
          <PillarCard title="時柱 (Hour)" pillar={fourPillars.hour} />
        </div>

        {/* 五行の分布 */}
        <div className="rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm dark:bg-purple-950/70">
          <h2 className="mb-6 text-center text-3xl font-bold text-purple-700 dark:text-purple-300">
            五行の分布 (Five Elements)
          </h2>
          <div className="grid grid-cols-5 gap-4">
            {FIVE_ELEMENTS.map((element) => (
              <div key={element} className="text-center">
                <div className="mb-2 text-5xl">{elementEmojis[element]}</div>
                <div className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                  {element}
                </div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {elementCounts[element]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 五行バランスのレーダーチャート */}
        <div className="space-y-4">
          <h2 className="text-center text-3xl font-bold text-purple-700 dark:text-purple-300">
            📊 五行バランスチャート
          </h2>
          <ElementRadarChart elementCounts={elementCounts} />
        </div>

        {/* あなたの本質（日干） */}
        <div className="rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm dark:bg-purple-950/70">
          <h2 className="mb-6 text-center text-3xl font-bold text-purple-700 dark:text-purple-300">
            ✨ あなたの本質
          </h2>
          <div className="space-y-4">
            <div className="text-center">
              <div className="mb-2 text-6xl">{elementEmojis[personality.dayStem.element]}</div>
              <h3 className="mb-2 text-2xl font-bold text-purple-800 dark:text-purple-200">
                {personality.dayStem.title}
              </h3>
              <p className="text-lg text-purple-700 dark:text-purple-300">
                {personality.dayStem.description}
              </p>
            </div>
            <div className="mt-6 space-y-2">
              {personality.dayStem.traits.map((trait, index) => (
                <div
                  key={index}
                  className="flex items-start rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30"
                >
                  <span className="mr-2 text-purple-600 dark:text-purple-400">✦</span>
                  <span className="text-purple-800 dark:text-purple-200">{trait}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 五行バランスの解釈 */}
        <div className="rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm dark:bg-purple-950/70">
          <h2 className="mb-6 text-center text-3xl font-bold text-purple-700 dark:text-purple-300">
            🔮 五行バランスの解釈
          </h2>
          <div className="space-y-4">
            {personality.elementBalance.map((balance) => {
              if (balance.status === 'balanced') return null
              return (
                <div
                  key={balance.element}
                  className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-900/30"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-3xl">{elementEmojis[balance.element]}</span>
                    <span className="text-xl font-bold text-purple-800 dark:text-purple-200">
                      {balance.element}
                    </span>
                    <span
                      className={`ml-auto rounded-full px-3 py-1 text-sm font-semibold ${
                        balance.status === 'excess'
                          ? 'bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                          : 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}
                    >
                      {balance.status === 'excess' ? '過多' : '不足'}
                    </span>
                  </div>
                  <p className="mb-3 text-purple-700 dark:text-purple-300">
                    {balance.interpretation}
                  </p>

                  {/* 具体的なアドバイス（不足・過多の要素） */}
                  {balance.practicalAdvice && balance.practicalAdvice.length > 0 && (
                    <div className="mt-3 rounded-lg bg-white/50 p-3 dark:bg-purple-900/50">
                      <p className="mb-2 text-sm font-bold text-purple-800 dark:text-purple-200">
                        {balance.status === 'lacking' ? '💡 具体的な取り入れ方：' : '💡 具体的なバランスの取り方：'}
                      </p>
                      <ul className="space-y-1 text-sm text-purple-700 dark:text-purple-300">
                        {balance.practicalAdvice.map((advice, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{advice}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 総合アドバイス */}
        <div className="mystic-gradient rounded-2xl p-8 text-white shadow-2xl">
          <h2 className="mb-4 text-center text-3xl font-bold">💫 総合アドバイス</h2>
          <p className="whitespace-pre-line text-lg leading-relaxed">
            {personality.overallAdvice}
          </p>
        </div>

        {/* リセットボタン */}
        <div className="text-center">
          <button
            onClick={onReset}
            className="mystic-gradient-reverse rounded-lg px-8 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            🔄 もう一度占う / Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

// 柱カードコンポーネント
function PillarCard({ title, pillar }: { title: string; pillar: FourPillars['year'] }) {
  const stemElement = stemToElement(pillar.stem)
  const branchElement = branchToElement(pillar.branch)

  const elementEmojis: Record<string, string> = {
    木: '🪵',
    火: '🔥',
    土: '🌍',
    金: '🔶',
    水: '💧',
  }

  return (
    <div className="mystic-gradient rounded-2xl p-6 text-white shadow-xl transition-all hover:scale-105">
      <div className="mb-2 text-center text-sm font-bold uppercase tracking-wide">{title}</div>
      <div className="mb-3 text-center text-5xl font-bold">{stemBranchToString(pillar)}</div>
      <div className="flex justify-around text-3xl">
        <div title={`天干: ${stemElement}`}>{elementEmojis[stemElement]}</div>
        <div title={`地支: ${branchElement}`}>{elementEmojis[branchElement]}</div>
      </div>
    </div>
  )
}
