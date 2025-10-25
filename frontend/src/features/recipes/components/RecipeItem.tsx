import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography,
    Box,
    Chip
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
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
    image: string | undefined | null;
    author: User;
    onDelete?: () => void;
    showDeleteButton?: boolean;
}

const RecipeItem: React.FC<Props> = ({id, title, recipe, image, author, onDelete, showDeleteButton = true,}) => {
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
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    },
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider'
                }}
            >
                <CardMedia
                    component="img"
                    height="200"
                    image={cardImage}
                    alt={title}
                    sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        }
                    }}
                />

                <CardContent sx={{flexGrow: 1, p: 2.5}}>
                    <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        sx={{
                            fontWeight: 600,
                            background: 'linear-gradient(45deg, #1976d2, #2196f3)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            lineHeight: 1.3
                        }}
                    >
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
                            mb: 2,
                            lineHeight: 1.5
                        }}
                    >
                        {recipe}
                    </Typography>

                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mt: 'auto'}}>
                        <PersonIcon sx={{fontSize: 16, color: 'text.secondary'}} />
                        <Typography variant="caption" color="text.secondary" sx={{fontWeight: 500}}>
                            {author.displayName || author.email}
                        </Typography>
                        {isAuthor && (
                            <Chip
                                label="Your recipe"
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{height: 20, fontSize: '0.65rem'}}
                            />
                        )}
                    </Box>
                </CardContent>

                <CardActions sx={{justifyContent: 'space-between', p: 2.5, pt: 0}}>
                    <IconButton
                        component={Link}
                        to={`/recipes/${id}`}
                        color="primary"
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease-in-out',
                        }}
                    >
                        <ArrowForwardIcon />
                    </IconButton>

                    {showDeleteButton && isAuthor && (
                        <Button
                            startIcon={<DeleteIcon />}
                            onClick={handleDeleteClick}
                            disabled={deleteLoading}
                            color="error"
                            size="small"
                            variant="outlined"
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 500,
                                '&:hover': {
                                    backgroundColor: 'error.main',
                                    color: 'white',
                                }
                            }}
                        >
                            {deleteLoading ? 'Deleting...' : 'Delete'}
                        </Button>
                    )}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default RecipeItem;