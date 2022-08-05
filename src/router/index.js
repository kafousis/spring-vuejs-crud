import { createRouter, createWebHistory } from 'vue-router'
import BookListView from '../views/BookListView.vue'
import BookDetailsView from '../views/BookDetailsView'
import AboutView from '../views/AboutView'

const parseProps = r => ({ id: parseInt(r.params.id) });

const routes = [
  {
    path: '/',
    redirect: '/books'
  },
  {
    path: '/books',
    name: 'books',
    component: BookListView
  },
  {
    path: '/books/:id',
    name: 'book detail',
    // props: true
    props: parseProps,
    component: BookDetailsView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
