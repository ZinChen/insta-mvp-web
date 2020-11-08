import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { PostComment } from '../types'

interface PostCommentProps {
  comments: PostComment[]
}

const PostComments: React.FC<PostCommentProps> = ({ comments }) => {
  return (
    <Fragment>
      {comments.map((comment) => (
        <article key={comment.id} className="media">
          <div className="media-left">
            <Link className="has-text-grey-dark" to={`${comment.userId}`}>
              <figure className="image is-64x64">
                <img src={comment.userPhoto} />
              </figure>
            </Link>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <Link className="has-text-grey-dark" to={`${comment.userId}`}>
                  <strong>{comment.userName}</strong>
                  {" "}
                  <small>
                    @{comment.userName.replace(/\s/g, "").toLocaleLowerCase()}
                  </small>
                </Link>
                {" "}
                <small>{dayjs(comment.createdAt).fromNow()}</small>
                <br />
                {comment.content}
              </p>
            </div>
          </div>
        </article>
      ))}
    </Fragment>
  )
}

export default PostComments
