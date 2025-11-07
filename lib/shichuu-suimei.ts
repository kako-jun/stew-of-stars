/**
 * 四柱推命（八字命学）の計算ロジック
 * Four Pillars of Destiny calculation logic
 */

// 十干（天干）- Heavenly Stems
export const HEAVENLY_STEMS = [
  '甲', // 木 Yang Wood
  '乙', // 木 Yin Wood
  '丙', // 火 Yang Fire
  '丁', // 火 Yin Fire
  '戊', // 土 Yang Earth
  '己', // 土 Yin Earth
  '庚', // 金 Yang Metal
  '辛', // 金 Yin Metal
  '壬', // 水 Yang Water
  '癸', // 水 Yin Water
] as const

// 十二支（地支）- Earthly Branches
export const EARTHLY_BRANCHES = [
  '子', // 鼠 Rat - 水
  '丑', // 牛 Ox - 土
  '寅', // 虎 Tiger - 木
  '卯', // 兎 Rabbit - 木
  '辰', // 龍 Dragon - 土
  '巳', // 蛇 Snake - 火
  '午', // 馬 Horse - 火
  '未', // 羊 Goat - 土
  '申', // 猿 Monkey - 金
  '酉', // 鶏 Rooster - 金
  '戌', // 犬 Dog - 土
  '亥', // 猪 Pig - 水
] as const

// 五行 - Five Elements
export const FIVE_ELEMENTS = ['木', '火', '土', '金', '水'] as const

export type HeavenlyStem = (typeof HEAVENLY_STEMS)[number]
export type EarthlyBranch = (typeof EARTHLY_BRANCHES)[number]
export type FiveElement = (typeof FIVE_ELEMENTS)[number]

// 干支（天干と地支の組み合わせ）- Stem-Branch pair
export interface StemBranch {
  stem: HeavenlyStem
  branch: EarthlyBranch
}

// 四柱 - Four Pillars
export interface FourPillars {
  year: StemBranch // 年柱
  month: StemBranch // 月柱
  day: StemBranch // 日柱
  hour: StemBranch // 時柱
}

// 生年月日時データ
export interface BirthData {
  year: number
  month: number // 1-12
  day: number // 1-31
  hour: number // 0-23
}

/**
 * 十干を五行に変換
 */
export function stemToElement(stem: HeavenlyStem): FiveElement {
  const index = HEAVENLY_STEMS.indexOf(stem)
  if (index === 0 || index === 1) return '木'
  if (index === 2 || index === 3) return '火'
  if (index === 4 || index === 5) return '土'
  if (index === 6 || index === 7) return '金'
  return '水'
}

/**
 * 十二支を五行に変換
 */
export function branchToElement(branch: EarthlyBranch): FiveElement {
  const index = EARTHLY_BRANCHES.indexOf(branch)
  if (index === 0 || index === 11) return '水' // 子、亥
  if (index === 1 || index === 4 || index === 7 || index === 10) return '土' // 丑、辰、未、戌
  if (index === 2 || index === 3) return '木' // 寅、卯
  if (index === 5 || index === 6) return '火' // 巳、午
  return '金' // 申、酉
}

/**
 * 年の干支を計算（西暦から）
 * 基準: 1924年が甲子（干支の最初）
 *
 * 注意: 四柱推命では年の切り替わりは立春（2月4日頃）です。
 * この実装では簡易的に2月4日を基準としていますが、
 * 厳密には節入り時刻（太陽黄経315度）を考慮する必要があります。
 */
export function getYearStemBranch(year: number, month?: number, day?: number): StemBranch {
  let adjustedYear = year

  // 立春前（1月または2月3日以前）の場合は前年扱い
  if (month !== undefined && day !== undefined) {
    if (month === 1 || (month === 2 && day <= 3)) {
      adjustedYear = year - 1
    }
  }

  // 1924年が甲子の年（干支サイクルの開始）
  const baseYear = 1924
  const yearOffset = adjustedYear - baseYear

  const stemIndex = yearOffset % 10
  const branchIndex = yearOffset % 12

  return {
    stem: HEAVENLY_STEMS[((stemIndex % 10) + 10) % 10],
    branch: EARTHLY_BRANCHES[((branchIndex % 12) + 12) % 12],
  }
}

/**
 * 月の干支を計算
 * 月柱の地支は固定、天干は年の天干から計算
 *
 * 注意: 四柱推命では月の切り替わりも節入り日（二十四節気）が基準です。
 * この実装では簡易的に新暦の月をそのまま使用していますが、
 * 厳密には立春、啓蟄、清明などの節入り日を考慮する必要があります。
 */
