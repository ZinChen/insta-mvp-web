import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import PostList from './components/PostList'
import { AppContext, useAppContextValue } from './context'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Navbar from './components/Navbar'
import ModalLogin from './components/ModalLogin'
import ModalSignup from './components/ModalSignup'
import ModalPostForm from './components/ModalPostForm'

dayjs.extend(relativeTime)

function App() {
  const appContextValue = useAppContextValue()

  return (
    <AppContext.Provider value={appContextValue} >
      <BrowserRouter>
        <Navbar />
        <ModalLogin />
        <ModalSignup />
        <ModalPostForm />
        <section className="container">
          <Route path="/:postsUser?" component={PostList} />
          {/* <PostList /> */}
        </section>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
