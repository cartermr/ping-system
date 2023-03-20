import { LockOutlined } from "@mui/icons-material"
import { Container, CssBaseline, Box, Avatar, createTheme, ThemeProvider, Typography, TextField, FormControlLabel, Button, Grid, Link } from "@mui/material"

const theme = createTheme()

const LogIn = () => {
    return (
        <Container component='main' maxWidth='xs'>

            <CssBaseline />

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >

                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>

                <Typography component='h1' variant='h5'>
                    Sign In
                </Typography>

                <Box component='form' noValidate sx={{ mt: 1 }}>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete="email"
                        type='email'
                        autoFocus
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id='password'
                        label='Password'
                        name='password'
                        type='password'
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>

                    <Grid container>

                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot Password?
                            </Link>
                        </Grid>

                        <Grid item>
                            <Link href="#" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>

                    </Grid>

                </Box>
                
            </Box>

        </Container>
    )
}

export default LogIn