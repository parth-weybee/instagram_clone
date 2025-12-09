import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { GOOGLE_AUTH_URL, LOGIN_URL, SIGNUP_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState("");
  const fullName = useRef();
  const password = useRef();
  const email = useRef();
  const userName = useRef();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  if (user) {
    navigate("/");
  }
  const handleAuth = async () => {
    if (isLogin) {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName.current.value,
          password: password.current.value,
        }),
      });
      const json = await response.json();
      if (json?.statusCode !== 200) {
        setIsError(json?.message);
      } else {
        localStorage.setItem("accessToken", json?.data?.accessToken);
        localStorage.setItem("refreshToken", json?.data?.refreshToken);
        dispatch(setUser(json?.data?.user));
        navigate("/");
      }
    } else {
      const response = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName.current.value,
          password: password.current.value,
          fullname: fullName.current.value,
          email: email.current.value,
        }),
      });
      const json = await response.json();
      if (json?.statusCode !== 200) {
        setIsError(json?.message);
      } else {
        setIsLogin(true);
      }
    }
    userName.current.value = "";
    password.current.value = "";
  };
  const handleGoogleAuth = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };
  return (
    <div className="h-screen bg-black flex flex-row items-center">
      <div className="flex w-full h-[50%] mx-auto items-center flex-col | md:w-9/12 | lg:flex-row lg:w-6/12">
        <div className="w-8/12 flex justify-center">
          <img
            className="w-6/12"
            src="https://boldist.co/wp-content/uploads/2023/06/What-Is-Social-Login-and-Does-Your-Business-Need-It_.jpg"
            alt="Login_Page_IMG"
          />
        </div>
        <div className="flex w-10/12 flex-col | md:w-4/12">
          <h1 className="text-3xl text-white font-bold mx-auto py-4 font-serif">
            Instagram
          </h1>
          {!isLogin && (
            <>
              <input
                ref={fullName}
                type="text"
                placeholder="Enter Full Name"
                className="bg-black text-gray-200 text-sm my-3 p-2 border-white border outline-none"
              />
              <input
                ref={email}
                type="text"
                placeholder="Enter Email"
                className="bg-black text-gray-200 text-sm p-2 border-white border outline-none"
              />{" "}
            </>
          )}
          <input
            ref={userName}
            type="text"
            placeholder="Enter UserName"
            className="bg-black text-gray-200 text-sm my-3 p-2 border-white border outline-none"
          />
          <input
            ref={password}
            type="password"
            placeholder="Enter Password"
            className="bg-black text-gray-200 text-sm p-2 border-white border outline-none"
          />
          <button
            className="w-full rounded-lg py-1 bg-blue-500 my-2 text-white"
            onClick={handleAuth}
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
          {isError?.length === 0 ? (
            <></>
          ) : (
            <p className="text-red-500">{isError}</p>
          )}
          <div className="flex items-center">
            <hr className="w-5/12" />
            <p className="text-gray-600 px-4">OR</p>
            <hr className="w-5/12" />
          </div>
          <button
            className="text-white flex gap-3 my-4 mx-auto"
            onClick={handleGoogleAuth}
          >
            <img
              className="w-6 h-6 bg-white rounded-2xl"
              src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Google-favicon-2015.png?20150901215638"
              alt="google"
            />{" "}
            login with Google
          </button>
          <p className="text-white font-semibold">
            {isLogin ? "Don't have an account?  " : "Already have account? "}{" "}
            <button
              className="font-bold text-blue-700"
              onClick={() => {
                setIsLogin(!isLogin);
                setIsError("");
              }}
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
