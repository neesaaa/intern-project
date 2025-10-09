import one from '../../assets/HeroSection/1st.png'
import two from '../../assets/HeroSection/2nd.png'
import three from '../../assets/HeroSection/3rd.png'
import fourth from '../../assets/HeroSection/4th\'.png'
import fifth from '../../assets/HeroSection/5th.png'

export default function StudentsComm() {
  const students = [
    {
      name: "Alex Johnson",
      image: one,
    },
    {
      name: "Marcus Williams",
      image: two,
    },
    {
      name: "David Chen",
      image: three,
    },
    {
      name: "Emma Rodriguez",
      image: fourth,
    },
    {
      name: "Sarah Thompson",
      image: fifth,
    },
  ]

  return (
    <div className="absolute -bottom-20 right-25 lg:right-30 z-50 lg:bottom-20 inline-flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)]">
      <div className="flex -space-x-2 ">
        {students.map((student, index) => (
          <div
            key={index}
            className="relative h-10 w-10 overflow-hidden rounded-full  "
          >
            <img src={student.image} alt={student.name} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <p className="font-semibold text-[12px] leading-[100%] text-black self-start">
        Join our community of
        <br />
        <span className="font-semibold">1200+ Students</span>
      </p>
    </div>
  )
}
