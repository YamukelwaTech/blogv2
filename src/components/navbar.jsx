import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { toggleModal, setIsMobile } from "../redux/navbarSlice";
import blog from "../assets/Icons/blog.png";

const navLinks = [
  { title: "FeedMe", url: "/" },
  { title: "PostUp", url: "/blog" },
  { title: "PostMe", url: "/newpost" },
];

const bgColor = "bg-customColor1";
const modalColor = "bg-customColor1";

const Navbar = () => {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.navbar.isMobile);
  const showModal = useSelector((state) => state.navbar.showModal);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth < 769));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const handleToggleModal = () => {
    dispatch(toggleModal());
  };

  return (
    <nav
      className={`w-full ${bgColor} ${
        isMobile ? "py-4 px-4" : "py-7 px-8 md:px-44"
      } sticky top-0 z-50`}
    >
      <div className="flex justify-between items-center">
        <div className="text-customColor2 font-bold text-xl flex items-center">
          YamukelwaBlogs{" "}
          <img src={blog} alt="Blog Icon" className="ml-2 h-6 w-6" />
        </div>
        {isMobile ? (
          <div className="flex items-center gap-4 text-customColor2 cursor-pointer">
            <FaBars
              onClick={handleToggleModal}
              className="text-customColor2 cursor-pointer"
            />
          </div>
        ) : (
          <ul className="flex gap-4 md:gap-8 items-center justify-center text-center cursor-pointer">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="text-customColor2 font-bold text-l hover:underline"
              >
                <Link to={link.url}>{link.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {showModal && isMobile && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className={`absolute inset-0 ${modalColor} opacity-90`} />
          <FaTimes
            className="absolute top-6 right-6 text-customColor2 cursor-pointer"
            onClick={handleToggleModal}
            style={{ fontSize: "24px" }}
          />
          <div className="relative bg-customColor1 w-full max-w-sm mx-auto p-8 rounded-lg">
            <div className="flex flex-col gap-4 items-center justify-center">
              {navLinks.map((link, index) => (
                <span
                  key={index}
                  className="text-customColor2 font-bold text-lg cursor-pointer hover:underline"
                  onClick={handleToggleModal}
                >
                  <Link to={link.url}>{link.title}</Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
