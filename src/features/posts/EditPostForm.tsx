import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { postUpdated, selectPostById } from "./postsSlice";
import { useHistory } from "react-router-dom"

export const EditPostForm = ({ match }) => {
  const { postId } = match.params
  const post = useAppSelector(state => selectPostById(state, postId))

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const dispatch = useAppDispatch()
  const history = useHistory()

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const onSavePostClicked = () => {
    if(title && content) {
      dispatch(postUpdated({...post, title, content}))
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>编辑帖子</h2>
      <form>
        <label htmlFor="postTitle">帖子标题：</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">内容：</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        保存帖子
      </button>
    </section>
  )
}