import { useState, useEffect } from 'react';

export interface TokenBalance {
  address: string;
  balance: string;
  balanceUSD: number;
  decimals: number;
  symbol: string;
  network: string;
}

export interface DonationBalances {
  eth: {
    mainnet: TokenBalance;
    base: TokenBalance;
  };
  usdc: {
    mainnet: TokenBalance;
    base: TokenBalance;
  };
  btc: TokenBalance;
  totalUSD: number;
  isLoading: boolean;
  error: string | null;
}

const DONATION_ADDRESS = '0x601c5e1dcb301fe2fd0df34bc96c7237c91d73d8';
const BTC_DONATION_ADDRESS = 'bc1qduj9sks7d7vct2y8tk4d6ve5frvx33vvftdscw';

// Free APIs for getting balances and prices
const ALCHEMY_MAINNET_URL = 'https://eth.llamarpc.com';
const ALCHEMY_BASE_URL = 'https://base.llamarpc.com';
const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const BLOCKSTREAM_API = 'https://blockstream.info/api';

const USDC_MAINNET = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

const STORAGE_KEY = 'donation_balances';

function getStoredBalances(): Partial<DonationBalances> | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function storeBalances(balances: DonationBalances) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      eth: balances.eth,
      usdc: balances.usdc,
      btc: balances.btc,
      totalUSD: balances.totalUSD
    }));
  } catch {
    // Ignore storage errors
  }
}

export function useDonationBalances(): DonationBalances {
  const storedBalances = getStoredBalances();
  
  const [balances, setBalances] = useState<DonationBalances>({
    eth: storedBalances?.eth || {
      mainnet: { address: DONATION_ADDRESS, balance: '0', balanceUSD: 0, decimals: 18, symbol: 'ETH', network: 'mainnet' },
      base: { address: DONATION_ADDRESS, balance: '0', balanceUSD: 0, decimals: 18, symbol: 'ETH', network: 'base' }
    },
    usdc: storedBalances?.usdc || {
      mainnet: { address: USDC_MAINNET, balance: '0', balanceUSD: 0, decimals: 6, symbol: 'USDC', network: 'mainnet' },
      base: { address: USDC_BASE, balance: '0', balanceUSD: 0, decimals: 6, symbol: 'USDC', network: 'base' }
    },
    btc: storedBalances?.btc || { address: BTC_DONATION_ADDRESS, balance: '0', balanceUSD: 0, decimals: 8, symbol: 'BTC', network: 'bitcoin' },
    totalUSD: storedBalances?.totalUSD || 0,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchBalances() {
      try {
        setBalances(prev => ({ ...prev, isLoading: true, error: null }));

        // Fetch prices first
        const priceResponse = await fetch(
          `${COINGECKO_API}/simple/price?ids=ethereum,usd-coin,bitcoin&vs_currencies=usd`
        );
        const prices = await priceResponse.json();
        
        const ethPrice = prices.ethereum?.usd || 0;
        const usdcPrice = prices['usd-coin']?.usd || 1;
        const btcPrice = prices.bitcoin?.usd || 0;

        // Fetch ETH balance on Mainnet
        const ethMainnetResponse = await fetch(ALCHEMY_MAINNET_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_getBalance',
            params: [DONATION_ADDRESS, 'latest']
          })
        });
        const ethMainnetData = await ethMainnetResponse.json();
        const ethMainnetBalance = parseInt(ethMainnetData.result || '0x0', 16) / 1e18;

        // Fetch ETH balance on Base
        const ethBaseResponse = await fetch(ALCHEMY_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_getBalance',
            params: [DONATION_ADDRESS, 'latest']
          })
        });
        const ethBaseData = await ethBaseResponse.json();
        const ethBaseBalance = parseInt(ethBaseData.result || '0x0', 16) / 1e18;

        // Fetch USDC balance on Mainnet
        const usdcMainnetResponse = await fetch(ALCHEMY_MAINNET_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_call',
            params: [{
              to: USDC_MAINNET,
              data: `0x70a08231000000000000000000000000${DONATION_ADDRESS.slice(2)}`
            }, 'latest']
          })
        });
        const usdcMainnetData = await usdcMainnetResponse.json();
        const usdcMainnetBalance = parseInt(usdcMainnetData.result || '0x0', 16) / 1e6;

        // Fetch USDC balance on Base
        const usdcBaseResponse = await fetch(ALCHEMY_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_call',
            params: [{
              to: USDC_BASE,
              data: `0x70a08231000000000000000000000000${DONATION_ADDRESS.slice(2)}`
            }, 'latest']
          })
        });
        const usdcBaseData = await usdcBaseResponse.json();
        const usdcBaseBalance = parseInt(usdcBaseData.result || '0x0', 16) / 1e6;

        // Fetch Bitcoin balance
        const btcResponse = await fetch(`${BLOCKSTREAM_API}/address/${BTC_DONATION_ADDRESS}`);
        const btcData = await btcResponse.json();
        const btcBalance = (btcData.chain_stats?.funded_txo_sum || 0) / 1e8; // Convert satoshis to BTC

        // Calculate total USD value
        const totalUSD = 
          (ethMainnetBalance * ethPrice) +
          (ethBaseBalance * ethPrice) +
          (usdcMainnetBalance * usdcPrice) +
          (usdcBaseBalance * usdcPrice) +
          (btcBalance * btcPrice);

        if (isMounted) {
          const newBalances = {
            eth: {
              mainnet: {
                address: DONATION_ADDRESS,
                balance: ethMainnetBalance.toFixed(6),
                balanceUSD: ethMainnetBalance * ethPrice,
                decimals: 18,
                symbol: 'ETH',
                network: 'mainnet'
              },
              base: {
                address: DONATION_ADDRESS,
                balance: ethBaseBalance.toFixed(6),
                balanceUSD: ethBaseBalance * ethPrice,
                decimals: 18,
                symbol: 'ETH',
                network: 'base'
              }
            },
            usdc: {
              mainnet: {
                address: USDC_MAINNET,
                balance: usdcMainnetBalance.toFixed(2),
                balanceUSD: usdcMainnetBalance * usdcPrice,
                decimals: 6,
                symbol: 'USDC',
                network: 'mainnet'
              },
              base: {
                address: USDC_BASE,
                balance: usdcBaseBalance.toFixed(2),
                balanceUSD: usdcBaseBalance * usdcPrice,
                decimals: 6,
                symbol: 'USDC',
                network: 'base'
              }
            },
            btc: {
              address: BTC_DONATION_ADDRESS,
              balance: btcBalance.toFixed(8),
              balanceUSD: btcBalance * btcPrice,
              decimals: 8,
              symbol: 'BTC',
              network: 'bitcoin'
            },
            totalUSD,
            isLoading: false,
            error: null
          };
          
          setBalances(newBalances);
          storeBalances(newBalances);
        }
      } catch (error) {
        console.error('Error fetching donation balances:', error);
        if (isMounted) {
          setBalances(prev => ({
            ...prev,
            isLoading: false,
            error: 'Failed to fetch donation balances'
          }));
        }
      }
    }

    fetchBalances();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchBalances, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return balances;
}