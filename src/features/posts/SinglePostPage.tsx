import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor';

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params
  const post = useAppSelector(state => state.posts.find(post => post.id === postId))

  if(!post) {
    return (
      <section>
        <h2>页面未找到！</h2>
      </section>
    )
  }
  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p><PostAuthor userId={post.user} /></p>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${postId}`} className="button" >Edit Post</Link>
      </article>
    </section>
  )
}