export function getMonthStemBranch(year: number, month: number, day?: number): StemBranch {
  // 月の地支は固定（節入り日基準だが、ここでは新暦で簡略化）
  const monthBranches: EarthlyBranch[] = [
    '寅', // 1月（立春～啓蟄前）
    '卯', // 2月（啓蟄～清明前）
    '辰', // 3月（清明～立夏前）
    '巳', // 4月（立夏～芒種前）
    '午', // 5月（芒種～小暑前）
    '未', // 6月（小暑～立秋前）
    '申', // 7月（立秋～白露前）
    '酉', // 8月（白露～寒露前）
    '戌', // 9月（寒露～立冬前）
    '亥', // 10月（立冬～大雪前）
    '子', // 11月（大雪～小寒前）
    '丑', // 12月（小寒～立春前）
  ]

  const yearStem = getYearStemBranch(year, month, day).stem
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearStem)

  // 月の天干を計算（年の天干に基づく）
  // 甲己年は丙寅から始まる、乙庚年は戊寅から始まる、など
  const monthStemStart = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0]
  const stemStartIndex = monthStemStart[yearStemIndex]
  const monthStemIndex = (stemStartIndex + (month - 1) * 2) % 10

  return {
    stem: HEAVENLY_STEMS[monthStemIndex],
    branch: monthBranches[month - 1],
  }
}

/**
 * 日の干支を計算
 * ツェラーの公式を使用して日数から干支を計算
 */
export function getDayStemBranch(year: number, month: number, day: number): StemBranch {
  // 1900年1月1日を基準日（辛丑）とする
  const baseDate = new Date(1900, 0, 1)
  const targetDate = new Date(year, month - 1, day)

  // 基準日からの経過日数を計算
  const daysDiff = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24))

  // 1900年1月1日は辛丑（天干7、地支1）
  const baseStemIndex = 7 // 辛
  const baseBranchIndex = 1 // 丑

  const stemIndex = (baseStemIndex + daysDiff) % 10
  const branchIndex = (baseBranchIndex + daysDiff) % 12

  return {
    stem: HEAVENLY_STEMS[((stemIndex % 10) + 10) % 10],
    branch: EARTHLY_BRANCHES[((branchIndex % 12) + 12) % 12],
  }
}

/**
 * 時の干支を計算
 */
export function getHourStemBranch(year: number, month: number, day: number, hour: number): StemBranch {
  // 時の地支（2時間ごと）
  const hourBranches: EarthlyBranch[] = [
    '子', // 23-1時
    '丑', // 1-3時
    '寅', // 3-5時
    '卯', // 5-7時
    '辰', // 7-9時
    '巳', // 9-11時
    '午', // 11-13時
    '未', // 13-15時
    '申', // 15-17時
    '酉', // 17-19時
    '戌', // 19-21時
    '亥', // 21-23時
  ]

  const hourBranchIndex = Math.floor(((hour + 1) % 24) / 2)
  const branch = hourBranches[hourBranchIndex]

  // 時の天干は日の天干から計算
  const dayStem = getDayStemBranch(year, month, day).stem
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayStem)

  // 日の天干に基づいて時の天干を計算
  const hourStemStart = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8]
  const stemStartIndex = hourStemStart[dayStemIndex]
  const hourStemIndex = (stemStartIndex + hourBranchIndex) % 10

  return {
    stem: HEAVENLY_STEMS[hourStemIndex],
    branch,
  }
}

/**
 * 四柱推命を計算
 *
 * 注意: この実装は簡易版です。正確な四柱推命では以下を考慮する必要があります：
 * - 年柱: 立春（2月4日頃）の節入り時刻
 * - 月柱: 各月の節入り日（二十四節気）と節入り時刻
 * - 日柱・時柱: 出生地の経度による真太陽時の調整
 */
export function calculateFourPillars(birthData: BirthData): FourPillars {
  return {
    year: getYearStemBranch(birthData.year, birthData.month, birthData.day),
    month: getMonthStemBranch(birthData.year, birthData.month, birthData.day),
    day: getDayStemBranch(birthData.year, birthData.month, birthData.day),
    hour: getHourStemBranch(birthData.year, birthData.month, birthData.day, birthData.hour),
  }
}

/**
 * 干支を文字列に変換
 */
export function stemBranchToString(stemBranch: StemBranch): string {
  return `${stemBranch.stem}${stemBranch.branch}`
}

/**
 * 四柱を文字列に変換
 */
export function fourPillarsToString(fourPillars: FourPillars): string {
  return `${stemBranchToString(fourPillars.year)} ${stemBranchToString(fourPillars.month)} ${stemBranchToString(fourPillars.day)} ${stemBranchToString(fourPillars.hour)}`
}
