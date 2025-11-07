/**
 * 四柱推命の解釈ロジック
 */

import type { HeavenlyStem, FiveElement, FourPillars } from './shichuu-suimei'
import { stemToElement } from './shichuu-suimei'

/**
 * 日干（自分の本質）の解釈
 */
export interface DayStemInterpretation {
  stem: HeavenlyStem
  element: FiveElement
  title: string
  description: string
  traits: string[]
}

export const DAY_STEM_INTERPRETATIONS: Record<HeavenlyStem, DayStemInterpretation> = {
  甲: {
    stem: '甲',
    element: '木',
    title: '大樹の人',
    description: '真っ直ぐに伸びる大木のように、強い信念と正義感を持つ人。',
    traits: [
      '正義感が強く、曲がったことが嫌い',
      'リーダーシップがあり、周りを引っ張る力がある',
      '向上心が強く、常に成長を目指す',
      '頑固な面もあるが、それが信頼につながる',
    ],
  },
  乙: {
    stem: '乙',
    element: '木',
    title: '草花の人',
    description: '柔軟で優雅な草花のように、環境に適応しながら美しく成長する人。',
    traits: [
      '柔軟性があり、どんな環境にも適応できる',
      '美的センスがあり、芸術的才能に恵まれる',
      '人当たりが良く、社交的',
      '内面は強く、粘り強さを持っている',
    ],
  },
  丙: {
    stem: '丙',
    element: '火',
    title: '太陽の人',
    description: '明るく輝く太陽のように、周囲を照らし温める存在感のある人。',
    traits: [
      '明るく陽気で、場の雰囲気を盛り上げる',
      '情熱的で、行動力がある',
      '人を惹きつける魅力がある',
      'オープンで隠し事をしない性格',
    ],
  },
  丁: {
    stem: '丁',
    element: '火',
    title: '灯火の人',
    description: '静かに燃える灯火のように、温かく繊細な光を放つ人。',
    traits: [
      '繊細で感受性が豊か',
      '思いやりがあり、人の心を理解できる',
      '創造的で、芸術的な才能がある',
      '控えめだが、内に強い情熱を秘めている',
    ],
  },
  戊: {
    stem: '戊',
    element: '土',
    title: '山岳の人',
    description: 'どっしりとした山のように、安定感と包容力のある人。',
    traits: [
      '安定感があり、頼りになる存在',
      '包容力があり、人を受け入れる',
      '現実的で、地に足のついた考え方',
      '忍耐強く、コツコツと努力できる',
    ],
  },
  己: {
    stem: '己',
    element: '土',
    title: '大地の人',
    description: '豊かな大地のように、育む力と現実的な知恵を持つ人。',
    traits: [
      '現実的で実用的な考え方',
      '面倒見が良く、人を育てる才能がある',
      '忍耐強く、地道な努力ができる',
      '柔軟性があり、状況に応じて対応できる',
    ],
  },
  庚: {
    stem: '庚',
    element: '金',
    title: '鉄剣の人',
    description: '鋭い剣のように、切れ味鋭く、正義を貫く強い意志を持つ人。',
    traits: [
      '意志が強く、決断力がある',
      '正義感が強く、不正を許さない',
      '率直で、はっきりとものを言う',
      'リーダーシップがあり、先頭に立つ',
    ],
  },
  辛: {
    stem: '辛',
    element: '金',
    title: '宝石の人',
    description: '美しい宝石のように、洗練された美意識と繊細さを持つ人。',
    traits: [
      '美的センスに優れている',
      '繊細で、細かいことに気づく',
      'プライドが高く、品位を大切にする',
      '磨けば光る才能を持っている',
    ],
  },
  壬: {
    stem: '壬',
    element: '水',
    title: '大海の人',
    description: '広大な海のように、スケールが大きく、包容力のある人。',
    traits: [
      'スケールが大きく、視野が広い',
      '包容力があり、多様性を受け入れる',
      '変化を恐れず、柔軟に対応できる',
      '知識欲が旺盛で、学ぶことが好き',
    ],
  },
  癸: {
    stem: '癸',
    element: '水',
    title: '雨露の人',
    description: '静かに降る雨のように、繊細で深い感性を持つ人。',
    traits: [
      '繊細で感受性が豊か',
      '思慮深く、物事を深く考える',
      '想像力が豊かで、創造的',
      '控えめだが、内面は深い',
    ],
  },
}

/**
 * 五行バランスの解釈
 */
export interface ElementBalance {
  element: FiveElement
  count: number
  status: 'excess' | 'balanced' | 'lacking' // 過多、バランス、不足
  interpretation: string
  practicalAdvice?: string[] // 具体的な取り入れ方
}

/**
 * 五行を日常生活で取り入れる具体的な方法
 */
const ELEMENT_PRACTICAL_ADVICE: Record<FiveElement, string[]> = {
  木: [
    '朝早く起きて、新しいことを始める',
    '植物を育てたり、緑の多い場所で過ごす',
    '読書や学習など、知識を増やす活動をする',
    '柔軟体操やヨガで体をほぐす',
    '新しいスキルや趣味に挑戦する',
  ],
  火: [
    '人と積極的に交流し、コミュニケーションを増やす',
    '運動やスポーツで体を動かす',
    '明るい色（赤、オレンジ）の服や小物を取り入れる',
    '情熱的に取り組める活動を見つける',
    '太陽の光を浴びる時間を増やす',
  ],
  土: [
    '規則正しい生活リズムを作る',
    '整理整頓や掃除をこまめに行う',
    '家庭菜園や料理など、土に触れる活動をする',
    '黄色や茶色のアイテムを身につける',
    'ルーティンワークを大切にする',
  ],
  金: [
    '目標を明確に設定し、計画を立てる',
    '不要なものを整理し、シンプルにする',
    '金属製のアクセサリーや小物を持つ',
    '決断力を必要とする活動に取り組む',
    '白や銀色のものを取り入れる',
  ],
  水: [
    '本を読んだり、学習の時間を増やす',
    '柔軟な考え方を意識する',
    '水辺を散歩したり、入浴時間を大切にする',
    '黒や青色のアイテムを身につける',
    '流れに身を任せる経験をする',
  ],
}

