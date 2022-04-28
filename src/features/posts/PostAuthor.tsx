import React from 'react';
import { useAppSelector } from '../../app/hooks';
import {UserInterface} from '../users/usersSlice';

export const PostAuthor = ({ userId }) => {
  const author: UserInterface = useAppSelector(state => state.users.find(user => user.id === userId))

  return <span>by {author? author.name : 'Unkonwn author'}</span>
}