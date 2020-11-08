import React, { useCallback, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext, usePostsLoading } from '../context'
import FlipMove from 'react-flip-move'
import SortSelect from './SortSelect'
import Post from './Post'

function PostList() {
  const { posts } = useContext(AppContext)
  const postsUser = useParams().postsUser
  usePostsLoading(postsUser)

  return (
    <div className="section">
      {postsUser && posts.length > 0 && (
        <div className="title has-text-centered">
          Posts by {posts[0].userName}
        </div>
      )}
      <div className="column is-half is-offset-one-quarter">
        <div className="level-right">
          <SortSelect />
        </div>
      </div>
      <div className="column is-half is-offset-one-quarter">
        {Array.isArray(posts) && (
          <FlipMove>
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </FlipMove>
        )}
      </div>
    </div>
  );
}

export default PostList
