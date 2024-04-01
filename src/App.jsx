
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import UserRoutes from "./Routes.jsx/UserRoutes";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" exact element={<LoginPage />} />
            <Route path="/signup" exact element={<SignupPage />} />
          
          </Route>

           <Route path="/user/*" element={<UserRoutes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
