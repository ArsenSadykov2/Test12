import {Box, Card, CardContent, Grid, Typography, useTheme} from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import type {Recipe} from "../../../types";

interface Props {
    author: string;
    recipe: Recipe;
    comment: string;
}

const CommentItem: React.FC<Props> = ({author, recipe, comment}) => {
    const theme = useTheme();

    return (
        <Grid size={{xs: 6,sm: 12, md: 6, lg: 4}}>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[8],
                    }
                }}
            >
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                            fontWeight: 600,
                            lineHeight: 1.3,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            minHeight: '64px',
                            mb: 2
                        }}
                    >
                        {author}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonIcon fontSize="small" color="primary" />
                            <Typography variant="body2" color="text.secondary">
                                {recipe.recipe}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarTodayIcon fontSize="small" color="primary" />
                            <Typography variant="body2" color="text.secondary">
                                {comment}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default CommentItem;