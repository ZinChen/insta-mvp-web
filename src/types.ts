export interface Post {
  id: number
  imageUrl: string
  description: string
  createdAt: string
  userName: string
  userPhoto: string
  comments: PostComment[]
}

export interface PostComment {
  id: number
  content: string
  createdAt: string
  userName: string
  userPhoto: string
}

export interface AppContextData {
  posts: Post[]
  isLoading: boolean
  fetchPosts: () => void
}
