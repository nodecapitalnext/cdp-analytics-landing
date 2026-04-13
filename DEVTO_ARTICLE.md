# How I Built a Pay-Per-Use Crypto Analytics API with x402 and Coinbase CDP

I recently built a crypto analytics API where users pay **per request in USDC** — no API keys, no subscriptions, no accounts. Just make an HTTP request, your wallet pays automatically, you get data back.

Here's how it works and how I built it.

---

## The Problem

Most crypto data APIs require:
- Account registration
- Monthly subscriptions
- API key management
- Rate limit negotiations

For developers building small tools, bots, or AI agents, this is overkill. You just want to make a request and get data.

---

## The Solution: x402 Protocol

[x402](https://x402.org) is an open payment protocol developed by Coinbase that revives the HTTP 402 "Payment Required" status code.

The flow is simple:
1. Client requests a resource
2. Server responds with `402 Payment Required` + payment instructions
3. Client signs and sends a USDC payment via `X-PAYMENT` header
4. Coinbase facilitator verifies the payment
5. Server returns the data

No accounts. No API keys. Just USDC on Base.

---

## What I Built

**CDP Crypto Analytics API** — three endpoints:

| Endpoint | Cost | Returns |
|----------|------|---------|
| `/v1/analyze/token/{symbol}` | $0.01 USDC | Price, RSI, BUY/SELL signal |
| `/v1/analyze/wallet/{address}` | $0.05 USDC | Balances, tx history, activity score |
| `/v1/analyze/nft/{contract}` | $0.03 USDC | Floor price, supply, OpenSea stats |

---

## Tech Stack

- **Node.js + Express** — API server
- **x402-express** — Payment middleware
- **Coinbase CDP SDK** — Wallet infrastructure
- **CoinGecko API** — Token price data
- **Alchemy** — Onchain wallet and NFT data
- **Railway** — Deployment
- **Vercel** — Landing page

---

## Implementation

### 1. Setting up x402 middleware

```typescript
import { paymentMiddleware } from "x402-express";

app.use(
  paymentMiddleware(RECIPIENT_ADDRESS, {
    "/v1/analyze/token/*":  { price: "$0.01", network: "base" },
    "/v1/analyze/wallet/*": { price: "$0.05", network: "base" },
    "/v1/analyze/nft/*":    { price: "$0.03", network: "base" },
  })
);
```

That's it. Any request to these routes now requires USDC payment. The middleware handles everything — payment verification, settlement, and passing the request through.

### 2. Token analysis endpoint

```typescript
router.get("/:symbol", async (req, res) => {
  const { symbol } = req.params;
  
  // Fetch from CoinGecko
  const [marketRes, chartRes] = await Promise.all([
    axios.get(`https://api.coingecko.com/api/v3/coins/${symbol}`),
    axios.get(`https://api.coingecko.com/api/v3/coins/${symbol}/market_chart`, {
      params: { vs_currency: "usd", days: 7 }
    }),
  ]);

  // Calculate RSI
  const prices = chartRes.data.prices.map(p => p[1]);
  const rsi = calculateRSI(prices);
  
  // Generate signal
  const signal = rsi > 70 ? "SELL" : rsi < 30 ? "BUY" : "NEUTRAL";

  res.json({ price: marketRes.data.market_data, analysis: { rsi, signal } });
});
```

### 3. Client usage

```typescript
import axios from "axios";
import { withPaymentInterceptor, createSigner } from "x402-axios";

const signer = await createSigner("base", process.env.PRIVATE_KEY);
const client = withPaymentInterceptor(axios.create(), signer);

// This automatically pays $0.01 USDC and returns data
const { data } = await client.get(
  "https://web-production-fd8e8.up.railway.app/v1/analyze/token/bitcoin"
);

console.log(data.analysis.signal); // "HOLD/WATCH"
```

---

## Security

- **Helmet.js** — Security headers (CSP, HSTS, XSS protection)
- **Rate limiting** — 100 requests/minute per IP
- **Input validation** — Regex validation on all parameters
- **Response caching** — Token: 2min, Wallet/NFT: 5min
- **x402 payment wall** — No payment = no data

---

## Results

The API is live at:
- **API**: `https://web-production-fd8e8.up.railway.app`
- **Landing**: `https://cdp-analytics-landing.vercel.app`
- **RapidAPI**: Listed under Finance category

Every request that comes in automatically sends USDC to my Base wallet. No invoicing, no payment processing, no chargebacks.

---

## What's Next

- Add more endpoints (DeFi yields, gas prices, trending tokens)
- Build an AI agent that uses this API autonomously
- List on x402 Bazaar (Coinbase's service discovery layer)

---

## Try It

```bash
# Without x402 client — returns 402
curl https://web-production-fd8e8.up.railway.app/v1/analyze/token/bitcoin

# With x402 client — pays $0.01 USDC, returns data
npx ts-node test-client.ts
```

The full source is on GitHub: [cdp-analytics-api](https://github.com/nodecapitalnext/cdp-analytics-api)

---

*Built with Coinbase Developer Platform. Not financial advice.*
