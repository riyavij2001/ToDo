import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { addTodo } from "../features/todo/todoSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { selectId } from "../features/todo/todoSlice";
import { v4 as uuid } from "uuid";

function Addtodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  const addTodoHandler = (e) => {
    e.preventDefault();
    const newId = unique_id.toString(16);
    const userData = {
      id: newId,
      todoDB: input,
    };
    dispatch(addTodo({ id: newId, text: input }));
    axios
      .post("http://localhost:8000/createToDO", userData)
      .then((response) => {
        console.log(response.status, response.data.token);
      });
    setInput('');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add a New Todo
        </Typography>
        <Box
          component="form"
          onSubmit={addTodoHandler}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Enter Todo.."
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ marginRight: "10px" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ padding: "10px 20px" }}
          >
            Add Todo
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Addtodo;
