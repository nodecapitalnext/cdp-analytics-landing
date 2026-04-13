"use client";
import { useState } from "react";

const API_BASE = "https://web-production-fd8e8.up.railway.app";
const GITHUB = "https://github.com/nodecapitalnext/cdp-analytics-api";

type TokenData = {
  token: { name: string; symbol: string; rank: number };
  price: { current_usd: number; change_24h_pct: number; change_7d_pct: number; ath: number };
  analysis: { rsi_7d: number; signal: string; signal_description: string; price_history_7d: number[] };
  meta: { analyzed_at: string; data_source: string };
};

function SignalBadge({ signal }: { signal: string }) {
  const colors: Record<string, string> = {
    "BUY": "bg-green-500/20 text-green-400 border-green-500/30",
    "SELL": "bg-red-500/20 text-red-400 border-red-500/30",
    "HOLD/WATCH": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "NEUTRAL": "bg-gray-500/20 text-gray-400 border-gray-500/30",
    "CAUTION": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-bold border ${colors[signal] || colors["NEUTRAL"]}`}>
      {signal}
    </span>
  );
}

function MiniChart({ prices }: { prices: number[] }) {
  if (!prices || prices.length < 2) return null;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const w = 200, h = 60;
  const points = prices.map((p, i) => `${(i / (prices.length - 1)) * w},${h - ((p - min) / range) * h}`).join(" ");
  const isUp = prices[prices.length - 1] >= prices[0];
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={points} fill="none" stroke={isUp ? "#22c55e" : "#ef4444"} strokeWidth="2" />
    </svg>
  );
}

export default function Home() {
  const [demoInput, setDemoInput] = useState("bitcoin");
  const [demoResult, setDemoResult] = useState<TokenData | null>(null);
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoError, setDemoError] = useState("");

  const runDemo = async () => {
    if (!demoInput.trim()) return;
    setDemoLoading(true);
    setDemoError("");
    setDemoResult(null);
    try {
      const res = await fetch(`/api/demo?type=token&query=${demoInput.trim().toLowerCase()}`);
      const data = await res.json();
      if (!res.ok) { setDemoError(data.error || "Not found"); return; }
      setDemoResult(data);
    } catch {
      setDemoError("Request failed");
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* NAV */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-sm font-bold">C</div>
          <span className="font-semibold text-lg">CDP Analytics</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <a href="#endpoints" className="hover:text-white transition">Endpoints</a>
          <a href="#docs" className="hover:text-white transition">Demo</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="/docs" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition">
            How to Use →
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-950 border border-blue-800 text-blue-400 text-sm px-4 py-2 rounded-full mb-8">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          Powered by Coinbase Developer Platform
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
          Crypto Analytics API
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Token signals, wallet analysis, NFT stats.
          Pay per request with USDC via x402 — no API keys, no subscriptions.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href="/docs" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition">
            Get Started →
          </a>
          <a href="#endpoints" className="border border-gray-700 hover:border-gray-500 text-gray-300 px-8 py-4 rounded-xl text-lg transition">
            View Endpoints
          </a>
        </div>
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16">
          {[
            { value: "3", label: "Endpoints" },
            { value: "$0.01", label: "From / Request" },
            { value: "100%", label: "Uptime" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { step: "1", title: "Install x402 client", desc: "npm install x402-axios — one package, handles everything" },
            { step: "2", title: "Connect your wallet", desc: "Use any EVM wallet with USDC on Base mainnet" },
            { step: "3", title: "Make requests", desc: "Call the API — payment happens automatically per request" },
          ].map((s) => (
            <div key={s.step} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">{s.step}</div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ENDPOINTS */}
      <section id="endpoints" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Endpoints</h2>
        <p className="text-gray-400 text-center mb-12">Three endpoints, each priced per request in USDC</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🪙",
              title: "Token Analysis",
              price: "$0.01",
              path: "/v1/analyze/token/{symbol}",
              features: ["Real-time price (USD)", "24h / 7d / 30d changes", "RSI indicator (7-day)", "BUY / SELL / HOLD signal", "Market cap & volume"],
              example: "bitcoin, ethereum, solana",
            },
            {
              icon: "👛",
              title: "Wallet Analysis",
              price: "$0.05",
              path: "/v1/analyze/wallet/{address}",
              features: ["ETH balance", "ERC-20 token count", "Last 20 transactions", "Activity score (0-100)", "Sent / received stats"],
              example: "0xd8dA...96045",
            },
            {
              icon: "🖼️",
              title: "NFT Collection",
              price: "$0.03",
              path: "/v1/analyze/nft/{contract}",
              features: ["Floor price (ETH)", "Total supply", "OpenSea verification", "Collection description", "Social links"],
              example: "0xBC4C...f13D (BAYC)",
            },
          ].map((ep) => (
            <div key={ep.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition">
              <div className="text-3xl mb-4">{ep.icon}</div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{ep.title}</h3>
                <span className="text-green-400 font-bold">{ep.price} USDC</span>
              </div>
              <code className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded block mb-4 truncate">{ep.path}</code>
              <ul className="space-y-2 mb-4">
                {ep.features.map((f) => (
                  <li key={f} className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <div className="text-xs text-gray-600 border-t border-gray-800 pt-3">
                Example: <span className="text-gray-400">{ep.example}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE DEMO */}
      <section id="docs" className="max-w-6xl mx-auto px-6 py-20 border-t border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-4">Live Demo</h2>
        <p className="text-gray-400 text-center mb-12">Try the token analysis endpoint — real data, no payment needed for the demo</p>

        <div className="max-w-2xl mx-auto">
          {/* Input */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runDemo()}
              placeholder="Enter token ID (e.g. bitcoin, ethereum, solana)"
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            />
            <button
              onClick={runDemo}
              disabled={demoLoading}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              {demoLoading ? "..." : "Analyze →"}
            </button>
          </div>

          {/* Quick picks */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {["bitcoin", "ethereum", "solana", "chainlink", "uniswap"].map((t) => (
              <button
                key={t}
                onClick={() => { setDemoInput(t); }}
                className="text-xs bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-1.5 rounded-lg transition text-gray-400 hover:text-white"
              >
                {t}
              </button>
            ))}
          </div>

          {/* Error */}
          {demoError && (
            <div className="bg-red-950 border border-red-800 text-red-400 rounded-xl p-4 text-sm mb-6">
              {demoError}
            </div>
          )}

          {/* Result */}
          {demoResult && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{demoResult.token.name} <span className="text-gray-500 text-lg">({demoResult.token.symbol})</span></h3>
                  <p className="text-gray-500 text-sm">Rank #{demoResult.token.rank}</p>
                </div>
                <SignalBadge signal={demoResult.analysis.signal} />
              </div>

              {/* Price */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="text-gray-400 text-xs mb-1">Current Price</div>
                  <div className="text-2xl font-bold">${demoResult.price.current_usd.toLocaleString()}</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="text-gray-400 text-xs mb-1">24h Change</div>
                  <div className={`text-2xl font-bold ${demoResult.price.change_24h_pct >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {demoResult.price.change_24h_pct >= 0 ? "+" : ""}{demoResult.price.change_24h_pct?.toFixed(2)}%
                  </div>
                </div>
              </div>

              {/* Chart + RSI */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="text-gray-400 text-xs mb-3">7-Day Price</div>
                  <MiniChart prices={demoResult.analysis.price_history_7d} />
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="text-gray-400 text-xs mb-1">RSI (7-day)</div>
                  <div className="text-3xl font-bold mb-1">{demoResult.analysis.rsi_7d}</div>
                  <div className="text-xs text-gray-500">{demoResult.analysis.signal_description}</div>
                  <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${demoResult.analysis.rsi_7d > 70 ? "bg-red-500" : demoResult.analysis.rsi_7d < 30 ? "bg-green-500" : "bg-blue-500"}`}
                      style={{ width: `${demoResult.analysis.rsi_7d}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-600 border-t border-gray-800 pt-3 flex justify-between">
                <span>Source: {demoResult.meta.data_source}</span>
                <span>Demo mode — real requests cost $0.01 USDC</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20 border-t border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-4">Pricing</h2>
        <p className="text-gray-400 text-center mb-12">Pay only for what you use. No monthly fees, no subscriptions.</p>
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { endpoint: "🪙 Token Analysis", price: "$0.01", per: "per request" },
            { endpoint: "👛 Wallet Analysis", price: "$0.05", per: "per request" },
            { endpoint: "🖼️ NFT Collection", price: "$0.03", per: "per request" },
          ].map((p) => (
            <div key={p.endpoint} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
              <div className="text-lg mb-3">{p.endpoint}</div>
              <div className="text-4xl font-bold text-green-400 mb-1">{p.price}</div>
              <div className="text-sm text-gray-500">{p.per} · USDC on Base</div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 text-sm mt-8">
          Payments processed via <a href="https://x402.org" target="_blank" className="text-gray-400 hover:text-white">x402 protocol</a> · Powered by Coinbase CDP facilitator
        </p>
      </section>

      {/* POWERED BY */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center border-t border-gray-800">
        <p className="text-gray-500 text-sm mb-6">Powered by</p>
        <div className="flex items-center justify-center gap-4 flex-wrap text-gray-400 text-sm">
          {["Coinbase CDP", "CoinGecko", "Alchemy", "x402 Protocol", "Base Network"].map((t) => (
            <span key={t} className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg">{t}</span>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 px-6 py-8 text-center text-gray-600 text-sm">
        <p>CDP Crypto Analytics — by CapitalNode</p>
        <p className="mt-1">Not financial advice. Data sourced from CoinGecko and Alchemy.</p>
      </footer>

    </main>
  );
}
