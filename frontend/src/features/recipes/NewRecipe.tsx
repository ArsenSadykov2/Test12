import { Typography } from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import type {RecipeMutation} from "../../types";
import RecipeForm from "./components/RecipeForm.tsx";
import {selectRecipeCreateLoading} from "./recipesSlice.ts";
import {createRecipe} from "./recipesThunks.ts";


const NewRecipe = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const createLoading = useAppSelector(selectRecipeCreateLoading);

    const onCreateNewRecipe = async (recipe: RecipeMutation) => {
        try{
            await dispatch(createRecipe(recipe)).unwrap();
            toast.success("Your recipe is successfully created!");
            navigate("/");
        } catch (e) {
            console.error(e);
            toast.error("Please fill in all required fields");
        }
    };
    return (
        <div>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>New Cocktail</Typography>
            <RecipeForm onSubmitRecipe={onCreateNewRecipe} loading={createLoading}/>
        </div>
    );
};

export default NewRecipe;