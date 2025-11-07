'use client'

import { useState } from 'react'
import type { BirthData } from '@/lib/shichuu-suimei'

interface BirthDateFormProps {
  onSubmit: (birthData: BirthData) => void
}

export default function BirthDateForm({ onSubmit }: BirthDateFormProps) {
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [hour, setHour] = useState('12')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const birthData: BirthData = {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      hour: parseInt(hour),
    }

    onSubmit(birthData)
  }

  const currentYear = new Date().getFullYear()
  const isValid =
    year &&
    month &&
    day &&
    parseInt(year) >= 1900 &&
    parseInt(year) <= currentYear &&
    parseInt(month) >= 1 &&
    parseInt(month) <= 12 &&
    parseInt(day) >= 1 &&
    parseInt(day) <= 31

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="year" className="mb-2 block text-sm font-medium">
            生年 / Year
          </label>
          <input
            id="year"
            type="number"
            min="1900"
            max={currentYear}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="1990"
            required
          />
        </div>

        <div>
          <label htmlFor="month" className="mb-2 block text-sm font-medium">
            生月 / Month
          </label>
          <input
            id="month"
            type="number"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="1-12"
            required
          />
        </div>

        <div>
          <label htmlFor="day" className="mb-2 block text-sm font-medium">
            生日 / Day
          </label>
          <input
            id="day"
            type="number"
            min="1"
            max="31"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="1-31"
            required
          />
        </div>

        <div>
          <label htmlFor="hour" className="mb-2 block text-sm font-medium">
            生時 / Hour (optional)
          </label>
          <input
            id="hour"
            type="number"
            min="0"
            max="23"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="0-23 (12 = noon)"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            不明な場合は12（正午）のままで構いません
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-all hover:from-purple-600 hover:to-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        🍲 煮込む / Start Cooking
      </button>
    </form>
  )
}
