import React, { useCallback, useContext, useState } from 'react'
import { AppContext } from '../context'

function PostCommentForm({ postId }) {
  const { user, createComment } = useContext(AppContext)
  const [comment, setComment] = useState('')
  const onSubmit = useCallback((comment: string, postId: number) => {
    setComment('')
    createComment(comment, postId)
  }, [createComment, setComment])

  return (
    <article className="media">
      <div className="media-left">
        <figure className="image is-64x64">
          <img src={user.photo} />
        </figure>
      </div>
      <div className="media-content">
        <div className="content">
          <div className="field">
            <label className="label">{user.name} comments</label>
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Write your comment here"
                rows={2}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="field is-grouped is-pulled-right">
            <div className="control">
              <button
                className="button is-link"
                onClick={() => onSubmit(comment, postId)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCommentForm
