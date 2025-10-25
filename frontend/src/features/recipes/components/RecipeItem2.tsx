import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography,
    Box,
    Chip, Button
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import {Link} from 'react-router-dom';
import type {User} from "../../../types";
import NotFoundPic from '../../../assets/images/NotFoundPic.png';
import {apiUrl} from "../../../../globalConstants.ts";

interface Props {
    id: string;
    title: string;
    recipe: string;
    image: string | undefined;
    author: User;
}

const RecipeItem2: React.FC<Props> = ({id, title, recipe, image, author}) => {
    const cardImage = image ? apiUrl + '/' + image : NotFoundPic;
    const authorName = author.displayName || author.email.split('@')[0];

    return (
        <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}}>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(33, 150, 243, 0.08)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    border: '1px solid rgba(33, 150, 243, 0.1)',
                    '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: '0 20px 40px rgba(33, 150, 243, 0.15), 0 8px 30px rgba(25, 118, 210, 0.1)',
                    }
                }}
            >
                <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
                    <Chip
                        label={authorName}
                        size="small"
                        sx={{
                            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.7rem',
                            height: 24,
                            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)'
                        }}
                    />
                </Box>

                <CardMedia
                    component="img"
                    height="220"
                    image={cardImage}
                    alt={title}
                    sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                        }
                    }}
                />

                <CardContent sx={{ flexGrow: 1, p: 3, pb: 2 }}>
                    <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            lineHeight: 1.2,
                            mb: 2,
                            fontSize: '1.4rem'
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
                            mb: 3,
                            lineHeight: 1.6,
                            fontSize: '0.9rem'
                        }}
                    >
                        {recipe}
                    </Typography>

                    <Button
                        component={Link}
                        to={`/myRecipes?author=${author._id}`}
                        variant="outlined"
                        size="small"
                        startIcon={<PersonIcon />}
                        sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                                borderColor: 'primary.main',
                            },
                            transition: 'all 0.2s ease',
                            minWidth: 'auto',
                            px: 1.5,
                            py: 0.5
                        }}
                    >
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            By {authorName}
                        </Typography>
                    </Button>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', p: 3, pt: 0 }}>
                    <IconButton
                        component={Link}
                        to={`/recipes/${id}`}
                        sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                                borderColor: 'primary.main',
                            },
                            transition: 'all 0.2s ease',
                            minWidth: 'auto',
                            px: 1.5,
                            py: 0.5
                        }}
                    >
                        <ArrowForwardIcon sx={{ mr: 1 }} />
                        View Recipe
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default RecipeItem2;