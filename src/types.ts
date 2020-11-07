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

export interface User {
  id: number
  email: string
  name: string
  photo: string
  postLikes: number[]
  errors?: UserErrors
}

export interface UserData {
  email: string
  password: string
  name?: string
}

export interface UserErrors {
  email?: string
  password?: string
  name?: string
}

export interface AppContextData {
  user: User
  posts: Post[]
  isLoading: boolean
  modal: string
  setModal: (modal: string) => void
  fetchPosts: () => void
  sortPosts: (type: string) => void
  login: (user: UserData) => void
  signup: (user: UserData) => void
  logout: () => void
  clearModal: () => void
  onPostLike: (postId: number) => void
  createPost: (image: string, comment: string) => void
  createComment: (comment: string, postId: number) => void
}
