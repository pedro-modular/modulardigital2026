'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageSize {
  id: string
  name: string
  width: number
  height: number
  platform: string
}

const imageSizes: ImageSize[] = [
  // Facebook
  { id: 'fb-cover', name: 'Capa', width: 820, height: 312, platform: 'Facebook' },
  { id: 'fb-post', name: 'Post', width: 1200, height: 630, platform: 'Facebook' },
  { id: 'fb-profile', name: 'Foto Perfil', width: 180, height: 180, platform: 'Facebook' },
  { id: 'fb-event', name: 'Evento', width: 1920, height: 1005, platform: 'Facebook' },
  { id: 'fb-story', name: 'Story', width: 1080, height: 1920, platform: 'Facebook' },
  // Instagram
  { id: 'ig-post-sq', name: 'Post Quadrado', width: 1080, height: 1080, platform: 'Instagram' },
  { id: 'ig-post-port', name: 'Post Vertical', width: 1080, height: 1350, platform: 'Instagram' },
  { id: 'ig-post-land', name: 'Post Horizontal', width: 1080, height: 566, platform: 'Instagram' },
  { id: 'ig-story', name: 'Story/Reels', width: 1080, height: 1920, platform: 'Instagram' },
  { id: 'ig-profile', name: 'Foto Perfil', width: 320, height: 320, platform: 'Instagram' },
  // LinkedIn
  { id: 'li-cover', name: 'Banner', width: 1584, height: 396, platform: 'LinkedIn' },
  { id: 'li-post', name: 'Post', width: 1200, height: 627, platform: 'LinkedIn' },
  { id: 'li-profile', name: 'Foto Perfil', width: 400, height: 400, platform: 'LinkedIn' },
  { id: 'li-company', name: 'Logo Empresa', width: 300, height: 300, platform: 'LinkedIn' },
  // Twitter/X
  { id: 'tw-header', name: 'Header', width: 1500, height: 500, platform: 'Twitter/X' },
  { id: 'tw-post', name: 'Post', width: 1200, height: 675, platform: 'Twitter/X' },
  { id: 'tw-profile', name: 'Foto Perfil', width: 400, height: 400, platform: 'Twitter/X' },
  // YouTube
  { id: 'yt-thumbnail', name: 'Thumbnail', width: 1280, height: 720, platform: 'YouTube' },
  { id: 'yt-banner', name: 'Banner Canal', width: 2560, height: 1440, platform: 'YouTube' },
  { id: 'yt-profile', name: 'Foto Canal', width: 800, height: 800, platform: 'YouTube' },
  // WhatsApp
  { id: 'wa-profile', name: 'Foto Perfil', width: 500, height: 500, platform: 'WhatsApp' },
  { id: 'wa-status', name: 'Status', width: 1080, height: 1920, platform: 'WhatsApp' },
]

const platforms = [...new Set(imageSizes.map((s) => s.platform))]

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB

