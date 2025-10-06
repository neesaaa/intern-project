import SearchBar from "./SearchBar";

import Logo from "./Logo";
const NavBar = () => {
  return (
    <div className="flex justify-between gap-2">
      <div className="flex md:w-[55vw] gap-2 md:gap-[40px]">
        <Logo />
        <SearchBar />
      </div>
    </div>
  );
};

export default NavBar;
