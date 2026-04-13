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
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#docs" className="hover:text-white transition">Docs</a>
          <a
            href="https://rapidapi.com/CapitalNode/api/cdp-crypto-analytics"
            target="_blank"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition"
          >
            Get Started
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
          Professional onchain analytics. Token signals, wallet analysis, NFT stats.
          Pay-per-use with USDC — no subscriptions, no API keys.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="https://rapidapi.com/CapitalNode/api/cdp-crypto-analytics"
            target="_blank"
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition"
          >
            Start for Free →
          </a>
          <a
            href="#endpoints"
            className="border border-gray-700 hover:border-gray-500 text-gray-300 px-8 py-4 rounded-xl text-lg transition"
          >
            View Endpoints
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16">
          {[
            { value: "3", label: "Endpoints" },
            { value: "$0.01", label: "Per Request" },
            { value: "100%", label: "Uptime" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ENDPOINTS */}
      <section id="endpoints" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Endpoints</h2>
        <p className="text-gray-400 text-center mb-12">Three powerful endpoints, each priced per request</p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🪙",
              title: "Token Analysis",
              price: "$0.01",
              path: "/v1/analyze/token/{symbol}",
              features: ["Real-time price (USD)", "24h / 7d / 30d changes", "RSI indicator (7-day)", "BUY / SELL / HOLD signal", "Market cap & volume"],
              example: "bitcoin, ethereum, solana",
              color: "blue",
            },
            {
              icon: "👛",
              title: "Wallet Analysis",
              price: "$0.05",
              path: "/v1/analyze/wallet/{address}",
              features: ["ETH balance", "ERC-20 token count", "Last 20 transactions", "Activity score (0-100)", "Sent / received stats"],
              example: "0xd8dA...96045",
              color: "purple",
            },
            {
              icon: "🖼️",
              title: "NFT Collection",
              price: "$0.03",
              path: "/v1/analyze/nft/{contract}",
              features: ["Floor price (ETH)", "Total supply", "OpenSea verification", "Collection description", "Social links"],
              example: "0xBC4C...f13D (BAYC)",
              color: "green",
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

      {/* CODE EXAMPLE */}
      <section id="docs" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Simple Integration</h2>
        <p className="text-gray-400 text-center mb-12">Works with any HTTP client. x402 handles payments automatically.</p>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-500 text-sm ml-2">example.ts</span>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto leading-relaxed">
{`import axios from "axios";
import { withPaymentInterceptor, createSigner } from "x402-axios";

// Setup x402 client with your wallet
const signer = await createSigner("base", process.env.PRIVATE_KEY);
const client = withPaymentInterceptor(axios.create(), signer);

// Token analysis — $0.01 USDC paid automatically
const { data } = await client.get(
  "https://web-production-fd8e8.up.railway.app/v1/analyze/token/bitcoin"
);

console.log(data.analysis.signal); // "HOLD/WATCH"
console.log(data.price.current_usd); // 72340`}
          </pre>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Pricing</h2>
        <p className="text-gray-400 text-center mb-12">Pay only for what you use. No monthly fees.</p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { name: "BASIC", price: "Free", sub: "via RapidAPI", features: ["10 requests/month", "All endpoints", "Community support"], cta: "Start Free", highlight: false },
            { name: "PRO", price: "$9.99", sub: "/month via RapidAPI", features: ["500 requests/month", "All endpoints", "Priority support", "x402 direct access"], cta: "Get Pro", highlight: true },
            { name: "PAY AS YOU GO", price: "USDC", sub: "via x402 protocol", features: ["Unlimited requests", "$0.01–$0.05/request", "No subscription", "Direct onchain payment"], cta: "Use x402", highlight: false },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 border ${plan.highlight ? "bg-blue-950 border-blue-700" : "bg-gray-900 border-gray-800"}`}
            >
              {plan.highlight && (
                <div className="text-xs text-blue-400 font-semibold mb-2 uppercase tracking-wider">Recommended</div>
              )}
              <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
              <div className="text-3xl font-bold mb-1">{plan.price}</div>
              <div className="text-sm text-gray-500 mb-6">{plan.sub}</div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://rapidapi.com/CapitalNode/api/cdp-crypto-analytics"
                target="_blank"
                className={`block text-center py-3 rounded-xl font-semibold transition ${plan.highlight ? "bg-blue-600 hover:bg-blue-500 text-white" : "border border-gray-700 hover:border-gray-500 text-gray-300"}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* POWERED BY */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center border-t border-gray-800">
        <p className="text-gray-500 text-sm mb-6">Powered by</p>
        <div className="flex items-center justify-center gap-8 flex-wrap text-gray-400 text-sm">
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
