import React from "react";
import { Link } from "react-router-dom";

const Card = ({ hit }) => {
  // console.log(hit.objectID != undefined ? hit : hit);
  // console.log(hit);

  return (
    <Link to={`../product/${hit.objectID != undefined ? hit.objectID : hit.id}`}>
      <div className='w-[280px] h-[370px] m-5 p-3 cursor-pointer relative bg-gray-200 rounded'>
        <div className='flex justify-center items-center'>
          <img src={hit.imgURL} alt='' className='object-cover w-full h-[230px]' />
        </div>
        <div className='text-[20px] mt-3'>
          <p>{hit.nameOfYheGame}</p>
        </div>
        <div className='absolute bottom-3 left-2'>
          <p className='text-[22px] text-red-600 font-bold'>{hit.price}zl</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
