import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
                </CardActions>
            </Card>
        </Grid>
    );
};

export default RecipeItem2;