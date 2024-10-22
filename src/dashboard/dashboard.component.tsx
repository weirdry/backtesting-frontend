import React from "react";
import {
  ComposedChart,
  BarChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from "recharts";

interface EquityData {
  time: number;
  equity: number;
  trade: number;
  drawdown: number;
  profitColor: string;
}

interface MonthlyData {
  month: string;
  return: number;
}

interface TradeHistory {
  id: number;
  date: string;
  type: "Long" | "Short";
  entry: number;
  exit: number;
  pnl: string;
  pnlPct: string;
}

const Dashboard: React.FC = () => {
  // Equity & Drawdown 데이터
  const equityData: EquityData[] = Array.from({ length: 200 }, (_, i) => {
    const baseEquity = 10000 + Math.sin(i / 20) * 200 + i * 2;
    const trade = Math.random() * 40 - 20;
    const drawdown = -(Math.random() * 5 + Math.sin(i / 30) * 2);
    return {
      time: i,
      equity: baseEquity,
      trade: trade,
      drawdown: drawdown,
      profitColor:
        trade >= 0 ? "rgba(76, 175, 80, 0.6)" : "rgba(244, 67, 54, 0.6)",
    };
  });

  // Monthly Returns 데이터
  const monthlyData: MonthlyData[] = [
    { month: "Jan", return: 5.2 },
    { month: "Feb", return: -2.1 },
    { month: "Mar", return: 4.8 },
    { month: "Apr", return: -1.5 },
    { month: "May", return: 3.2 },
    { month: "Jun", return: -0.8 },
  ];

  // 거래 내역 데이터
  const tradeHistory: TradeHistory[] = [
    {
      id: 1,
      date: "2024-01-15",
      type: "Long",
      entry: 10200,
      exit: 10350,
      pnl: "+150",
      pnlPct: "+1.47%",
    },
    {
      id: 2,
      date: "2024-01-16",
      type: "Short",
      entry: 10400,
      exit: 10300,
      pnl: "+100",
      pnlPct: "+0.96%",
    },
    {
      id: 3,
      date: "2024-01-17",
      type: "Long",
      entry: 10250,
      exit: 10150,
      pnl: "-100",
      pnlPct: "-0.98%",
    },
    {
      id: 4,
      date: "2024-01-18",
      type: "Long",
      entry: 10100,
      exit: 10300,
      pnl: "+200",
      pnlPct: "+1.98%",
    },
    {
      id: 5,
      date: "2024-01-19",
      type: "Short",
      entry: 10350,
      exit: 10200,
      pnl: "+150",
      pnlPct: "+1.45%",
    },
  ];

  const tooltipStyle: React.CSSProperties = {
    backgroundColor: "#1a1a1a",
    border: "none",
    borderRadius: "4px",
    fontSize: "12px",
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900">
      {/* Main Equity Curve */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between flex-wrap gap-y-2 items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Strategy Equity
            </h3>
            <div className="flex gap-4 text-sm text-gray-900 dark:text-gray-200">
              <span>
                Net Profit: <span className="text-green-500">$334.61</span>
              </span>
              <span>
                Win Rate: <span className="text-green-500">56.3%</span>
              </span>
              <span>
                Drawdown: <span className="text-red-500">-3.42%</span>
              </span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={equityData}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  dataKey="time"
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="left"
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="equity"
                  stroke="#82ca9d"
                  fill="url(#colorEquity)"
                  yAxisId="left"
                  strokeWidth={2}
                />
                <Bar
                  dataKey="trade"
                  yAxisId="right"
                  fill="#82ca9d"
                  opacity={0.8}
                >
                  {equityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.profitColor} />
                  ))}
                </Bar>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Drawdown Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Drawdown
          </h3>
        </div>
        <div className="p-6">
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={equityData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  dataKey="time"
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#666" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="drawdown"
                  stroke="#ff6b6b"
                  fill="none"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap gap-4">
        {/* Monthly Returns & Key Statistics Container */}
        <div className="w-full flex flex-wrap gap-4">
          {/* Monthly Returns */}
          <div className="flex-1 min-w-[300px] bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Monthly Returns (%)
              </h3>
            </div>
            <div className="p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="return">
                      {monthlyData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.return >= 0 ? "#82ca9d" : "#ff6b6b"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Key Statistics */}
          <div className="flex-[2] bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Key Statistics
              </h3>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px] bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Return
                  </p>
                  <p className="text-2xl font-bold text-green-500">+8.34%</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ($834.61)
                  </p>
                </div>
                <div className="flex-1 min-w-[200px] bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sharpe Ratio
                  </p>
                  <p className="text-2xl font-bold dark:text-gray-200">1.45</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Risk Adjusted
                  </p>
                </div>
                <div className="flex-1 min-w-[200px] bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Max Drawdown
                  </p>
                  <p className="text-2xl font-bold text-red-500">-12.3%</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ($1,230)
                  </p>
                </div>
                <div className="flex-1 min-w-[200px] bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Win Rate
                  </p>
                  <p className="text-2xl font-bold text-green-500">65.4%</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    (129/196)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trade History Table */}
        <div className="w-full col-span-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Trade History
            </h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-200">
                      Date
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-200">
                      Type
                    </th>
                    <th className="px-4 py-2 text-right font-medium text-gray-900 dark:text-gray-200">
                      Entry
                    </th>
                    <th className="px-4 py-2 text-right font-medium text-gray-900 dark:text-gray-200">
                      Exit
                    </th>
                    <th className="px-4 py-2 text-right font-medium text-gray-900 dark:text-gray-200">
                      P&L
                    </th>
                    <th className="px-4 py-2 text-right font-medium text-gray-900 dark:text-gray-200">
                      P&L %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tradeHistory.map((trade) => (
                    <tr
                      key={trade.id}
                      className="border-t border-gray-200 dark:border-gray-700"
                    >
                      <td className="px-4 py-2 text-gray-900 dark:text-gray-200">
                        {trade.date}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={
                            trade.type === "Long"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {trade.type}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-200">
                        {trade.entry}
                      </td>
                      <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-200">
                        {trade.exit}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <span
                          className={
                            trade.pnl.startsWith("+")
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {trade.pnl}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <span
                          className={
                            trade.pnlPct.startsWith("+")
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {trade.pnlPct}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
