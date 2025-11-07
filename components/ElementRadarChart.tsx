'use client'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import type { FiveElement } from '@/lib/shichuu-suimei'

interface ElementRadarChartProps {
  elementCounts: Record<FiveElement, number>
  onElementClick?: (element: FiveElement) => void
}

/**
 * 五行のバランスをレーダーチャートで表示
 */
export default function ElementRadarChart({ elementCounts, onElementClick }: ElementRadarChartProps) {
  // レーダーチャート用のデータ形式に変換
  const chartData = [
    { element: '木', count: elementCounts['木'], fullMark: 8 },
    { element: '火', count: elementCounts['火'], fullMark: 8 },
    { element: '土', count: elementCounts['土'], fullMark: 8 },
    { element: '金', count: elementCounts['金'], fullMark: 8 },
    { element: '水', count: elementCounts['水'], fullMark: 8 },
  ]

  const handleClick = (data: any) => {
    if (data && data.element && onElementClick) {
      onElementClick(data.element as FiveElement)
    }
  }

  return (
    <div className="flex w-full flex-col justify-center rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-md dark:bg-purple-900/50">
      <p className="mb-4 text-center text-sm text-purple-600 dark:text-purple-400">
        💡 各要素をクリックすると詳細が表示されます
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={chartData} onClick={handleClick}>
          <PolarGrid stroke="#9333ea" strokeOpacity={0.3} />
          <PolarAngleAxis
            dataKey="element"
            tick={{ fill: '#9333ea', fontSize: 18, fontWeight: 'bold', cursor: 'pointer' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 8]}
            tick={{ fill: '#9333ea', fontSize: 12 }}
            stroke="#9333ea"
            strokeOpacity={0.5}
          />
          <Radar
            name="五行"
            dataKey="count"
            stroke="#ec4899"
            fill="#ec4899"
            fillOpacity={0.6}
            strokeWidth={2}
            style={{ cursor: 'pointer' }}
          />
        </RadarChart>
      </ResponsiveContainer>

      <style jsx global>{`
        .recharts-polar-angle-axis-tick-value,
        .recharts-polar-radius-axis-tick-value {
          font-family: inherit;
        }
      `}</style>
    </div>
  )
}
