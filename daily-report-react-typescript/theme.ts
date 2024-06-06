import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
    palette: {
        primary: {
          light: '#757ce8',
          main: '#000000',
          dark: '#000000',
          contrastText: '#fff',
        },
        secondary: {
          light: '#ff7961',
          main: '#f44336',
          dark: '#ba000d',
          contrastText: '#000',
        },
      },
});

export default defaultTheme;
