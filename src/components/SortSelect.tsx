import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AppContext } from '../context'

function SortSelect() {
  const { sortPosts } = useContext(AppContext)
  const [ sort, setSort ] = useState('createdAt')
  const location = useLocation()

  useEffect(() => {
    setSort('createdAt')
  }, [location, setSort])

  const onSelectChange = useCallback((value) => {
    setSort(value)
    sortPosts(value)
  }, [sortPosts])

  return (
    <div className="field">
      <label className="label">Sort posts</label>
      <p className="control has-icons-left">
        <span className="select">
          <select
            onChange={e => onSelectChange(e.target.value)}
            value={sort}
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
