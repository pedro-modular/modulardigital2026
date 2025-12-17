interface ToolHeroProps {
  eyebrow: string
  title: string
  highlightWord?: string
  description: string
}

export function ToolHero({ eyebrow, title, highlightWord, description }: ToolHeroProps) {
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

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <span className="text-eyebrow text-white/60">{eyebrow}</span>
        <h1 className="mt-6 text-headline text-white">
          {renderTitle()}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  )
}
