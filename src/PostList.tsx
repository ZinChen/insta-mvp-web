import React, { useContext } from 'react'
import dayjs from 'dayjs'
import PostComments from './PostComments'
import { AppContext, usePostsLoading } from './context'

function PostList() {
  const { posts } = useContext(AppContext)
  usePostsLoading()

  return (
    <div className="section">
      <div className="column is-half is-offset-one-quarter">
        {
          Array.isArray(posts) && posts.map(post => (
            <div className="level pb-5 pt-5">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={post.imageUrl} />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img src={post.userPhoto} />
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">
                        {post.userName}
                      </p>
                      <p className="subtitle is-6">@
                        {post.userName.replace(/\s/g, '').toLocaleLowerCase()}
                      </p>
                    </div>
                  </div>
                  <div className="content">
                    {post.description}
                    <br />
                    <time dateTime="{dayjs(post.createdAt).format('yyyy-mm-dd')}">
                      {dayjs(post.createdAt).fromNow()}
                    </time>
                  </div>
                  <div className="level">
                    <div className="level-left">
                      <a className="level-item" aria-label="like">
                        <span className="icon">
                          <i className="fas fa-heart" aria-hidden="true" />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <PostComments comments={post.comments} />
                </div>

              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PostList
