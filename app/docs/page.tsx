export default function Docs() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* NAV */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-sm font-bold">C</div>
          <span className="font-semibold text-lg">CDP Analytics</span>
        </a>
        <a href="/" className="text-sm text-gray-400 hover:text-white transition">← Back</a>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-4">Get Started in 10 Minutes</h1>
          <p className="text-gray-400 text-lg">Follow these steps exactly. By the end you will have real crypto data in your terminal.</p>
          <div className="flex gap-3 mt-6 flex-wrap">
            {["1. Node.js", "2. Wallet", "3. USDC", "4. Code", "5. Run"].map((s, i) => (
              <div key={s} className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">{i + 1}</span>
                {s.slice(3)}
                {i < 4 && <span className="text-gray-700">→</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-12">

          {/* STEP 1 */}
          <section className="border border-gray-800 rounded-2xl overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex items-center gap-3 border-b border-gray-800">
              <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <h2 className="text-xl font-bold">Install Node.js</h2>
              <span className="ml-auto text-xs text-gray-500">~2 min</span>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-400">You need Node.js version 18 or higher to run the x402 client.</p>
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-2">Check if you already have it:</div>
                <pre className="text-sm text-green-400">node --version</pre>
              </div>
              <p className="text-gray-400 text-sm">If you see <code className="bg-gray-800 px-1 rounded text-green-400">v18.x.x</code> or higher, skip to Step 2.</p>
              <a href="https://nodejs.org" target="_blank"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition">
                Download Node.js →
              </a>
              <p className="text-xs text-gray-600">Download the LTS version. Install it like any normal program.</p>
            </div>
          </section>

          {/* STEP 2 */}
          <section className="border border-gray-800 rounded-2xl overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex items-center gap-3 border-b border-gray-800">
              <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <h2 className="text-xl font-bold">Get a Wallet & Private Key</h2>
              <span className="ml-auto text-xs text-gray-500">~3 min</span>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-400">You need an EVM wallet to sign payments. We recommend MetaMask.</p>

              <div className="space-y-3">
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="font-semibold mb-1 text-sm">Option A — MetaMask (recommended)</div>
                  <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                    <li>Install MetaMask from <a href="https://metamask.io" target="_blank" className="text-blue-400 hover:underline">metamask.io</a></li>
                    <li>Create a new wallet, save your seed phrase</li>
                    <li>Click the 3 dots next to your account → <strong className="text-white">Account Details</strong></li>
                    <li>Click <strong className="text-white">Show private key</strong> → enter your password</li>
                    <li>Copy the private key (starts with <code className="bg-gray-700 px-1 rounded">0x</code>)</li>
                  </ol>
                </div>

                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="font-semibold mb-1 text-sm">Option B — Generate a new key (advanced)</div>
                  <pre className="text-sm text-gray-300 mt-2">{`node -e "const {generatePrivateKey,privateKeyToAccount} = require('viem/accounts'); const pk = generatePrivateKey(); console.log('Key:', pk); console.log('Address:', privateKeyToAccount(pk).address)"`}</pre>
                  <p className="text-xs text-gray-500 mt-2">Run this after installing viem: <code className="bg-gray-700 px-1 rounded">npm install viem</code></p>
                </div>
              </div>

              <div className="bg-yellow-950 border border-yellow-800 rounded-xl p-4 text-sm text-yellow-300">
                ⚠️ <strong>Never share your private key.</strong> Use a fresh wallet with only a small amount of USDC. Do not use your main wallet.
              </div>
            </div>
          </section>

          {/* STEP 3 */}
          <section className="border border-gray-800 rounded-2xl overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex items-center gap-3 border-b border-gray-800">
              <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <h2 className="text-xl font-bold">Get USDC on Base</h2>
              <span className="ml-auto text-xs text-gray-500">~5 min</span>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-400">Each API request costs $0.01–$0.05 USDC. You need USDC on the <strong className="text-white">Base network</strong> (not Ethereum).</p>

              <div className="space-y-3">
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="font-semibold mb-2 text-sm flex items-center gap-2">
                    <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">Easiest</span>
                    Coinbase Exchange
                  </div>
                  <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                    <li>Create account at <a href="https://coinbase.com" target="_blank" className="text-blue-400 hover:underline">coinbase.com</a></li>
                    <li>Buy $2–5 worth of USDC</li>
                    <li>Go to <strong className="text-white">Send/Receive</strong> → Send USDC</li>
                    <li>Select network: <strong className="text-white">Base</strong></li>
                    <li>Paste your wallet address from Step 2</li>
                  </ol>
                </div>

                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="font-semibold mb-2 text-sm flex items-center gap-2">
                    <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">DeFi</span>
                    Uniswap on Base
                  </div>
                  <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                    <li>Go to <a href="https://app.uniswap.org" target="_blank" className="text-blue-400 hover:underline">app.uniswap.org</a></li>
                    <li>Connect your MetaMask wallet</li>
                    <li>Switch network to <strong className="text-white">Base</strong></li>
                    <li>Swap ETH → USDC</li>
                  </ol>
                </div>
              </div>

              <p className="text-xs text-gray-600">$2 of USDC = ~40–200 API requests. That is more than enough to get started.</p>
            </div>
          </section>

          {/* STEP 4 */}
          <section className="border border-gray-800 rounded-2xl overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex items-center gap-3 border-b border-gray-800">
              <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">4</span>
              <h2 className="text-xl font-bold">Set Up Your Project</h2>
              <span className="ml-auto text-xs text-gray-500">~2 min</span>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-400">Open your terminal and run these commands one by one:</p>

              <div className="space-y-3">
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-2">Create a new project folder:</div>
                  <pre className="text-sm text-green-400">{`mkdir crypto-api-test
cd crypto-api-test
npm init -y`}</pre>
                </div>

                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-2">Install dependencies:</div>
                  <pre className="text-sm text-green-400">npm install x402-axios axios dotenv</pre>
                </div>

                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-2">Create a <code className="text-white">.env</code> file — paste your private key here:</div>
                  <pre className="text-sm text-gray-300">{`PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE`}</pre>
                  <p className="text-xs text-gray-500 mt-2">Replace <code className="bg-gray-700 px-1 rounded">0xYOUR_PRIVATE_KEY_HERE</code> with the key you copied in Step 2.</p>
                </div>

                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-2">Create <code className="text-white">index.mjs</code> and paste this code:</div>
                  <pre className="text-sm text-gray-300 leading-relaxed">{`import axios from "axios";
import { withPaymentInterceptor, createSigner } from "x402-axios";
import dotenv from "dotenv";
dotenv.config();

// Connect your wallet
const signer = await createSigner("base", process.env.PRIVATE_KEY);
const client = withPaymentInterceptor(axios.create(), signer);

console.log("Fetching Bitcoin analysis...");
console.log("This will cost $0.01 USDC from your wallet.\\n");

const { data } = await client.get(
  "https://web-production-fd8e8.up.railway.app/v1/analyze/token/bitcoin"
);

console.log("=== BITCOIN ANALYSIS ===");
console.log("Price:   $" + data.price.current_usd.toLocaleString());
console.log("24h:     " + data.price.change_24h_pct.toFixed(2) + "%");
console.log("RSI:     " + data.analysis.rsi_7d);
console.log("Signal:  " + data.analysis.signal);
console.log("Reason:  " + data.analysis.signal_description);`}</pre>
                </div>
              </div>
            </div>
          </section>

          {/* STEP 5 */}
          <section className="border border-blue-800 bg-blue-950/20 rounded-2xl overflow-hidden">
            <div className="bg-blue-950/40 px-6 py-4 flex items-center gap-3 border-b border-blue-800">
              <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">5</span>
              <h2 className="text-xl font-bold">Run It</h2>
              <span className="ml-auto text-xs text-blue-400">The moment of truth</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-900 rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-2">In your terminal:</div>
                <pre className="text-sm text-green-400">node index.mjs</pre>
              </div>

              <div className="bg-gray-900 rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-3">Expected output:</div>
                <pre className="text-sm text-gray-300 leading-relaxed">{`Fetching Bitcoin analysis...
This will cost $0.01 USDC from your wallet.

=== BITCOIN ANALYSIS ===
Price:   $72,340
24h:     +1.95%
RSI:     67.3
Signal:  HOLD/WATCH
Reason:  Strong upward trend`}</pre>
              </div>

              <div className="bg-green-950 border border-green-800 rounded-xl p-4 text-sm text-green-300">
                ✅ If you see this output, it worked. $0.01 USDC was sent from your wallet to the API provider automatically.
              </div>
            </div>
          </section>

          {/* TROUBLESHOOTING */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Troubleshooting</h2>
            <div className="space-y-3">
              {[
                {
                  error: "Error: insufficient funds",
                  fix: "Your wallet doesn't have enough USDC on Base. Go back to Step 3 and add USDC.",
                },
                {
                  error: "Error: invalid private key",
                  fix: "Make sure your private key starts with 0x and is 66 characters long. Check your .env file.",
                },
                {
                  error: "Error: network error / ECONNREFUSED",
                  fix: "Check your internet connection. The API is at web-production-fd8e8.up.railway.app",
                },
                {
                  error: "Cannot find module 'x402-axios'",
                  fix: "Run npm install x402-axios axios dotenv again in your project folder.",
                },
              ].map((t) => (
                <div key={t.error} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <code className="text-red-400 text-sm">{t.error}</code>
                  <p className="text-gray-400 text-sm mt-1">→ {t.fix}</p>
                </div>
              ))}
            </div>
          </section>

          {/* NEXT STEPS */}
          <section>
            <h2 className="text-2xl font-bold mb-6">What Next?</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Wallet Analysis", desc: "Analyze any wallet address — balances, transactions, activity score", price: "$0.05", path: "/v1/analyze/wallet/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
                { title: "NFT Collection", desc: "Get floor price, supply and OpenSea stats for any NFT collection", price: "$0.03", path: "/v1/analyze/nft/0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" },
                { title: "Any Token", desc: "Replace 'bitcoin' with any CoinGecko ID: ethereum, solana, chainlink...", price: "$0.01", path: "/v1/analyze/token/ethereum" },
              ].map((n) => (
                <div key={n.title} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold text-sm">{n.title}</div>
                    <span className="text-green-400 text-xs font-bold">{n.price}</span>
                  </div>
                  <p className="text-gray-400 text-xs mb-3">{n.desc}</p>
                  <code className="text-xs text-gray-600 break-all">{n.path}</code>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 px-6 py-8 text-center text-gray-600 text-sm mt-16">
        <p>CDP Crypto Analytics — by CapitalNode</p>
        <p className="mt-1">Not financial advice. Data sourced from CoinGecko and Alchemy.</p>
      </footer>

    </main>
  );
}
