import ins from "../assets/dash/ins.png";
import file from "../assets/dash/file.png";
import course from "../assets/dash/courses.png";
import StatCard from "../components/Dash/StatCard";
import WalletCard from "../components/Dash/WalletCard";
import PieChartCard from "../components/Dash/PieChartCard";
import { tokenAtom } from "../atoms/authAtom";
import { useAtom } from "jotai";

import { useQuery } from "@tanstack/react-query";
import Header from "../components/Dash/Header";

const Dash = () => {
  const [token, _] = useAtom(tokenAtom);
  const { data, isLoading, error } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await fetch(
        "http://nassar1-001-site1.rtempurl.com/api/Course/Stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
    enabled: !!token,
  });
  if (isLoading) return <h1 className="text-black">Loading ....</h1>;

  return (
    <div className="text-black flex flex-col py-8 px-10 bg-[#FCFCFC] h-full gap-4">
      <Header h1={"Dashboard"} />
      <div className="flex flex-col py-4 gap-8">
        <div className="flex gap-4">
          <StatCard number={data.Instructors} icon={ins} text={"Instructors"} />
          <StatCard number={data.Categories} icon={file} text={"Categories"} />
          <StatCard number={data.Courses} icon={course} text={"Courses"} />
        </div>
        <div className="flex w-full gap-8 py-4">
          <WalletCard />
          <PieChartCard
            ins={data.Instructors}
            ca={data.Categories}
            co={data.Courses}
          />
        </div>
      </div>
    </div>
  );
};

export default Dash;
