import { createRouter, createWebHistory } from 'vue-router'
import HomeView          from '../views/HomeView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'
import SeatSelectorView  from '../views/SeatSelectorView.vue'
import BookingView       from '../views/BookingView.vue'
import ConfirmationView  from '../views/ConfirmationView.vue'
import AdminDashboard    from '../views/AdminDashboard.vue'
import AdminLogin        from '../views/AdminLogin.vue'
import DriverDashboard   from '../views/DriverDashboard.vue'
import { store }         from '../store.js'

const routes = [
  { path: '/',              name: 'home',          component: HomeView },
  { path: '/search-results',name: 'search-results',component: SearchResultsView },
  { path: '/seat-selector', name: 'seat-selector', component: SeatSelectorView },
  { path: '/booking',       name: 'booking',       component: BookingView },
  { path: '/confirmation',  name: 'confirmation',  component: ConfirmationView },
  { path: '/admin-login',   name: 'admin-login',   component: AdminLogin },
  { path: '/admin',         name: 'admin',         component: AdminDashboard, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/driver',        name: 'driver',        component: DriverDashboard, meta: { requiresAuth: true, role: 'driver' } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const requiredRole = to.meta.role
  
  if (requiresAuth && !store.isAuthenticated) {
    // Redirect to login if not authenticated
    return next('/admin-login')
  }

  if (requiredRole && store.userProfile?.role !== requiredRole) {
    // Redirect if role doesn't match
    if (store.userProfile?.role === 'driver') return next('/driver')
    if (store.userProfile?.role === 'admin') return next('/admin')
    return next('/')
  }

  next()
})

export default router