import React from 'react'
import PostList from './PostList'
import { AppContext, useAppContextValue } from './context'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

function App() {
  const appContextValue = useAppContextValue()

  return (
    <AppContext.Provider value={appContextValue} >
      <section className="container">
        <PostList />
      </section>
    </AppContext.Provider>
  )
}

export default App
