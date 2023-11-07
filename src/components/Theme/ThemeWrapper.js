import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: 'Inter, "Helvetica", "Arial", sans-serif',
                    // You can add additional styles here if needed
                },
                // ... repeat for h2, h3, etc., if needed
            },
        },
    },
    palette: {
        
        mode: 'light',
        typography: {
            fontFamily: 'Inter, "Helvetica", "Arial", sans-serif', // Define your default body font here
            h1: {
              fontFamily: 'Open Sans, serif', // Define your header font here
              // You can add fontWeight, fontSize, etc., as needed
            },
        },
        primary: {
            main: '#3f51b5',
            main: '#5c6bc0',
            main: '#3F72AF',
            main: '#525FE1',
            main: '#007fff',
            other: '#2a9461'
        },
        secondary: {
            main: '#ccd6f6',
        },
        primaryLight: {
            main: '#dbece2',
            contrastText: '#616161',
        },
        background: {
            default: '#F5F7FA',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
            primary: '#0f172a',
            secondary: 'rgba(0, 0, 0, 0.6)',
            secondary: '#475569',
            tertiary: '#bcbec0',
            disabled: 'rgba(0, 0, 0, 0.38)',
        },
    },
   
});

export const darkTheme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: 'Inter, "Helvetica", "Arial", sans-serif',
                },
            },
            
        },
    },
    palette: {
        mode: 'dark',
        typography: {
            fontFamily: 'Inter, Helvetica, sans-serif',
        },
        primary: {
            main: '#1876d2',
            main: '#635bff',
            main: '#7986cb',
            main: '#5272F2',
            main: '#007fff',
            other: '#252525db'
        },
        secondary: {
            main: '#ccd6f6',
        },
        primaryLight: {
            main: '#dbece2',
            contrastText: '#616161',
        },
        background: {
            default: '#141a20',
            paper:'#1b1f26',
            paperLight: '#383838',
            paperLight: 'rgb(45 49 56)',
        },
        text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            secondary: '#94a3b8',
            tertiary: '#494949',
            disabled: 'rgba(255, 255, 255, 0.5)',
        },
       
    },
});

