/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getDocs, query, where } from "firebase/firestore";
import { auth, colRefUserInfo } from "../api/firebase";
import AddAnnouncementButton from "./AddAnnouncementButton";
import UserAnnouncements from "./UserAnnouncements";

const Account = () => {
  const [userInfo, setUserInfo] = useState(null);

  const userPhoto = auth.currentUser.photoURL;
  const testPhoto =
    "https://firebasestorage.googleapis.com/v0/b/game-secondhand-app.appspot.com/o/user-icon-default%2Fuser-default-icon.jpg?alt=media&token=25598f5a-c32f-4c74-b0cd-0a8ef46cb4b1";
  useEffect(() => {
    const q = query(colRefUserInfo, where("uid", "==", `${auth.currentUser.uid}`));

    getDocs(q).then((snapshot) => {
      // console.log("data", snapshot);
      if (snapshot.docs > 0) {
        // console.log("User Info", { ...snapshot.docs[0].data(), id: snapshot.docs[0].id });
        setUserInfo({ ...snapshot.docs[0].data(), id: snapshot.docs[0].id });
      } else {
        console.warn("User doesn't have phone number in firestore");
      }
    });
  }, []);

  return (
    <>
      <AddAnnouncementButton />
      <div className='relative'>
        <svg
          className='absolute top-[250px] right-0'
          width='102'
          height='157'
          viewBox='0 0 102 157'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M115.051 9.76225L144.401 147.84C144.434 147.998 144.413 148.064 144.402 148.095C144.383 148.149 144.337 148.234 144.246 148.315C144.155 148.397 144.067 148.434 144.01 148.447C143.979 148.455 143.911 148.469 143.757 148.419L9.5038 104.798C9.34943 104.747 9.30321 104.696 9.28218 104.672C9.2441 104.628 9.19459 104.545 9.16922 104.426C9.14385 104.307 9.15557 104.211 9.17253 104.156C9.1819 104.125 9.2031 104.059 9.32372 103.951L114.228 9.49465C114.348 9.38604 114.416 9.37185 114.448 9.36574C114.505 9.35466 114.601 9.35298 114.717 9.39069C114.833 9.4284 114.91 9.48625 114.949 9.52869C114.971 9.55213 115.018 9.60349 115.051 9.76225Z'
            stroke='#245B7D'
            strokeWidth='17'
          />
        </svg>
        <svg
          className='absolute left-0 top-[400px]'
          width='83'
          height='187'
          viewBox='0 0 83 187'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M73.8952 44.7275L70.2694 148.556C70.2619 148.772 70.1158 148.959 69.9075 149.019L-29.9594 177.655C-30.1676 177.715 -30.3906 177.634 -30.5117 177.454L-88.6071 91.3243C-88.7282 91.1447 -88.7199 90.9075 -88.5866 90.7368L-24.6246 8.86922C-24.4912 8.69852 -24.2631 8.63311 -24.0596 8.7072L73.5665 44.2402C73.77 44.3143 73.9027 44.511 73.8952 44.7275Z'
            stroke='#8E1A1A'
            strokeWidth='17'
          />
        </svg>
        <svg
          className='absolute left-0 top-0'
          width='99'
          height='193'
          viewBox='0 0 99 193'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M55.0659 24.8899L90.0703 94.2298C90.1389 94.3657 90.1418 94.5253 90.0784 94.6636L57.6912 165.264C57.6277 165.402 57.5048 165.504 57.3571 165.541L-18.0335 184.238C-18.1812 184.275 -18.3376 184.242 -18.4583 184.149L-80.0816 136.864C-80.2023 136.771 -80.2743 136.629 -80.2771 136.477L-81.7296 58.8158C-81.7324 58.6636 -81.6658 58.5185 -81.5487 58.4214L-21.7365 8.86507C-21.6193 8.76799 -21.4643 8.72955 -21.3153 8.76063L54.7217 24.6258C54.8706 24.6569 54.9973 24.7541 55.0659 24.8899Z'
            stroke='#609927'
            strokeWidth='17'
          />
        </svg>
      </div>
      <div className='flex justify-center items-center flex-col my-5'>
        <img
          src={userPhoto != null ? userPhoto : testPhoto}
          alt='User photo'
          className='w-[150px] h-[150px] rounded-full'
        />
        <div>{auth.currentUser.displayName}</div>
        <div>
          {userInfo !== null ? userInfo.phoneNumber : "Urzytkownik nie podał numer telefonu"}
        </div>
      </div>
      <UserAnnouncements />
    </>
  );
};

export default Account;
