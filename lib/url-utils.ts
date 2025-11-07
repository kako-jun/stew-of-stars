import type { BirthData } from './shichuu-suimei'

/**
 * 生年月日データをURL用の文字列にエンコード
 * フォーマット: YYYYMMDD-HH
 * 例: 19900115-08 (1990年1月15日8時)
 */
export function encodeBirthDataToUrl(data: BirthData): string {
  const year = data.year.toString().padStart(4, '0')
  const month = data.month.toString().padStart(2, '0')
  const day = data.day.toString().padStart(2, '0')
  const hour = data.hour.toString().padStart(2, '0')
  return `${year}${month}${day}-${hour}`
}

/**
 * URL文字列を生年月日データにデコード
 * フォーマット: YYYYMMDD-HH
 */
export function decodeBirthDataFromUrl(encoded: string): BirthData | null {
  try {
    const match = encoded.match(/^(\d{4})(\d{2})(\d{2})-(\d{2})$/)
    if (!match) return null

    const [, yearStr, monthStr, dayStr, hourStr] = match
    const year = parseInt(yearStr, 10)
    const month = parseInt(monthStr, 10)
    const day = parseInt(dayStr, 10)
    const hour = parseInt(hourStr, 10)

    // 基本的なバリデーション
    if (year < 1900 || year > 2100) return null
    if (month < 1 || month > 12) return null
    if (day < 1 || day > 31) return null
    if (hour < 0 || hour > 23) return null

    return { year, month, day, hour }
  } catch {
    return null
  }
}

/**
 * 生年月日データから完全なURLを生成
 */
export function generateShareUrl(data: BirthData, baseUrl: string = ''): string {
  const encoded = encodeBirthDataToUrl(data)
  const url = new URL(baseUrl || window.location.origin)
  url.searchParams.set('d', encoded)
  return url.toString()
}
