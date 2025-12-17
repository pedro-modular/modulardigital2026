'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts'

interface InputFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  suffix?: string
  prefix?: string
  hint?: string
}

function InputField({ label, value, onChange, placeholder, suffix, prefix, hint }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#1a1a1a] mb-2">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]">{prefix}</span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-[#e5e5e5] bg-white py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0 ${
            prefix ? 'pl-8 pr-4' : suffix ? 'pl-4 pr-10' : 'px-4'
          }`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737373]">{suffix}</span>
        )}
      </div>
      {hint && <p className="mt-1.5 text-xs text-[#737373]">{hint}</p>}
    </div>
  )
}

interface MetricCardProps {
  label: string
  value: string
  subtext?: string
  highlight?: boolean
}

function MetricCard({ label, value, subtext, highlight }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-xl p-5 ${
        highlight ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f5f5]'
      }`}
    >
      <p className={`text-sm ${highlight ? 'text-white/70' : 'text-[#737373]'}`}>{label}</p>
      <p className={`mt-1 text-2xl font-bold ${highlight ? 'text-white' : 'text-[#1a1a1a]'}`}>
        {value}
      </p>
      {subtext && (
        <p className={`mt-1 text-xs ${highlight ? 'text-white/60' : 'text-[#737373]'}`}>
          {subtext}
        </p>
      )}
    </motion.div>
  )
}

