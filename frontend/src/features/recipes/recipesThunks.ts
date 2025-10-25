import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {Recipe, RecipeMutation} from "../../types";


export const fetchAllRecipes = createAsyncThunk<Recipe[], void>(
    'recipes/fetchAllRecipes',
    async () => {
        const response = await axiosApi.get<Recipe[]>('/recipes');
        return response.data;
    }
);

export const fetchRecipeById = createAsyncThunk<Recipe, string>(
    'recipes/fetchRecipeById',
    async (recipeId) => {
        const response = await axiosApi.get<Recipe>(`/recipes/${recipeId}`);
        return response.data;
    }
);

export const createRecipe = createAsyncThunk<void, RecipeMutation>(
    'recipes/createRecipe',
    async (recipeToAdd) => {
        const formData = new FormData();

        formData.append('title', recipeToAdd.title);
        formData.append('recipe', recipeToAdd.recipe);
        formData.append('author', recipeToAdd.author);

        if (recipeToAdd.image) {
            formData.append('image', recipeToAdd.image);
        }

        await axiosApi.post('/recipes', formData);
    }
);

export const deleteRecipe = createAsyncThunk<void, string>(
    'recipes/deleteRecipe',
    async (recipeId: string) => {
        await axiosApi.delete(`/recipes/${recipeId}`);
    }
);

