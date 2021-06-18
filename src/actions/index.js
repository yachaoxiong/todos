import { GET_TODOS, DELETE_TODO, ADD_TODO, UPDATE_TODO } from './types';
const todoList = [
  {
    key: 1,
    title: 'laboriosam mollitia et enim quasi ',
    category: 'Work',
    priority: 'Low',
    createdDate: Date.now(),
    dueDate: new Date(2021, 11, 17),
    finishedDate: '',
    status: 'Planed',
    description: 'Do it once a week',
    notes: 'first task',
  },
  {
    key: 2,
    title: 'quis ut nam facilis et officia qui',
    category: 'Work',
    priority: 'High',
    createdDate: Date.now(),
    dueDate: new Date(2021, 6, 17),
    finishedDate: '',
    status: 'In Progress',
    description: 'Do it once a week',
    notes: 'Do it',
  },
  {
    key: 3,
    title: 'illo expedita consequatur quia in',
    category: 'Work',
    priority: 'High',
    createdDate: Date.now(),
    dueDate: new Date(2021, 6, 17),
    finishedDate: '',
    status: 'Finished',
    description: 'Do it once a week',
    notes: 'Do it',
  },
];

export const getTodos = () => async (dispathch) => {
  try {
    dispathch({
      type: GET_TODOS,
      payload: todoList,
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteTodo = (key) => async (dispathch) => {
  let newTodos = todoList.filter((t) => !key.includes(t.key));
  console.log('todolist', newTodos);
  try {
    dispathch({
      type: DELETE_TODO,
      payload: newTodos,
    });
  } catch (e) {
    console.log(e);
  }
};

export const addTodo = (item) => async (dispathch) => {
  let newTodos = [...todoList, item];

  try {
    dispathch({
      type: ADD_TODO,
      payload: newTodos,
    });
  } catch (e) {
    console.log(e);
  }
};
export const updateTodo = (key) => async (dispathch) => {
  let newTodos = [...todoList];
  let objIndex = newTodos.findIndex((obj) => obj.key === key);
  newTodos[objIndex].status === 'Finished'
    ? (newTodos[objIndex].status = 'In Progress')
    : (newTodos[objIndex].status = 'Finished');
  try {
    dispathch({
      type: UPDATE_TODO,
      payload: newTodos,
    });
  } catch (e) {
    console.log(e);
  }
};
