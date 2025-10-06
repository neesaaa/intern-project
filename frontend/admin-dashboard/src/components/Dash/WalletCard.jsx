import Calendar from "../../assets/dash/calender.png";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import arrowUp from "./../../assets/dash/arrowup.png";
import { FiCheck } from "react-icons/fi";

const data = [
  { month: "JAN", deposits: 120, withdrawals: 80 },
  { month: "FEB", deposits: 140, withdrawals: 100 },
  { month: "MAR", deposits: 160, withdrawals: 90 },
  { month: "APR", deposits: 180, withdrawals: 110 },
  { month: "MAY", deposits: 200, withdrawals: 120 },
];

export default function WalletCard() {
  return (
    <div className="p-4 bg-white shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)] rounded-xl flex flex-col gap-6 flex-[2]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-[20px] leading-[30px]">Wallet</h3>
        <button className="font-medium text-sm leading-[24px] tracking-[-0.02em] rounded-lg text-[#A3AED0] bg-[#F4F7FE] flex items-center  gap-1.5 px-2 py-2">
          <img src={Calendar} alt="" className="w-3 h-3" />
          This month
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-bold text-[34px] leading-[42px]">$37.5K</p>
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          <span className="text-[#A3AED0]">Wallet Balance</span>
          <img src={arrowUp} alt="" className="w-2 h-1" />
          <span className="text-green-600 font-medium">+234%</span>
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="bg-green-400 flex items-center justify-center rounded-full p-1">
          <FiCheck className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-green-400 leading-[28px]">
          On your account
        </span>
      </div>
      <div className="flex  items-center gap-3 ">
        <div className="flex flex-col  gap-4 text-xs px-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#4318FF]" />
            <span className="text-sm leading-[20px]">Deposits</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#6AD2FF]" />
            <span className="text-sm leading-[20px]">Withdrawals</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data}>
            <XAxis
              dataKey="month"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Line
              type="monotone"
              dataKey="deposits"
              stroke="#4318FF"
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="withdrawals"
              stroke="#6AD2FF"
              strokeWidth={2.5}
              dot={false}
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