export function ROASCalculator() {
  const [adSpend, setAdSpend] = useState('1000')
  const [conversionRate, setConversionRate] = useState('2')
  const [averageOrderValue, setAverageOrderValue] = useState('75')
  const [productMargin, setProductMargin] = useState('40')
  const [clicks, setClicks] = useState('500')

  const results = useMemo(() => {
    const spend = parseFloat(adSpend) || 0
    const cvr = parseFloat(conversionRate) / 100 || 0
    const aov = parseFloat(averageOrderValue) || 0
    const margin = parseFloat(productMargin) / 100 || 0
    const totalClicks = parseFloat(clicks) || 0

    const conversions = totalClicks * cvr
    const revenue = conversions * aov
    const grossProfit = revenue * margin
    const netProfit = grossProfit - spend
    const roas = spend > 0 ? revenue / spend : 0
    const roi = spend > 0 ? ((netProfit) / spend) * 100 : 0
    const cpa = conversions > 0 ? spend / conversions : 0
    const cpc = totalClicks > 0 ? spend / totalClicks : 0

    // Break-even calculation
    const profitPerSale = aov * margin
    const breakEvenSales = profitPerSale > 0 ? Math.ceil(spend / profitPerSale) : 0
    const breakEvenRevenue = breakEvenSales * aov

    return {
      conversions,
      revenue,
      grossProfit,
      netProfit,
      roas,
      roi,
      cpa,
      cpc,
      breakEvenSales,
      breakEvenRevenue,
      profitPerSale,
    }
  }, [adSpend, conversionRate, averageOrderValue, productMargin, clicks])

  // Generate chart data
  const chartData = useMemo(() => {
    const spend = parseFloat(adSpend) || 0
    const aov = parseFloat(averageOrderValue) || 0
    const margin = parseFloat(productMargin) / 100 || 0
    const profitPerSale = aov * margin

    const maxSales = Math.max(results.breakEvenSales * 2, 20)
    const data = []

    for (let sales = 0; sales <= maxSales; sales += Math.ceil(maxSales / 15)) {
      const revenue = sales * aov
      const profit = (sales * profitPerSale) - spend

      data.push({
        sales,
        revenue,
        cost: spend,
        profit,
        breakEven: sales >= results.breakEvenSales,
      })
    }

    return data
  }, [adSpend, averageOrderValue, productMargin, results.breakEvenSales])

  const hasValidInputs = parseFloat(adSpend) > 0 && parseFloat(clicks) > 0

  return (
    <div className="space-y-6">
      {/* Input form */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Dados da Campanha</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <InputField
            label="Investimento em Publicidade"
            value={adSpend}
            onChange={setAdSpend}
            placeholder="1000"
            prefix="€"
            hint="Orçamento total da campanha"
          />
          <InputField
            label="Cliques Estimados"
            value={clicks}
            onChange={setClicks}
            placeholder="500"
            hint="Número de cliques esperados"
          />
          <InputField
            label="Taxa de Conversão"
            value={conversionRate}
            onChange={setConversionRate}
            placeholder="2"
            suffix="%"
            hint="Percentagem de visitantes que compram"
          />
          <InputField
            label="Valor Médio de Encomenda"
            value={averageOrderValue}
            onChange={setAverageOrderValue}
            placeholder="75"
            prefix="€"
            hint="Ticket médio por compra"
          />
          <InputField
            label="Margem de Lucro"
            value={productMargin}
            onChange={setProductMargin}
            placeholder="40"
            suffix="%"
            hint="Margem bruta do produto/serviço"
          />
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {hasValidInputs && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Key metrics */}
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
              <h2 className="text-lg font-bold text-[#1a1a1a]">Resultados Projetados</h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  label="ROAS"
                  value={`${results.roas.toFixed(2)}x`}
                  subtext={results.roas >= 4 ? 'Excelente' : results.roas >= 2 ? 'Bom' : 'Abaixo do ideal'}
                  highlight
                />
                <MetricCard
                  label="ROI"
                  value={`${results.roi.toFixed(1)}%`}
                  subtext="Retorno sobre investimento"
                />
                <MetricCard
                  label="Receita Estimada"
                  value={`€${results.revenue.toLocaleString('pt-PT', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
                  subtext={`${results.conversions.toFixed(0)} conversões`}
                />
                <MetricCard
                  label="Lucro Líquido"
                  value={`€${results.netProfit.toLocaleString('pt-PT', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
                  subtext={results.netProfit > 0 ? 'Positivo' : 'Negativo'}
                />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-[#f5f5f5] p-4">
                  <p className="text-xs text-[#737373]">Custo por Clique (CPC)</p>
                  <p className="mt-1 text-lg font-bold text-[#1a1a1a]">
                    €{results.cpc.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-lg bg-[#f5f5f5] p-4">
                  <p className="text-xs text-[#737373]">Custo por Aquisição (CPA)</p>
                  <p className="mt-1 text-lg font-bold text-[#1a1a1a]">
                    €{results.cpa.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-lg bg-[#f5f5f5] p-4">
                  <p className="text-xs text-[#737373]">Lucro por Venda</p>
                  <p className="mt-1 text-lg font-bold text-[#1a1a1a]">
                    €{results.profitPerSale.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Break-even chart */}
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#1a1a1a]">Ponto de Break-even</h2>
                  <p className="mt-1 text-sm text-[#737373]">
                    Precisa de <span className="font-bold text-[#e72f3f]">{results.breakEvenSales} vendas</span> para cobrir o investimento
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#737373]">Receita necessária</p>
                  <p className="text-xl font-bold text-[#1a1a1a]">
                    €{results.breakEvenRevenue.toLocaleString('pt-PT')}
                  </p>
                </div>
              </div>

              <div className="mt-6 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis
                      dataKey="sales"
                      tick={{ fill: '#737373', fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e5e5' }}
                      label={{ value: 'Vendas', position: 'insideBottom', offset: -5, fill: '#737373', fontSize: 12 }}
                    />
                    <YAxis
                      tick={{ fill: '#737373', fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e5e5' }}
                      tickFormatter={(value) => `€${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                      formatter={(value) => [`€${(value ?? 0).toLocaleString('pt-PT')}`, '']}
                      labelFormatter={(label) => `${label} vendas`}
                    />
                    <ReferenceLine
                      x={results.breakEvenSales}
                      stroke="#e72f3f"
                      strokeDasharray="5 5"
                      label={{
                        value: 'Break-even',
                        position: 'top',
                        fill: '#e72f3f',
                        fontSize: 12,
                      }}
                    />
                    <ReferenceLine y={0} stroke="#737373" strokeDasharray="3 3" />
                    <Line
                      type="monotone"
                      dataKey="cost"
                      stroke="#737373"
                      strokeWidth={2}
                      dot={false}
                      name="Investimento"
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      fill="#e72f3f"
                      fillOpacity={0.1}
                      stroke="#e72f3f"
                      strokeWidth={2}
                      name="Lucro"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#e72f3f]" />
                  <span className="text-[#525252]">Lucro</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#737373]" />
                  <span className="text-[#525252]">Investimento</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-6 border-t-2 border-dashed border-[#e72f3f]" />
                  <span className="text-[#525252]">Ponto de break-even</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!hasValidInputs && (
        <div className="rounded-2xl border-2 border-dashed border-[#e5e5e5] bg-white/50 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f5]">
            <svg className="h-6 w-6 text-[#737373]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <p className="mt-4 text-sm text-[#737373]">
            Preencha os dados da campanha para ver os resultados
          </p>
        </div>
      )}
    </div>
  )
}
