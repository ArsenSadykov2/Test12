import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/usersSlice.ts";
import {selectRecipeDeleteLoading} from "../recipesSlice.ts";
import {deleteRecipe} from "../recipesThunks.ts";
import type {User} from "../../../types";
import NotFoundPic from '../../../assets/images/NotFoundPic.png';
import {apiUrl} from "../../../../globalConstants.ts";

interface Props {
    id: string;
    title: string;
    recipe: string;
    image: string | undefined;
    author: User;
    onDelete?: () => void;
}

const RecipeItem: React.FC<Props> = ({id, title, recipe, image, author, onDelete}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const deleteLoading = useAppSelector(selectRecipeDeleteLoading);

    const cardImage = image ? apiUrl + '/' + image : NotFoundPic;

    const isAuthor = user && author && author._id === user._id;

    const handleDeleteClick = async () => {
        if (!id) return;

        try {
            await dispatch(deleteRecipe(id)).unwrap();
            if (onDelete) {
                onDelete();
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}}>
            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <CardMedia
                    component="img"
                    height="200"
                    image={cardImage}
                    alt={title}
                    sx={{objectFit: 'cover'}}
                />

                <CardContent sx={{flexGrow: 1}}>
                    <Typography variant="h6" component="h3" gutterBottom>
                        {title}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            mb: 2
                        }}
                    >
                        {recipe}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                        By {author.displayName || author.email}
                    </Typography>
                </CardContent>

                <CardActions sx={{justifyContent: 'space-between'}}>
                    <IconButton
                        component={Link}
                        to={`/recipes/${id}`}
                        color="primary"
                    >
                        <ArrowForwardIcon />
                    </IconButton>

                    {isAuthor && (
                        <Button
                            startIcon={<DeleteIcon />}
                            onClick={handleDeleteClick}
                            disabled={deleteLoading}
                            color="error"
                            size="small"
                        >
                            Delete
                        </Button>
                    )}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default RecipeItem;