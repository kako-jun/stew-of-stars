'use client'

/**
 * サイト自体をシェアするボタン（トップページ用）
 */
export default function SiteShareButtons() {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const shareText = 'Stew of Stars - 四柱推命で運命を占う | 無料占いサイト'

  // Web Share API（モバイル対応）
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareText,
          url: siteUrl,
        })
      } catch (err) {
        console.error('Failed to share:', err)
      }
    }
  }

  // Twitter/X
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`

  // Facebook
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`

  // はてなブックマーク
  const hatenaUrl = `https://b.hatena.ne.jp/entry/${encodeURIComponent(siteUrl)}`

  return (
    <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-md dark:bg-purple-900/50">
      <h3 className="mb-4 text-center text-lg font-bold text-purple-700 dark:text-purple-300">
        🌟 このサイトをシェア
      </h3>

      {/* Web Share API（モバイル対応） */}
      {'share' in navigator && (
        <button
          onClick={handleNativeShare}
          className="mb-4 w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
        >
          📱 シェアする
        </button>
      )}

      {/* SNSボタン */}
      <div className="grid grid-cols-3 gap-3">
        {/* Twitter/X */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 rounded-lg bg-black p-3 text-white transition-opacity hover:opacity-80"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="text-xs font-semibold">X</span>
        </a>

        {/* Facebook */}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 rounded-lg bg-blue-600 p-3 text-white transition-opacity hover:opacity-80"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span className="text-xs font-semibold">Facebook</span>
        </a>

        {/* はてなブックマーク */}
        <a
          href={hatenaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 rounded-lg bg-blue-700 p-3 text-white transition-opacity hover:opacity-80"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.47 0C22.42 0 24 1.58 24 3.53v16.94c0 1.95-1.58 3.53-3.53 3.53H3.53C1.58 24 0 22.42 0 20.47V3.53C0 1.58 1.58 0 3.53 0h16.94zM8.95 15.95H6.44V8.05h2.51v7.9zm10.56-3.26c0-2.15-1.39-3.11-3.1-3.11-1.71 0-3.1.96-3.1 3.11v.72c0 2.15 1.39 3.11 3.1 3.11 1.71 0 3.1-.96 3.1-3.11v-.72zm-3.1-5.94c1.94 0 5.37.84 5.37 5.12v.72c0 4.28-3.43 5.12-5.37 5.12-1.94 0-5.37-.84-5.37-5.12v-.72c0-4.28 3.43-5.12 5.37-5.12zm-8.86-.55c-.76 0-1.38.62-1.38 1.38s.62 1.38 1.38 1.38 1.38-.62 1.38-1.38-.62-1.38-1.38-1.38z" />
          </svg>
          <span className="text-xs font-semibold">はてな</span>
        </a>
      </div>
    </div>
  )
}
