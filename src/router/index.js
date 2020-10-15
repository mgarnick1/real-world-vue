import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import EventList from '../views/EventList.vue';
import EventShow from '../views/EventShow.vue';
import EventCreate from '../views/EventCreate.vue';
import NProgress from 'nprogress';
import store from '../store/index';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true,
  },
  {
    path: '/event/:id',
    name: 'event-show',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('event/fetchEvent', routeTo.params.id)
        .then(event => {
          routeTo.params.event = event;
          next();
        })
        .catch(() => {
          next({ name: '404', params: { resource: 'event' } });
        });
    },
    // alias: '/about',
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate,
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true,
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } },
  },
  // {
  //   path: '/about',
  //   redirect: { name: 'about' },
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
