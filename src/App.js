import React from "react";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Link,
  Grid,
} from "@material-ui/core";
import BookList from "./components/BookList";
import { AutoStoriesRounded } from "@mui/icons-material";

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function App() {
  return (
    <>
      <AppBar position="relative" sx={{ maxWidth: "100%" }}>
        <Toolbar>
          <AutoStoriesRounded sx={{ mr: 2 }} />
          <Typography variant="h6">Book Extracts from Pan Macmillan</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ pt: 4, pb: 6, mt: 4 }}>
        <Container maxWidth="sm" sx={{ mt: 20 }}>
          <Typography component="h2" variant="h2" align="center" gutterBottom>
            Best picks for You
          </Typography>
        </Container>
      </Box>
      <Container>
        <Grid>
          <BookList />
        </Grid>
      </Container>
      <Box sx={{ backgroundColor: "primary.dark", p: 6 }} component="footer">
        <Typography variant="subtitle1" align="center" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
    </>
  );
}

export default App;
