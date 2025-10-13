import { useParams } from "react-router-dom";
import CourseHeader from "../components/CourseDetailsPage/CourseHeader";
import CourseDescribtion from "../components/CourseDetailsPage/CourseDescribtion";
import { FaAward, FaGraduationCap, FaPlay } from "react-icons/fa";
import DetailsPandIcon from "../components/CourseDetailsPage/DetailsPandIcon";
import CourseSection from "../components/CourseDetailsPage/CourseSection";
import ReviewStarts from "../components/CourseDetailsPage/ReviewStarts";
import PeopleReviews from "../components/CourseDetailsPage/PeopleReviews";
import CourseCard from "../components/LandingSections/CourseCard";
import { useQuery } from "@tanstack/react-query";
import imgCourse from "../assets/CourseDetails/9f78bb27f926865ee81d7c8fd61b9fa8b2895ae3.png";
import FooterLogos from "../components/LandingSections/FooterLogos";
import { UpdateToBasket } from "../Services/BasketService";
import { cartAtom } from "../atoms/cartAtom";
import { useAtom } from "jotai";
import { tokenAtom } from "../atoms/authAtom";
import { toast } from "react-toastify";

const fecthCoursePage = async (id) => {
  const response = await fetch(
    `https://nassar1-001-site1.rtempurl.com/api/Course/Course/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch course");
  }
  const data = await response.json();
  return data;
};

const CourseDetailPage = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [token, _] = useAtom(tokenAtom);
  const { courseId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["courses", courseId],
    queryFn: () => fecthCoursePage(courseId),
    enabled: !!courseId,
    onError: (err) => {
      console.error("Failed to fetch course:", err);
    },
  });
  if (isLoading)
    return (
      <div className="w-12 h-12 self-center mx-auto rounded-full border-4 border-gray-200 border-t-gray-500 animate-spin"></div>
    );
  if (error) return <div>Error loading course</div>;

  async function HandleAddtoCart() {
    if (!data) return;

    const newItem = {
      Id: data.Course.Id,
      CourseName: data.Course.Name,
      PictureUrl: data.Course.ImageUrl,
      TotalHours: data.Course.TotalHours,
      TotalLectures: data.Course.Sections.reduce(
        (sum, s) => sum + (s.LecturesNumber || 0),
        0
      ),
      InstructorName: data.Course.Instructor.Name,
      Cost: data.Course.Cost,
      Rate: data.Course.Rate,
    };

    const updatedCart = [...cart, newItem];

    const orderObject = {
      Id: 12,
      Items: updatedCart,
    };

    try {
      const data = await UpdateToBasket(token, orderObject);
      setCart(data.Items);
    } catch {
      toast.error("failed to update basket");
      return;
    }
  }

  return (
    <main className="flex items-center w-full  text-black ">
      <section className="flex flex-col gap-6 ">
        {/*ROMADE*/}
        <div className="bg-gray-100 py-10 flex justify-between ">
          <div className="flex flex-col text-black  gap-10 px-3 md:px-20 ">
            <CourseHeader CourseName={data.Course.Name} />
            <CourseDescribtion
              name={data.Course.Name}
              desc={data.Course.Description}
              rate={data.Course.Rate}
              sections={data.Course.Sections}
              totalHours={data.Course.TotalHours}
              instructor={data.Course.Instructor}
              category={data.Course.Category}
              ImageUrl={data.Course.Instructor.ImageUrl}
            />
            <div className="flex flex-col gap-2 lg:hidden">
              <button
                disabled={cart.some((item) => item.Id === data.Course.Id)}
                onClick={HandleAddtoCart}
                className="font-medium hover:scale-105 hover:bg-gray-700 text-[14px] leading-[160%] cursor-pointer bg-black text-white py-4 px-2 rounded-lg     disabled:bg-gray-400 disabled:text-gray-200 
                  disabled:hover:scale-100 disabled:hover:bg-gray-400 
                  disabled:cursor-not-allowed"
              >
                {cart.some((item) => item.Id === data.Course.Id)
                  ? "Already in Cart"
                  : "Add to Cart"}
              </button>
              <button className="font-medium hover:scale-105 hover:bg-gray-200 text-[14px] leading-[160%] cursor-pointer bg-white py-4 px-2 rounded-lg border border-border_color">
                Buy Now
              </button>
            </div>
          </div>
          <div className="hidden lg:flex flex-col px-4 bg-white rounded-xl mr-3 xl:mr-20 absolute right-0 py-4 gap-8 shadow shadow-border_color">
            <img
              src={imgCourse}
              alt=""
              className="w-90 object-cover rounded-xl"
            />
            <div className="flex flex-col gap-6">
              <h3 className="font-semibold text-2xl leading-[140%]">
                {data.Course.Cost}$
              </h3>
              <button
                disabled={cart.some((item) => item.Id === data.Course.Id)}
                onClick={HandleAddtoCart}
                className="font-medium hover:scale-110 hover:bg-gray-700 text-[14px] leading-[160%] cursor-pointer bg-black text-white py-4 px-2 rounded-lg     disabled:bg-gray-400 disabled:text-gray-200 
                disabled:hover:scale-100 disabled:hover:bg-gray-400 
                disabled:cursor-not-allowed"
              >
                {cart.some((item) => item.Id === data.Course.Id)
                  ? "Already in Cart"
                  : "Add to Cart"}
              </button>
              <button className="font-medium hover:scale-110 hover:bg-gray-200 text-[14px] leading-[160%] cursor-pointer bg-white py-4 px-2 rounded-lg border border-border_color">
                Buy Now
              </button>
            </div>
            <div className="bg-gray-300 h-0.5  mx-[-16px] rounded-full"></div>
            <div className="flex flex-col gap-2">
              <p className="text-[16px] leading-[160%] font-medium">Share</p>
              <FooterLogos />
            </div>
          </div>
        </div>
        {/*buttons*/}
        <div className="flex  items-center gap-2 md:gap-6 text-black text-[14px] leading-[150%] px-3 md:px-20  ">
          <button
            onClick={() =>
              document
                .getElementById("description")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="py-4 px-2 md:px-6 bg-blue-50 border border-gray-300 rounded-lg cursor-pointer"
          >
            Description
          </button>
          <button
            onClick={() =>
              document
                .getElementById("instructor")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="py-4 px-2 md:px-6 bg-primary-50 border border-gray-300 rounded-lg cursor-pointer "
          >
            Instructor
          </button>
          <button
            onClick={() =>
              document
                .getElementById("content")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="py-4 px-2 md:px-6 bg-primary-50 border border-gray-300 rounded-lg cursor-pointer"
          >
            Content
          </button>
          <button
            onClick={() =>
              document
                .getElementById("reviews")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="py-4 px-2 md:px-6 bg-primary-50 border border-gray-300 rounded-lg cursor-pointer"
          >
            Reviews
          </button>
        </div>
        {/*line*/}
        <div className="bg-gray-300 h-0.5 mx-3 md:mx-20"></div>
        {/*Course Describtion & Certification*/}
        <div
          id="description"
          className="flex flex-col px-3 md:px-20 gap-1 text-black"
        >
          <div>
            <h4 className="font-semibold text-[20px] leading-[150%]">
              Course Describtion
            </h4>
            <p className="text-[16px] leading-[160%]">
              {data.Course.Description}
            </p>
          </div>
        </div>
        <div
          id="certification"
          className="flex flex-col px-3 md:px-20 gap-1 text-black"
        >
          <div>
            <h4 className="font-semibold text-[20px] leading-[150%]">
              Certification
            </h4>
            <p className="text-[16px] leading-[160%]">
              {data.Course.Certification}
            </p>
          </div>
        </div>
        {/*line*/}
        <div className="bg-gray-300 h-0.5 mx-3 md:mx-20"></div>
        {/* Instructor */}
        <div id="instructor" className="flex flex-col gap-4 px-3 md:px-20 ">
          <h4 className="font-semibold text-[20px] leading-[150%]">
            Instructor
          </h4>
          <div className="flex flex-col">
            <h4 className="font-semibold text-[20px] leading-[150%] text-blue-600">
              {data.Course.Instructor.Name}
            </h4>
            <h4 className="text-[16px] leading-[160%] ">
              {data.Course.Instructor.Title}
            </h4>
          </div>

          <div className="flex items-center gap-4 ">
            {data.Course.Instructor.ImageUrl && (
              <img
                src={data.Course.Instructor.ImageUrl}
                alt=""
                className="w-30 rounded-full "
              />
            )}
            <div className="flex flex-col gap-2">
              <DetailsPandIcon icon={FaAward} text={"40,445 Reviews"} />
              <DetailsPandIcon icon={FaGraduationCap} text={"500 Students"} />
              <DetailsPandIcon icon={FaPlay} text={"15 Courses"} />
            </div>
          </div>

          <p className="leading-[160%]">{data.Course.Instructor.Description}</p>
        </div>
        {/*line*/}
        <div className="bg-gray-300 h-0.5 mx-3 md:mx-20"></div>
        {/* Content*/}
        <div id="content" className="flex flex-col px-3 md:px-20 gap-4">
          <h4 className="font-semibold text-xl leading-[150%]">Content</h4>
          <div className="flex flex-col">
            {data.Course.Sections.map((s, idx) => (
              <CourseSection
                key={idx}
                lecs={s.LecturesNumber}
                hrs={s.TotalHours}
                main={s.Name}
              />
            ))}
          </div>
        </div>
        {/*line*/}
        <div className="bg-gray-300 h-0.5 mx-3 md:mx-20"></div>
        {/* Reviews*/}
        <div id="reviews" className="flex flex-col  px-3 md:px-20 gap-4">
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
            More Courses Like This:
          </h2>
          <div className="flex flex-col self-start  lg:flex-row items-center w-full  justify-around lg:self-center lg:justify-around">
            {data.Top4.map((course, idx) => (
              <CourseCard key={idx} {...course} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CourseDetailPage;
