import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AppBar
        position="static"
        elevation={4}
        sx={{ backgroundColor: "primary.main", px: 4}}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Ai Scribe
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ py: 4 }}>
        <Container>{children}</Container>
      </Box>
    </>
  );
};

export default Layout;
