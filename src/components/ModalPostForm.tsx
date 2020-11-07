import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext } from '../context'
import generateImageUrl from '../lib/imageGenerator'

function ModalPostForm() {
  const { modal, clearModal, createPost } = useContext(AppContext)
  const [image, setImage] = useState('')
  const [comment, setComment] = useState('')

  const setData = () => null

  useEffect(() => {
    setImage(generateImageUrl())
  }, [setImage])

  const onClose = useCallback(() => {
    setData()
    clearModal()
    setImage(generateImageUrl())
  }, [setData, clearModal, setImage])

  const onSubmit = useCallback((image: string, comment: string) => {
    createPost(image, comment)
    setData()
  }, [setData, createPost])

  const isActive: String = modal === 'createPost' ? 'is-active' : ''

  return (
    <div className={`modal ${isActive}`}>
      <div className="modal-background" />
      <div className="modal-content">
        <div className="box">
          <figure className="image is-square">
            <img src={image} alt=""/>
          </figure>
          <div className="content is-clearfix mt-4">
            <div className="field">
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Write description"
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
                  onClick={() => onSubmit(image, comment)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="modal-close is-large" aria-label="close"
        onClick={() => onClose()}
      />
    </div>
  )
}

export default ModalPostForm
