import {Grid, Typography, Button, Box} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {selectRecipes, selectRecipesLoading} from "./recipesSlice.ts";
import {fetchAllRecipes} from "./recipesThunks.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";
import RecipeItem from "./components/RecipeItem.tsx";
import {selectUser} from "../users/usersSlice.ts";
import {Link} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

const MyRecipes = () => {
    const dispatch = useAppDispatch();
    const recipes = useAppSelector(selectRecipes);
    const loading = useAppSelector(selectRecipesLoading);
    const user = useAppSelector(selectUser);
    const [searchParams] = useSearchParams();
    const authorId = searchParams.get('author');

    useEffect(() => {
        dispatch(fetchAllRecipes());
    }, [dispatch]);

    const filteredRecipes = recipes.filter(recipe =>
        authorId ? recipe.author._id === authorId : user && recipe.author._id === user._id
    );

    const isMyRecipes = !authorId;
    const author = authorId ? recipes.find(recipe => recipe.author._id === authorId)?.author : user;
    const authorName = author?.displayName || author?.email.split('@')[0];

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{mb: 3}}>
                <Grid>
                    <Typography variant='h4'>
                        {isMyRecipes ? 'My Recipes' : `${authorName}'s Recipes`}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
                    </Typography>
                </Grid>

                {isMyRecipes && user && (
                    <Button
                        component={Link}
                        to="/newRecipe"
                        variant="contained"
                        startIcon={<AddIcon/>}
                    >
                        Add New Recipe
                    </Button>
                )}
            </Grid>

            {loading ? <Spinner/> :
                filteredRecipes.length > 0 ? (
                    <Grid container spacing={2}>
                        {filteredRecipes.map(recipe => (
                            <RecipeItem
                                key={recipe._id}
                                id={recipe._id}
                                author={recipe.author}
                                title={recipe.title}
                                recipe={recipe.recipe}
                                image={recipe.image}
                                onDelete={() => dispatch(fetchAllRecipes())}
                                showDeleteButton={isMyRecipes}
                            />
                        ))}
                    </Grid>
                ) : (
                    <Box sx={{textAlign: 'center', mt: 4}}>
                        <Typography variant="h6" color="text.secondary">
                            {isMyRecipes ? 'You have no recipes yet' : `${authorName} has no recipes yet`}
                        </Typography>
                    </Box>
                )
            }
        </Grid>
    );
};

export default MyRecipes;