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
    events: [],
    eventsTotal: 0,
    event: {},
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal;
    },
    SET_EVENT(state, event) {
      state.event = event;
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
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(res => {
          commit('SET_EVENTS_TOTAL', parseInt(res.headers['x-total-count']));
          commit('SET_EVENTS', res.data);
        })
        .catch(error => {
          console.log(
            'There was an error retrieving events, due to ' + error.response
          );
        });
    },
    fetchEvent({ commit, getters }, id) {
      var event = getters.getEventById(id);
      if (event) {
        commit('SET_EVENT', event);
      } else {
        EventService.getEvent(id)
          .then(res => {
            commit('SET_EVENT', res.data);
          })
          .catch(error => console.log(error.response));
      }
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
