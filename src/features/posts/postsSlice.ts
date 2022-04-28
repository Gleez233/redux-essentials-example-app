import { createAsyncThunk, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { ReactionAddItterface } from './ReactionButtons'
import { client } from '../../api/client'


export const selectAppPosts: {(state: any): PostInterface[]} = state => (state.posts.posts)
export const selectPostById: {(state: any, postId: string): PostInterface} = 
  (state, postId) => state.posts.posts.find(post => post.id === postId)

export interface PostInterface {
  id: string,
  date: string,
  title: string,
  content: string,
  user: string,
  reactions: object
}

const initialState: {posts: PostInterface[], status: string, error: string|null|undefined} = {
  posts: [],
  status: 'idle',
  error: null
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<PostInterface>) => {
        state.posts.push(action.payload)
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
      const existingPost = state.posts.find(post => post.id === id)
      if(existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
      
    },

    reactionAdded(state, action: PayloadAction<ReactionAddItterface>) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find(post => post.id === postId) 
      if(existingPost) {
        if(existingPost.reactions[reaction]) {
          existingPost.reactions[reaction]++
        } else {
          existingPost.reactions[reaction] = 1
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = 'loading'
    }).addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.posts = state.posts.concat(action.payload)
    }).addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error?.message
    }).addCase(addNewPost.fulfilled, (state, action) => {
      state.posts.push(action.payload)
    })
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer;

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const addNewPost = createAsyncThunk<any, {title: string, content: string, user: string}, any>('posts/addNewPost', 
  async initialPost => {
    console.log('initialPost: ' + JSON.stringify(initialPost))
    const response = await client.post('/fakeApi/posts', initialPost)
    return response.data
  }
)