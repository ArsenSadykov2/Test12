import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {fetchRecipeById} from "./recipesThunks.ts";
import {
    Box,
    CardMedia,
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    IconButton,
    Divider
} from "@mui/material";
import Spinner from "../../components/Spinner/Spinner.tsx";
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import NotFoundPic from '../../assets/images/NotFoundPic.png';
import {apiUrl} from "../../../globalConstants.ts";
import {selectCurrentRecipe, selectCurrentRecipeLoading} from "./recipesSlice.ts";
import {createComment, deleteComment, fetchAllComments} from "../comments/commentsThunks.ts";
import {selectCommentLoading, selectComments} from "../comments/commentsSlice.ts";
import {selectUser} from "../users/usersSlice.ts";

const FullRecipe = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const recipe = useAppSelector(selectCurrentRecipe);
    const loading = useAppSelector(selectCurrentRecipeLoading);
    const comments = useAppSelector(selectComments);
    const commentsLoading = useAppSelector(selectCommentLoading);
    const user = useAppSelector(selectUser);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        if (id) {
            dispatch(fetchRecipeById(id));
            dispatch(fetchAllComments());
        }
    }, [id, dispatch]);

    const recipeComments = comments.filter(comment =>
        comment.recipe && comment.recipe._id === id
    );

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim() || !id || !user) return;

        try {
            await dispatch(createComment({
                comment: commentText,
                recipe: id
            })).unwrap();
            setCommentText('');
            dispatch(fetchAllComments());
        } catch (error) {
            console.error('Failed to create comment:', error);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            await dispatch(deleteComment(commentId)).unwrap();
            dispatch(fetchAllComments());
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    const canDeleteComment = (commentAuthorId: string) => {
        if (!user) return false;
        return user._id === commentAuthorId || (recipe && user._id === recipe.author._id);
    };

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
                                    By {recipe.author.displayName}
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

                <Grid size={12}>
                    <Paper elevation={2} sx={{p: 3, mt: 3}}>
                        <Typography variant="h5" gutterBottom sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <CommentIcon/>
                            Comments ({recipeComments.length})
                        </Typography>

                        {user && (
                            <Box component="form" onSubmit={handleSubmitComment} sx={{mb: 3}}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Add a comment"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    sx={{mb: 2}}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!commentText.trim()}
                                >
                                    Post Comment
                                </Button>
                            </Box>
                        )}

                        {!user && (
                            <Typography color="text.secondary" sx={{mb: 2}}>
                                Please log in to leave a comment
                            </Typography>
                        )}

                        {commentsLoading ? (
                            <Spinner/>
                        ) : recipeComments.length > 0 ? (
                            <List>
                                {recipeComments.map((comment) => (
                                    <Box key={comment._id}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar>
                                                    {comment.author.displayName?.charAt(0)}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                                        <Typography variant="subtitle2">
                                                            {comment.author.displayName}
                                                        </Typography>
                                                        {canDeleteComment(comment.author._id) && (
                                                            <IconButton
                                                                size="small"
                                                                color="error"
                                                                onClick={() => handleDeleteComment(comment._id)}
                                                            >
                                                                <DeleteIcon fontSize="small"/>
                                                            </IconButton>
                                                        )}
                                                    </Box>
                                                }
                                                secondary={
                                                    <Typography
                                                        variant="body2"
                                                        color="text.primary"
                                                        sx={{mt: 1}}
                                                    >
                                                        {comment.comment}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </Box>
                                ))}
                            </List>
                        ) : (
                            <Typography color="text.secondary" textAlign="center">
                                No comments yet
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FullRecipe;