import { Box, Button, Container, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import backgroundImage from '../assets/pexels-brett-sayles-2881232.jpg'

const LandingPage = () => {
    const navigate = useNavigate()
    
    return (
        <Container
            sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 500,
                maxHeight: 1300
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgb(255, 255, 255, 0.80)',
                    borderRadius: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '3rem 5rem'
                }}
            >
                <Stack spacing={3}>
                    <Typography fontWeight='bold'>Start Monitoring Your Systems</Typography>
                    <Button
                        variant='contained'
                        onClick={() => navigate('/login')}
                    >
                        Sign Up Now
                    </Button>
                </Stack>
            </Box>
        </Container>
    )
}

export default LandingPage