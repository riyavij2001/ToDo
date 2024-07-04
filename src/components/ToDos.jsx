import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeTodo } from "../features/todo/todoSlice";

function ToDos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Todos
        </Typography>
        <Box sx={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <List>
            {todos.map((todo) => (
              <ListItem
                key={todo.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => dispatch(removeTodo(todo.id))}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={todo.text} />
              </ListItem>
              
            ))}
          </List>
        </Box>
      </Container>
    </>
  );
}

export default ToDos;
