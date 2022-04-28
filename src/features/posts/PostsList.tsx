import React, { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { selectAppPosts, fetchPosts } from './postsSlice';
import { useDispatch } from 'react-redux';

const PostExcerpt = ({ post }) => {
  return (
    <div>
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <p><PostAuthor userId={post.user}/><TimeAgo timestamp={post.date} /></p>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <p><ReactionButtons post={post} /></p>
        <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>
      </article>
    </div>
  )

}

export const PostsList = () => {
  const posts = useAppSelector(selectAppPosts);
  const dispatch = useDispatch()
  const postStatus = useAppSelector(state => state.posts.status)
  const error = useAppSelector(state => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <div className='loader'>Loading...</div>
  } else if (postStatus === 'succeeded') {
    const orderdPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderdPosts.map(post => {
      return(
        <PostExcerpt key={post.id} post={post} />
      )
    })
  } else {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )

}