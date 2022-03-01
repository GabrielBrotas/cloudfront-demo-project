import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/globals.css'

const theme = createTheme();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
