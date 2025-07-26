import { BrowserRouter, useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { CircularProgress, Container, ThemeProvider } from "@mui/material";
import routes from "./pages/routes";
import theme from "./theme/theme";
import Layout from "./components/Layout";

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Container sx={{ mt: 4, textAlign: "center" }}>
            <CircularProgress />
          </Container>
        }
      >
        <ThemeProvider theme={theme}>
          <Layout>
            <AppRoutes />
          </Layout>
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
