import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calculator as CalculatorIcon, ChevronRight, Droplets, FlaskConical, Syringe, Timer } from 'lucide-react'
import { products } from '../data/products'

const QUICK_BAC_OPTIONS = [1, 2, 3, 5, 10]
const QUICK_FREQUENCIES = [1, 2, 3, 7]

const inferVialMg = (name) => {
  const match = name.match(/(\d+(?:\.\d+)?)mg/i)
  return match ? Number(match[1]) : null
}

const calculatorProducts = products
  .filter((product) => product.category !== 'Supplies' && !product.name.toLowerCase().includes('stack'))
  .map((product) => ({
    id: product.id,
    name: product.name,
    vialMg: inferVialMg(product.name),
    dosage: product.dosage || '',
    protocol: product.protocol || '',
    protocolTitle: product.protocolTitle || ''
  }))
  .filter((product) => product.vialMg)

const formatNumber = (value, max = 2) =>
  Number.isFinite(value)
    ? new Intl.NumberFormat('en-MY', { maximumFractionDigits: max }).format(value)
    : '0'

const Calculator = () => {
  const [selectedProductId, setSelectedProductId] = useState(calculatorProducts[0]?.id || '')
  const [vialMg, setVialMg] = useState(calculatorProducts[0]?.vialMg || 5)
  const [bacMl, setBacMl] = useState(2)
  const [doseMg, setDoseMg] = useState(2)
  const [shotsPerWeek, setShotsPerWeek] = useState(1)
  const [syringeUnitsPerMl, setSyringeUnitsPerMl] = useState(100)

  const selectedProduct = useMemo(
    () => calculatorProducts.find((product) => product.id === selectedProductId),
    [selectedProductId]
  )

  useEffect(() => {
    if (!selectedProduct) return
    setVialMg(selectedProduct.vialMg)
  }, [selectedProduct])

  const concentrationMgPerMl = bacMl > 0 ? vialMg / bacMl : 0
  const mlPerDose = concentrationMgPerMl > 0 ? doseMg / concentrationMgPerMl : 0
  const syringeUnits = mlPerDose * syringeUnitsPerMl
  const dosesPerVial = doseMg > 0 ? vialMg / doseMg : 0
  const daysPerVial = shotsPerWeek > 0 ? (dosesPerVial / shotsPerWeek) * 7 : 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(175deg, #150D25 0%, #0C0C10 45%, #0E0B16 100%)' }}
      >
        <div
          className="absolute left-0 top-0 h-full w-[3px] opacity-40"
          style={{ background: 'linear-gradient(to bottom, #7C3AED, transparent 70%)' }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <span
              className="mb-5 inline-flex items-center uppercase"
              style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: '#6E6790' }}
            >
              <span className="mr-3 h-px w-4" style={{ background: '#7C3AED' }} />
              Research Tools
            </span>
            <h1
              className="font-bold leading-tight text-white"
              style={{ fontSize: 'clamp(2.7rem, 7vw, 5.75rem)', letterSpacing: '-0.04em' }}
            >
              Peptide Calculator
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 sm:text-lg" style={{ color: '#A39CB8' }}>
              Clean reconstitution math, syringe-unit conversion, and vial-duration estimates without doing the
              napkin gymnastics yourself.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:px-8 lg:py-10">
        <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-800">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-purple-600 dark:text-purple-400">
                Input
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">Set your vial math</h2>
            </div>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: 'rgba(124, 58, 237, 0.10)' }}
            >
              <CalculatorIcon className="h-6 w-6" style={{ color: '#7C3AED' }} />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Product preset</span>
              <select
                value={selectedProductId}
                onChange={(event) => setSelectedProductId(event.target.value)}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-slate-700 dark:text-white"
              >
                {calculatorProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Vial strength (mg)</span>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={vialMg}
                onChange={(event) => setVialMg(Number(event.target.value))}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-slate-700 dark:text-white"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">BAC water added (mL)</span>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={bacMl}
                onChange={(event) => setBacMl(Number(event.target.value))}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-slate-700 dark:text-white"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Desired dose (mg)</span>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={doseMg}
                onChange={(event) => setDoseMg(Number(event.target.value))}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-slate-700 dark:text-white"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Injections per week</span>
              <input
                type="number"
                min="1"
                step="1"
                value={shotsPerWeek}
                onChange={(event) => setShotsPerWeek(Number(event.target.value))}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-slate-700 dark:text-white"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Syringe scale</span>
              <select
                value={syringeUnitsPerMl}
                onChange={(event) => setSyringeUnitsPerMl(Number(event.target.value))}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-slate-700 dark:text-white"
              >
                <option value={100}>U-100 insulin syringe</option>
                <option value={50}>0.5 mL syringe</option>
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {QUICK_BAC_OPTIONS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setBacMl(value)}
                className="rounded-full border px-3 py-1.5 text-sm font-medium transition-colors"
                style={
                  bacMl === value
                    ? { borderColor: '#7C3AED', background: 'rgba(124, 58, 237, 0.12)', color: '#6D28D9' }
                    : {}
                }
              >
                {value} mL
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {QUICK_FREQUENCIES.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setShotsPerWeek(value)}
                className="rounded-full border px-3 py-1.5 text-sm font-medium transition-colors"
                style={
                  shotsPerWeek === value
                    ? { borderColor: '#7C3AED', background: 'rgba(124, 58, 237, 0.12)', color: '#6D28D9' }
                    : {}
                }
              >
                {value}x / week
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              icon={FlaskConical}
              label="Concentration"
              value={`${formatNumber(concentrationMgPerMl)} mg/mL`}
              note="After reconstitution"
            />
            <MetricCard
              icon={Droplets}
              label="Volume per dose"
              value={`${formatNumber(mlPerDose, 3)} mL`}
              note="Liquid to draw"
            />
            <MetricCard
              icon={Syringe}
              label="Syringe units"
              value={`${formatNumber(syringeUnits)} units`}
              note="Based on selected syringe"
            />
            <MetricCard
              icon={Timer}
              label="Vial duration"
              value={`${formatNumber(daysPerVial, 1)} days`}
              note={`${formatNumber(dosesPerVial, 1)} total doses per vial`}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-800">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-purple-600 dark:text-purple-400">
              Current preset
            </p>
            <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{selectedProduct?.name}</h3>
            {selectedProduct?.dosage ? (
              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{selectedProduct.dosage}</p>
            ) : (
              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                No built-in dose suggestion here. Enter your own target dose and the calculator will handle the math.
              </p>
            )}
            {selectedProduct?.protocol && (
              <a
                href={selectedProduct.protocol}
                className="mt-5 inline-flex items-center text-sm font-semibold text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400"
              >
                Open protocol
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            )}
          </div>

          <div
            className="rounded-[28px] p-6"
            style={{ background: 'linear-gradient(160deg, #171021 0%, #231235 100%)' }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.18em]" style={{ color: '#8E7CC3' }}>
              Quick read
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6" style={{ color: '#D4CBEF' }}>
              <li>Higher BAC water means lower concentration, so you draw more liquid for the same mg dose.</li>
              <li>U-100 insulin syringes use 100 units per 1 mL, so 0.10 mL equals 10 units.</li>
              <li>Always cross-check your protocol and vial label before drawing anything.</li>
            </ul>
          </div>

          <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Need the protocol too?</h3>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
              The calculator handles the math. The protocol page handles the dose progression, timing, and the rest of
              the details your future self will forget at 11:47pm.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/protocols"
                className="inline-flex items-center rounded-2xl px-4 py-3 text-sm font-semibold text-white"
                style={{ background: '#7C3AED' }}
              >
                Browse protocols
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center rounded-2xl border px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                Back to products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100">
          Research-use-only reminder: this tool is for calculation convenience, not medical advice. Double-check your
          dose, concentration, and syringe markings before use.
        </div>
      </section>
    </div>
  )
}

const MetricCard = ({ icon: Icon, label, value, note }) => (
  <div className="rounded-[24px] bg-gray-50 p-4 dark:bg-slate-700/60">
    <div
      className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl"
      style={{ background: 'rgba(124, 58, 237, 0.10)' }}
    >
      <Icon className="h-5 w-5" style={{ color: '#7C3AED' }} />
    </div>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
    <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">{note}</p>
  </div>
)

export default Calculator
