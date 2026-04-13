export default function Docs() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* NAV */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-sm font-bold">C</div>
          <span className="font-semibold text-lg">CDP Analytics</span>
        </a>
        <a href="/" className="text-sm text-gray-400 hover:text-white transition">← Back to home</a>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold mb-4">How to Use the API</h1>
          <p className="text-gray-400 text-lg">
            This API uses the <strong className="text-white">x402 payment protocol</strong> — you pay per request in USDC on Base mainnet.
            No accounts, no API keys, no subscriptions.
          </p>
        </div>

        {/* WHAT IS x402 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">What is x402?</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-gray-300 space-y-3">
            <p>x402 is an open payment protocol built by Coinbase. It works over standard HTTP:</p>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>You send a request to the API</li>
              <li>The API responds with <code className="bg-gray-800 px-1 rounded">402 Payment Required</code> + payment instructions</li>
              <li>Your x402 client automatically signs and sends the USDC payment</li>
              <li>The API verifies the payment and returns your data</li>
            </ol>
            <p className="text-sm text-gray-500">The entire flow happens in one round-trip. You don't need to manage any API keys.</p>
          </div>
        </section>

        {/* REQUIREMENTS */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Node.js 18+", desc: "Required to run the x402 client library" },
              { title: "EVM Wallet", desc: "Any wallet with a private key (MetaMask, Coinbase Wallet, etc.)" },
              { title: "USDC on Base", desc: "Small amount needed — $0.01–$0.05 per request" },
              { title: "x402-axios", desc: "npm package that handles payments automatically" },
            ].map((r) => (
              <div key={r.title} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="font-semibold mb-1">{r.title}</div>
                <div className="text-sm text-gray-400">{r.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* STEP 1 */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Step 1 — Get USDC on Base</h2>
          <p className="text-gray-400 mb-4">You need USDC on Base mainnet. The easiest ways:</p>
          <div className="space-y-3">
            {[
              { name: "Coinbase", desc: "Buy USDC directly and withdraw to Base network", url: "https://www.coinbase.com", tag: "Easiest" },
              { name: "Uniswap", desc: "Swap any token for USDC on Base", url: "https://app.uniswap.org", tag: "DeFi" },
              { name: "Base Bridge", desc: "Bridge USDC from Ethereum to Base", url: "https://bridge.base.org", tag: "Bridge" },
            ].map((s) => (
              <a key={s.name} href={s.url} target="_blank"
                className="flex items-center justify-between bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-xl p-4 transition group">
                <div>
                  <div className="font-semibold group-hover:text-blue-400 transition">{s.name} →</div>
                  <div className="text-sm text-gray-400">{s.desc}</div>
                </div>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-500">{s.tag}</span>
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">Even $1 of USDC is enough to make 20–100 requests.</p>
        </section>

        {/* STEP 2 */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Step 2 — Install the client</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="text-sm text-blue-400 font-semibold mb-3">Terminal</div>
            <pre className="text-sm text-gray-300 bg-gray-800 rounded-lg p-4 overflow-x-auto">npm install x402-axios axios</pre>
          </div>
        </section>

        {/* STEP 3 */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Step 3 — Make your first request</h2>
          <div className="space-y-4">

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="text-sm text-blue-400 font-semibold mb-3">Token Analysis — $0.01 USDC</div>
              <pre className="text-sm text-gray-300 overflow-x-auto leading-relaxed">{`import axios from "axios";
import { withPaymentInterceptor, createSigner } from "x402-axios";

// Your wallet private key (keep this secret!)
const signer = await createSigner("base", "0xYOUR_PRIVATE_KEY");
const client = withPaymentInterceptor(axios.create(), signer);

const { data } = await client.get(
  "https://web-production-fd8e8.up.railway.app/v1/analyze/token/bitcoin"
);

console.log(data.token.name);          // "Bitcoin"
console.log(data.price.current_usd);   // 72340
console.log(data.analysis.signal);     // "HOLD/WATCH"
console.log(data.analysis.rsi_7d);     // 67.3`}</pre>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="text-sm text-purple-400 font-semibold mb-3">Wallet Analysis — $0.05 USDC</div>
              <pre className="text-sm text-gray-300 overflow-x-auto leading-relaxed">{`const { data } = await client.get(
  "https://web-production-fd8e8.up.railway.app/v1/analyze/wallet/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
);

console.log(data.balances.eth);              // 0.072
console.log(data.activity.activity_label);  // "Very Active"
console.log(data.activity.activity_score);  // 100`}</pre>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="text-sm text-green-400 font-semibold mb-3">NFT Collection — $0.03 USDC</div>
              <pre className="text-sm text-gray-300 overflow-x-auto leading-relaxed">{`const { data } = await client.get(
  "https://web-production-fd8e8.up.railway.app/v1/analyze/nft/0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"
);

console.log(data.collection.name);              // "BoredApeYachtClub"
console.log(data.market_stats.floor_price_eth); // 6.1
console.log(data.market_stats.opensea_verified); // true`}</pre>
            </div>
          </div>
        </section>

        {/* ENDPOINTS */}
        <section>
          <h2 className="text-2xl font-bold mb-6">API Reference</h2>
          <div className="space-y-4">
            {[
              {
                method: "GET",
                path: "/v1/analyze/token/:symbol",
                price: "$0.01",
                color: "blue",
                params: [{ name: "symbol", type: "string", desc: "CoinGecko token ID (bitcoin, ethereum, solana...)" }],
                returns: ["current_usd — Current price in USD", "change_24h_pct — 24h price change %", "change_7d_pct — 7d price change %", "rsi_7d — RSI indicator (0-100)", "signal — BUY / SELL / HOLD/WATCH / NEUTRAL / CAUTION", "price_history_7d — Array of 7-day prices"],
              },
              {
                method: "GET",
                path: "/v1/analyze/wallet/:address",
                price: "$0.05",
                color: "purple",
                params: [{ name: "address", type: "string (0x...)", desc: "EVM wallet address on Base mainnet" }],
                returns: ["eth — ETH balance", "token_count — Number of ERC-20 tokens held", "recent_transactions — Last 20 transactions", "activity_score — Activity score 0-100", "activity_label — Very Active / Active / Low Activity"],
              },
              {
                method: "GET",
                path: "/v1/analyze/nft/:contract",
                price: "$0.03",
                color: "green",
                params: [{ name: "contract", type: "string (0x...)", desc: "NFT contract address on Ethereum mainnet" }],
                returns: ["name, symbol — Collection name and symbol", "total_supply — Total NFT supply", "floor_price_eth — Floor price in ETH", "opensea_verified — OpenSea verification status"],
              },
            ].map((ep) => (
              <div key={ep.path} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs bg-blue-600 px-2 py-1 rounded font-mono">{ep.method}</span>
                  <code className="text-sm text-gray-300">{ep.path}</code>
                  <span className="ml-auto text-green-400 font-bold text-sm">{ep.price} USDC</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 mb-2 font-semibold">Parameters</div>
                    {ep.params.map((p) => (
                      <div key={p.name} className="mb-2">
                        <code className="text-blue-400">{p.name}</code>
                        <span className="text-gray-600"> ({p.type})</span>
                        <div className="text-gray-400 text-xs mt-0.5">{p.desc}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-gray-500 mb-2 font-semibold">Returns</div>
                    <ul className="space-y-1">
                      {ep.returns.map((r) => (
                        <li key={r} className="text-gray-400 text-xs flex gap-1">
                          <span className="text-green-500 mt-0.5">✓</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BASE URL */}
        <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="text-sm text-gray-500 mb-2">Base URL</div>
          <code className="text-blue-400 text-lg">https://web-production-fd8e8.up.railway.app</code>
          <div className="mt-4 text-sm text-gray-500">
            All endpoints require x402 payment. Responses are cached (token: 2min, wallet/NFT: 5min).
            Rate limit: 100 requests/minute per IP.
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 px-6 py-8 text-center text-gray-600 text-sm mt-16">
        <p>CDP Crypto Analytics — by CapitalNode</p>
        <p className="mt-1">Not financial advice. Data sourced from CoinGecko and Alchemy.</p>
      </footer>

    </main>
  );
}
