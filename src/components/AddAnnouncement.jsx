import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import { v4 } from "uuid";
import { xml2json } from "xml-js";

import { colRefAnnouncement, storage } from "../api/firebase";
import * as ROUTES from "../constants/routes";

const UnauthorizedUsers = () => {
  return (
    <>
      <h1>Please authorize</h1>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </>
  );
};

const AddAnnouncement = ({ user }) => {
  if (!user) return <UnauthorizedUsers />;

  const [search, setSearch] = useState("");
  const [isSomethingFound, setIsSomethingFound] = useState(false);
  const [bggItems, setBggItems] = useState();
  const [bggItem, setBggItem] = useState();
  const [imageURL, setImageURL] = useState();
  const [isImageURL, setIsImageURL] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);

  const announcementForm = useRef(null);

  const addAnnouncementForm = (el) => {
    el.preventDefault();

    // console.log(announcementForm);

    if (imageUpload !== null) {
      console.warn("THIS WORK");

      const imageRef = ref(storage, `${user.uid}/announcement-photo-${v4()}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageURL(url);
          // console.log("Upload img: ", url);
        });
      });

      setImageUpload(null);
    } else {
      console.warn("User didn't uploaded his own image, will use default image");
      setImageURL(bggItem.image._text);
    }
  };

  //! ADDIND ANNOUNCEMENT TO FIREBASE

  useEffect(() => {
    if (imageURL !== undefined) {
      // console.log("Users image", imageURL);
      // console.log(announcementForm);
      addDoc(colRefAnnouncement, {
        categoryOfYheGame: announcementForm.current.categoryOfYheGame.value,
        descriptionOfYheGame: announcementForm.current.descriptionOfYheGame.value,
        imgURL: imageURL,
        minAge: announcementForm.current.minAge.value,
        minMaxPlayer: announcementForm.current.minMaxPlayer.value,
        nameOfYheGame: announcementForm.current.nameOfYheGame.value,
        playingTime: announcementForm.current.playingTime.value,
        price: announcementForm.current.price.value,
        uid: user.uid,
        yearOfYheGame: announcementForm.current.yearOfYheGame.value,
        createdAt: serverTimestamp(),
      }).then(() => {
        announcementForm.current.reset();
        announcementForm.current.descriptionOfYheGame.innerHTML = "";
        setIsImageURL(false);
      });
    }
  }, [imageURL]);

  const getExactGame = (e) => {
    const id = e.target.parentElement.dataset.id;
    // console.log(id);

    setIsSomethingFound(false);

    axios
      .get(`https://boardgamegeek.com/xmlapi2/thing?id=${id}`)
      .then((res) => {
        let jsonDATA = xml2json(res.data, { compact: true, spaces: 2 });
        let data = JSON.parse(jsonDATA);

        // console.log(data.items.item);

        setSearch("");
        setBggItem(data.items.item);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (bggItem != undefined) {
      // console.log(bggItem);
      // console.log(announcementForm);

      let currentForm = announcementForm.current;
      let category = currentForm.categoryOfYheGame;

      currentForm.reset();

      setIsImageURL(true);

      if (bggItem.name.length == undefined) {
        currentForm.nameOfYheGame.value = bggItem?.name?._attributes?.value;
      } else {
        currentForm.nameOfYheGame.value = bggItem?.name[0]?._attributes?.value;
      }

      currentForm.descriptionOfYheGame.innerHTML = bggItem?.description?._text;
      currentForm.yearOfYheGame.value = bggItem.yearpublished?._attributes?.value;
      currentForm.minMaxPlayer.value =
        bggItem?.minplayers?._attributes?.value + "-" + bggItem?.maxplayers?._attributes?.value;
      currentForm.minAge.value = bggItem?.minage?._attributes?.value;
      currentForm.playingTime.value = bggItem?.playingtime?._attributes?.value;
      currentForm.userGamePhoto.required = false;

      bggItem?.link.map((el) => {
        if (el._attributes.type == "boardgamecategory") {
          category.value += el._attributes.value + ", ";
        }
      });
      category.value = category.value.slice(0, category.value.length - 2);
    }
  }, [bggItem]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search !== undefined) {
        axios
          .get(`https://boardgamegeek.com/xmlapi2/search?query=${search}`)
          .then((res) => {
            // console.log(res.data);

            let jsonDATA = xml2json(res.data, { compact: true, spaces: 2 });
            let data = JSON.parse(jsonDATA);

            if (data.items._attributes.total != 0) {
              let items = data.items.item;

              // console.log(items);

              if (data.items._attributes.total == 1) {
                items.length = 1;
                setBggItems([items]);
              } else {
                items.length = 3;
                setBggItems(items);
              }

              setIsSomethingFound(true);
            } else {
              setIsSomethingFound(false);
              console.warn("Nothing found");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div>
      <div className='relative w-full hidden md:block'>
        <svg
          className='absolute top-[250px] right-0'
          width='215'
          height='307'
          viewBox='0 0 215 307'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <g filter='url(#filter0_i_1_228)'>
            <rect
              x='55.8387'
              y='205.33'
              width='218.602'
              height='47.4076'
              rx='23.7038'
              transform='rotate(-40.4675 55.8387 205.33)'
              fill='#BABD23'
            />
            <rect
              x='207.33'
              y='250.344'
              width='218.602'
              height='47.4076'
              rx='23.7038'
              transform='rotate(-130.468 207.33 250.344)'
              fill='#BABD23'
            />
          </g>
          <defs>
            <filter
              id='filter0_i_1_228'
              x='65.5519'
              y='62.9822'
              width='177.648'
              height='181.648'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'>
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='14' />
              <feGaussianBlur stdDeviation='2' />
              <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
              <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
              <feBlend mode='normal' in2='shape' result='effect1_innerShadow_1_228' />
            </filter>
          </defs>
        </svg>
        <svg
          className='absolute top-[-100px] left-[-50px] hidden lg:block'
          width='374'
          height='351'
          viewBox='0 0 374 351'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <g filter='url(#filter0_d_101_5)'>
            <circle cx='57' cy='42' r='127' fill='#7D3131' />
          </g>
          <g filter='url(#filter1_i_101_5)'>
            <circle cx='64.5' cy='41.5' r='282.5' stroke='#822525' strokeWidth='54' />
          </g>
          <defs>
            <filter
              id='filter0_d_101_5'
              x='-74'
              y='-85'
              width='262'
              height='280'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'>
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='22' />
              <feGaussianBlur stdDeviation='2' />
              <feComposite in2='hardAlpha' operator='out' />
              <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
              <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_101_5' />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='effect1_dropShadow_101_5'
                result='shape'
              />
            </filter>
            <filter
              id='filter1_i_101_5'
              x='-245'
              y='-268'
              width='619'
              height='623'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'>
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='16' />
              <feGaussianBlur stdDeviation='2' />
              <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
              <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
              <feBlend mode='normal' in2='shape' result='effect1_innerShadow_101_5' />
            </filter>
          </defs>
        </svg>
        <svg
          className='absolute top-[50px] left-0 block lg:hidden'
          width='205'
          height='253'
          viewBox='0 0 205 253'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <g filter='url(#filter0_i_1_125)'>
            <rect
              x='-2.25952'
              y='169.835'
              width='179.068'
              height='38.834'
              rx='19.417'
              transform='rotate(-40.4675 -2.25952 169.835)'
              fill='#245B7D'
            />
            <rect
              x='121.835'
              y='206.708'
              width='179.068'
              height='38.834'
              rx='19.417'
              transform='rotate(-130.468 121.835 206.708)'
              fill='#245B7D'
            />
          </g>
          <defs>
            <filter
              id='filter0_i_1_125'
              x='5.69702'
              y='53.2303'
              width='145.521'
              height='149.521'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'>
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='14' />
              <feGaussianBlur stdDeviation='2' />
              <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
              <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
              <feBlend mode='normal' in2='shape' result='effect1_innerShadow_1_125' />
            </filter>
          </defs>
        </svg>
      </div>
      <div className='flex justify-center items-center flex-col mx-[10%] md:mx-[7%] z-10 mt-[20px]'>
        <div className='w-full md:w-3/5 '>
          <div className='relative'>
            <input
              type='text'
              name='search'
              id='search'
              placeholder='Search'
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className='border-solid border-black border-2 rounded px-5 py-2 w-full'
            />
            <div className='w-full absolute top-full left-0 bg-gray-200 z-50 rounded-b'>
              {isSomethingFound &&
                bggItems.map(({ name, yearpublished, _attributes }, index) => {
                  let nameExect = name?._attributes?.value;
                  let yearExect =
                    yearpublished?._attributes?.value != undefined
                      ? yearpublished?._attributes?.value
                      : "Unknown";
                  return (
                    <div
                      key={index}
                      className='m-2 cursor-pointer'
                      onClick={getExactGame}
                      data-id={_attributes.id}>
                      <p>
                        {/* <span className='font-bold'>Name: </span> */}
                        {nameExect + " - " + yearExect}
                        {/* <span className='font-bold'>Year: </span> */}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <form
              ref={announcementForm}
              onSubmit={addAnnouncementForm}
              className='flex justify-center items-center flex-col mt-4 bg-gray-300 rounded p-3 md:px-10 md:py-6'>
              <input
                type='text'
                name='nameOfYheGame'
                id='nameOfYheGame'
                placeholder='Nazwa gry'
                className='border-solid border-black border-2 mt-3 px-5 py-2 w-full rounded'
                maxLength={50}
                required
              />
              <div className='flex justify-center items-center mt-3 w-full'>
                <input
                  type='number'
                  name='yearOfYheGame'
                  id='yearOfYheGame'
                  placeholder='Rok gry'
                  className='border-solid border-black border-2 mr-3 px-5 py-2 w-full rounded'
                  required
                />
                <input
                  type='text'
                  name='minMaxPlayer'
                  id='minMaxPlayer'
                  placeholder='Liczba graczy'
                  className='border-solid border-black border-2 px-5 py-2 w-full rounded'
                  required
                />
              </div>
              <div className='flex justify-between items-center mt-3 w-full'>
                <input
                  type='number'
                  name='minAge'
                  id='minAge'
                  placeholder='Min. Wiek'
                  className='border-solid border-black border-2 mr-3 px-5 py-2 w-full rounded'
                  required
                />
                <input
                  type='number'
                  name='playingTime'
                  id='playingTime'
                  placeholder='Czas gry'
                  className='border-solid border-black border-2 px-5 py-2 w-full rounded'
                  required
                />
              </div>
              <div className='flex justify-between items-center mt-3 w-full'>
                <input
                  type='text'
                  name='categoryOfYheGame'
                  id='categoryOfYheGame'
                  placeholder='Kategorie'
                  className='border-solid border-black border-2 mr-3 px-5 py-2 w-full rounded'
                  required
                />
                <input
                  type='number'
                  name='price'
                  id='price'
                  placeholder='Cena'
                  className='border-solid border-black border-2 px-5 py-2 w-full rounded'
                  required
                />
              </div>
              <textarea
                name='descriptionOfYheGame'
                id='descriptionOfYheGame'
                cols='30'
                rows='5'
                className='border-solid border-black border-2 mt-3 px-3 py-2 w-full rounded resize-none'
                required
                placeholder='Opis'></textarea>
              <div className='flex justify-center items-center flex-col'>
                <input
                  type='file'
                  name='userGamePhoto'
                  id='userGamePhoto'
                  accept='image/*'
                  onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                  }}
                  className='mt-3 px-3 py-2 w-full'
                  required
                />
                <p className={isImageURL ? "block" : "hidden"}>Obraz jest już zdefiniowany</p>
              </div>
              <input
                type='submit'
                value='Submit'
                className='border-solid border-black border-2 rounded px-5 py-3 mt-3 w-3/4 lg:w-2/5 text-2xl cursor-pointer'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncement;
