import notification from '../../assets/dash/notification.png'

const Header = ({h1}) => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-[28px] leading-[30px] font-medium tracking-[0px] text-left">
          {h1}
        </h1>
        <div className="rounded-full bg-white flex items-center justify-center relative shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)] p-3">
          <img src={notification} alt="notification icon" />
          <div className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></div>
        </div>
      </div>
      <div className="w-full h-0.5 bg-gray-200"></div>
    </>
  );
};

export default Header;
