'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ConvertedImage {
  id: string
  originalName: string
  originalSize: number
  originalType: string
  convertedSize: number
  compressionRatio: number
  previewUrl: string
  blob: Blob
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function QualityPreset({
  label,
  value,
  description,
  selected,
  onSelect,
}: {
  label: string
  value: number
  description: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={`flex flex-1 flex-col items-center rounded-lg border-2 p-3 transition-all ${
        selected
          ? 'border-[#e72f3f] bg-[#e72f3f]/5'
          : 'border-[#e5e5e5] bg-white hover:border-[#1a1a1a]'
      }`}
    >
      <span className={`text-lg font-bold ${selected ? 'text-[#e72f3f]' : 'text-[#1a1a1a]'}`}>
        {value}%
      </span>
      <span className={`text-xs ${selected ? 'text-[#e72f3f]' : 'text-[#525252]'}`}>{label}</span>
    </button>
  )
}

function ImageResult({
  image,
  onDownload,
  onRemove,
}: {
  image: ConvertedImage
  onDownload: () => void
  onRemove: () => void
}) {
  const savingsPercent = image.compressionRatio.toFixed(0)
  const isGoodCompression = image.compressionRatio > 20

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="rounded-xl border border-[#e5e5e5] bg-white p-4"
    >
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#f5f5f5]">
          <img
            src={image.previewUrl}
            alt={image.originalName}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium text-[#1a1a1a]">{image.originalName}</p>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#737373]">{formatFileSize(image.originalSize)}</span>
            <svg className="h-3 w-3 text-[#737373]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
            <span className="font-medium text-[#1a1a1a]">{formatFileSize(image.convertedSize)}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                isGoodCompression
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              -{savingsPercent}%
            </span>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={onDownload}
              className="inline-flex items-center gap-1 rounded-full bg-[#1a1a1a] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-black"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download
            </button>
            <button
              onClick={onRemove}
              className="inline-flex items-center gap-1 rounded-full border border-[#e5e5e5] bg-white px-3 py-1.5 text-xs font-medium text-[#525252] transition-colors hover:bg-[#f5f5f5]"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Remover
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function WebPConverter() {
  const [quality, setQuality] = useState(80)
  const [images, setImages] = useState<ConvertedImage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const convertToWebP = useCallback(
    async (file: File): Promise<ConvertedImage> => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const sourceUrl = URL.createObjectURL(file)

        img.onload = () => {
          // Revoke source blob URL to prevent memory leak
          URL.revokeObjectURL(sourceUrl)

          canvas.width = img.width
          canvas.height = img.height
          ctx?.drawImage(img, 0, 0)

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Conversion failed'))
                return
              }

              const compressionRatio = ((file.size - blob.size) / file.size) * 100

              resolve({
                id: crypto.randomUUID(),
                originalName: file.name,
                originalSize: file.size,
                originalType: file.type,
                convertedSize: blob.size,
                compressionRatio,
                previewUrl: URL.createObjectURL(blob),
                blob,
              })
            },
            'image/webp',
            quality / 100
          )
        }

        img.onerror = () => {
          URL.revokeObjectURL(sourceUrl)
          reject(new Error('Failed to load image'))
        }
        img.src = sourceUrl
      })
    },
    [quality]
  )

  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
  const MAX_FILES = 20

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      const validFiles = Array.from(files)
        .filter((file) =>
          ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
        )
        .filter((file) => file.size <= MAX_FILE_SIZE)
        .slice(0, MAX_FILES - images.length) // Respect total limit

      if (validFiles.length === 0) return

      setIsProcessing(true)

      const results: ConvertedImage[] = []
      for (const file of validFiles) {
        try {
          const result = await convertToWebP(file)
          results.push(result)
        } catch (e) {
          console.error(`Failed to convert ${file.name}:`, e)
        }
      }

      setImages((prev) => [...prev, ...results])
      setIsProcessing(false)
    },
    [convertToWebP, images.length]
  )

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files)
      }
    },
    [processFiles]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files)
      }
    },
    [processFiles]
  )

  const downloadImage = useCallback((image: ConvertedImage) => {
    const link = document.createElement('a')
    link.href = image.previewUrl
    link.download = image.originalName.replace(/\.[^.]+$/, '.webp')
    link.click()
  }, [])

  const downloadAll = useCallback(() => {
    images.forEach((image, index) => {
      setTimeout(() => downloadImage(image), index * 300)
    })
  }, [images, downloadImage])

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id)
      if (image) {
        URL.revokeObjectURL(image.previewUrl)
      }
      return prev.filter((img) => img.id !== id)
    })
  }, [])

  const clearAll = useCallback(() => {
    images.forEach((image) => URL.revokeObjectURL(image.previewUrl))
    setImages([])
  }, [images])

  const totalSaved = images.reduce((acc, img) => acc + (img.originalSize - img.convertedSize), 0)
  const averageCompression =
    images.length > 0
      ? images.reduce((acc, img) => acc + img.compressionRatio, 0) / images.length
      : 0

  return (
    <div className="space-y-6">
      {/* Quality settings */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Qualidade de Conversão</h2>

        <div className="mt-6">
          <div className="flex gap-3">
            <QualityPreset
              label="Compressão Máxima"
              value={60}
              description="Ficheiros muito pequenos"
              selected={quality === 60}
              onSelect={() => setQuality(60)}
            />
            <QualityPreset
              label="Recomendado"
              value={80}
              description="Melhor equilíbrio"
              selected={quality === 80}
              onSelect={() => setQuality(80)}
            />
            <QualityPreset
              label="Alta Qualidade"
              value={95}
              description="Mínima perda visual"
              selected={quality === 95}
              onSelect={() => setQuality(95)}
            />
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <label htmlFor="quality-slider" className="text-sm font-medium text-[#1a1a1a]">
                Ajuste manual
              </label>
              <span className="text-sm font-bold text-[#e72f3f]">{quality}%</span>
            </div>
            <input
              type="range"
              id="quality-slider"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="mt-2 w-full accent-[#e72f3f]"
            />
            <div className="mt-1 flex justify-between text-xs text-[#737373]">
              <span>Menor ficheiro</span>
              <span>Maior qualidade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Drop zone */}
      <div
        className={`relative rounded-2xl border-2 border-dashed transition-colors ${
          dragActive
            ? 'border-[#e72f3f] bg-[#e72f3f]/5'
            : 'border-[#e5e5e5] bg-white hover:border-[#1a1a1a]'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          multiple
          onChange={handleChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />

        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          {isProcessing ? (
            <>
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#e72f3f] border-t-transparent" />
              <p className="mt-4 text-sm font-medium text-[#1a1a1a]">A converter imagens...</p>
            </>
          ) : (
            <>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f5f5]">
                <svg
                  className={`h-8 w-8 ${dragActive ? 'text-[#e72f3f]' : 'text-[#737373]'}`}
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
                Arraste e largue imagens aqui
              </p>
              <p className="mt-1 text-sm text-[#737373]">
                ou{' '}
                <button
                  onClick={() => inputRef.current?.click()}
                  className="font-medium text-[#e72f3f] hover:underline"
                >
                  clique para selecionar
                </button>
              </p>
              <p className="mt-3 text-xs text-[#a3a3a3]">
                JPG, PNG, GIF ou WebP • Máx. 20 ficheiros • 10MB cada
              </p>
            </>
          )}
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Stats bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#1a1a1a] p-4">
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-xs text-white/60">Imagens convertidas</p>
                  <p className="text-lg font-bold text-white">{images.length}</p>
                </div>
                <div>
                  <p className="text-xs text-white/60">Espaço poupado</p>
                  <p className="text-lg font-bold text-white">{formatFileSize(totalSaved)}</p>
                </div>
                <div>
                  <p className="text-xs text-white/60">Compressão média</p>
                  <p className="text-lg font-bold text-white">{averageCompression.toFixed(0)}%</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={downloadAll}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#1a1a1a] transition-colors hover:bg-[#f5f5f5]"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download Todos
                </button>
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Limpar
                </button>
              </div>
            </div>

            {/* Image list */}
            <div className="grid gap-4 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {images.map((image) => (
                  <ImageResult
                    key={image.id}
                    image={image}
                    onDownload={() => downloadImage(image)}
                    onRemove={() => removeImage(image.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state help */}
      {images.length === 0 && !isProcessing && (
        <div className="rounded-xl bg-[#f5f5f5] p-4 text-center">
          <p className="text-sm text-[#737373]">
            💡 <strong>Dica:</strong> Para melhores resultados, use qualidade 80% para fotografias e 95% para imagens com texto ou gráficos.
          </p>
        </div>
      )}
    </div>
  )
}
