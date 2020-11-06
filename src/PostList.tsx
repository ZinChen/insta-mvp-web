import React, { useContext } from 'react'
import PostComments from './PostComments'
import { AppContext } from './types'

function PostList() {
  const { posts } = useContext(AppContext)

  return (
    <div className="section">
      { JSON.stringify(posts) }
      <div className="column is-half is-offset-one-quarter">

        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src="https://bulma.io/images/placeholders/1280x960.png" />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">John Smith</p>
                <p className="subtitle is-6">@johnsmith</p>
              </div>
            </div>
            <div className="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br />
              <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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
            <PostComments />
          </div>

        </div>
      </div>
    </div>
  )
}

export default PostList
