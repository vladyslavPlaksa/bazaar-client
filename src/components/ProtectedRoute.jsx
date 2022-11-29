import { Navigate } from "react-router-dom";

import * as ROUTES from "../constants/routes";

const ProtectedRoute = ({ user, children }) => {
  console.log(children);
  if (
    (!user && (children.type.name == "Account" || children.type.name == "UserAnnouncements")) ||
    (user && (children.type.name == "SignUp" || children.type.name == "SignIn"))
  ) {
    return <Navigate to={ROUTES.HOMEPAGE} replace />;
  }

  return children;
};

export default ProtectedRoute;
