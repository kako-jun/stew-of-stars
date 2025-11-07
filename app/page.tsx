'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import BirthDateForm from '@/components/BirthDateForm'
import StewAnimation from '@/components/StewAnimation'
import ResultDisplay from '@/components/ResultDisplay'
import SiteShareButtons from '@/components/SiteShareButtons'
import { calculateFourPillars, type BirthData, type FourPillars } from '@/lib/shichuu-suimei'
import { decodeBirthDataFromUrl, encodeBirthDataToUrl } from '@/lib/url-utils'

type AppState = 'input' | 'cooking' | 'result'

function HomeContent() {
  const [state, setState] = useState<AppState>('input')
  const [birthData, setBirthData] = useState<BirthData | null>(null)
  const [fourPillars, setFourPillars] = useState<FourPillars | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  // URLパラメータから生年月日を読み取って結果を表示
  useEffect(() => {
    const dataParam = searchParams.get('d')
    if (dataParam) {
      const decoded = decodeBirthDataFromUrl(dataParam)
      if (decoded) {
        setBirthData(decoded)
        const pillars = calculateFourPillars(decoded)
        setFourPillars(pillars)
        setState('result')
      }
    }
  }, [searchParams])

  const handleSubmit = (data: BirthData) => {
    setBirthData(data)
    const pillars = calculateFourPillars(data)
    setFourPillars(pillars)

    // URLを更新
    const encoded = encodeBirthDataToUrl(data)
    router.push(`/?d=${encoded}`)

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
    <main className="stardust-bg flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-6xl font-bold text-transparent drop-shadow-lg dark:from-purple-400 dark:to-pink-400">
            🍲 Stew of Stars
          </h1>
          <p className="mb-2 text-xl font-semibold text-purple-700 dark:text-purple-300">
            四柱推命 | 八字命学 | Four Pillars of Destiny
          </p>
          <p className="mb-8 text-lg font-medium text-purple-600 dark:text-purple-400">
            A cosmic blend of destiny and elements
          </p>
          <p className="mb-8 text-sm italic text-purple-500 dark:text-purple-300">
            Your fate, slow-cooked in the stars...
          </p>

          <BirthDateForm onSubmit={handleSubmit} />
        </div>

        {/* サイトシェアボタン */}
        <SiteShareButtons />
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="stardust-bg flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="text-6xl">🍲</div>
            <p className="mt-4 text-xl font-semibold text-purple-700 dark:text-purple-300">
              Loading...
            </p>
          </div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  )
}
