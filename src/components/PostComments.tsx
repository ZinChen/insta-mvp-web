import React, { Fragment } from 'react'
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
            <figure className="image is-64x64">
              <img src={comment.userPhoto} />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{comment.userName}</strong>{" "}
                <small>
                  @{comment.userName.replace(/\s/g, "").toLocaleLowerCase()}
                </small>{" "}
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
