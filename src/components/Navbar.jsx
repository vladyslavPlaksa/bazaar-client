import { useContext } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { HiOutlineLogout } from "react-icons/hi";

import { auth } from "../api/firebase";
import * as ROUTES from "../constants/routes";
import FirebaseContext from "../contexts/firebase";

const Navbar = ({ navigate }) => {
  const user = useContext(FirebaseContext);

  return (
    <div className='lg:pr-[5%] text-[20px] md:text-[27px] mb-0 md:mb-5 lg:mb-0 bg-[#9A3737]'>
      {user ? <NavbarAuth navigate={navigate} /> : <NavbarNonAuth />}
    </div>
  );
};

const NavbarAuth = ({ navigate }) => {
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("user signed out");
        navigate(ROUTES.HOMEPAGE);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  return (
    <ul className='flex justify-end p-5'>
      <li className='mr-3'>
        <Link to={ROUTES.HOMEPAGE}>Homepage</Link>
      </li>
      <li className='mr-3'>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link onClick={logOut} className='text-[30px] md:text-[40px]'>
          <HiOutlineLogout title='Wyloguj' />
        </Link>
      </li>
    </ul>
  );
};

const NavbarNonAuth = () => {
  return (
    <ul className='flex justify-end p-5'>
      <li className='mr-3'>
        <Link to={ROUTES.HOMEPAGE}>Homepage</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  );
};
export default Navbar;
