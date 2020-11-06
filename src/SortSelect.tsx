import React, { useContext } from 'react'
import { AppContext } from './context'

function SortSelect() {
  const { sortPosts } = useContext(AppContext)

  return (
    <div className="field">
      <label className="label">Sort posts</label>
      <p className="control has-icons-left">
        <span className="select">
          <select
            onChange={e => sortPosts(e.target.value)}
            defaultValue="createdAt"
          >
            <option value="createdAt">By date</option>
            <option value="commentsCount">By comments</option>
            <option value="likesCount">By likes</option>
          </select>
        </span>
        <span className="icon is-medium is-left">
          <i className="fas fa-sort"></i>
        </span>
      </p>
    </div>
  )
}

export default SortSelect
