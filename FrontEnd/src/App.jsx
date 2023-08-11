import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import NewsDetail from './pages/NewsDetail';
import CheckArticle from './pages/Admin/Article/CheckArticle';
import Category from './pages/Category';
import NewArticle from './pages/NewArticle';
import ManageArticles from './pages/Admin/Article/ManageArticles';
import ManageArticlesForAuthor from './pages/Admin/Article/ManageArticleForAuthor';
import EditArticle from './pages/Admin/Article/EditArticle';
import ManageAuthor from './pages/Admin/Author/ManageAuthor';
import ManageCategory from './pages/Admin/Category/ManageCategory';
import ManageComment from './pages/Admin/Comment/ManageComment';
import ManageReader from './pages/Admin/Reader/ManageReader';
import ManageOfficer from './pages/Admin/Officer/ManageOfficer';

const App = () => {
  return (
    <>
    <Router>
        <Routes>
            {/* <Route path='/profile' element={<Profile />} /> */}
            <Route path='/category' element={<Category />} />
            <Route path='/article/new' element={<NewArticle />} />
            <Route path='/detail' element={<NewsDetail />} />
            <Route path='/' element={<Home />} />
            <Route path='/manage/check' element={<CheckArticle />} />
            <Route path='/manage/edit' element={<EditArticle />} />
            <Route path='/manage/article' element={<ManageArticles />} />
            <Route path='/manage/articleAU' element={<ManageArticlesForAuthor />} />
            <Route path='/manage/comment' element={<ManageComment />} />
            <Route path='/manage/employee' element={<ManageOfficer />} />
            <Route path='/manage/reader' element={<ManageReader />} />
            <Route path='/manage/category' element={<ManageCategory />} />
            <Route path='/manage/author' element={<ManageAuthor />} />
        </Routes>
    </Router>
    {/* <ToastContainer position='top-left' autoClose={1000} />
    <AxiosLoading /> */}
</>
  )
}

export default App
