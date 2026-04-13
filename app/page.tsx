const API_BASE = "https://web-production-fd8e8.up.railway.app";
const GITHUB = "https://github.com/nodecapitalnext/cdp-analytics-api";

export default function Home() {
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
          <a href="#docs" className="hover:text-white transition">Docs</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href={GITHUB} target="_blank" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition">
            GitHub →
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
          <a href="#docs" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition">
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

      {/* DOCS / CODE */}
      <section id="docs" className="max-w-6xl mx-auto px-6 py-20 border-t border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-4">Quick Start</h2>
        <p className="text-gray-400 text-center mb-12">Install the x402 client and start making requests in minutes</p>

        {/* Step 1 */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="text-sm text-blue-400 font-semibold mb-3">Step 1 — Install</div>
            <pre className="text-sm text-gray-300 bg-gray-800 rounded-lg p-4 overflow-x-auto">
{`npm install x402-axios axios`}
            </pre>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="text-sm text-blue-400 font-semibold mb-3">Step 2 — Get USDC on Base</div>
            <p className="text-sm text-gray-400 mb-3">You need USDC on Base mainnet to pay for requests. Get it from:</p>
            <div className="flex gap-3 flex-wrap">
              <a href="https://www.coinbase.com" target="_blank" className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition">Coinbase →</a>
              <a href="https://app.uniswap.org" target="_blank" className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition">Uniswap →</a>
              <a href="https://bridge.base.org" target="_blank" className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition">Base Bridge →</a>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="text-sm text-blue-400 font-semibold mb-3">Step 3 — Make a request</div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-500 text-sm ml-2">example.ts</span>
            </div>
            <pre className="text-sm text-gray-300 overflow-x-auto leading-relaxed">
{`import axios from "axios";
import { withPaymentInterceptor, createSigner } from "x402-axios";

// Your EVM private key (wallet with USDC on Base)
const signer = await createSigner("base", process.env.PRIVATE_KEY);
const client = withPaymentInterceptor(axios.create(), signer);

// Pays $0.01 USDC automatically, returns Bitcoin analysis
const { data } = await client.get(
  "${API_BASE}/v1/analyze/token/bitcoin"
);

console.log(data.analysis.signal);    // "HOLD/WATCH"
console.log(data.price.current_usd);  // 72340
console.log(data.analysis.rsi_7d);    // 67.3`}
            </pre>
          </div>

          <div className="text-center pt-4">
            <a href={GITHUB} target="_blank" className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl transition text-sm">
              View full source on GitHub →
            </a>
          </div>
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
