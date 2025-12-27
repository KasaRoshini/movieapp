import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/Film_Finder_logo.jpeg";
import profile_icon from "../../assets/profile.icon.png";
import { logout } from "../../firebase";
import SearchBar from "../SearchBar/SearchBar";
function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const navRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if(!navRef.current) return;
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <SearchBar />
        <div
          className="navbar-dropdown"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img src={profile_icon} alt="Dropdown" className="icon" />
          {showMenu && (
            <div className="signout-menu">
              <p onClick={() => logout()}>Sign Out</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
