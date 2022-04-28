import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

export interface ReactionAddItterface {
  postId: string,
  reaction: string
}

export const ReactionButtons = ({ post }) => {

  const dispatch = useAppDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button key={name} type="button" className="muted-button reaction-button" onClick={() => {
        dispatch(reactionAdded({postId: post.id, reaction: name}))
      }}>
        {emoji} {post.reactions[name]? post.reactions[name] : 0}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}