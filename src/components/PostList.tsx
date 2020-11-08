import React, { useCallback, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Pluralize from 'react-pluralize'
import dayjs from 'dayjs'
import PostComments from './PostComments'
import { AppContext, usePostsLoading } from '../context'
import SortSelect from './SortSelect'
import PostCommentForm from './PostCommentForm'

function PostList() {
  const { posts, user, onPostLike } = useContext(AppContext)
  const postsUser = useParams().postsUser
  usePostsLoading(postsUser)

  const likedClass = useCallback((postId: number) =>
    user.postLikes.includes(postId) ? 'has-text-danger' :'has-text-grey-lighter'
  , [user])

  return (
    <div className="section">
      { postsUser && posts.length > 0 &&
        <div className="title has-text-centered">
          Posts by {posts[0].userName}
        </div>
      }
      <div className="column is-half is-offset-one-quarter">
        <div className="level-right">
          <SortSelect />
        </div>
      </div>
      <div className="column is-half is-offset-one-quarter">
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div key={post.id} className="level pb-5 pt-5">
              <div className="card post-card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={post.imageUrl} />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <Link to={`/${post.userId}`}>
                        <figure className="image is-48x48">
                          <img src={post.userPhoto} />
                        </figure>
                      </Link>
                    </div>
                    <div className="media-content">
                      <Link to={`/${post.userId}`}>
                        <p className="title is-4">{post.userName}</p>
                      </Link>
                      <p className="subtitle is-6">
                        @{post.userName.replace(/\s/g, "").toLocaleLowerCase()}
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
                      <a
                        className={`level-item mr-1 ${likedClass(post.id)}`}
                        aria-label="like"
                        onClick={() => onPostLike(post.id)}
                      >
                        <span className="icon">
                          <i className="fas fa-heart" aria-hidden="true" />
                        </span>
                      </a>
                      {post.likesCount > 0 && (
                        <span className="lever-item">
                          <small>
                            <Pluralize
                              singular={"like"}
                              count={post.likesCount}
                            />
                          </small>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="box comment-box">
                    {
                      post.comments.length > 0 &&
                      <PostComments comments={post.comments} />
                    }
                    {
                      user.email.length > 0 &&
                      <PostCommentForm postId={post.id} />
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PostList
