import { Navigate } from "react-router-dom";

import * as ROUTES from "../constants/routes";

const ProtectedRouteNonAuthorized = ({ user, children }) => {
  //   console.log(children.type.name);
  if (!user) {
    return <Navigate to={ROUTES.HOMEPAGE} replace />;
  }

  return children;
};

export default ProtectedRouteNonAuthorized;
