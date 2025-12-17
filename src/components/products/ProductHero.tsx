interface ProductHeroProps {
  eyebrow: string
  title: string
  highlightWord?: string
  description: string
  badge?: string
}

export function ProductHero({ eyebrow, title, highlightWord, description, badge }: ProductHeroProps) {
  const renderTitle = () => {
    if (!highlightWord) {
      return <span>{title}</span>
    }

    const parts = title.split(highlightWord)
    return (
      <>
        {parts[0]}
        <span className="text-[#e72f3f]">{highlightWord}</span>
        {parts[1] || ''}
      </>
    )
  }

  return (
    <section className="relative overflow-hidden bg-[#1a1a1a] grain">
      {/* Decorative elements */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#e72f3f] opacity-5 blur-3xl" />
      <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#e72f3f] opacity-5 blur-3xl" />

      {/* Zapp accent line */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#e72f3f] via-[#e72f3f]/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-eyebrow text-white/60">{eyebrow}</span>
          {badge && (
            <span className="inline-flex items-center rounded-full bg-[#e72f3f]/20 px-3 py-1 text-xs font-medium text-[#e72f3f]">
              {badge}
            </span>
          )}
        </div>
        <h1 className="text-headline text-white">
          {renderTitle()}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  )
}
