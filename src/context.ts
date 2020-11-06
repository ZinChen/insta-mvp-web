import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AppContextData, Post } from './types'

export const appContextDefaultValue: AppContextData = {
  posts: [],
  isLoading: false,
  fetchPosts: () => null
}

export const AppContext = React.createContext<AppContextData>(appContextDefaultValue)

export function useAppContextValue(): AppContextData {
  const [posts, setPosts] = useState<Post[]>(appContextDefaultValue.posts)
  const [isLoading, setIsLoading] = useState(false)

  const fetchPosts = useCallback(() => {
    setIsLoading(true)
    fetch('http://localhost:3000/api/v1/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [setPosts])

  return {
    posts,
    isLoading,
    fetchPosts
  }
}

export function usePostsLoading() {
  const { fetchPosts } = useContext(AppContext)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])
}
