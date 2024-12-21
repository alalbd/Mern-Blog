import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './components/contexts/AuthProvider'
import Layout from "./components/Layout"
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import NotFound from './components/pages/NotFound'
import Register from './components/pages/Register'
import AddNewPost from './components/pages/user/AddNewPost'
import AllPostList from './components/pages/user/AllPostList'
import Dashboard from './components/pages/user/Dashboard'
import EditPost from './components/pages/user/EditPost'
import Profile from './components/pages/user/Profile'
import PrivateRouter from './components/routes/PrivateRouter'
import PublicRoute from './components/routes/PublicRoute'
import AdminRoute from './components/routes/AdminRoute'
import AdminDashboard from './components/pages/admin/Dashboard'
import AdminAllPost from './components/pages/admin/AdminAllPost'
import AdminAddNewPost from './components/pages/admin/AdminAddNewPost'
import AdminProfile from './components/pages/admin/AdminProfile'
import AdminEditPostView from './components/pages/admin/AdminEditPostView'
import NewCategory from './components/pages/admin/NewCategory'
import AllCategoryList from './components/pages/admin/AllCategoryList'
import EditCat from './components/pages/admin/EditCat'
import SearchResult from './components/pages/Search'
import PostDetails from './components/pages/PostDetails'
import Category from './components/pages/Category'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='admin' element={<AdminRoute />}>
                <Route path='dashboard' element={<AdminDashboard />} />
                <Route path='all/post' element={<AdminAllPost />} />
                <Route path='add/new/post' element={<AdminAddNewPost />} />
                <Route path='edit/:id/post' element={<AdminEditPostView />} />
                <Route path='update/profile' element={<AdminProfile />} />
                <Route path='add/new/category' element={<NewCategory />} />
                <Route path='all/category' element={<AllCategoryList />} />
                <Route path='edit/:id/category' element={<EditCat />} />
              </Route >
              <Route path="user" element={<PrivateRouter />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='all/post' element={<AllPostList />} />
                <Route path='add/new/post' element={<AddNewPost />} />
                <Route path='edit/:id/post' element={<EditPost />} />
                <Route path='update/profile' element={<Profile />} />
              </Route >
              <Route path='/' element={<Home />} />
              <Route path='/search' element={<SearchResult />} />
              <Route path='/post/:id' element={<PostDetails />} />
              <Route path='/category/:id' element={<Category />} />
              <Route path="" element={<PublicRoute />}>
                <Route path='/singup' element={<Register />} />
                <Route path='/login' element={<Login />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
