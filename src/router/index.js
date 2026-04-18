import { createRouter, createWebHistory } from 'vue-router'
import HomeView              from '../views/HomeView.vue'
import SearchResultsView     from '../views/SearchResultsView.vue'
import SeatSelectorView      from '../views/SeatSelectorView.vue'
import BookingView           from '../views/BookingView.vue'
import ConfirmationView      from '../views/ConfirmationView.vue'
import AdminDashboard        from '../views/AdminDashboard.vue'
import LoginView             from '../views/LoginView.vue'
import DriverDashboard       from '../views/DriverDashboard.vue'
import PassengerLookupView   from '../views/PassengerLookupView.vue'
import StationMasterDashboard from '../views/StationMasterDashboard.vue'
import FinanceDashboard      from '../views/FinanceDashboard.vue'
import AuthorityDashboard    from '../views/AuthorityDashboard.vue'
import InspectorDashboard    from '../views/InspectorDashboard.vue'
import { store }             from '../store.js'

const routes = [
  { path: '/',               name: 'home',          component: HomeView },
  { path: '/search-results', name: 'search-results',component: SearchResultsView },
  { path: '/seat-selector',  name: 'seat-selector', component: SeatSelectorView },
  { path: '/booking',        name: 'booking',       component: BookingView },
  { path: '/confirmation',   name: 'confirmation',  component: ConfirmationView },
  { path: '/lookup',         name: 'lookup',        component: PassengerLookupView },
  { path: '/login',          name: 'login',         component: LoginView },
  // Legacy path
  { path: '/admin-login',    redirect: '/login' },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/driver',
    name: 'driver',
    component: DriverDashboard,
    meta: { requiresAuth: true, role: 'driver' }
  },
  {
    path: '/station',
    name: 'station',
    component: StationMasterDashboard,
    meta: { requiresAuth: true, role: 'station_master' }
  },
  {
    path: '/finance',
    name: 'finance',
    component: FinanceDashboard,
    meta: { requiresAuth: true, role: 'finance' }
  },
  {
    path: '/authority',
    name: 'authority',
    component: AuthorityDashboard,
    meta: { requiresAuth: true, role: 'authority' }
  },
  {
    path: '/inspector',
    name: 'inspector',
    component: InspectorDashboard,
    meta: { requiresAuth: true, role: 'inspector' }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

const ROLE_ROUTES = {
  admin:         '/admin',
  driver:        '/driver',
  station_master: '/station',
  finance:       '/finance',
  authority:     '/authority',
  inspector:     '/inspector',
}

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const requiredRole = to.meta.role

  if (requiresAuth && !store.isAuthenticated) {
    return next('/login')
  }

  if (store.isAuthenticated && !store.userProfile) {
    let attempts = 0
    while (!store.userProfile && attempts < 20) {
      await new Promise(r => setTimeout(r, 100))
      attempts++
    }
  }

  if (requiredRole && store.userProfile?.role !== requiredRole) {
    const homeForRole = ROLE_ROUTES[store.userProfile?.role]
    return next(homeForRole || '/')
  }

  next()
})

export default router
