import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://web-production-fd8e8.up.railway.app";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const query = searchParams.get("query");

  if (!type || !query) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  // Demo: bypass x402 by calling the free health endpoint style
  // We proxy to the API but since it requires x402, we return mock data for demo
  // In production, this would use a pre-funded server wallet
  
  const mockData: Record<string, Record<string, unknown>> = {
    bitcoin: {
      token: { id: "bitcoin", name: "Bitcoin", symbol: "BTC", rank: 1 },
      price: { current_usd: 72340, change_24h_pct: 1.95, change_7d_pct: 3.24, change_30d_pct: 2.26, ath: 126080, ath_change_pct: -42.7 },
      market: { market_cap_usd: 1445000000000, volume_24h_usd: 37000000000, circulating_supply: 20015337 },
      analysis: { weekly_change_pct: 4.85, rsi_7d: 67.3, signal: "HOLD/WATCH", signal_description: "Strong upward trend", price_history_7d: [68000, 69500, 70200, 71000, 71800, 72100, 72340] },
      meta: { analyzed_at: new Date().toISOString(), cached: false, data_source: "CoinGecko" },
    },
    ethereum: {
      token: { id: "ethereum", name: "Ethereum", symbol: "ETH", rank: 2 },
      price: { current_usd: 3240, change_24h_pct: 2.1, change_7d_pct: 5.3, change_30d_pct: -1.2, ath: 4878, ath_change_pct: -33.6 },
      market: { market_cap_usd: 389000000000, volume_24h_usd: 18000000000, circulating_supply: 120000000 },
      analysis: { weekly_change_pct: 5.3, rsi_7d: 61.2, signal: "HOLD/WATCH", signal_description: "Strong upward trend", price_history_7d: [3050, 3100, 3150, 3180, 3200, 3220, 3240] },
      meta: { analyzed_at: new Date().toISOString(), cached: false, data_source: "CoinGecko" },
    },
    solana: {
      token: { id: "solana", name: "Solana", symbol: "SOL", rank: 5 },
      price: { current_usd: 142, change_24h_pct: 3.2, change_7d_pct: 8.1, change_30d_pct: 12.4, ath: 260, ath_change_pct: -45.4 },
      market: { market_cap_usd: 65000000000, volume_24h_usd: 3200000000, circulating_supply: 457000000 },
      analysis: { weekly_change_pct: 8.1, rsi_7d: 72.4, signal: "SELL", signal_description: "Overbought zone", price_history_7d: [130, 133, 136, 138, 140, 141, 142] },
      meta: { analyzed_at: new Date().toISOString(), cached: false, data_source: "CoinGecko" },
    },
  };

  if (type === "token") {
    const id = query.toLowerCase();
    
    // Try to fetch real data first
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`, {
        next: { revalidate: 120 }
      });
      
      if (res.ok) {
        const coin = await res.json();
        const chartRes = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`);
        const chart = await chartRes.json();
        const prices = chart.prices.map((p: number[]) => p[1]);
        const firstPrice = prices[0];
        const lastPrice = prices[prices.length - 1];
        const weeklyChange = ((lastPrice - firstPrice) / firstPrice) * 100;
        const gains = prices.slice(1).map((p: number, i: number) => Math.max(0, p - prices[i]));
        const losses = prices.slice(1).map((p: number, i: number) => Math.max(0, prices[i] - p));
        const avgGain = gains.reduce((a: number, b: number) => a + b, 0) / gains.length;
        const avgLoss = losses.reduce((a: number, b: number) => a + b, 0) / losses.length;
        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        const rsi = 100 - 100 / (1 + rs);
        let signal = "NEUTRAL";
        let signal_description = "Sideways movement";
        if (rsi > 70) { signal = "SELL"; signal_description = "Overbought zone"; }
        else if (rsi < 30) { signal = "BUY"; signal_description = "Oversold zone"; }
        else if (weeklyChange > 5) { signal = "HOLD/WATCH"; signal_description = "Strong upward trend"; }
        else if (weeklyChange < -5) { signal = "CAUTION"; signal_description = "Downtrend"; }

        return NextResponse.json({
          token: { id: coin.id, name: coin.name, symbol: coin.symbol.toUpperCase(), rank: coin.market_cap_rank },
          price: {
            current_usd: coin.market_data.current_price.usd,
            change_24h_pct: coin.market_data.price_change_percentage_24h,
            change_7d_pct: coin.market_data.price_change_percentage_7d,
            ath: coin.market_data.ath.usd,
          },
          analysis: {
            rsi_7d: parseFloat(rsi.toFixed(2)),
            signal,
            signal_description,
            price_history_7d: prices.map((p: number) => parseFloat(p.toFixed(2))),
          },
          meta: { analyzed_at: new Date().toISOString(), data_source: "CoinGecko (live)", demo: true },
        });
      }
    } catch {
      // fallback to mock
    }

    const mock = mockData[id];
    if (mock) return NextResponse.json({ ...mock, meta: { ...(mock.meta as Record<string, unknown>), demo: true } });
    return NextResponse.json({ error: `Token '${query}' not found. Try: bitcoin, ethereum, solana` }, { status: 404 });
  }

  return NextResponse.json({ error: "Only token demo available" }, { status: 400 });
}
