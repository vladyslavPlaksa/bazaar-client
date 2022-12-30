import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import {
  Account,
  AddAnnouncement,
  Homepage,
  Navbar,
  Product,
  ProtectedRouteAuthorized,
  ProtectedRouteNonAuthorized,
  SignIn,
  SignUp,
  WrongPage,
  AccountInfChange,
  Search,
} from "./components";
import { auth } from "./api/firebase";
import * as ROUTES from "./constants/routes";
import FirebaseContext from "./contexts/firebase";

function App() {
  const [user, setUser] = useState();
  const [isNewUser, setIsNewUser] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(auth);
    // console.log(db);

    onAuthStateChanged(auth, (user) => {
      // console.log("user status changed:", user);
      setUser(user);
    });
  }, []);

  if (isNewUser && window.location.href.search(ROUTES.ACCOUNT_INF_CHANGE) == -1) {
    navigate(ROUTES.ACCOUNT_INF_CHANGE);
    // console.log(window.location.href.search(ROUTES.ACCOUNT_INF_CHANGE));
  }

  return (
    <FirebaseContext.Provider value={user}>
      <div className='z-10 relative'>
        <Navbar navigate={navigate} />
      </div>
      <div>
        <Routes>
          <Route exact path={ROUTES.HOMEPAGE} element={<Homepage />} />
          <Route exact path={ROUTES.SEARCH} element={<Search />} />
          <Route
            exact
            path={ROUTES.SIGN_IN}
            element={
              <ProtectedRouteAuthorized user={user ? true : false}>
                <SignIn navigate={navigate} />
              </ProtectedRouteAuthorized>
            }
          />
          <Route
            exact
            path={ROUTES.SIGN_UP}
            element={
              // <ProtectedRouteAuthorized user={user ? true : false}>
              <SignUp navigate={navigate} />
              // </ProtectedRouteAuthorized>
            }
          />
          <Route
            exact
            path={ROUTES.ACCOUNT}
            element={
              <ProtectedRouteNonAuthorized user={user ? true : false}>
                <Account navigate={navigate} />
              </ProtectedRouteNonAuthorized>
            }
          />
          <Route
            exact
            path={ROUTES.ACCOUNT_INF_CHANGE}
            element={
              <ProtectedRouteNonAuthorized user={user ? true : false}>
                <AccountInfChange navigate={navigate} isNewUser={setIsNewUser} />
              </ProtectedRouteNonAuthorized>
            }
          />
          <Route exact path={`${ROUTES.PRODUCT}/:productCode`} element={<Product />} />
          <Route exact path={ROUTES.ADD_ANNOUNCEMENT} element={<AddAnnouncement user={user} />} />
          <Route exact path={ROUTES.ERROR} element={<WrongPage />} />
        </Routes>
      </div>
      <footer className='w-full h-[90px] md:h-0'></footer>
    </FirebaseContext.Provider>
  );
}

export default App;
