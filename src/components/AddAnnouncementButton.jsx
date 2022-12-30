import React from "react";
import { BsPlusCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

import * as ROUTES from "../constants/routes";

const AddAnnouncementButton = () => {
  return (
    <div className='mr-3'>
      <Link to={ROUTES.ADD_ANNOUNCEMENT} className='text-[45px] '>
        <BsPlusCircle title='Doday ołoszenie' />
      </Link>
    </div>
  );
};

export default AddAnnouncementButton;
