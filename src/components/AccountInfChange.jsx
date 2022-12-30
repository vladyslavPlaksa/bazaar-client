import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { auth, db } from "../api/firebase";
import { useSearchParams } from "react-router-dom";

const AccountInfChange = ({ isNewUser }) => {
  const [isExist, setIsExist] = useState(null);

  const docRefCurrentUserInfo = doc(db, "userInfo", auth?.currentUser?.uid);

  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(searchParams.get("isNewUser"));

  useEffect(() => {
    if (searchParams.get("isNewUser") != null) {
      setIsExist(false);
      isNewUser(true);
    } else {
      getDoc(docRefCurrentUserInfo).then((snapshot) => {
        // console.log(snapshot.exists());

        setIsExist(snapshot.exists());
      });
    }
  }, []);

  const changeData = (e) => {
    e.preventDefault();

    if (isExist) {
      updateData(e);
    } else {
      setData(e);
    }
  };

  const updateData = (e) => {
    let configUpdatedData;

    if (e.target.phoneNumber.value != "" && e.target.facebookUrl.value != "") {
      // console.log(e.target.phoneNumber.value, e.target.facebookUrl.value, "1");

      configUpdatedData = {
        phoneNumber: `+48${e.target.phoneNumber.value}`,
        facebookUrl: e.target.facebookUrl.value,
      };
    } else if (e.target.phoneNumber.value != "" && e.target.facebookUrl.value == "") {
      // console.log(e.target.phoneNumber.value, e.target.facebookUrl.value, "2");

      configUpdatedData = {
        phoneNumber: `+48${e.target.phoneNumber.value}`,
      };
    } else if (e.target.phoneNumber.value == "" && e.target.facebookUrl.value != "") {
      // console.log(e.target.phoneNumber.value, e.target.facebookUrl.value, "3");

      configUpdatedData = {
        facebookUrl: e.target.facebookUrl.value,
      };
    }

    updateDoc(docRefCurrentUserInfo, configUpdatedData).then(() => {
      console.warn("Data was updated");
    });
  };

  const setData = (e) => {
    let configSetData;

    if (e.target.phoneNumber.value != "" && e.target.facebookUrl.value != "") {
      // console.log(e.target.phoneNumber.value, e.target.facebookUrl.value, "4");
      configSetData = {
        phoneNumber: `+48${e.target.phoneNumber.value}`,
        facebookUrl: e.target.facebookUrl.value,
      };
    } else if (e.target.phoneNumber.value != "" && e.target.facebookUrl.value == "") {
      // console.log(e.target.phoneNumber.value, e.target.facebookUrl.value, "5");
      configSetData = {
        phoneNumber: `+48${e.target.phoneNumber.value}`,
        facebookUrl: null,
      };
    } else if (e.target.phoneNumber.value == "" && e.target.facebookUrl.value != "") {
      // console.log(e.target.phoneNumber.value, e.target.facebookUrl.value, "6");
      configSetData = {
        phoneNumber: null,
        facebookUrl: e.target.facebookUrl.value,
      };
    }

    setDoc(docRefCurrentUserInfo, configSetData).then(() => {
      console.warn("Data was set");
      isNewUser(false);
    });
  };

  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <div className='w-[75%] flex justify-start items-center bg-gray-200 p-10 rounded'>
        <form onSubmit={changeData} className='w-full md:w-1/2 flex flex-col'>
          {!isExist && (
            <p className='text-red-600 font-semibold text-l pb-3'>Dodaj swój numer telefonu</p>
          )}
          <input
            type='text'
            id='phoneNumber'
            name='phoneNumber'
            maxLength={9}
            placeholder='Dodaj/zmień swój numer telefonu'
            autoComplete='tel-national'
            className='border-solid border-black border-2 rounded px-5 py-2 mb-2'
          />
          <input
            type='text'
            id='facebookUrl'
            name='facebookUrl'
            placeholder='Dodaj/zmień link do Facebooka'
            className='border-solid border-black border-2 rounded px-5 py-2 mb-2'
          />
          <input type='submit' />
        </form>
      </div>
    </div>
  );
};

export default AccountInfChange;
