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
            main: '#0277bd',
            main: '#00897b',
            main: '#3f51b5',
            main: '#5c6bc0',
            main: '#3F72AF',
            main: '#525FE1',
            // main:'#3f94cd',
            // main: '#347bb0',
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
            main: '#7986cb',
            main: '#5272F2',
            // main: '#00d4ff',
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
            // default: '#121212',
            // default: '#0a2540',
            // default: '#151515',
            default: '#171717',
            paper: '#222222',
            paper:'#2d2d2d',
            paper:'#262727',
            paperLight: '#383838'
        },
        text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            tertiary: '#494949',
            disabled: 'rgba(255, 255, 255, 0.5)',
        },

    },
});

