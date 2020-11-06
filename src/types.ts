import React from 'react'

export interface Post {
  id: number
  imageUrl: string
  description: string
  createdAt: string
}

export interface AppContextData {
  posts: Post[]
}

export const appContextDefaultValue: AppContextData = {
  posts: [
    {
      "id": 40,
      "imageUrl": "https://picsum.photos/id/224/800",
      "description": "Et ad tenetur excepturi ratione reprehenderit consequatur aspernatur velit quam voluptatem dolores aliquid harum voluptas.",
      "createdAt": "2020-11-06T08:35:52.020Z"
    },
    {
      "id": 39,
      "imageUrl": "https://picsum.photos/id/30/800",
      "description": "Iure rerum optio libero adipisci corporis ex nulla labore nihil voluptatem.",
      "createdAt": "2020-11-06T08:35:52.014Z",
    },
    {
      "id": 38,
      "imageUrl": "https://picsum.photos/id/3/800",
      "description": "Necessitatibus molestias nesciunt est ab ex minus qui veniam quos.",
      "createdAt": "2020-11-06T08:35:52.004Z",
    }
  ]
}

export const AppContext = React.createContext<AppContextData>(appContextDefaultValue)
