export interface Post {
  id: number
  imageUrl: string
  description: string
  createdAt: string
  userName: string
  userPhoto: string
  likesCount: number
  commentsCount: number
  comments: PostComment[]
  likes: PostLike[]
}

export interface PostComment {
  id: number
  content: string
  createdAt: string
  userName: string
  userPhoto: string
}

export interface PostLike {
  id: number
  createdAt: string
  userName: string
  userPhoto: string
}

export interface AppContextData {
  posts: Post[]
  isLoading: boolean
  fetchPosts: () => void
  sortPosts: (type: string) => void
}
