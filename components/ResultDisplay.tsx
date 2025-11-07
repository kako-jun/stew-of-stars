'use client'

import type { BirthData, FourPillars } from '@/lib/shichuu-suimei'
import {
  stemBranchToString,
  stemToElement,
  branchToElement,
  FIVE_ELEMENTS,
} from '@/lib/shichuu-suimei'

interface ResultDisplayProps {
  birthData: BirthData
  fourPillars: FourPillars
  onReset: () => void
}

export default function ResultDisplay({ birthData, fourPillars, onReset }: ResultDisplayProps) {
  // 五行の分布を計算
  const elementCounts: Record<string, number> = {
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

  // 五行の絵文字マッピング
  const elementEmojis: Record<string, string> = {
    木: '🪵',
    火: '🔥',
    土: '🌍',
    金: '🔶',
    水: '💧',
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl space-y-8">
        {/* タイトル */}
        <div className="text-center">
          <h1 className="mb-2 text-5xl font-bold">✨ あなたの命式 ✨</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Your Four Pillars</p>
        </div>

        {/* 生年月日情報 */}
        <div className="rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 p-6 text-center dark:from-purple-900 dark:to-pink-900">
          <p className="text-xl font-semibold">
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
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-center text-2xl font-bold">五行の分布 (Five Elements)</h2>
          <div className="grid grid-cols-5 gap-4">
            {FIVE_ELEMENTS.map((element) => (
              <div key={element} className="text-center">
                <div className="mb-2 text-5xl">{elementEmojis[element]}</div>
                <div className="text-lg font-semibold">{element}</div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {elementCounts[element]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* リセットボタン */}
        <div className="text-center">
          <button
            onClick={onReset}
            className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 font-semibold text-white transition-all hover:from-blue-600 hover:to-cyan-600"
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
    <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white shadow-lg">
      <div className="mb-2 text-center text-sm font-semibold">{title}</div>
      <div className="mb-3 text-center text-5xl font-bold">{stemBranchToString(pillar)}</div>
      <div className="flex justify-around text-2xl">
        <div title={`天干: ${stemElement}`}>{elementEmojis[stemElement]}</div>
        <div title={`地支: ${branchElement}`}>{elementEmojis[branchElement]}</div>
      </div>
    </div>
  )
}
