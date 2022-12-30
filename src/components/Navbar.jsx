import { useContext } from "react";
import { Link } from "react-router-dom";

import { auth } from "../api/firebase";
import * as ROUTES from "../constants/routes";
import FirebaseContext from "../contexts/firebase";

const Navbar = () => {
  const userIs = useContext(FirebaseContext);

  const testPhoto =
    "https://firebasestorage.googleapis.com/v0/b/game-secondhand-app.appspot.com/o/user-icon-default%2Fuser-default-icon.jpg?alt=media&token=25598f5a-c32f-4c74-b0cd-0a8ef46cb4b1";

  return (
    <div className='w-full fixed bottom-0 z-50 flex justify-center items-center text-[20px] md:relative  md:text-[25px] font-semibold text-white md:mb-5 bg-[#9A3737]'>
      <div className='flex justify-between w-full md:w-[90%] py-5 px-2 md:p-5'>
        <div className='flex justify-center items-center'>
          <Link to={ROUTES.HOMEPAGE}>Główna</Link>
        </div>
        <ul className='w-[290px] md:w-[450px] flex justify-between items-center'>
          <li>
            <Link to={ROUTES.SEARCH}>Szukaj</Link>
          </li>
          {!userIs ? (
            <li>
              <Link to={ROUTES.SIGN_IN}>Zaloguj</Link>
            </li>
          ) : (
            <li>
              <Link to={ROUTES.ACCOUNT}>
                <img
                  src={auth.currentUser.photoURL != null ? auth.currentUser.photoURL : testPhoto}
                  alt='User photo'
                  className='w-[50px] h-[50px] rounded-full'
                />
              </Link>
            </li>
          )}
          <li>
            <Link
              to={ROUTES.ADD_ANNOUNCEMENT}
              className='bg-white rounded-md px-[12px] py-[9px] text-[15px] md:px-[20px] md:py-[12px] md:text-[22px] text-[#9A3737]'>
              Dodaj Ogłoszenie
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
