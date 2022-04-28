import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

interface PostsInterface {
  id: string,
  title: string,
  content: string,
  user: string
}

const initialState: PostsInterface[] = [
  { id: '1', title: 'First Post!', content: 'Hello!', user: '0' },
  { id: '2', title: 'Second Post', content: 'More text', user: '1' }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<PostsInterface>) => {
        state.push(action.payload)
      },
      prepare: (title: string, content: string, userId: string) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId
          }
        }
      }
    },

    postUpdated(state, action: PayloadAction<PostsInterface>) {
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id)
      if(existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
      
    }
  }
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer;