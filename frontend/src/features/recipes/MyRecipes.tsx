import {Grid, Typography, Button, Box} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import { selectRecipes, selectRecipesLoading } from "./recipesSlice.ts";
import {fetchAllRecipes} from "./recipesThunks.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";
import RecipeItem from "./components/RecipeItem.tsx";
import {selectUser} from "../users/usersSlice.ts";
import {Link} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

const MyRecipes = () => {
    const dispatch = useAppDispatch();
    const recipes = useAppSelector(selectRecipes);
    const recipesFetchLoading = useAppSelector(selectRecipesLoading);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        dispatch(fetchAllRecipes());
    }, [dispatch]);

    const myRecipes = recipes.filter(recipe => {
        return user && recipe.author && recipe.author._id === user._id;
    });

    const handleRecipesDelete = () => {
        dispatch(fetchAllRecipes());
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{mb: 3}}>
                <Grid>
                    <Typography variant='h4'>My Recipes</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {myRecipes.length} recipe{myRecipes.length !== 1 ? 's' : ''}
                    </Typography>
                </Grid>

                {user && (
                    <Button
                        component={Link}
                        to="/newRecipe"
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ml: 2}}
                    >
                        Add New Recipe
                    </Button>
                )}
            </Grid>

            {recipesFetchLoading ? <Spinner/> :
                <>
                    {myRecipes.length > 0 ? (
                        <Grid container spacing={2}>
                            {myRecipes.map(recipe => (
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
                        <Box sx={{textAlign: 'center', mt: 4}}>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                {user ? 'You have no recipes yet' : 'Please log in to see your recipes'}
                            </Typography>
                        </Box>
                    )}
                </>
            }
        </Grid>
    );
};

export default MyRecipes;