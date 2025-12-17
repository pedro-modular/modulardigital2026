import Link from 'next/link'

interface ProductCardProps {
  slug: string
  name: string
  tagline: string
  description: string
  category: string
  audience: string
  icon: string
}

const icons: Record<string, React.ReactNode> = {
  wallet: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
    </svg>
  ),
  clipboard: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  ),
  document: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  users: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
}

export function ProductCard({
  slug,
  name,
  tagline,
  description,
  category,
  audience,
  icon,
}: ProductCardProps) {
  return (
    <Link
      href={`/produtos/${slug}`}
      className="group relative flex flex-col rounded-2xl border border-[#e5e5e5] bg-white p-6 transition-all hover:border-[#e72f3f] hover:shadow-lg lg:p-8"
    >
      {/* Category Badge */}
      <span className="absolute right-4 top-4 rounded-full bg-[#f5f3f0] px-3 py-1 text-xs font-medium text-[#525252]">
        {category}
      </span>

      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a1a1a] text-white transition-colors group-hover:bg-[#e72f3f]">
        {icons[icon] || icons.document}
      </div>

      {/* Title */}
      <h2 className="mt-6 text-xl font-bold text-[#1a1a1a] transition-colors group-hover:text-[#e72f3f]">
        {name}
      </h2>

      {/* Tagline */}
      <p className="mt-2 text-sm font-medium text-[#e72f3f]">
        {tagline}
      </p>

      {/* Description */}
      <p className="mt-3 flex-1 text-sm text-[#525252] leading-relaxed">
        {description}
      </p>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs font-medium text-[#737373]">{audience}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f5f5] transition-all group-hover:bg-[#e72f3f] group-hover:translate-x-1">
          <svg
            className="h-4 w-4 text-[#1a1a1a] group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
