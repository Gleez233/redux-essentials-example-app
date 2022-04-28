import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { PostsInterface } from './postsSlice';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';

export const PostsList = () => {
  const posts: PostsInterface[] = useAppSelector(state => state.posts);
  const orderdPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderdPosts.map(post => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p><PostAuthor userId={post.user}/><TimeAgo timestamp={post.date} /></p>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <p><ReactionButtons post={post} /></p>
      <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )

}