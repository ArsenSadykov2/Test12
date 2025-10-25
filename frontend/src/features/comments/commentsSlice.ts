import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store.ts";
import type {Comment} from "../../types";
import {createComment, deleteComment, fetchAllComments, fetchCommentById} from "./commentsThunks.ts";

interface CommentsState {
    items: Comment[];
    currentComment: Comment | null;
    fetchLoading: boolean;
    currentRecipeLoading: boolean;
    createLoading: boolean;
    deleteLoading: boolean;
}

const initialState: CommentsState = {
    items: [],
    currentComment: null,
    fetchLoading: false,
    currentRecipeLoading: false,
    createLoading: false,
    deleteLoading: false,
}

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllComments.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllComments.fulfilled, (state, {payload: comments}) => {
                state.items = comments;
                state.fetchLoading = false;
            })
            .addCase(fetchAllComments.rejected, (state) => {
                state.fetchLoading = false;
            })
            .addCase(fetchCommentById.pending,(state) => {
                state.currentRecipeLoading = true;
            })
            .addCase(fetchCommentById.fulfilled,(state, {payload: comment}) => {
                state.currentComment = comment;
                state.currentRecipeLoading = false;
            })
            .addCase(fetchCommentById.rejected,(state) => {
                state.currentRecipeLoading = false;
            })

            .addCase(createComment.pending,(state) => {
                state.createLoading = true;
            })
            .addCase(createComment.fulfilled,(state) => {
                state.createLoading = false;
            })
            .addCase(createComment.rejected,(state) => {
                state.createLoading = false;
            })

            .addCase(deleteComment.pending,(state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteComment.fulfilled,(state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteComment.rejected,(state) => {
                state.deleteLoading = false;
            })
    }
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentLoading = (state: RootState) => state.comments.fetchLoading;
export const selectCurrentComment = (state: RootState) => state.comments.currentComment;
export const selectCurrentCommentLoading = (state: RootState) => state.comments.currentRecipeLoading;
export const selectCommentCreateLoading = (state: RootState) => state.comments.createLoading;
export const selectCommentDeleteLoading = (state: RootState) => state.comments.deleteLoading;