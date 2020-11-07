import React from 'react'
import PostList from './components/PostList'
import { AppContext, useAppContextValue } from './context'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Navbar from './components/Navbar'
import ModalLogin from './components/ModalLogin'
import ModalSignup from './components/ModalSignup'

dayjs.extend(relativeTime)

function App() {
  const appContextValue = useAppContextValue()

  return (
    <AppContext.Provider value={appContextValue} >
      <Navbar />
      <ModalLogin />
      <ModalSignup />
      <section className="container">
        <PostList />
      </section>
    </AppContext.Provider>
  )
}

export default App
