import { Fragment } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function PieChartCard({ ins, co, ca }) {
  const tot=ins+ co+ ca;
  const data = [
    { name: "Instructors", value: Math.round(ins/tot*100), color: "#4318FF" },
    { name: "Categories", value: Math.round(ca/tot*100), color: "#EFF4FB" },
    { name: "Courses", value: Math.round(co/tot*100), color: "#6AD2FF" },
  ];
  return (
    <div className="p-6 flex flex-col gap-5 flex-1 shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)] rounded-xl bg-white">
      <h3 className="text-[20px] leading-[30px] font-semibold">Statistics</h3>

      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 w-full bg-white  justify-between p-6 shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)] ">
        {data.map((entry, index) => (
          <Fragment key={index}>
            <div
              key={index}
              className="flex flex-col items-center justify-between gap-1.5"
            >
              <div className="flex gap-1.5 items-center">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-[12px] font-medium leading-[20px] tracking-[-0.02em]">
                  {entry.name}
                </span>
              </div>
              <span className="font-bold text-[18px] leading-[30px]">
                {entry.value}%
              </span>
            </div>
            {index != 2 && (
              <div className="w-0.5 h-full roounded-full bg-gray-300"></div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
