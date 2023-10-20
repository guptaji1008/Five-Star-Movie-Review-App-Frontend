import { Route, Routes } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Navbar from "./components/users/Navbar";
import Home from "./components/Home";
import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import NotFound from "./components/NotFound";
import { useAuth } from "./hooks";
import AdminNavigator from "./navigator/AdminNavigator";
import SingleMovie from "./components/users/SingleMovie";
import MovieReviews from "./components/users/MovieReviews";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchMovies from "./components/users/SearchMovies";

export default function App() {

  const {authInfo} = useAuth()

  const isAdmin = authInfo.profile?.role === "admin"

  if (isAdmin) return <AdminNavigator toast={toast}/>

  return (
    <div>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home toast={toast} />} />
          <Route path="auth/signin" element={<Signin toast={toast} />} />
          <Route path="auth/signup" element={<Signup toast={toast} />} />
          <Route path="auth/emailverification" element={<EmailVerification toast={toast} />} />
          <Route path="auth/forgetpassword" element={<ForgetPassword toast={toast} />} />
          <Route path="auth/resetpassword" element={<ConfirmPassword toast={toast} />} />
          <Route path="movie/:movieId" element={<SingleMovie toast={toast} />} />
          <Route path="movie/reviews/:movieId" element={<MovieReviews toast={toast} />} />
          <Route path="movie/search" element={<SearchMovies toast={toast} />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}