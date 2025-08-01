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
  totalUSD: number;
  isLoading: boolean;
  error: string | null;
}

const DONATION_ADDRESS = '0x601c5e1dcb301fe2fd0df34bc96c7237c91d73d8';

// Free APIs for getting balances and prices
const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/demo';
const ALCHEMY_BASE_URL = 'https://base-mainnet.g.alchemy.com/v2/demo';
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const USDC_MAINNET = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

export function useDonationBalances(): DonationBalances {
  const [balances, setBalances] = useState<DonationBalances>({
    eth: {
      mainnet: { address: DONATION_ADDRESS, balance: '0', balanceUSD: 0, decimals: 18, symbol: 'ETH', network: 'mainnet' },
      base: { address: DONATION_ADDRESS, balance: '0', balanceUSD: 0, decimals: 18, symbol: 'ETH', network: 'base' }
    },
    usdc: {
      mainnet: { address: USDC_MAINNET, balance: '0', balanceUSD: 0, decimals: 6, symbol: 'USDC', network: 'mainnet' },
      base: { address: USDC_BASE, balance: '0', balanceUSD: 0, decimals: 6, symbol: 'USDC', network: 'base' }
    },
    totalUSD: 0,
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
          `${COINGECKO_API}/simple/price?ids=ethereum,usd-coin&vs_currencies=usd`
        );
        const prices = await priceResponse.json();
        
        const ethPrice = prices.ethereum?.usd || 0;
        const usdcPrice = prices['usd-coin']?.usd || 1;

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

        // Calculate total USD value
        const totalUSD = 
          (ethMainnetBalance * ethPrice) +
          (ethBaseBalance * ethPrice) +
          (usdcMainnetBalance * usdcPrice) +
          (usdcBaseBalance * usdcPrice);

        if (isMounted) {
          setBalances({
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
            totalUSD,
            isLoading: false,
            error: null
          });
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
    const interval = setInterval(fetchBalances, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return balances;
}