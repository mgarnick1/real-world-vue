import EventService from '@/services/EventServices';

export const namespaced = true;
export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
};

export const mutations = {
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
};

export const actions = {
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
};

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  },
};
