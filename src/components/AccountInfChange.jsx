import React from "react";
import { query, setDoc, where, doc, getDocs } from "firebase/firestore";

import { auth, colRefUserInfo, db } from "../api/firebase";

const AccountInfChange = () => {
  const changeData = (e) => {
    e.preventDefault();

    const q = query(colRefUserInfo, where("uid", "==", `${auth.currentUser.uid}`));

    getDocs(q).then((snapshot) => {
      console.log(snapshot.docs[0].id);

      const docRef = doc(colRefUserInfo, snapshot.docs[0].id);

      setDoc(docRef, {
        phoneNumber: `+48${e?.target?.phoneNumber?.value}`,
        facebookUrl: e?.target?.facebookUrl?.value,
        uid: auth.currentUser.uid,
      }).then(() => {
        console.warn("Data was changed");
      });
    });

    // docRef
    //   .get()
    //   .then(function (thisDoc) {
    //     if (thisDoc.exists) {
    //       //user is already there, write only last login
    //       o.lastLoginDate = Date.now();
    //       docRef.update(o);
    //     } else {
    //       //new user
    //       o.displayName = firebase.auth().currentUser.displayName;
    //       o.accountCreatedDate = Date.now();
    //       o.lastLoginDate = Date.now();
    //       // Send it
    //       docRef.set(o);
    //     }
    //     toast("Welcome " + firebase.auth().currentUser.displayName);
    //   })
    //   .catch(function (error) {
    //     console.error(error.message);
    //   });
  };
  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <form onSubmit={changeData} className='flex flex-col bg-gray-300 p-10 rounded'>
        <label htmlFor='phoneNumber'>Change your phone number</label>
        <input
          type='text'
          id='phoneNumber'
          name='phoneNumber'
          maxLength={9}
          autoComplete='tel-national'
          className='border-solid border-black border-2 rounded px-5 py-2 mb-2'
        />
        <label htmlFor='facebookUrl'>Change your Facebook link</label>
        <input
          type='text'
          id='facebookUrl'
          name='facebookUrl'
          className='border-solid border-black border-2 rounded px-5 py-2 mb-2'
        />
        <input type='submit' />
      </form>
    </div>
  );
};

export default AccountInfChange;
