import React, { useEffect, useState } from "react";
import { getDocs, orderBy, query, where } from "firebase/firestore";

import { auth, colRefAnnouncement } from "../api/firebase";
import Card from "./Card";

const UserAnnouncements = () => {
  const [docsData, setDocsData] = useState(null);

  useEffect(() => {
    const q = query(
      colRefAnnouncement,
      where("uid", "==", `${auth?.currentUser?.uid}`),
      orderBy("createdAt", "desc")
    );

    getDocs(q).then((snapshot) => {
      let docs = [];
      snapshot.docs.map((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      // console.log(docs);
      setDocsData(docs);
    });
  }, []);

  return (
    <div className='mx-[15%] md:mx-[10%]'>
      <div className='mt-4 flex flex-wrap justify-around'>
        {docsData !== null && docsData.map((doc) => <Card key={doc.id} hit={doc} />)}
      </div>
    </div>
  );
};

export default UserAnnouncements;
