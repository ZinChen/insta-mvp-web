import React, { forwardRef, ForwardRefRenderFunction, useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import Pluralize from 'react-pluralize'
import dayjs from 'dayjs'
import { AppContext } from '../context'
import PostComments from './PostComments'
import PostCommentForm from './PostCommentForm'
import { Post as PostType } from '../types'

interface PostProps {
  post: PostType
}

const Post: ForwardRefRenderFunction<HTMLDivElement, PostProps> = ({ post }, ref) => {

  const { user, onPostLike } = useContext(AppContext)

  const likedClass = useCallback((postId: number) =>
    user.postLikes.includes(postId) ? 'has-text-danger' :'has-text-grey-lighter'
  , [user])

  return (
    <div className="level pb-5 pt-5" ref={ref}>
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
  )
}

export default forwardRef(Post)
