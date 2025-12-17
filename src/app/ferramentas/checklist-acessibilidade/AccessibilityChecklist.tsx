'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wcagChecklistData, type ChecklistItem } from '@/lib/wcag-checklist-data'

const STORAGE_KEY = 'modular_wcag_checklist'

interface ChecklistState {
  checkedItems: Record<string, boolean>
  expandedCategories: Record<string, boolean>
}

function ProgressCircle({ percentage }: { percentage: number }) {
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative">
      <svg className="h-32 w-32 -rotate-90 transform" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#e5e5e5"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#e72f3f"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={percentage}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-bold text-[#1a1a1a]"
        >
          {percentage}%
        </motion.span>
        <span className="text-xs text-[#737373]">Completo</span>
      </div>
    </div>
  )
}

function LevelBadge({ level }: { level: 'A' | 'AA' | 'AAA' }) {
  const colors = {
    A: 'bg-[#1a1a1a] text-white',
    AA: 'bg-[#e72f3f] text-white',
    AAA: 'bg-[#737373] text-white',
  }

  return (
    <span className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded px-1 text-[10px] font-bold ${colors[level]}`}>
      {level}
    </span>
  )
}

function ChecklistItemRow({
  item,
  checked,
  onToggle,
}: {
  item: ChecklistItem
  checked: boolean
  onToggle: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`rounded-lg border transition-colors ${checked ? 'border-green-200 bg-green-50' : 'border-[#e5e5e5] bg-white'}`}>
      <div className="flex items-start gap-3 p-4">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-[#d1d5db] text-[#e72f3f] focus:ring-[#e72f3f] focus:ring-offset-0"
          aria-describedby={`item-${item.id}-description`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <LevelBadge level={item.level} />
            <span className="text-xs text-[#737373]">{item.criterion}</span>
            <span className={`text-sm font-medium ${checked ? 'text-green-800 line-through' : 'text-[#1a1a1a]'}`}>
              {item.title}
            </span>
          </div>
          <p
            id={`item-${item.id}-description`}
            className={`mt-1 text-sm ${checked ? 'text-green-700' : 'text-[#525252]'}`}
          >
            {item.description}
          </p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="shrink-0 p-1 text-[#737373] transition-colors hover:text-[#1a1a1a]"
          aria-expanded={expanded}
          aria-label={expanded ? 'Ocultar detalhes' : 'Ver detalhes'}
        >
          <svg
            className={`h-5 w-5 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#e5e5e5] bg-[#fafafa] px-4 py-3">
              <p className="text-xs font-medium text-[#1a1a1a]">Como verificar:</p>
              <p className="mt-1 text-sm text-[#525252]">{item.howToCheck}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function AccessibilityChecklist() {
  const [state, setState] = useState<ChecklistState>({
    checkedItems: {},
    expandedCategories: wcagChecklistData.reduce((acc, cat) => ({ ...acc, [cat.id]: true }), {}),
  })
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Validate parsed data structure before using
        if (
          parsed &&
          typeof parsed === 'object' &&
          (parsed.checkedItems === undefined || typeof parsed.checkedItems === 'object')
        ) {
          setState((prev) => ({
            ...prev,
            checkedItems: parsed.checkedItems || {},
          }))
        } else {
          // Clear corrupted data
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    } catch (e) {
      console.error('Failed to load checklist state:', e)
      // Clear corrupted data on parse error
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        // Ignore if removal fails
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          checkedItems: state.checkedItems,
          lastUpdated: new Date().toISOString(),
        }))
      } catch (e) {
        console.error('Failed to save checklist state:', e)
      }
    }
  }, [state.checkedItems, isLoaded])

  const toggleItem = (itemId: string) => {
    setState((prev) => ({
      ...prev,
      checkedItems: {
        ...prev.checkedItems,
        [itemId]: !prev.checkedItems[itemId],
      },
    }))
  }

  const toggleCategory = (categoryId: string) => {
    setState((prev) => ({
      ...prev,
      expandedCategories: {
        ...prev.expandedCategories,
        [categoryId]: !prev.expandedCategories[categoryId],
      },
    }))
  }

  const clearAll = () => {
    if (confirm('Tem a certeza que quer limpar todo o progresso?')) {
      setState((prev) => ({
        ...prev,
        checkedItems: {},
      }))
    }
  }

  const stats = useMemo(() => {
    const totalItems = wcagChecklistData.reduce((acc, cat) => acc + cat.items.length, 0)
    const checkedCount = Object.values(state.checkedItems).filter(Boolean).length
    const percentage = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0

    const byCategory = wcagChecklistData.map((cat) => {
      const catChecked = cat.items.filter((item) => state.checkedItems[item.id]).length
      return {
        id: cat.id,
        title: cat.title,
        checked: catChecked,
        total: cat.items.length,
        percentage: Math.round((catChecked / cat.items.length) * 100),
      }
    })

    return { totalItems, checkedCount, percentage, byCategory }
  }, [state.checkedItems])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e72f3f] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <ProgressCircle percentage={stats.percentage} />

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg font-bold text-[#1a1a1a]">Progresso Geral</h2>
            <p className="mt-1 text-sm text-[#525252]">
              {stats.checkedCount} de {stats.totalItems} critérios verificados
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {stats.byCategory.slice(0, 4).map((cat) => (
                <div key={cat.id} className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-[#e5e5e5]">
                    <motion.div
                      className="h-2 rounded-full bg-[#e72f3f]"
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percentage}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="w-12 text-right text-xs text-[#737373]">{cat.percentage}%</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <button
                onClick={clearAll}
                className="inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] bg-white px-4 py-2 text-sm font-medium text-[#525252] transition-colors hover:bg-[#f5f5f5]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                <span>Limpar Tudo</span>
              </button>
            </div>
          </div>
        </div>

        {stats.percentage >= 80 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-lg bg-green-50 p-4 text-center"
          >
            <span className="text-2xl">🎉</span>
            <p className="mt-2 font-medium text-green-800">
              {stats.percentage === 100 ? 'Parabéns! Checklist completa!' : 'Excelente progresso! Continue assim.'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Categories */}
      {wcagChecklistData.map((category) => {
        const catStats = stats.byCategory.find((c) => c.id === category.id)
        const isExpanded = state.expandedCategories[category.id]

        return (
          <div key={category.id} className="rounded-2xl border border-[#e5e5e5] bg-white overflow-hidden">
            <button
              onClick={() => toggleCategory(category.id)}
              className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-[#fafafa]"
              aria-expanded={isExpanded}
            >
              <div>
                <h2 className="text-lg font-bold text-[#1a1a1a]">{category.title}</h2>
                <p className="mt-1 text-sm text-[#525252]">{category.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-[#737373]">
                  {catStats?.checked}/{catStats?.total}
                </span>
                <svg
                  className={`h-5 w-5 text-[#737373] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-[#e5e5e5] p-4 space-y-3">
                    {category.items.map((item) => (
                      <ChecklistItemRow
                        key={item.id}
                        item={item}
                        checked={!!state.checkedItems[item.id]}
                        onToggle={() => toggleItem(item.id)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}

      {/* Save indicator */}
      <div className="rounded-lg bg-[#f5f5f5] p-4 text-center">
        <p className="text-sm text-[#737373]">
          <svg className="mr-2 inline-block h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Progresso guardado automaticamente no seu browser
        </p>
      </div>
    </div>
  )
}
