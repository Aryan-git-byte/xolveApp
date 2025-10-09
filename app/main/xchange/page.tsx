"use client";
import React, { useState, useEffect } from 'react';
import { Header, Footer } from '../../../components/Layout';
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Activity,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  Eye,
  Filter
} from 'lucide-react';

// Xchange Page Component
const XchangePage = () => {
  const [selectedPair, setSelectedPair] = useState('BTC/USDT');
  const [orderType, setOrderType] = useState('buy');
  const [tradeType, setTradeType] = useState('market');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [portfolio, setPortfolio] = useState({
    totalBalance: 12450.75,
    todayPnL: 234.56,
    todayPnLPercent: 1.92
  });

  const tradingPairs = [
    { pair: 'BTC/USDT', price: 43250.75, change: 2.45, volume: '1.2B' },
    { pair: 'ETH/USDT', price: 2645.30, change: -1.23, volume: '890M' },
    { pair: 'ADA/USDT', price: 0.4567, change: 5.67, volume: '234M' },
    { pair: 'SOL/USDT', price: 98.45, change: 3.21, volume: '456M' },
    { pair: 'DOT/USDT', price: 7.89, change: -0.45, volume: '123M' },
  ];

  const recentTrades = [
    { id: 1, pair: 'BTC/USDT', type: 'buy', amount: 0.005, price: 43100, time: '2 min ago', pnl: 7.5 },
    { id: 2, pair: 'ETH/USDT', type: 'sell', amount: 1.2, price: 2650, time: '15 min ago', pnl: -12.3 },
    { id: 3, pair: 'ADA/USDT', type: 'buy', amount: 1000, price: 0.445, time: '1 hour ago', pnl: 23.4 },
    { id: 4, pair: 'SOL/USDT', type: 'sell', amount: 5, price: 97.8, time: '2 hours ago', pnl: 15.7 },
  ];

  const marketData = [
    { name: 'Fear & Greed Index', value: '72', status: 'Greed', color: 'text-orange-600' },
    { name: 'Market Cap', value: '$1.8T', status: '+2.3%', color: 'text-green-600' },
    { name: 'BTC Dominance', value: '52.4%', status: '-0.8%', color: 'text-red-600' },
    { name: '24h Volume', value: '$58.2B', status: '+12.5%', color: 'text-green-600' },
  ];

  const currentPair = tradingPairs.find(pair => pair.pair === selectedPair) || tradingPairs[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content Area */}
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header with Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">Xchange</h1>
              <p className="text-blue-100 mb-4">Trade cryptocurrencies and digital assets</p>
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-sm text-blue-200">Portfolio Value</div>
                  <div className="text-2xl font-bold">${portfolio.totalBalance.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-blue-200">Today's P&L</div>
                  <div className={`text-lg font-semibold ${portfolio.todayPnL >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                    {portfolio.todayPnL >= 0 ? '+' : ''}${portfolio.todayPnL} ({portfolio.todayPnLPercent >= 0 ? '+' : ''}{portfolio.todayPnLPercent}%)
                  </div>
                </div>
              </div>
            </div>

            {/* Market Indicators */}
            {marketData.slice(0, 2).map((data, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">{data.name}</div>
                <div className="text-xl font-bold text-gray-800">{data.value}</div>
                <div className={`text-sm font-medium ${data.color}`}>{data.status}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Trading Pairs List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Market</h2>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Filter className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-2">
                {tradingPairs.map((pair, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPair(pair.pair)}
                    className={`w-full p-3 rounded-lg text-left transition ${
                      selectedPair === pair.pair 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800">{pair.pair}</div>
                        <div className="text-sm text-gray-500">Vol: {pair.volume}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">${pair.price.toLocaleString()}</div>
                        <div className={`text-sm font-medium ${pair.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {pair.change >= 0 ? '+' : ''}{pair.change}%
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trading Interface */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Trade {selectedPair}</h2>
                <div className="text-2xl font-bold text-gray-800">${currentPair.price.toLocaleString()}</div>
                <div className={`text-sm font-medium ${currentPair.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {currentPair.change >= 0 ? '+' : ''}{currentPair.change}% (24h)
                </div>
              </div>

              {/* Order Type Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
                <button
                  onClick={() => setOrderType('buy')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                    orderType === 'buy' 
                      ? 'bg-green-500 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setOrderType('sell')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                    orderType === 'sell' 
                      ? 'bg-red-500 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Trade Type */}
              <div className="mb-4">
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setTradeType('market')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                      tradeType === 'market' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Market
                  </button>
                  <button
                    onClick={() => setTradeType('limit')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                      tradeType === 'limit' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Limit
                  </button>
                </div>
              </div>

              {/* Trade Inputs */}
              <div className="space-y-4">
                {tradeType === 'limit' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-2">
                  {['25%', '50%', '75%', '100%'].map((percent) => (
                    <button
                      key={percent}
                      className="flex-1 py-1 px-2 text-xs border border-gray-300 rounded hover:bg-gray-50 transition"
                    >
                      {percent}
                    </button>
                  ))}
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                    orderType === 'buy' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {orderType === 'buy' ? 'Buy' : 'Sell'} {selectedPair.split('/')[0]}
                </button>
              </div>
            </div>

            {/* Recent Trades */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Recent Trades</h2>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition">
                  View All
                </button>
              </div>
              
              <div className="space-y-3">
                {recentTrades.map((trade) => (
                  <div key={trade.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{trade.pair}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          trade.type === 'buy' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {trade.type.toUpperCase()}
                        </span>
                      </div>
                      <div className={`text-sm font-medium ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trade.pnl >= 0 ? '+' : ''}${trade.pnl}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{trade.amount} @ ${trade.price}</span>
                      <span>{trade.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {marketData.map((data, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">{data.name}</div>
                <div className="text-xl font-bold text-gray-800">{data.value}</div>
                <div className={`text-sm font-medium ${data.color}`}>{data.status}</div>
              </div>
            ))}
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default XchangePage;