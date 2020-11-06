import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AppContextData, Post } from './types'

export const appContextDefaultValue: AppContextData = {
  posts: [],
  isLoading: false,
  fetchPosts: () => null,
  sortPosts: () => null
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

  const sortPosts = useCallback((type: string) => {
    if (type === 'createdAt') {
      setPosts(
        [...posts].sort(
          (a, b) => (new Date(b[type]) as any) - (new Date(a[type]) as any)
        )
      )
    } else {
      setPosts(
        [...posts].sort((a, b) => b[type] - a[type])
      )
    }

  }, [setPosts, posts])

  return {
    posts,
    isLoading,
    fetchPosts,
    sortPosts,
  }
}

export function usePostsLoading() {
  const { fetchPosts } = useContext(AppContext)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])
}
