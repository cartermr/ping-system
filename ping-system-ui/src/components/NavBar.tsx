import { Container, AppBar, Toolbar, Box, IconButton, Menu, MenuItem, Typography, Button, Tooltip, Avatar } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { useState, MouseEvent } from "react"
import { Outlet, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState()

    const [anchorNavElement, setAnchorNavElement] = useState<null | HTMLElement>(null)
    const [anchorAcctElement, setAnchorAcctElement] = useState<null | HTMLElement>(null)

    const handleOpenNav = (event: MouseEvent<HTMLElement>) => setAnchorNavElement(event.currentTarget)
    const handleCloseNav = () => setAnchorNavElement(null)

    const handleOpenAcct = (event: MouseEvent<HTMLElement>) => setAnchorAcctElement(event.currentTarget)
    const handleCloseAcct = () => setAnchorAcctElement(null)

    return (
        <div>
            <AppBar position="static">
                <Container>
                    <Toolbar disableGutters>

                        <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: { xs: 'flex', md: 'none' } }}>
                            <Button onClick={() => navigate('/')} sx={{ marginRight: 'auto' }}>Ping System</Button>

                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup='true'
                                color="inherit"
                                onClick={handleOpenNav}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorNavElement}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorNavElement)}
                                onClose={handleCloseNav}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                <MenuItem>
                                    <Typography textAlign='center'>Sign In</Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography textAlign='center'>Sign Up</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>

                        <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                onClick={() => navigate('/')}
                                sx={{ marginRight: 'auto', display: 'block', color: 'white' }}
                            >
                                Ping System
                            </Button>
                            {
                                !user &&
                                <Button
                                    onClick={() => navigate('/login')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Sign In
                                </Button>
                            }
                            {
                                !user &&
                                <Button
                                    onClick={() => navigate('/signup')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Sign Up
                                </Button>
                            }
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>

                            {
                                user &&
                                <Tooltip title='Open Settings'>
                                    <IconButton onClick={handleOpenAcct} sx={{ p: 0 }}>
                                        <Avatar alt='account Image' />
                                    </IconButton>
                                </Tooltip>
                            }

                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorAcctElement}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={Boolean(anchorAcctElement)}
                                onClose={handleCloseAcct}
                                sx={{ mt: '45px' }}
                            >
                                <MenuItem>
                                    <Typography textAlign='center'>Account</Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography textAlign='center'>Sign Out</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </div>
    )
}

export default NavBar