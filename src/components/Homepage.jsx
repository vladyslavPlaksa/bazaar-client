import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-hooks-web";

import Card from "./Card";
import AddAnnouncementButton from "./AddAnnouncementButton";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);
// const searchClient = algoliasearch("52C6R4W3D9", "cc0baee80bb9153de6115294eb9aba59");

const Homepage = () => {
  // const [announcements, setAnnouncements] = useState();

  // // queries
  // const q = query(colRefAnnouncement, orderBy("createdAt", "desc"));

  // // realtime collection data

  // useEffect(() => {
  //   onSnapshot(q, (snapshot) => {
  //     let announcementsArray = [];
  //     snapshot.docs.forEach((doc) => {
  //       announcementsArray.push({ id: doc.id, data: doc.data() });
  //     });
  //     setAnnouncements(announcementsArray);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (announcements != undefined) {
  //     console.log(announcements);
  //   }
  // }, [announcements]);

  return (
    <div>
      <div className='relative'>
        <svg
          className='absolute left-0 bottom-[-1200px] md:bottom-[-1000px]'
          width='163'
          height='500'
          viewBox='0 0 163 500'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <g filter='url(#filter0_d_131_48)'>
            <circle cx='-87' cy='250' r='127' fill='#CFD153' />
          </g>
          <g filter='url(#filter1_i_131_48)'>
            <circle cx='-87' cy='250' r='223' stroke='#B4B733' strokeWidth='54' />
          </g>
          <defs>
            <filter
              id='filter0_d_131_48'
              x='-218'
              y='123'
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
              <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_131_48' />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='effect1_dropShadow_131_48'
                result='shape'
              />
            </filter>
            <filter
              id='filter1_i_131_48'
              x='-337'
              y='0'
              width='500'
              height='504'
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
              <feBlend mode='normal' in2='shape' result='effect1_innerShadow_131_48' />
            </filter>
          </defs>
        </svg>
        <svg
          className='absolute right-0 top-[150px]'
          width='167'
          height='285'
          viewBox='0 0 167 285'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <g filter='url(#filter0_i_131_39)'>
            <rect
              x='79.7529'
              y='234.912'
              width='218.602'
              height='47.4076'
              rx='23.7038'
              transform='rotate(-67.9675 79.7529 234.912)'
              fill='#8E1A1A'
            />
            <rect
              x='234.912'
              y='204.889'
              width='218.602'
              height='47.4076'
              rx='23.7038'
              transform='rotate(-157.968 234.912 204.889)'
              fill='#8E1A1A'
            />
          </g>
          <defs>
            <filter
              id='filter0_i_131_39'
              x='39.4294'
              y='39.4296'
              width='206.112'
              height='210.112'
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
              <feBlend mode='normal' in2='shape' result='effect1_innerShadow_131_39' />
            </filter>
          </defs>
        </svg>
      </div>
      <div className='mx-[10%] md:mx-[7%]'>
        <AddAnnouncementButton />

        <InstantSearch searchClient={searchClient} indexName='saleAnnouncements'>
          <SearchBox />

          <Hits hitComponent={Card} />
          {/* <div className='w-full mt-4 flex flex-wrap justify-around'> */}
          {/* </div> */}
        </InstantSearch>
      </div>
    </div>
  );
};

export default Homepage;
