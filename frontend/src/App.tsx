import {Container, CssBaseline, Typography, Box } from '@mui/material';
import {ToastContainer} from "react-toastify";
import AppToolbar from './components/AppToolbar/AppToolbar';
import {Route, Routes } from 'react-router-dom';
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import FullRecipe from './features/recipes/FullRecipe.tsx';
import MyRecipes from "./features/recipes/MyRecipes.tsx";
import NewRecipe from './features/recipes/NewRecipe.tsx';
import Recipes from "./features/recipes/ Recipes.tsx";

const App = () => (
    <>
        <CssBaseline/>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            theme="light"
        />
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)',
            }}
        >
            <header>
                <AppToolbar />
            </header>

            <main>
                <Container
                    maxWidth="xl"
                    sx={{
                        py: 4,
                        minHeight: 'calc(100vh - 120px)'
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Recipes/>}/>
                        <Route path="/recipes/:id" element={<FullRecipe/>}/>
                        <Route path="/myRecipes" element={<MyRecipes/>} />
                        <Route path="/newRecipe" element={<NewRecipe/>} />
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route
                            path="*"
                            element={
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        py: 10
                                    }}
                                >
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 300,
                                            color: 'text.secondary',
                                            mb: 2
                                        }}
                                    >
                                        404
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: 'text.secondary'
                                        }}
                                    >
                                        Page Not Found
                                    </Typography>
                                </Box>
                            }
                        />
                    </Routes>
                </Container>
            </main>

            <Box
                component="footer"
                sx={{
                    py: 3,
                    textAlign: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'white'
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} Recipe App. All rights reserved.
                </Typography>
            </Box>
        </Box>
    </>
);

export default App