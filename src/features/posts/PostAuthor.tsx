import React from 'react';
import { useAppSelector } from '../../app/hooks';

export const PostAuthor = ({ userId }) => {
  const author = useAppSelector(state => state.users.find(user => user.id === userId))

  return <span>by {author? author.name : 'Unkonwn author'}</span>
}