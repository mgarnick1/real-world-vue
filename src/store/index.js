import Vue from 'vue';
import Vuex from 'vuex';
import EventService from '../services/EventServices';

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
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event);
        })
        .catch(() => {
          console.log('There was a problem creating your event from action');
        });
    },
  },
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
