import Header from "../components/Dash/Header";
import { useState, useRef, useEffect } from "react";
import { ImageUpload } from "../components/AddCourse/ImageUpload";
import InputField from "../components/AddCourse/InputField";
import Select from "../components/AddCourse/Select";
import { Star } from "lucide-react";
import MarkdownField from "../components/AddCourse/MarkDown";
import { useNavigate, useParams } from "react-router-dom";
import CourseSectionInput from "../components/AddCourse/CourseSectionInput";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { z } from "zod";
import { useAtom } from "jotai";
import { tokenAtom } from "../atoms/authAtom";

const courseSchema = z.object({
  name: z.string().min(3, "Course name must be at least 3 characters"),
  category: z.number().min(0, "Category is required"),
  level: z.number().min(0, "Level is required"),
  instructorId: z.number().min(1, "Instructor is required"),
  cost: z
    .number({ invalid_type_error: "Cost must be a number" })
    .min(0, "Cost cannot be negative"),
  totalHours: z
    .number({ invalid_type_error: "Total hours must be a number" })
    .min(1, "Total hours must be at least 1"),
  description: z.string(),
  certification: z.string().optional(),
  rate: z.number().min(0).max(5),
  sections: z
    .array(
      z.object({
        name: z.string().min(1, "Section name is required"),
        lecturesNumber: z
          .number({ invalid_type_error: "Lectures number must be a number" })
          .min(1, "Section must have at least one lecture"),
        totalHours: z
          .number({ invalid_type_error: "Total hours must be a number" })
          .min(0.5, "Section hours must be greater than 0"),
      })
    )
    .min(1, "You must add at least one section"),
});

