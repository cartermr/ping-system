import { Container, AppBar, Toolbar, Box, IconButton } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from "react"

const NavBar = () => {
    
    const [anchorNavElement, setAnchorNavElement] = useState<null | HTMLElement>(null)

    return (
        <AppBar position="static">
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: { xs: 'flex', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup='true'
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar