const express = require('express');
const { Todo } = require('../mongo')
const { getAsync, setAsync } = require("../redis");
const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  const currentTodos = await getAsync("added_todos");
  const newCount = Number(currentTodos || 0) + 1;
  await setAsync("added_todos", newCount);
  res.send(todo);
});


const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

singleRouter.get("/", async (req, res) => {
  return res.send(req.todo);
});

singleRouter.put("/", async (req, res) => {
  const { text, done } = req.body;
  if (text !== undefined) {
    req.todo.text = text;
  }
  if (done !== undefined) {
    req.todo.done = done;
  }
  const updatedTodo = await req.todo.save();
  res.send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
