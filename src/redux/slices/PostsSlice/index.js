import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (sortType) => {
    const { data } = await axios.get('/posts/' + sortType);
    return data.posts;
});

export const fetchPostsByTag = createAsyncThunk('posts/fetchPostsByTag', async (name) => {
    const { data } = await axios.get('/posts/tag/' + name);
    return data.posts;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data.tags;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
    const response = await axios.delete('/posts/' + id);
    return response.data;
});

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

const PostsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.status = 'success';
            state.posts.items = action.payload;
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.status = 'error';
            state.posts.items = [];
        },

        [fetchPostsByTag.pending]: (state) => {
            state.posts.status = 'loading';
        },
        [fetchPostsByTag.fulfilled]: (state, action) => {
            state.posts.status = 'success';
            state.posts.items = action.payload;
        },
        [fetchPostsByTag.rejected]: (state) => {
            state.posts.status = 'error';
            state.posts.items = [];
        },

        [fetchTags.pending]: (state) => {
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.status = 'success';
            state.tags.items = action.payload;
        },
        [fetchTags.rejected]: (state) => {
            state.tags.status = 'error';
            state.tags.items = [];
        },

        [fetchTags.pending]: (state) => {
            state.posts.status = 'loading';
            state.tags.status = 'loading';
        },
        [fetchRemovePost.fulfilled]: (state, action) => {
            const oddTags = state.posts.items.find((obj) => obj._id === action.meta.arg).tags;
            state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
            state.tags.items = state.tags.items.filter((name) => !oddTags.includes(name));

            state.posts.status = 'success';
            state.tags.status = 'success';
        },
        [fetchRemovePost.rejected]: (state) => {
            state.posts.status = 'error';
        },
    },
});

export const PostsReducer = PostsSlice.reducer;
