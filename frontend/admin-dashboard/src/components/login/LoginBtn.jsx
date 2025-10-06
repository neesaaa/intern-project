import arrow from "../../assets/login/Icon.png";

const LoginBtn = ({ text, disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`inline-flex self-center md:self-start items-center cursor-pointer gap-6 ${
        disabled ? "bg-gray-500" : "bg-black"
      } text-white rounded-xl px-6 py-2.5 mt-4`}
    >
      <span>{text}</span>
      <img src={arrow} />
    </button>
  );
};

export default LoginBtn;
