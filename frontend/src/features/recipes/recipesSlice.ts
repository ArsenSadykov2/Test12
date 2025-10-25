import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store.ts";
import type {Recipe} from "../../types";
import {createRecipe, deleteRecipe, fetchAllRecipes, fetchRecipeById} from "./recipesThunks.ts";

interface RecipesState {
    items: Recipe[];
    currentRecipe: Recipe | null;
    fetchLoading: boolean;
    currentRecipeLoading: boolean;
    createLoading: boolean;
    deleteLoading: boolean;
}

const initialState: RecipesState = {
    items: [],
    currentRecipe: null,
    fetchLoading: false,
    currentRecipeLoading: false,
    createLoading: false,
    deleteLoading: false,
}

export const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllRecipes.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllRecipes.fulfilled, (state, {payload: recipes}) => {
                state.items = recipes;
                state.fetchLoading = false;
            })
            .addCase(fetchAllRecipes.rejected, (state) => {
                state.fetchLoading = false;
            })
            .addCase(fetchRecipeById.pending,(state) => {
                state.currentRecipeLoading = true;
            })
            .addCase(fetchRecipeById.fulfilled,(state, {payload: recipe}) => {
                state.currentRecipe = recipe;
                state.currentRecipeLoading = false;
            })
            .addCase(fetchRecipeById.rejected,(state) => {
                state.currentRecipeLoading = false;
            })

            .addCase(createRecipe.pending,(state) => {
                state.createLoading = true;
            })
            .addCase(createRecipe.fulfilled,(state) => {
                state.createLoading = false;
            })
            .addCase(createRecipe.rejected,(state) => {
                state.createLoading = false;
            })

            .addCase(deleteRecipe.pending,(state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteRecipe.fulfilled,(state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteRecipe.rejected,(state) => {
                state.deleteLoading = false;
            })
    }
});

export const recipesReducer = recipesSlice.reducer;

export const selectRecipes = (state: RootState) => state.recipes.items;
export const selectRecipesLoading = (state: RootState) => state.recipes.fetchLoading;
export const selectCurrentRecipe = (state: RootState) => state.recipes.currentRecipe;
export const selectCurrentRecipeLoading = (state: RootState) => state.recipes.currentRecipeLoading;
export const selectRecipeCreateLoading = (state: RootState) => state.recipes.createLoading;
export const selectRecipeDeleteLoading = (state: RootState) => state.recipes.deleteLoading;