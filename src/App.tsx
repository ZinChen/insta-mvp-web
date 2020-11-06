import React, { useEffect } from 'react'
import PostList from './PostList'
import { AppContext, appContextDefaultValue } from './types'

function App() {
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/posts')
      .then((response) => response.json())
      .then((data) => console.log(data))
  })

  return (
    <AppContext.Provider value={appContextDefaultValue} >
      <section className="container">
        <PostList />
      </section>
    </AppContext.Provider>
  )
}

export default App