export function ImageResizer() {
  const [sourceImage, setSourceImage] = useState<string | null>(null)
  const [sourceImageName, setSourceImageName] = useState<string>('')
  const [selectedPlatform, setSelectedPlatform] = useState<string>('Instagram')
  const [selectedSize, setSelectedSize] = useState<ImageSize | null>(null)
  const [resizedImage, setResizedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const platformSizes = imageSizes.filter((s) => s.platform === selectedPlatform)

  useEffect(() => {
    // Select first size of platform by default
    if (platformSizes.length > 0 && (!selectedSize || selectedSize.platform !== selectedPlatform)) {
      setSelectedSize(platformSizes[0])
    }
  }, [selectedPlatform, platformSizes, selectedSize])

  // Clean up blob URLs
  useEffect(() => {
    return () => {
      if (sourceImage) URL.revokeObjectURL(sourceImage)
      if (resizedImage) URL.revokeObjectURL(resizedImage)
    }
  }, [sourceImage, resizedImage])

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]

    if (!file.type.startsWith('image/')) {
      setError('Por favor selecione uma imagem válida (JPG, PNG, WebP)')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('A imagem é demasiado grande. Máximo: 20MB')
      return
    }

    setError(null)
    // Revoke old URL
    if (sourceImage) URL.revokeObjectURL(sourceImage)
    if (resizedImage) URL.revokeObjectURL(resizedImage)

    const url = URL.createObjectURL(file)
    setSourceImage(url)
    setSourceImageName(file.name.replace(/\.[^/.]+$/, ''))
    setResizedImage(null)
  }, [sourceImage, resizedImage])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      handleFileSelect(e.dataTransfer.files)
    },
    [handleFileSelect]
  )

  const processImage = useCallback(async () => {
    if (!sourceImage || !selectedSize || !canvasRef.current) return

    setIsProcessing(true)
    setError(null)

    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Erro ao carregar imagem'))
        img.src = sourceImage
      })

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Canvas context not available')

      canvas.width = selectedSize.width
      canvas.height = selectedSize.height

      // Calculate cover fit
      const imgRatio = img.width / img.height
      const targetRatio = selectedSize.width / selectedSize.height

      let sourceWidth = img.width
      let sourceHeight = img.height
      let sourceX = 0
      let sourceY = 0

      if (imgRatio > targetRatio) {
        // Image is wider - crop sides
        sourceWidth = img.height * targetRatio
        sourceX = (img.width - sourceWidth) / 2
      } else {
        // Image is taller - crop top/bottom
        sourceHeight = img.width / targetRatio
        sourceY = (img.height - sourceHeight) / 2
      }

      // Fill with white background (for transparency)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw image
      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        selectedSize.width,
        selectedSize.height
      )

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Revoke old resized URL
            if (resizedImage) URL.revokeObjectURL(resizedImage)
            const url = URL.createObjectURL(blob)
            setResizedImage(url)
          }
          setIsProcessing(false)
        },
        'image/jpeg',
        0.92
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar imagem')
      setIsProcessing(false)
    }
  }, [sourceImage, selectedSize, resizedImage])

  const downloadImage = () => {
    if (!resizedImage || !selectedSize) return

    const link = document.createElement('a')
    link.href = resizedImage
    link.download = `${sourceImageName}-${selectedSize.platform.toLowerCase()}-${selectedSize.name.toLowerCase().replace(/\s+/g, '-')}.jpg`
    link.click()
  }

  const clearAll = () => {
    if (sourceImage) URL.revokeObjectURL(sourceImage)
    if (resizedImage) URL.revokeObjectURL(resizedImage)
    setSourceImage(null)
    setSourceImageName('')
    setResizedImage(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-6">
      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Upload Zone */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1a1a1a]">Imagem Original</h2>
          {sourceImage && (
            <button
              onClick={clearAll}
              className="text-sm text-[#737373] hover:text-[#1a1a1a] transition-colors"
            >
              Limpar
            </button>
          )}
        </div>

        <div className="mt-4">
          {!sourceImage ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#e5e5e5] bg-[#fafafa] p-12 transition-colors hover:border-[#e72f3f] hover:bg-[#fafafa]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f5f5]">
                <svg
                  className="h-8 w-8 text-[#737373]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <p className="mt-4 text-sm font-medium text-[#1a1a1a]">
                Clique para carregar ou arraste a imagem
              </p>
              <p className="mt-2 text-xs text-[#737373]">
                JPG, PNG ou WebP (máx. 20MB)
              </p>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-xl bg-[#f5f5f5]">
              <img
                src={sourceImage}
                alt="Imagem original"
                className="mx-auto max-h-[400px] object-contain"
              />
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

      {/* Size Selection */}
      <AnimatePresence>
        {sourceImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
              <h2 className="text-lg font-bold text-[#1a1a1a]">Tamanho de Destino</h2>

              {/* Platform Tabs */}
              <div className="mt-4 flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedPlatform === platform
                        ? 'bg-[#1a1a1a] text-white'
                        : 'bg-[#f5f5f5] text-[#525252] hover:bg-[#e5e5e5]'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>

              {/* Size Options */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {platformSizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg border-2 p-4 text-left transition-all ${
                      selectedSize?.id === size.id
                        ? 'border-[#e72f3f] bg-[#fef2f2]'
                        : 'border-[#e5e5e5] bg-white hover:border-[#a3a3a3]'
                    }`}
                  >
                    <p className="font-medium text-[#1a1a1a]">{size.name}</p>
                    <p className="mt-1 text-sm text-[#737373]">
                      {size.width} x {size.height}px
                    </p>
                    <div
                      className="mt-2 border border-[#e5e5e5] bg-[#f5f5f5]"
                      style={{
                        width: '100%',
                        maxWidth: '120px',
                        aspectRatio: `${size.width}/${size.height}`,
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Process Button */}
              <div className="mt-6">
                <button
                  onClick={processImage}
                  disabled={isProcessing || !selectedSize}
                  className="magnetic inline-flex items-center gap-2 rounded-full bg-[#e72f3f] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#c4262f] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>A processar...</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                      <span>Redimensionar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Result */}
            {resizedImage && selectedSize && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8"
              >
                <h2 className="text-lg font-bold text-[#1a1a1a]">Resultado</h2>

                <div className="mt-4 overflow-hidden rounded-xl bg-[#f5f5f5] p-4">
                  <img
                    src={resizedImage}
                    alt="Imagem redimensionada"
                    className="mx-auto max-h-[400px] object-contain shadow-lg"
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1a]">
                      {selectedSize.platform} - {selectedSize.name}
                    </p>
                    <p className="text-xs text-[#737373]">
                      {selectedSize.width} x {selectedSize.height} pixels
                    </p>
                  </div>
                  <button
                    onClick={downloadImage}
                    className="magnetic inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-black"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <span>Download JPG</span>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Size Reference */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-[#fafafa] p-6">
        <h3 className="font-bold text-[#1a1a1a]">Tamanhos de Referência</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e5e5e5]">
                <th className="pb-2 text-left font-medium text-[#737373]">Plataforma</th>
                <th className="pb-2 text-left font-medium text-[#737373]">Tipo</th>
                <th className="pb-2 text-left font-medium text-[#737373]">Dimensões</th>
              </tr>
            </thead>
            <tbody>
              {imageSizes.slice(0, 8).map((size) => (
                <tr key={size.id} className="border-b border-[#e5e5e5]">
                  <td className="py-2 text-[#1a1a1a]">{size.platform}</td>
                  <td className="py-2 text-[#525252]">{size.name}</td>
                  <td className="py-2 font-mono text-xs text-[#737373]">
                    {size.width} x {size.height}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
