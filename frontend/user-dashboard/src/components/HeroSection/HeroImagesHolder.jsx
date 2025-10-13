import fullMan from "../../assets/HeroSection/all man.png";
import halfman from "../../assets/HeroSection/halfman.png";
import redwman from "../../assets/HeroSection/red.png";
import kolha from "../../assets/HeroSection/image 7.png";
import yellow from "../../assets/HeroSection/yellow.png";
import ImgCard from "./ImgCard";
import StudentsComm from "../LandingSections/StudentsComm";
import dashed from "../../assets/HeroSection/dashed.png";

const HeroImagesHolder = () => {
  return (
    <div className="relative flex flex-1 min-h-[410px] md:min-h-[600px]">
      <ImgCard
        full={fullMan}
        clipped={halfman}
        className={"right-0 md:right-3 md:-top-10 "}
        bg={"bg-blue-500"}
        clippedPos={"-top-9.5 "}
        clippedExists
      />
      <ImgCard
        full={kolha}
        clipped={redwman}
        className={"top-45 right-35 md:right-63 md:top-25"}
        bg={"bg-red-500"}
        clippedPos={"-top-12.5 "}
        clippedExists
      />
      <ImgCard
        full={yellow}
        className={"-right-5 top-55 md:-right-5 md:top-60"}
        bg={"bg-yellow-500"}
      />
      <StudentsComm />
      <div className="w-9 h-9 rounded-full bg-gray-900 absolute  items-center justify-center hidden md:flex right-45 top-50">
        <div className="transform rotate-45 w-4 h-4 bg-white"></div>
      </div>
      <div className=" block absolute right-80 top-40 w-17 h-23 z-0 transform rotate-30 md:right-110 md:top-25 scale-120">
        <img src={dashed} />
      </div>
      <div className=" hidden lg:block absolute right-80 top-40 w-17 h-23 z-0 transform rotate-30 md:left-175 md:top-65 scale-120">
        <img src={dashed} />
      </div>
    </div>
  );
};

export default HeroImagesHolder;
