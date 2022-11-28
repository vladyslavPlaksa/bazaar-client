import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";

import { colRefUserInfo, db } from "../api/firebase";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  //! GET ":productCode" from URL
  const productCode = useParams().productCode;
  const docRef = doc(db, "saleAnnouncements", productCode);

  useEffect(() => {
    getDoc(docRef).then((doc) => {
      console.warn("Request was made!!");
      setProduct({ ...doc.data(), id: doc.id });
    });
  }, []);

  useEffect(() => {
    // console.log("Product info", product);
    if (product != null) {
      const q = query(colRefUserInfo, where("uid", "==", product.uid));

      getDocs(q).then((snapshot) => {
        // console.log("User Info", { ...snapshot.docs[0].data(), id: snapshot.docs[0].id });
        setUserInfo({ ...snapshot.docs[0].data(), id: snapshot.docs[0].id });
      });
    }
  }, [product]);

  return (
    <>
      {product != null && (
        <div className='mx-[10%] md:mx-[7%] mb-10 flex justify-center items-center bg-gray-300 rounded p-[20px] md:p-[50px]'>
          <div className='w-full h-full'>
            <div className='flex justify-between flex-col md:flex-row'>
              <div className='w-full md:w-[42%]'>
                <img src={product.imgURL} alt='product image' className='w-full rounded' />
              </div>
              <div className='w-full md:w-[52%]'>
                <p className='mt-5 text-[32px] text-center md:text-left font-bold'>
                  {product.nameOfYheGame}
                </p>
                <p className='mt-4 ml-2 text-[18px]'>
                  <span className='font-semibold'>Liczba graczy: </span>
                  {product.minMaxPlayer}
                </p>
                <p className='mt-2 ml-2 text-[18px]'>
                  <span className='font-semibold'>Minimalny wiek gracza: </span>
                  {product.minAge}
                </p>
                <p className='mt-2 ml-2 text-[18px]'>
                  <span className='font-semibold'>Czas gry: </span>
                  {product.playingTime}min
                </p>
                <p className='mt-2 ml-2 text-[18px]'>
                  <span className='font-semibold'>Kategorie: </span>
                  {product.categoryOfYheGame}min
                </p>
                <p className='mt-2 ml-2 text-[18px]'>
                  {userInfo != null ? (
                    <a href={`tel:${userInfo?.phoneNumber}`} className='underline'>
                      Zadzwoń na numer {userInfo.phoneNumber}
                    </a>
                  ) : (
                    <span>Numer nie jest zdefiniowany</span>
                  )}
                </p>
                <p className='mt-4 text-[40px] text-red-600 font-bold text-center md:text-left'>
                  {product.price}zl
                </p>
              </div>
            </div>
            <div className='mt-5'>
              <pre className='whitespace-pre-wrap'>{product.descriptionOfYheGame}</pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
