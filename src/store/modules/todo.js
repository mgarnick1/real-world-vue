export const state = {
  todos: [
    { id: 1, text: 'Get Dressed', done: true },
    { id: 2, text: 'Climb Mount Everest', done: false },
    { id: 3, text: 'Make 1 million dollars', done: true },
    { id: 4, text: 'Won an EGOT', done: false },
  ],
};

export const getters = {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done);
  },
  activeTodos: state => {
    return state.todos.filter(todo => !todo.done).length;
  },
};
