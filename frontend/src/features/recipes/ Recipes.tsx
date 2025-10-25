import {Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import Spinner from "../../components/Spinner/Spinner.tsx";
import {useParams} from "react-router-dom";
import { selectRecipes, selectRecipesLoading } from "./recipesSlice.ts";
import {fetchAllRecipes, fetchRecipeById} from "./recipesThunks.ts";
import RecipeItem from "./components/RecipeItem.tsx";

const Recipes = () => {
    const dispatch = useAppDispatch();
    const recipes = useAppSelector(selectRecipes);
    const recipesFetchLoading = useAppSelector(selectRecipesLoading);

    const {id} = useParams();

    useEffect(() => {
        dispatch(fetchAllRecipes())
    }, [dispatch])

    const handleRecipesDelete = () => {
        if(id) {
            dispatch(fetchRecipeById(id));
        }
    };

    const displayedRecipes = recipes;

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Typography variant='h4'>All Recipes</Typography>
                </Grid>
            </Grid>

            {recipesFetchLoading ? <Spinner/> :
                <>
                    {displayedRecipes.length > 0 ? (
                        <Grid container direction="row" spacing={1}>
                            {displayedRecipes.map(recipe => (
                                <RecipeItem
                                    key={recipe._id}
                                    id={recipe._id}
                                    author={recipe.author}
                                    title={recipe.title}
                                    recipe={recipe.recipe}
                                    image={recipe.image || undefined}
                                    onDelete={handleRecipesDelete}
                                />
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="h6" color="text.secondary">
                            No recipes found
                        </Typography>
                    )}
                </>
            }
        </Grid>
    );
};

export default Recipes;