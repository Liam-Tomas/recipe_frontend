import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        typography: {
            fontFamily: 'Roboto, sans-serif',
        },
        primary: {
            //   main: '#2a9461',
            // main: '#1876d2',
            main: '#635bff',
            // main:'#3f94cd',
            main: '#347bb0',
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
            default: 'rgb(245 247 250)',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
            secondary: 'rgba(0, 0, 0, 0.6)',
            tertiary: '#bcbec0',
            disabled: 'rgba(0, 0, 0, 0.38)',
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        typography: {
            fontFamily: 'Roboto, sans-serif',
        },
        primary: {
            main: '#1876d2',
            main: '#635bff',
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
            default: '#121212',
            paper: '#1d1d1d',
        },
        text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            tertiary: '#494949',
            disabled: 'rgba(255, 255, 255, 0.5)',
        },

    },
});

