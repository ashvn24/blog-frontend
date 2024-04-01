
import { Outlet } from "react-router-dom";

import Homepage from "../Pages/Homepage";

function PrivateRoute() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Homepage/>
  }
    else {
    return <Outlet />;
  }
}

export default PrivateRoute;