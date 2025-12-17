import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/content'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Artigos sobre SEO, Web Design e Marketing Digital | Modular Digital',
  description: 'Artigos, guias e insights sobre SEO, web design, desenvolvimento web, e-commerce e transformação digital para instituições em Portugal.',
  alternates: {
    canonical: 'https://modulardigital.pt/artigos',
  },
  openGraph: {
    title: 'Artigos sobre SEO, Web Design e Marketing Digital',
    description: 'Artigos, guias e insights sobre SEO, web design, desenvolvimento web, e-commerce e transformação digital.',
    url: 'https://modulardigital.pt/artigos',
    type: 'website',
  },
}

export default function ArtigosPage() {
  const posts = getAllPosts()

  return (
    <>
      {/* Header */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#32373c] sm:text-5xl">
              Artigos
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#6b7280]">
              Insights e guias sobre transformação digital, web design, SEO e tecnologia
              para instituições.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center">
              <p className="text-[#6b7280]">
                Novos artigos em breve.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative flex flex-col rounded-lg border border-[#e5e7eb] bg-white transition-all hover:border-[#e72f3f] hover:shadow-md overflow-hidden"
                >
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#3a3a3a] relative">
                    {post.featured_image ? (
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        width={600}
                        height={338}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src="/uploads/2019/08/modular_icon_branco.png"
                          alt="Modular Digital"
                          width={60}
                          height={60}
                          className="opacity-20"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-4 text-sm text-[#6b7280]">
                      <time dateTime={post.date}>
                        {formatDate(post.date)}
                      </time>
                      <span>{post.readingTime}</span>
                    </div>
                    <h2 className="mt-3 text-lg font-bold text-[#32373c] group-hover:text-[#e72f3f]">
                      <Link href={`/artigos/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-sm text-[#6b7280]">
                      {post.description}
                    </p>
                    {post.categories && post.categories.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.categories.map((category) => (
                          <span
                            key={category}
                            className="rounded-full bg-[#f8f9fa] px-3 py-1 text-xs font-medium text-[#32373c]"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
