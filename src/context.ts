import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AppContextData, Post, User, UserData } from './types'

export const appContextDefaultValue: AppContextData = {
  user: { id: null, email: '', photo: '', name: '', postLikes: [] },
  posts: [],
  isLoading: false,
  modal: '',
  setModal: () => null,
  clearModal: () => null,
  fetchPosts: () => null,
  sortPosts: () => null,
  login: () => null,
  signup: () => null,
  logout: () => null,
  onPostLike: () => null,
  createPost: () => null,
  createComment: () => null
}

export const AppContext = React.createContext<AppContextData>(appContextDefaultValue)

export function useAppContextValue(): AppContextData {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [modal, setModal] = useState('')
  const [user, setUser] = useState<User>(appContextDefaultValue.user)

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

  const clearModal = useCallback(() => {
    setModal('')
    setUser({ ...user, errors: undefined })
  }, [setModal, setUser, user])

  const login = useCallback((userData: UserData) => {
    setIsLoading(true)
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(response => {

        if (response.errors) {
          setUser({
            ...user,
            errors: response.errors
          })
        } else if (response.error) {
          console.log('server error:', response)
        } else {
          const { user = {} } = response
          setUser({
            id: user.id,
            email: user.email,
            name: user.name,
            photo: user.photo,
            postLikes: user.postLikes,
            errors: undefined
          })
          setModal('')
          localStorage.setItem('authenticationToken', user.authenticationToken)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [user, setUser, setModal])

  const signup = useCallback((userData: UserData) => {
    setIsLoading(true)
    fetch('http://localhost:3000/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(response => {
        if (response.errors) {
          setUser({
            ...user,
            errors: response.errors
          })
        } else if (response.error) {
          console.log('server error:', response)
        } else {
          const { user = {} } = response
          setUser({
            id: user.id,
            email: user.email,
            name: user.name,
            photo: user.photo,
            postLikes: user.postLikes,
            errors: undefined
          })
          setModal('')
          localStorage.setItem('authenticationToken', user.authenticationToken)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [user, setUser, setModal])

  const logout = useCallback(() => {
    setUser(appContextDefaultValue.user)
    fetchPosts()
  }, [setUser, fetchPosts])

  const onPostLike = useCallback((postId: number) => {
    if (user.email.length > 0) {
      const authenticationToken: string = localStorage.getItem('authenticationToken')
      fetch('http://localhost:3000/api/v1/post_like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authenticationToken
        },
        body: JSON.stringify({ post_id: postId })
      })
      .then(response => response.json())
      .then(response => {
        if (response.user) {
          setUser({
            ...user,
            postLikes: response.user.postLikes
          })

          const post = posts.find(post => post.id === postId)
          post.likesCount += response.user.postLikes.includes(postId) ? 1 : -1
          setPosts([
            ...posts
          ])
        }
      })
    } else {
      setModal('login')
    }
  }, [setModal, user, setUser, posts, setPosts])

  const createComment = useCallback((comment: string, postId: number) => {
    const authenticationToken: string = localStorage.getItem('authenticationToken')
    fetch('http://localhost:3000/api/v1/create_comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authenticationToken
      },
      body: JSON.stringify({ comment, post_id: postId })
    })
    .then(response => response.json())
    .then(response => {
      if (response.comment) {
        const post = posts.find(post => post.id === postId)
        post.comments.push(response.comment)
        setPosts([
          ...posts
        ])
      }
    })
  }, [posts, setPosts])

  const createPost = useCallback((image: string, comment: string) => {
    const authenticationToken: string = localStorage.getItem('authenticationToken')
    fetch('http://localhost:3000/api/v1/create_post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authenticationToken
      },
      body: JSON.stringify({ image, comment })
    })
    .then(response => response.json())
    .then(response => {
      if (response.post) {
        setPosts([
          response.post,
          ...posts
        ])
        setModal('')
      }
    })
  }, [posts, setPosts, setModal])

  return {
    user,
    posts,
    isLoading,
    modal,
    setModal,
    clearModal,
    fetchPosts,
    sortPosts,
    login,
    signup,
    logout,
    onPostLike,
    createComment,
    createPost
  }
}

export function usePostsLoading() {
  const { fetchPosts } = useContext(AppContext)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])
}