/**
 * 五行のバランスを分析
 */
export function analyzeElementBalance(
  elementCounts: Record<FiveElement, number>
): ElementBalance[] {
  const total = Object.values(elementCounts).reduce((sum, count) => sum + count, 0)
  const average = total / 5

  return (['木', '火', '土', '金', '水'] as FiveElement[]).map((element) => {
    const count = elementCounts[element]
    let status: 'excess' | 'balanced' | 'lacking'
    let interpretation: string
    let practicalAdvice: string[] | undefined

    if (count >= average * 1.5) {
      status = 'excess'
      interpretation = getExcessInterpretation(element)
    } else if (count <= average * 0.5) {
      status = 'lacking'
      interpretation = getLackingInterpretation(element)
      // 不足している要素には具体的な取り入れ方を提示
      practicalAdvice = ELEMENT_PRACTICAL_ADVICE[element]
    } else {
      status = 'balanced'
      interpretation = getBalancedInterpretation(element)
    }

    return {
      element,
      count,
      status,
      interpretation,
      practicalAdvice,
    }
  })
}

function getExcessInterpretation(element: FiveElement): string {
  const interpretations: Record<FiveElement, string> = {
    木: '木が多いあなたは、成長意欲と向上心が非常に強い人です。ただし、柔軟性を意識すると、さらにバランスが良くなります。',
    火: '火が多いあなたは、情熱的で行動力があります。時には落ち着いて考える時間を持つことで、より良い結果が得られるでしょう。',
    土: '土が多いあなたは、安定感と現実的な思考が強みです。時には冒険心を持つことで、新しい可能性が開けます。',
    金: '金が多いあなたは、意志が強く、決断力があります。柔軟性と思いやりを意識すると、人間関係がより良くなります。',
    水: '水が多いあなたは、知恵と柔軟性に富んでいます。時には決断力を発揮することで、目標達成が早まります。',
  }
  return interpretations[element]
}

function getLackingInterpretation(element: FiveElement): string {
  const interpretations: Record<FiveElement, string> = {
    木: '木が少ないあなたは、成長や拡大よりも、安定を重視する傾向があります。新しいことへの挑戦を意識すると良いでしょう。',
    火: '火が少ないあなたは、冷静で落ち着いた性格です。時には情熱を表に出すことで、チャンスが広がります。',
    土: '土が少ないあなたは、変化を好む自由な性格です。時には腰を据えて取り組むことで、大きな成果が得られます。',
    金: '金が少ないあなたは、柔軟で適応力があります。時には自分の意見をはっきり主張することも大切です。',
    水: '水が少ないあなたは、実直で一途な性格です。柔軟性と多様な視点を持つことで、可能性が広がります。',
  }
  return interpretations[element]
}

function getBalancedInterpretation(element: FiveElement): string {
  const interpretations: Record<FiveElement, string> = {
    木: '木のバランスが良く、成長と安定の両立ができています。',
    火: '火のバランスが良く、情熱と冷静さを兼ね備えています。',
    土: '土のバランスが良く、安定感と柔軟性を持っています。',
    金: '金のバランスが良く、意志の強さと柔軟性を兼ね備えています。',
    水: '水のバランスが良く、知恵と行動力のバランスが取れています。',
  }
  return interpretations[element]
}

/**
 * 総合的な性格診断
 */
export interface PersonalityAnalysis {
  dayStem: DayStemInterpretation
  elementBalance: ElementBalance[]
  overallAdvice: string
}

export function analyzePersonality(
  fourPillars: FourPillars,
  elementCounts: Record<FiveElement, number>
): PersonalityAnalysis {
  const dayStem = fourPillars.day.stem
  const dayStemInterpretation = DAY_STEM_INTERPRETATIONS[dayStem]
  const elementBalance = analyzeElementBalance(elementCounts)

  // 総合アドバイスを生成
  const excessElements = elementBalance.filter((e) => e.status === 'excess')
  const lackingElements = elementBalance.filter((e) => e.status === 'lacking')

  let overallAdvice = `あなたの日干は「${dayStem}（${dayStemInterpretation.element}）」です。`

  if (excessElements.length > 0) {
    overallAdvice += `\n\n五行では「${excessElements.map((e) => e.element).join('、')}」が強く、`
    overallAdvice += `${dayStemInterpretation.element}の性質が際立っています。`
  }

  if (lackingElements.length > 0) {
    overallAdvice += `\n\n「${lackingElements.map((e) => e.element).join('、')}」の要素を意識的に取り入れることで、`
    overallAdvice += `さらにバランスの取れた人生を送れるでしょう。`
  }

  overallAdvice += `\n\nあなたの持ち味を活かしながら、足りない部分を補うことで、より充実した日々が送れます。`

  return {
    dayStem: dayStemInterpretation,
    elementBalance,
    overallAdvice,
  }
}
