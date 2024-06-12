import React, { useState } from "react";
import logo from "../../../../src/assests/img/nk music logo.png";
import Button from "../../Shared/Button";
import { IonIcon } from "@ionic/react";
import { Link } from "react-router-dom";
// import { close, menu } from 'ionicons/icons';
// import * as Ionicons from 'ionicons/types'

interface NavLink {
  id: number;
  name: string;
  link: string;
}

const NavLinks: NavLink[] = [
  { id: 1, name: "Home", link: "/#" },
  { id: 2, name: "AboutUs", link: "/AboutUs" },
  { id: 3, name: "Products", link: "/Products" },
  { id: 4, name: "ContactUs", link: "/ContactUs" },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-0.5 md:px-10 px-7">
      <Link to="/" className="text-2xl text-secendaryDark mr-4 pt-2 cursor-pointer flex items-center font-inter">
        <img
          alt=""
          src={logo}
          className="d-inline-block align-top w-24 h-auto"
        />
        NKBEATS
      </Link>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-14 cu md:hidden"
        >
          {/* <ion-icon name={open ? "close" : "menu"}></ion-icon> */}
          <IonIcon name={open ? "close" : "menu"} />
        </div>
        <ul
          className={`md:flex md-items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transi duration-500 ease-in ${
            open
              ? "top-40 opacity-100"
              : "top-[-490px] md:opacity-100 opacity-0"
          }`}
        >
          {NavLinks.map(({ id, name, link }) => (
            <li key={id} className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href={link}
                className="text-gray-800 hover:text-secendary duration-500"
              >
                {name}
              </a>
            </li>
          ))}
          <Button>Login</Button> {/* Use the Button component */}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
