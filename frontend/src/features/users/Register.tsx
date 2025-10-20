import {type ChangeEvent, type FormEvent, useState} from "react";
import type {RegisterMutation} from "../../types";
import {Avatar, Box, Button, Link, Stack, TextField, Typography} from "@mui/material";
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectRegisterError, selectRegisterLoading} from "./usersSlice.ts";
import {register} from "./usersThunks.ts";

const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const loading = useAppSelector(selectRegisterLoading);
    const navigate = useNavigate();

    const [state, setState] = useState<RegisterMutation>({
        email: '',
        password: '',
        displayName: '',
    });

    const getFieldError = (fieldName: string) => {
        return error?.errors[fieldName]?.message;
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState(prevState => ({...prevState, [name]: value}));
    };

    const onSubmitForm = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(register(state)).unwrap();
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box sx={{marginTop: 8, display: 'flex',flexDirection: 'column', alignItems: 'center'}}>
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlineIcon/>
            </Avatar>
            <Typography component={'h1'} variant={'h5'}>
                Sign Up
            </Typography>
            <Box component={'form'} onSubmit={onSubmitForm} sx={{my: 3, maxWidth: '400px', width: '100%'}}>
                <Stack spacing={2}>
                    <TextField
                        required
                        label="Email"
                        name="email"
                        value={state.email}
                        onChange={inputChangeHandler}
                        autoComplete="new-email"
                        error={Boolean(getFieldError('email'))}
                        helperText={getFieldError('email')}
                    />
                    <TextField
                        required
                        type="password"
                        label="Password"
                        name="password"
                        value={state.password}
                        onChange={inputChangeHandler}
                        autoComplete="new-password"
                        error={Boolean(getFieldError('password'))}
                        helperText={getFieldError('password')}
                    />
                    <TextField
                        required
                        type="displayName"
                        label="DisplayName"
                        name="displayName"
                        value={state.displayName}
                        onChange={inputChangeHandler}
                        autoComplete="new-displayName"
                        error={Boolean(getFieldError('displayName'))}
                        helperText={getFieldError('displayName')}
                    />
                    <Button
                        type={'submit'}
                        fullWidth
                        variant="contained"
                        sx={{mb: 2}}
                        loading={loading}
                    >
                        Sign Up
                    </Button>
                </Stack>
            </Box>
            <Link component={NavLink} to={'/login'}>Already Have an account? Sign In</Link>
        </Box>
    );
};

export default Register;