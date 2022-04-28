import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import { ReactionAddItterface } from './ReactionButtons'

export const selectAppPosts: {(state: any): PostInterface[]} = state => (state.posts)
export const selectPostById: (state: any, postId: string) => PostInterface
 = (state, postId: string) => state.posts.find(post => post.id = postId)

export interface PostInterface {
  id: string,
  date: string,
  title: string,
  content: string,
  user: string,
  reactions: object
}

const initialState: PostInterface[] = [
  { id: '1', title: 'First Post!', content: 'Hello!', user: '0', date: sub(new Date(), { minutes: 10}).toISOString(), reactions: {} },
  { id: '2', title: 'Second Post', content: 'More text', user: '1', date: sub(new Date(), { minutes: 5}).toISOString(), reactions: {} }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<PostInterface>) => {
        state.push(action.payload)
      },
      prepare: (title: string, content: string, userId: string) => {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {}
          }
        }
      }
    },

    postUpdated(state, action: PayloadAction<PostInterface>) {
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id)
      if(existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
      
    },

    reactionAdded(state, action: PayloadAction<ReactionAddItterface>) {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId) 
      if(existingPost) {
        if(existingPost.reactions[reaction]) {
          existingPost.reactions[reaction]++
        } else {
          existingPost.reactions[reaction] = 1
        }
      }
    }
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer;