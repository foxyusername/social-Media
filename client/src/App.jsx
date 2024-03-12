import "./app.css";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import {lazy,Suspense} from "react"
import {QueryClientProvider,QueryClient} from "react-query"

import ProtectedRoute from "./validation/protectedRoute.jsx";
import ProtectedRouteHome from "./validation/ProtectedRoute(2).jsx";

//importing the main pages with dynamic lazy function

const Registration=lazy(()=>import('./pages/Registration/index.jsx'));
const Loading=lazy(()=>import('./components/Loading/Loading.jsx'));
const Home=lazy(()=>import('./pages/Home/Index.jsx'));
const Profile=lazy(()=>import('./pages/Profile/Profile.jsx'));
const NotFound=lazy(()=>import('./pages/404/404.jsx'));
const ProfileEdit=lazy(()=>import('./pages/ProfileEdit/ProfileEdit.jsx'));
const UserProfile=lazy(()=>import('./pages/userProfiles/UserProfile.jsx'));
const CreatePost=lazy(()=>import('./pages/createPosts/CreatePost.jsx'));

function App() {   

let queryClient= new QueryClient();


  return (

  <Suspense fallback={<Loading />} >
   
   <QueryClientProvider client={queryClient}>
   
   <Router>
    <Routes>

     <Route path="*" element={<NotFound />} />

      <Route element={<ProtectedRoute />}>

      <Route path="/signup" element={<Registration page="SIGNUP"/>} />
      <Route path="/login" element={<Registration page={"LOGIN"} />} />  
     
     </Route>

     <Route element={<ProtectedRouteHome />}>

     <Route path="/home" element={<Home />} />
     <Route path="/profile" element={<Profile />} />
     <Route path="/profile/edit" element={<ProfileEdit />} />
     <Route path="/profile/:username" element={<UserProfile />} />
     <Route path="/create" element={<CreatePost />} />
     </Route>

    </Routes>
  </Router>
  
  </QueryClientProvider>
  </Suspense>

  )
}

export default App