import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import EditPost from './pages/EditPost'
import PostList from './pages/PostList'
import SearchPost from './pages/SearchPost'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<PostList />} />
          <Route path='/search' element={<SearchPost/>} />
          <Route path='/create' element={<EditPost key={'create'}/>} />
          <Route path='/edit/:id' element={<EditPost key={'edit'} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
