import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {fetchRecipeById} from "./recipesThunks.ts";
import {
    Box,
    CardMedia,
    Container,
    Grid,
    Typography
} from "@mui/material";
import Spinner from "../../components/Spinner/Spinner.tsx";
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NotFoundPic from '../../assets/images/NotFoundPic.png';
import {apiUrl} from "../../../globalConstants.ts";
import {selectCurrentRecipe, selectCurrentRecipeLoading} from "./recipesSlice.ts";
import {fetchAllComments} from "../comments/commentsThunks.ts";

const FullRecipe = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const recipe = useAppSelector(selectCurrentRecipe);
    const loading = useAppSelector(selectCurrentRecipeLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchRecipeById(id));
            dispatch(fetchAllComments());
        }
    }, [id, dispatch]);

    if (loading) {
        return <Spinner/>;
    }

    if (!recipe) {
        return (
            <Container maxWidth="md">
                <Typography variant="h4" textAlign="center" sx={{mt: 4}}>
                    Recipe not found
                </Typography>
            </Container>
        );
    }

    const cardImage = recipe.image ? apiUrl + '/' + recipe.image : NotFoundPic;

    return (
        <Container maxWidth="lg" sx={{py: 3}}>
            <Grid container spacing={3}>
                <Grid size={{xs: 12, md: 4}}>
                    <CardMedia
                        component="img"
                        image={cardImage}
                        alt={recipe.title}
                        sx={{
                            width: '100%',
                            height: '300px',
                            borderRadius: 2,
                            objectFit: 'cover'
                        }}
                    />
                </Grid>

                <Grid size={{xs: 12, md: 8}}>
                    <Box sx={{mb: 2}}>
                        <Typography variant="h4" component="h1" gutterBottom sx={{fontWeight: 'bold'}}>
                            {recipe.title}
                        </Typography>

                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <PersonIcon color="action"/>
                                <Typography variant="body1" color="text.secondary">
                                    By {recipe.author.displayName || recipe.author.email}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                <Grid size={12}>
                    <Box sx={{mt: 2}}>
                        <Typography variant="h5" gutterBottom sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 2}}>
                            <MenuBookIcon/>
                            Recipe
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                lineHeight: 1.6,
                                whiteSpace: 'pre-line',
                                p: 2,
                                backgroundColor: '#f5f5f5',
                                borderRadius: 1
                            }}
                        >
                            {recipe.recipe}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FullRecipe;