import { useParams } from "react-router-dom";
import CourseHeader from "../components/CourseDetailsPage/CourseHeader";
import CourseDescribtion from "../components/CourseDetailsPage/CourseDescribtion";
import { FaAward, FaGraduationCap, FaPlay } from "react-icons/fa";
import DetailsPandIcon from "../components/CourseDetailsPage/DetailsPandIcon";
import CourseSection from "../components/CourseDetailsPage/CourseSection";
import ReviewStarts from "../components/CourseDetailsPage/ReviewStarts";
import PeopleReviews from "../components/CourseDetailsPage/PeopleReviews";
import CourseCard from "../components/LandingSections/CourseCard";

const CourseDetailPage = () => {
  const { courseId } = useParams();

  return (
    <main className="flex flex-col items-center w-full  text-black ">
      <section className="flex flex-col gap-6">
        {/*ROMADE*/}
        <div className="bg-gray-100 py-10">
          <div className="flex flex-col text-black  gap-10 px-3 md:px-20 ">
            <CourseHeader CourseName={"Course Name"} />
            <CourseDescribtion />
          </div>
        </div>
        {/*buttons*/}
        <div className="flex  items-center gap-2 md:gap-6 text-black text-[14px] leading-[150%] px-3 md:px-20  ">
          <button className="py-4 px-6 bg-blue-50 border border-gray-300 rounded-lg cursor-pointer">
            {" "}
            Description
          </button>
          <button className="py-4 px-6 bg-primary-50 border border-gray-300 rounded-lg cursor-pointer ">
            Instructor
          </button>
          <button className="py-4 px-6 bg-primary-50 border border-gray-300 rounded-lg cursor-pointer">
            Content
          </button>
          <button className="py-4 px-6 bg-primary-50 border border-gray-300 rounded-lg cursor-pointer">
            Reviews
          </button>
        </div>
        {/*line*/}
        <div className="bg-gray-300 h-1 mx-3 md:mx-20"></div>
        {/*Course Describtion & Certification*/}
        <div className="flex flex-col px-3 md:px-20 gap-1 text-black">
          <div>
            <h4 className="font-semibold text-[20px] leading-[150%]">
              Course Describtion
            </h4>
            <p className="text-[16px] leading-[160%]">
All of the paragraphs in the generator are written by humans, not computers. When first building this ge            </p>
          </div>
        </div>
        <div className="flex flex-col px-3 md:px-20 gap-1 text-black">
          <div>
            <h4 className="font-semibold text-[20px] leading-[150%]">
              Certification
            </h4>
            <p className="text-[16px] leading-[160%]">
All of the paragraphs in the generator are written by humans, not computers. When first building this ge            </p>
          </div>
        </div>
        {/*line*/}
        <div className="bg-gray-300 h-1 mx-3 md:mx-20"></div>
         {/* Instructor */}
        <div className="flex flex-col gap-4 px-3 md:px-20 ">
          <h4 className="font-semibold text-[20px] leading-[150%]">
            Instructor
          </h4>
          <div className="flex flex-col">
            <h4 className="font-semibold text-[20px] leading-[150%] text-blue-600">
              InstructorName
            </h4>
            <h4 className="text-[16px] leading-[160%] ">Ui/UX</h4>
          </div>

          <div className="flex items-center gap-4 ">
            <img src="" alt="" className="w-30 rounded-full " />
            <div className="flex flex-col gap-2">
              <DetailsPandIcon icon={FaAward} text={"40,445 Reviews"} />
              <DetailsPandIcon icon={FaGraduationCap} text={"500 Students"} />
              <DetailsPandIcon icon={FaPlay} text={"15 Courses"} />
            </div>
          </div>

          <p className="leading-[160%]">
            With over a decade of industry experience, Ronald brings a wealth of
            practical knowledge to the classroom. He has played a pivotal role
            in designing user-centric interfaces for renowned tech companies,
            ensuring seamless and engaging user experiences.
          </p>
        </div>
        {/*line*/}
        <div className="bg-gray-300 h-1 mx-3 md:mx-20"></div>
        {/* Content*/}
        <div className="flex flex-col px-3 md:px-20 gap-4">
          <h4 className="font-semibold text-xl leading-[150%]">Content</h4>
          <div className="flex flex-col">
            <CourseSection
              lecs={5}
              hrs={10}
              main={"sdsikdhjnsjkdhj sjdhsjdh"}
            />
            <CourseSection
              lecs={5}
              hrs={10}
              main={"sdsikdhjnsjkdhj sjdhsjdh"}
            />
            <CourseSection
              lecs={5}
              hrs={10}
              main={"sdsikdhjnsjkdhj sjdhsjdh"}
            />
            <CourseSection
              lecs={5}
              hrs={10}
              main={"sdsikdhjnsjkdhj sjdhsjdh"}
            />
          </div>
        </div>
        {/*line*/}
        <div className="bg-gray-300 h-1 mx-3 md:mx-20"></div>
        {/* Reviews*/}
        <div className="flex flex-col  px-3 md:px-20 gap-4">
          <h4 className="font-semibold text-xl leading-[150%]">
            Learner Reviews
          </h4>
          <div className="flex gap-4 flex-col md:flex-row justify-between md:gap-20">
            <ReviewStarts />
            <PeopleReviews />
          </div>
        </div>
        {/* Courses */}
        <div className="flex py-29 px-3 md:px-20 flex-col gap-6">
          <h2 className="font-semibold text-xl leading-[1.4]">
            More Courses Like This
          </h2>
          <div className="flex flex-col self-start lg:self-center lg:flex-row items-center gap-4 ">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </div>
        </div>


      </section>
    </main>
  );
};

export default CourseDetailPage;
