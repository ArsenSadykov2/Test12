import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";
import type {Comment, CommentMutation, ValidationError} from "../../types";
import type { RootState } from "../../app/store.ts";

export const fetchAllComments = createAsyncThunk<Comment[], void>(
    'comments/fetchAllComments',
    async () => {
        const response = await axiosApi.get<Comment[]>('/comments');
        return response.data;
    }
);

export const fetchCommentById = createAsyncThunk<Comment, string>(
    'comments/fetchCommentById',
    async (commentId) => {
        const response = await axiosApi.get<Comment>(`/comments/${commentId}`);
        return response.data;
    }
);

export const createComment = createAsyncThunk<Comment, CommentMutation, {rejectValue: ValidationError, state: RootState}>(
    'comments/createComment',
    async (commentMutation, {rejectWithValue}) => {
        try{
            const response = await axiosApi.post<Comment>('/comments', commentMutation);
            return response.data;
        } catch (e) {
            if(isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);

export const deleteComment = createAsyncThunk<void, string, {rejectValue: ValidationError, state: RootState}>(
    'comments/deleteComment',
    async (commentId, {rejectWithValue}) => {
        try{
            await axiosApi.delete(`/comments/${commentId}`);
        } catch (e) {
            if(isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);