const CourseAddPage = () => {
  const { courseId } = useParams();
  const [token, _] = useAtom(tokenAtom);
  const isEditMode = !!courseId;

  const [index, setIndex] = useState(1);
  const [rate, setRate] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [sections, setSections] = useState([
    { id: 0, name: "", lecturesNumber: 0, totalHours: 0 },
  ]);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: -1,
    level: -1,
    instructorId: -1,
    cost: 0,
    totalHours: 0,
    description: "",
    certification: "",
  });
  const [existingImage, setExistingImage] = useState("");

  const [hoveredStar, setHoveredStar] = useState(0);
  const navigate = useNavigate();

  const categoryOptions = [
    { value: 0, label: "Development" },
    { value: 1, label: "Business" },
    { value: 2, label: "FinanceAndAccounting" },
    { value: 3, label: "ITAndSoftware" },
    { value: 4, label: "OfficeProductivity" },
    { value: 5, label: "PersonalDevelopment" },
    { value: 6, label: "Design" },
    { value: 7, label: "Marketing" },
    { value: 8, label: "Lifestyle" },
    { value: 9, label: "PhotographyAndVideo" },
    { value: 10, label: "HealthAndFitness" },
    { value: 11, label: "Music" },
    { value: 12, label: "TeachingAndAcademics" },
    { value: 13, label: "LanguageLearning" },
  ];

  const levelOptions = [
    { value: 0, label: "easy" },
    { value: 1, label: "mid" },
    { value: 2, label: "hard" },
  ];

  const queryClient = useQueryClient();

  const {
    data: instructorsData,
    isLoading: instructorsLoading,
    error: instructorsError,
  } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await fetch(
        `http://nassar1-001-site1.rtempurl.com/api/Course/Instructors`
      );
      if (!res.ok) throw new Error("Failed to fetch instructors");
      return res.json();
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: courseResponse,
    isLoading: courseLoading,
    error: courseError,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      if (!courseId) return null;
      const res = await fetch(
        `http://nassar1-001-site1.rtempurl.com/api/Course/Course/${courseId}`
      );
      if (!res.ok) throw new Error("Failed to fetch course");
      return res.json();
    },
    enabled: isEditMode,
    refetchOnWindowFocus: false,
  });

  const courseData = courseResponse?.Course;

  const mapEnumToNumber = (enumValue, options) => {
    if (enumValue === undefined || enumValue === null) return -1;

    const stringValue = enumValue.toString();

    const option = options.find(
      (opt) =>
        opt.label === stringValue ||
        opt.label.toLowerCase() === stringValue.toLowerCase()
    );

    return option?.value ?? -1;
  };

  useEffect(() => {
    if (isEditMode && courseData) {
      const categoryValue = mapEnumToNumber(
        courseData.Category,
        categoryOptions
      );
      const levelValue = mapEnumToNumber(courseData.Level, levelOptions);
      let instructorIdValue = -1;
      if (courseData.Instructor && instructorsData?.items) {
        const instructor = instructorsData.items.find(
          (i) => i.Name === courseData.Instructor.Name
        );
        instructorIdValue = instructor?.Id || -1;
      }
      setFormData({
        name: courseData.Name || "",
        category: categoryValue,
        level: levelValue,
        instructorId: instructorIdValue,
        cost: courseData.Cost || 0,
        totalHours: courseData.TotalHours || 0,
        description: courseData.Description || "",
        certification: courseData.Certification || "",
      });
      setRate(Math.round(courseData.Rate) || 0);
      if (courseData.ImageUrl) {
        setExistingImage(
          `http://nassar1-001-site1.rtempurl.com/${courseData.ImageUrl}`
        );
      }
      if (courseData.Sections && courseData.Sections.length > 0) {
        const initialSections = courseData.Sections.map((section, idx) => ({
          id: idx,
          name: section.Name || "",
          lecturesNumber: section.LecturesNumber || 0,
          totalHours: section.TotalHours || 0,
        }));
        setSections(initialSections);
        nextSectionId.current = initialSections.length;
      } else {
        setSections([{ id: 0, name: "", lecturesNumber: 0, totalHours: 0 }]);
      }
    }
  }, [courseData, instructorsData, isEditMode]);
  const nextSectionId = useRef(1);
  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: nextSectionId.current++,
        name: "",
        lecturesNumber: 0,
        totalHours: 0,
      },
    ]);
  };
  const handleRemoveSection = (idToRemove) => {
    setSections((prev) => {
      if (prev.length <= 1) {
        toast.error("Can't add course with no sections");
        return prev;
      }
      return prev.filter((s) => s.id !== idToRemove);
    });
  };
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      rate,
      sections: sections.map((section) => ({
        name: section.name,
        lecturesNumber: section.lecturesNumber,
        totalHours: section.totalHours,
      })),
    };

    const result = courseSchema.safeParse(submitData);
    if (!result.success) {
      const errorMessages = result.error.issues.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      setErrors(errorMessages);
      toast.error("Please fix the validation errors!");
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
      return;
    }

    setErrors([]);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("Name", result.data.name);
      formDataToSend.append("Description", result.data.description);
      formDataToSend.append("InstructorId", String(result.data.instructorId));
      formDataToSend.append("Category", String(result.data.category));
      formDataToSend.append("Level", String(result.data.level));
      formDataToSend.append("Cost", String(result.data.cost));
      formDataToSend.append("Rate", String(result.data.rate));
      formDataToSend.append("TotalHours", String(result.data.totalHours));
      formDataToSend.append("Certification", result.data.certification || "");

      if (imageFile) {
        formDataToSend.append("ImageFile", imageFile);
      } else if (existingImage) {
        formDataToSend.append("ExistingImagePath", existingImage);
      }

      result.data.sections.forEach((section, idx) => {
        formDataToSend.append(`Sections[${idx}].Name`, section.name);
        formDataToSend.append(
          `Sections[${idx}].LecturesNumber`,
          String(section.lecturesNumber)
        );
        formDataToSend.append(
          `Sections[${idx}].TotalHours`,
          String(section.totalHours)
        );
      });

      let url = "";
      let method = "POST";

      if (isEditMode) {
        url = `http://nassar1-001-site1.rtempurl.com/api/Course/Update/${courseId}`;
        method = "PUT";
        formDataToSend.append("Id", String(courseId));
      } else {
        url = "http://nassar1-001-site1.rtempurl.com/api/Course/Add";
        method = "POST";
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const successMessage = isEditMode
        ? "Course updated successfully!"
        : "Course added successfully!";

      toast.success(successMessage);

      await queryClient.invalidateQueries({ queryKey: ["courses"] });
      if (isEditMode) {
        await queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      }

      navigate("/courses");
    } catch (err) {
      console.error("handleSubmit error:", err);
      toast.error(err?.message || "Failed to call server");
    }
  };

  if (instructorsLoading || (isEditMode && courseLoading))
    return <p>Loading...</p>;
  if (instructorsError) return <p>Error loading instructors</p>;
  if (isEditMode && courseError) return <p>Error loading course data</p>;

  const instructorOptions =
    instructorsData?.items?.map((i) => ({
      value: i.Id,
      label: i.Name,
    })) || [];

  console.log(formData);

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-black flex flex-col py-8 px-10 bg-[#FCFCFC] h-full gap-4">
        <Header h1={"Courses"} />
        <div className="flex flex-col bg-white rounded-xl gap-6">
          <div className="flex gap-4 items-center p-6">
            {index == 2 && (
              <ChevronLeft
                onClick={() => setIndex(1)}
                className="cursor-pointer"
              />
            )}
            <span className="font-medium text-[24px] leading-[30px]">
              {isEditMode ? "Edit Course" : "Add Course"}
            </span>
            <span className="font-medium text-[16px] leading-[30px] text-[#626C83] self-end">
              Step {index} of 2
            </span>
          </div>

          {index == 1 && (
            <div className="flex flex-col px-6 gap-4">
              <h1 className="font-medium text-[20px] leading-[100%] text-[#2B3453]">
                Course details
              </h1>
              <div className="flex flex-col gap-4 w-full">
                <ImageUpload
                  existingImage={existingImage}
                  onFileSelect={setImageFile}
                />
                <InputField
                  name={"name"}
                  label={"Course Name"}
                  id={"name"}
                  placeholder={"Write here"}
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <div className="flex w-full gap-4 ">
                  <Select
                    label={"Category"}
                    options={categoryOptions}
                    value={formData.category}
                    onChange={(value) =>
                      handleInputChange("category", parseInt(value))
                    }
                  />
                  <Select
                    label={"Level"}
                    options={levelOptions}
                    value={formData.level}
                    onChange={(value) =>
                      handleInputChange("level", parseInt(value))
                    }
                  />
                </div>
                <div className="flex w-full gap-4 ">
                  <Select
                    label={"Instructors"}
                    options={instructorOptions}
                    value={formData.instructorId}
                    onChange={(value) =>
                      handleInputChange("instructorId", parseInt(value))
                    }
                  />
                  <InputField
                    name={"cost"}
                    label={"Cost"}
                    id={"cost"}
                    type="number"
                    placeholder={"Write here"}
                    value={formData.cost}
                    onChange={(e) =>
                      handleInputChange("cost", parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
                <div className="flex w-full gap-4 ">
                  <InputField
                    name={"totalHours"}
                    label={"Total Hours"}
                    id={"totalHours"}
                    type="number"
                    step="0.1"
                    placeholder={"Write here"}
                    value={formData.totalHours}
                    onChange={(e) =>
                      handleInputChange(
                        "totalHours",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                  <div className="flex flex-col w-full gap-2 ">
                    <label className="font-medium text-[14px] leading-[100%] tracking-[0.02em]">
                      Rate
                    </label>
                    <div className="flex gap-1 pt-2 w-full items ">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRate(star)}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          className="transition-transform hover:scale-110 flex-start"
                        >
                          <Star
                            className={`h-8 w-8  ${
                              star <= (hoveredStar || rate)
                                ? "fill-yellow-300 text-gray-300"
                                : "fill-none text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex w-full gap-4 ">
                  <MarkdownField
                    name={"description"}
                    label={"Description"}
                    placeholder={"Write here"}
                    value={formData.description}
                    onChange={setFormData}
                    field="description"
                  />
                  <MarkdownField
                    name={"certification"}
                    label={"Certification"}
                    placeholder={"Write here"}
                    value={formData.certification}
                    onChange={setFormData}
                    field="certification"
                  />
                </div>

                <div className="flex w-full gap-4 ">
                  <button
                    onClick={() => navigate("/courses")}
                    type="button"
                    className="py-4 px-3 bg-red-100 text-red-600 rounded-lg flex-1 hover:bg-red-100/50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIndex(2)}
                    type="button"
                    className="py-4 px-3 bg-black text-white flex-[5] rounded-lg hover:bg-black/50 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {index == 2 && (
            <div className="flex flex-col px-6 gap-4">
              <h1 className="font-medium text-[20px] leading-[100%] text-[#2B3453]">
                Add Content
              </h1>
              <div className="flex flex-col gap-4">
                {sections.map((section, idx) => (
                  <CourseSectionInput
                    key={section.id}
                    id={section.id}
                    index={idx}
                    section={section}
                    onRemove={() => handleRemoveSection(section.id)}
                    onSectionChange={(updatedSection) => {
                      setSections((prev) =>
                        prev.map((s) =>
                          s.id === section.id ? { ...s, ...updatedSection } : s
                        )
                      );
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddSection}
                className="w-full py-3 bg-gray-50 text-black rounded-lg border border-dashed border-gray-200 hover:bg-gray-300"
              >
                Add Another Content +
              </button>

              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    Please fix the following errors before submitting:
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex w-full gap-4 ">
                <button
                  onClick={() => navigate("/courses")}
                  type="button"
                  className="py-4 px-3 bg-red-100 text-red-600 rounded-lg flex-1 hover:bg-red-100/50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-4 px-3 bg-black text-white flex-[5] rounded-lg hover:bg-black/50 cursor-pointer"
                >
                  {isEditMode ? "Update Course" : "Submit"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default CourseAddPage;
