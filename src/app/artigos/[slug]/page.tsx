import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/content'
import { formatDate } from '@/lib/utils'

const mdxComponents = {
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <span className="block my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        alt={props.alt || ''}
        className="w-full rounded-lg"
      />
    </span>
  ),
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: 'Artigo não encontrado' }
  }

  const title = post.seo?.title || `${post.title} | Modular Digital`
  const description = post.seo?.description || post.description

  return {
    title,
    description,
    alternates: {
      canonical: `https://modulardigital.pt/artigos/${slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      url: `https://modulardigital.pt/artigos/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      ...(post.featured_image && { images: [post.featured_image] }),
    },
  }
}

export default async function ArtigoPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <article className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-[#6b7280]">
            <Link href="/" className="hover:text-[#e72f3f]">Início</Link>
            <span>/</span>
            <Link href="/artigos" className="hover:text-[#e72f3f]">Artigos</Link>
            <span>/</span>
            <span className="truncate text-[#32373c]">{post.title}</span>
          </nav>

          {/* Header */}
          <header>
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
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

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#32373c] sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-6 text-xl text-[#6b7280]">
              {post.description}
            </p>

            <div className="mt-8 flex items-center gap-4 border-y border-[#e5e7eb] py-4 text-sm text-[#6b7280]">
              <span>{post.author}</span>
              <span>•</span>
              <time dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>

            {/* Featured Image */}
            {post.featured_image && (
              <div className="mt-8 overflow-hidden rounded-2xl">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  width={800}
                  height={450}
                  className="w-full object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-lg mt-12 max-w-none prose-headings:text-[#32373c] prose-p:text-[#6b7280] prose-a:text-[#e72f3f] prose-strong:text-[#32373c] prose-img:rounded-lg">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          {/* Footer */}
          <footer className="mt-16 border-t border-[#e5e7eb] pt-8">
            <Link
              href="/artigos"
              className="inline-flex items-center gap-2 text-[#e72f3f] hover:underline"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Voltar aos artigos
            </Link>
          </footer>
        </div>
      </article>
    </>
  )
}
