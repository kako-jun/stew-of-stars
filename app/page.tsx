'use client'

import { useState } from 'react'
import BirthDateForm from '@/components/BirthDateForm'
import StewAnimation from '@/components/StewAnimation'
import ResultDisplay from '@/components/ResultDisplay'
import { calculateFourPillars, type BirthData, type FourPillars } from '@/lib/shichuu-suimei'

type AppState = 'input' | 'cooking' | 'result'

export default function Home() {
  const [state, setState] = useState<AppState>('input')
  const [birthData, setBirthData] = useState<BirthData | null>(null)
  const [fourPillars, setFourPillars] = useState<FourPillars | null>(null)

  const handleSubmit = (data: BirthData) => {
    setBirthData(data)
    const pillars = calculateFourPillars(data)
    setFourPillars(pillars)
    setState('cooking')
  }

  const handleCookingComplete = () => {
    setState('result')
  }

  const handleReset = () => {
    setState('input')
    setBirthData(null)
    setFourPillars(null)
  }

  if (state === 'cooking') {
    return <StewAnimation onComplete={handleCookingComplete} />
  }

  if (state === 'result' && birthData && fourPillars) {
    return <ResultDisplay birthData={birthData} fourPillars={fourPillars} onReset={handleReset} />
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">🍲 Stew of Stars</h1>
        <p className="mb-2 text-xl">四柱推命 | 八字命学 | Four Pillars of Destiny</p>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
          A cosmic blend of destiny and elements
        </p>
        <p className="mb-8 text-sm text-gray-500">Your fate, slow-cooked in the stars...</p>

        <BirthDateForm onSubmit={handleSubmit} />
      </div>
    </main>
  )
}
