import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahar' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
    todos: [
      { id: 1, text: 'Get Dressed', done: true },
      { id: 2, text: 'Climb Mount Everest', done: false },
      { id: 3, text: 'Make 1 million dollars', done: true },
      { id: 4, text: 'Won an EGOT', done: false },
    ],
    events: [
      { id: 1, title: '...', organizer: '...' },
      { id: 2, title: '...', organizer: '...' },
      { id: 3, title: '...', organizer: '...' },
      { id: 4, title: '...', organizer: '...' },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    catLength: state => {
      return state.categories.length;
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done);
    },
    activeTodos: state => {
      return state.todos.filter(todo => !todo.done).length;
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id);
    },
  },
});
