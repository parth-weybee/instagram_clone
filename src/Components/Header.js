import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { togglePostContainer } from "../redux/createPostSlice";
import { toggleShowSearch } from "../redux/searchSlice";
import { AVATAR_IMG_URL } from "../utils/constant";

const Header = () => {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.Profile.userProfile);
  const navigate = useNavigate();
  const handleLogOut = ()=>
  {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  }
  return (
    <div className="fixed bg-black  px-2 py-6 h-[80px] z-50 flex flex-row w-full bottom-0 border-t items-center | md:z-30 md:items-start md:border-t-0 md:flex-col md:h-screen md:w-1/12 md:border-r | lg:w-2/12">
      <h1 className="text-3xl text-white px-4 py-5 font-serif hidden | lg:inline-block">
        <Link to="/"> Instagram </Link>
      </h1>
      <h1 className="text-2xl text-white font-serif px-4 hidden | md:px-4 md:inline-block md:py-5 | lg:hidden">
        <i className="fa-brands fa-instagram"></i>
      </h1>
      <ul className="flex flex-row list-none justify-between w-full items-center | md:justify-start md:flex-col md:items-start">
        <li className="px-4 text-white font-semibold text-xl | md:py-4">
          <Link to="/">
            <i className="fa-solid fa-house"></i>{" "}
            <span className="hidden lg:inline-block">Home</span>
          </Link>
        </li>
        <li className="p-4 text-white font-semibold text-xl hidden | md:inline-block">
          <button onClick={() => dispatch(toggleShowSearch(true))}>
            <i className="fa-solid fa-magnifying-glass"></i>{" "}
            <span className="hidden lg:inline-block">Search</span>
          </button>
        </li>
        <li className="px-4 text-white font-semibold text-xl | md:py-4">
          <Link to="/">
            <i className="fa-regular fa-compass"></i>
            <span className="hidden lg:inline-block"> Explore</span>
          </Link>
        </li>
        <li className="px-4 text-white font-semibold text-xl | md:py-4">
          <Link to="/">
            <i className="fa-solid fa-play"></i>
            <span className="hidden lg:inline-block"> Reels</span>
          </Link>
        </li>
        <li className="px-4 text-white font-semibold text-xl | md:py-4">
          <button onClick={() => dispatch(togglePostContainer(true))}>
            <i className="fa-solid fa-plus"></i>
            <span className="hidden lg:inline-block"> Create</span>
          </button>
        </li>
        <li className="px-2 py-4 text-white font-semibold text-xl | md:px-0 | lg:px-2">
          <Link
            to={"/profile/" + profile?.account?.username}
            className="flex flex-row items-center"
          >
            <img
              className="w-12 h-12 rounded-full"
              src={profile?.coverImage?.url || AVATAR_IMG_URL}
              alt="AVATAR IMG"
            />
            <span className="hidden lg:inline-block"> Profile</span>
          </Link>
        </li>
      </ul>
      <button className="mt-auto px-4 py-3 text-red-500 text-xl hidden | lg:inline-block" onClick={()=> handleLogOut()}>LogOut</button>
    </div>
  );
};

export default Header;
