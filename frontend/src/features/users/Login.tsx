import {NavLink, useNavigate} from "react-router-dom";
import {Avatar, Box, Button, Link, Stack, TextField, Typography, Alert} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectLoginError, selectLoginLoading} from "./usersSlice.ts";
import {type ChangeEvent, type FormEvent, useState} from "react";
import type {LoginMutation} from "../../types";
import {login} from "./usersThunks.ts";

const Login = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectLoginError);
    const loading = useAppSelector(selectLoginLoading);
    const navigate = useNavigate();

    const [state, setState] = useState<LoginMutation>({
        email: '',
        password: '',
    });

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState(prevState => ({...prevState, [name]: value}));
    };

    const onSubmitForm = async (e: FormEvent) => {
        e.preventDefault();

        try{
            await dispatch(login(state)).unwrap();
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box sx={{marginTop: 8, display: 'flex',flexDirection: 'column', alignItems: 'center'}}>
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOpenIcon/>
            </Avatar>
            <Typography component={'h1'} variant={'h5'}>
                Sign In
            </Typography>
            {error && (
                <Alert severity={'error'} sx={{mt: 3}}>
                    {error.error}
                </Alert>
            )}
            <Box component={'form'} onSubmit={onSubmitForm} sx={{my: 3, maxWidth: '400px', width: '100%'}}>
                <Stack spacing={2}>
                    <TextField
                        required
                        label="Email"
                        name="email"
                        value={state.email}
                        onChange={inputChangeHandler}
                        autoComplete="current-email"
                    />
                    <TextField
                        required
                        type="password"
                        label="Password"
                        name="password"
                        value={state.password}
                        onChange={inputChangeHandler}
                        autoComplete="current-password"
                    />
                    <Button
                        type={'submit'}
                        fullWidth
                        variant="contained"
                        sx={{mb: 2}}
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </Stack>
            </Box>
            <Link component={NavLink} to={'/register'}>Don't have an account yet? Sign up here</Link>
        </Box>
    );
};

export default Login;