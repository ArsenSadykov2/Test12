import type {User} from "../../types";
import {type MouseEvent, useState} from "react";
import { Avatar, Button, Menu, MenuItem} from "@mui/material";
import {useAppDispatch} from "../../app/hooks.ts";
import {logout} from "../../features/users/usersThunks.ts";
import {NavLink} from "react-router-dom";

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
    };

    return (
        <>
            <Button onClick={handleClick} sx={{color: "white"}}>
                Hello, {user.displayName}!
                <Avatar
                    sx={{m: 1, bgcolor: 'secondary.main'}}
                    src={user.displayName?.charAt(0)}
                    alt={user.displayName}
                >
                    {user.displayName?.charAt(0)}
                </Avatar>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem color="inherit" component={NavLink} to="/">

                </MenuItem>
                <MenuItem color="inherit" component={NavLink} to="/">

                </MenuItem>
                <MenuItem color="inherit" component={NavLink} to="/">
                    -
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;