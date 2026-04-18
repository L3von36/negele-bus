<template>
  <div class="min-h-screen bg-background flex flex-col md:flex-row">
    
    <!-- Sidebar Overlay (Mobile Only) -->
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false" 
      class="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
    ></div>

    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-primary text-text-primary flex flex-col flex-shrink-0 transition-transform duration-300 ease-in-out border-r border-border md:relative md:translate-x-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Logo area -->
      <div class="h-16 flex items-center justify-between px-6 border-b border-border">
        <div class="flex items-center space-x-3">
          <img src="/favicon.png" alt="Logo" class="rounded-lg w-8 h-8 flex-shrink-0 object-cover border border-white/10" />
          <span class="font-bold tracking-tight text-white">Admin Portal</span>
        </div>
        <button @click="isSidebarOpen = false" class="md:hidden text-white/60 hover:text-white">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      
      <!-- Nav Links -->
      <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <button
          @click="currentTab = 'Overview'; isSidebarOpen = false"
          :aria-current="currentTab === 'Overview' ? 'page' : undefined"
          :class="['w-full flex items-center px-3 py-2.5 rounded-lg font-medium text-sm transition-colors', currentTab === 'Overview' ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-black/5']">
          <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          Dashboard
        </button>
        <button 
          @click="currentTab = 'Bookings'; isSidebarOpen = false"
          :class="['w-full flex items-center px-3 py-2.5 rounded-lg font-medium text-sm transition-colors', currentTab === 'Bookings' ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-black/5']">
          <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Bookings
        </button>
        <button 
          @click="currentTab = 'Routes'; isSidebarOpen = false"
          :class="['w-full flex items-center px-3 py-2.5 rounded-lg font-medium text-sm transition-colors', currentTab === 'Routes' ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-black/5']">
          <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          Routes
        </button>
        <button
          @click="currentTab = 'Buses'; isSidebarOpen = false"
          :class="['w-full flex items-center px-3 py-2.5 rounded-lg font-medium text-sm transition-colors', currentTab === 'Buses' ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-black/5']">
          <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
          Buses
        </button>
        <button
          @click="currentTab = 'Drivers'; isSidebarOpen = false"
          :class="['w-full flex items-center px-3 py-2.5 rounded-lg font-medium text-sm transition-colors', currentTab === 'Drivers' ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-black/5']">
          <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          Drivers
        </button>
        <button 
          @click="currentTab = 'Reports'; isSidebarOpen = false"
          :class="['w-full flex items-center px-3 py-2.5 rounded-lg font-medium text-sm transition-colors', currentTab === 'Reports' ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-black/5']">
          <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          Financials
        </button>
        <button 
          @click="currentTab = 'Boarding'; isSidebarOpen = false"
          :class="['w-full flex items-center px-3 py-2.5 rounded-lg font-medium text-sm transition-colors', currentTab === 'Boarding' ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-black/5']">
          <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          Boarding
        </button>
      </nav>
      
      <!-- User / Logout -->
      <div class="px-4 py-6 border-t border-border">
        <div class="px-3 mb-4">
          <p class="text-[10px] font-black text-white/40 uppercase tracking-widest">Logged in as</p>
          <p class="text-white font-bold text-sm truncate">{{ store.userProfile?.full_name || 'Administrator' }}</p>
        </div>
        <button @click="handleSignOut" class="w-full flex items-center px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm font-bold">
          <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Top header -->
      <header class="h-16 bg-white border-b border-border flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-10">
        <div class="flex items-center">
          <button @click="isSidebarOpen = true" class="md:hidden mr-3 text-text-secondary hover:text-black">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <h2 class="text-lg md:text-xl font-bold text-text-primary tracking-tight">{{ currentTab }}</h2>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-primary-100 rounded-full border border-border flex items-center justify-center text-text-primary font-bold text-xs flex-shrink-0">
            {{ store.userProfile?.full_name?.charAt(0) || 'A' }}
          </div>
          <button
            @click="handleSignOut"
            title="Sign out"
            class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-text-secondary hover:text-red-600 hover:bg-red-50 border border-border rounded-lg transition-all"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            <span class="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      <!-- Scrollable content -->
      <div ref="mainScrollRef" class="flex-1 overflow-y-auto bg-background p-6">
        
        <!-- =================== OVERVIEW TAB =================== -->
        <div v-if="currentTab === 'Overview'" class="animate-fade-in space-y-8">
          <!-- Stats Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-card p-5 rounded-xl border border-border shadow-soft flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-100 text-blue-600">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-text-secondary uppercase tracking-wider">Total Bookings</p>
                <h3 class="text-2xl font-bold text-text-primary mt-0.5">{{ store.bookings.length }}</h3>
              </div>
            </div>
            
            <div class="bg-card p-5 rounded-xl border border-border shadow-soft flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-green-100 text-green-600">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-text-secondary uppercase tracking-wider">Total Revenue</p>
                <h3 class="text-2xl font-bold text-text-primary mt-0.5">{{ store.totalRevenue }} ETB</h3>
              </div>
            </div>

            <div class="bg-card p-5 rounded-xl border border-border shadow-soft flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-accent/20 text-accent">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-text-secondary uppercase tracking-wider">Active Routes</p>
                <h3 class="text-2xl font-bold text-text-primary mt-0.5">{{ store.routes.filter(r => r.active).length }}</h3>
              </div>
            </div>

            <div class="bg-card p-5 rounded-xl border border-border shadow-soft flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-purple-100 text-purple-600">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-text-secondary uppercase tracking-wider">Active Buses</p>
                <h3 class="text-2xl font-bold text-text-primary mt-0.5">{{ store.activeBusesCount }}</h3>
              </div>
            </div>
          </div>

          <!-- Real-Time Analytics Charts -->
          <AdminCharts />
        </div>

        <!-- =================== BOOKINGS TAB =================== -->
        <div v-if="currentTab === 'Bookings'" class="animate-fade-in bg-card rounded-xl border border-border shadow-soft overflow-hidden">
          <div class="px-6 py-5 border-b border-border flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <h3 class="text-lg font-bold text-text-primary">All Bookings</h3>
            <div class="flex flex-col sm:flex-row items-center gap-3">
              <input
                v-model="bookingSearch"
                type="text"
                placeholder="Search name or ID..."
                class="px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:border-accent w-full sm:w-48"
              />
              <select
                v-model="bookingStatusFilter"
                class="px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:border-accent w-full sm:w-36"
              >
                <option value="">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
              </select>
              <div class="w-full sm:w-48">
                <DatePickerEthiopian v-model="bookingDateFilter" placeholder="Filter by Date" />
              </div>
              <button v-if="bookingDateFilter" @click="bookingDateFilter = ''" class="text-xs font-bold text-red-500 hover:text-red-600 px-2 whitespace-nowrap">Clear Date</button>
              <button @click="exportCSV" class="bg-primary-100 border border-border hover:bg-gray-100 text-text-primary px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                Export CSV
              </button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr class="bg-primary-100/50">
                  <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border">ID</th>
                  <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border">Passenger</th>
                  <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border">Route</th>
                  <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border">Status</th>
                  <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border bg-card">
                <tr v-if="paginatedBookings.length === 0">
                  <td colspan="5" class="px-6 py-12 text-center text-sm text-text-secondary">No bookings found.</td>
                </tr>
                <tr v-for="booking in paginatedBookings" :key="booking.id" class="hover:bg-primary-100/30 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">#{{ booking.id.slice(0, 8) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {{ booking.name }}<br>
                    <span class="text-xs">{{ formatEthiopian(new Date(booking.date), store, t) }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary font-medium">{{ booking.route }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span v-if="booking.status === 'Confirmed'" class="px-2.5 py-1 inline-flex text-[10px] leading-4 font-bold rounded-full bg-green-100 text-green-800 uppercase tracking-wider">Confirmed</span>
                    <span v-else-if="booking.status === 'Completed'" class="px-2.5 py-1 inline-flex text-[10px] leading-4 font-bold rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">Completed</span>
                    <span v-else class="px-2.5 py-1 inline-flex text-[10px] leading-4 font-bold rounded-full bg-red-100 text-red-800 uppercase tracking-wider">Canceled</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button v-if="booking.status !== 'Canceled'" @click="showConfirm('Cancel this booking?', () => store.cancelBooking(booking.id))" class="text-red-500 hover:text-red-700 font-medium ml-3">Cancel</button>
                    <button v-if="booking.status === 'Canceled'" @click="store.confirmBooking(booking.id)" class="text-green-500 hover:text-green-700 font-medium ml-3">Confirm</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Pagination -->
          <div v-if="totalBookingPages > 1" class="flex items-center justify-between px-6 py-4 border-t border-border">
            <p class="text-xs text-text-secondary">
              Showing {{ (currentPage - 1) * pageSize + 1 }}–{{ Math.min(currentPage * pageSize, filteredBookings.length) }} of {{ filteredBookings.length }}
            </p>
            <div class="flex items-center gap-2">
              <button @click="currentPage--" :disabled="currentPage === 1" class="px-3 py-1.5 text-xs font-medium border border-border rounded-lg disabled:opacity-40 hover:bg-primary-100 transition-colors">Prev</button>
              <span class="text-xs text-text-secondary">{{ currentPage }} / {{ totalBookingPages }}</span>
              <button @click="currentPage++" :disabled="currentPage === totalBookingPages" class="px-3 py-1.5 text-xs font-medium border border-border rounded-lg disabled:opacity-40 hover:bg-primary-100 transition-colors">Next</button>
            </div>
          </div>
        </div>

        <!-- =================== ROUTES TAB =================== -->
        <div v-if="currentTab === 'Routes'" class="animate-fade-in space-y-6">
          
          <!-- Add Route Form Area -->
          <div class="bg-card rounded-xl border border-border shadow-soft overflow-hidden p-6">
            <h3 class="text-lg font-bold text-text-primary mb-4">Add New Route</h3>
            <form @submit.prevent="handleNewRoute" class="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <input v-model="newRoute.from" type="text" placeholder="From (e.g. Adama)" class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent" required />
              </div>
              <div>
                <input v-model="newRoute.to" type="text" placeholder="To (e.g. Moyale)" class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent" required />
              </div>
              <div>
                <input v-model="newRoute.price" type="number" placeholder="Price (ETB)" class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent" required />
              </div>
              <div>
                <button type="submit" :disabled="isAddingRoute" class="w-full bg-black text-white hover:bg-accent disabled:opacity-50 transition-colors py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                  <svg v-if="isAddingRoute" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  {{ isAddingRoute ? 'Adding…' : 'Add Route' }}
                </button>
              </div>
            </form>
          </div>

          <div class="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
            <div class="px-6 py-5 border-b border-border">
              <h3 class="text-lg font-bold text-text-primary">Managed Routes</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr class="bg-primary-100/50">
                    <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border">Path</th>
                    <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border">Metrics</th>
                    <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border">Price</th>
                    <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border">Status</th>
                    <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border bg-card">
                  <tr v-for="route in store.routes" :key="route.id" class="hover:bg-primary-100/30 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-text-primary">{{ route.from }} → {{ route.to }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ route.distance || 'N/A' }} | {{ route.duration || 'N/A' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary font-medium">{{ route.price }} ETB</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span v-if="route.active" class="px-2.5 py-1 inline-flex text-[10px] leading-4 font-bold rounded-full bg-green-100 text-green-800 uppercase tracking-wider">Active</span>
                      <span v-else class="px-2.5 py-1 inline-flex text-[10px] leading-4 font-bold rounded-full bg-gray-100 text-gray-800 uppercase tracking-wider">Inactive</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div class="flex items-center justify-end space-x-3">
                        <button @click="openSeatMap(route.id)" class="text-blue-500 hover:text-blue-700 font-medium">Seats</button>
                        <button @click="openEditRoute(route)" class="text-orange-500 hover:text-orange-700 font-medium">Edit</button>
                        <button @click="store.toggleRouteStatus(route.id)" class="text-text-secondary hover:text-black font-medium">Toggle</button>
                        <button @click="showConfirm(`Delete route ${route.from} → ${route.to}? This cannot be undone.`, () => store.deleteRoute(route.id))" class="text-red-500 hover:text-red-700 font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- =================== BUSES TAB =================== -->
        <div v-if="currentTab === 'Buses'" class="animate-fade-in space-y-6">
          <div class="bg-card rounded-xl border border-border shadow-soft overflow-hidden p-6">
            <h3 class="text-lg font-bold text-text-primary mb-4">Add New Bus</h3>
            <form @submit.prevent="handleNewBus" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <input v-model="newBus.plate" type="text" placeholder="Plate Number (e.g. AA 12345)" class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent" required />
              </div>
              <div>
                <input v-model="newBus.capacity" type="number" placeholder="Capacity" class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent" required />
              </div>
              <div>
                <button type="submit" :disabled="isAddingBus" class="w-full bg-black text-white hover:bg-accent disabled:opacity-50 transition-colors py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                  <svg v-if="isAddingBus" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  {{ isAddingBus ? 'Adding…' : 'Add Bus' }}
                </button>
              </div>
            </form>
          </div>

          <div class="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
            <div class="px-6 py-5 border-b border-border">
              <h3 class="text-lg font-bold text-text-primary">Fleet Management</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr class="bg-primary-100/50">
                    <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border">Plate</th>
                    <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border">Capacity</th>
                    <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border">Route</th>
                    <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border">Assigned Driver</th>
                    <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border">Status</th>
                    <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border bg-card">
                  <tr v-for="bus in store.buses" :key="bus.id" class="hover:bg-primary-100/30 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-text-primary">{{ bus.plate }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ bus.capacity }} seats</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <select
                        :value="bus.route_id ?? ''"
                        @change="(e) => store.assignRouteToBus(bus.id, e.target.value)"
                        class="text-xs bg-white border border-border rounded px-2 py-1 focus:ring-1 focus:ring-accent outline-none"
                      >
                        <option value="">Unassigned</option>
                        <option v-for="r in store.routes" :key="r.id" :value="r.id">
                          {{ r.from }} → {{ r.to }}
                        </option>
                      </select>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <select
                        :value="bus.driver_id ?? ''"
                        @change="(e) => store.assignDriverToBus(bus.id, e.target.value)"
                        class="text-xs bg-white border border-border rounded px-2 py-1 focus:ring-1 focus:ring-accent outline-none w-full max-w-[150px]"
                      >
                        <option value="">Unassigned</option>
                        <option v-for="d in store.drivers" :key="d.id" :value="d.id">
                          {{ d.full_name || d.email }}
                        </option>
                      </select>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="[
                        'px-2.5 py-1 inline-flex text-[10px] leading-4 font-bold rounded-full uppercase tracking-wider',
                        bus.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      ]">{{ bus.status || 'Active' }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div class="flex items-center justify-end gap-3">
                        <button @click="store.updateBusStatus(bus.id, bus.status === 'Active' ? 'Maintenance' : 'Active')" class="text-accent hover:text-orange-700 font-medium">Toggle</button>
                        <button @click="showConfirm(`Remove bus ${bus.plate} from fleet? This cannot be undone.`, () => store.deleteBus(bus.id))" class="text-red-500 hover:text-red-700 font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- =================== DRIVERS TAB =================== -->
        <div v-if="currentTab === 'Drivers'" class="animate-fade-in bg-card rounded-xl border border-border shadow-soft overflow-hidden">
          <div class="px-6 py-5 border-b border-border flex items-center justify-between">
            <h3 class="text-lg font-bold text-text-primary">Driver Roster</h3>
            <span class="text-sm text-text-secondary">{{ store.drivers.length }} driver{{ store.drivers.length !== 1 ? 's' : '' }}</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr class="bg-primary-100/50">
                  <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border">Name</th>
                  <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border">Assigned Bus</th>
                  <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border">Phone</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border bg-card">
                <tr v-if="store.drivers.length === 0">
                  <td colspan="3" class="px-6 py-12 text-center text-sm text-text-secondary">No drivers found. Check Supabase RLS policies.</td>
                </tr>
                <tr v-for="driver in store.drivers" :key="driver.id" class="hover:bg-primary-100/30 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-text-primary">{{ driver.full_name || '—' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    <span v-if="driverBus(driver.id)" class="font-medium text-text-primary">{{ driverBus(driver.id).plate }}</span>
                    <span v-else class="text-text-secondary/50 italic">Unassigned</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ driver.phone || '—' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- =================== BOARDING TAB =================== -->
        <div v-if="currentTab === 'Boarding'" class="animate-fade-in">
           <PassengerManifest />
        </div>

        <!-- =================== REPORTS TAB =================== -->
        <div v-if="currentTab === 'Reports'" class="animate-fade-in">
           <AdminReports />
        </div>

      </div>
    </main>

    <!-- Modals -->
    <SeatMapModal :is-open="isSeatMapOpen" :route-id="activeRouteId" @close="isSeatMapOpen = false" />
    <EditRouteModal :is-open="isEditRouteOpen" :route-data="activeRouteData" @close="isEditRouteOpen = false" />

    <!-- Confirmation Modal -->
    <div v-if="confirmModal.show" class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <p class="text-text-primary font-semibold text-base mb-6">{{ confirmModal.message }}</p>
        <div class="flex justify-end gap-3">
          <button @click="confirmModal.show = false" class="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-primary-100 transition-colors">Cancel</button>
          <button @click="doConfirm" class="px-4 py-2 text-sm font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">Confirm</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { store, t } from '../store.js'
import AdminCharts from '../components/AdminCharts.vue'
import SeatMapModal from '../components/SeatMapModal.vue'
import EditRouteModal from '../components/EditRouteModal.vue'
import AdminReports from '../components/AdminReports.vue'
import PassengerManifest from '../components/PassengerManifest.vue'
import DatePickerEthiopian from '../components/DatePickerEthiopian.vue'
import { formatEthiopian, currentEthiopian } from '../lib/ethiopianCalendar.js'

const router = useRouter()
const isSidebarOpen = ref(false)
const currentTab = ref('Overview')

// ── Route Management ──────────────────────────────────────────────
const newRoute = reactive({ from: '', to: '', price: null, distance: '---', duration: '---', active: true })
const isAddingRoute = ref(false)

async function handleNewRoute() {
  if (isAddingRoute.value) return
  if (newRoute.from && newRoute.to && newRoute.price) {
    isAddingRoute.value = true
    try {
      await store.addRoute({ ...newRoute })
      newRoute.from = ''
      newRoute.to = ''
      newRoute.price = null
    } finally {
      isAddingRoute.value = false
    }
  }
}

// ── Modals ────────────────────────────────────────────────────────
const isSeatMapOpen = ref(false)
const activeRouteId = ref('')
const isEditRouteOpen = ref(false)
const activeRouteData = ref(null)

function openSeatMap(rId) { activeRouteId.value = rId; isSeatMapOpen.value = true }
function openEditRoute(rData) { activeRouteData.value = rData; isEditRouteOpen.value = true }

// ── Bus Management ────────────────────────────────────────────────
const newBus = reactive({ plate: '', capacity: null })
const isAddingBus = ref(false)

async function handleNewBus() {
  if (isAddingBus.value) return
  if (newBus.plate && newBus.capacity) {
    isAddingBus.value = true
    try {
      await store.addBus({ ...newBus })
      newBus.plate = ''
      newBus.capacity = null
    } finally {
      isAddingBus.value = false
    }
  }
}

// ── Drivers ───────────────────────────────────────────────────────
function driverBus(driverId) {
  return store.buses.find(b => b.driver_id === driverId) || null
}

// ── Booking Search, Filter & Pagination ──────────────────────────
const bookingSearch = ref('')
const bookingDateFilter = ref('')
const bookingStatusFilter = ref('')
const currentPage = ref(1)
const pageSize = 20

const filteredBookings = computed(() => {
  let list = store.bookings
  if (bookingStatusFilter.value) list = list.filter(b => b.status === bookingStatusFilter.value)
  if (bookingDateFilter.value) list = list.filter(b => b.date && b.date.includes(bookingDateFilter.value))
  if (bookingSearch.value) {
    const query = bookingSearch.value.toLowerCase()
    list = list.filter(b =>
      b.name.toLowerCase().includes(query) ||
      b.id.toLowerCase().includes(query) ||
      b.route.toLowerCase().includes(query)
    )
  }
  return list
})

const totalBookingPages = computed(() => Math.max(1, Math.ceil(filteredBookings.value.length / pageSize)))
const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredBookings.value.slice(start, start + pageSize)
})

watch([bookingSearch, bookingDateFilter, bookingStatusFilter], () => { currentPage.value = 1 })

// Reset scroll position when switching tabs
const mainScrollRef = ref(null)
watch(currentTab, () => {
  if (mainScrollRef.value) mainScrollRef.value.scrollTop = 0
})

// ── Confirmation Modal ────────────────────────────────────────────
const confirmModal = reactive({ show: false, message: '', onConfirm: null })

function showConfirm(message, action) {
  confirmModal.message = message
  confirmModal.onConfirm = action
  confirmModal.show = true
}

function doConfirm() {
  confirmModal.onConfirm?.()
  confirmModal.show = false
}

// ── CSV Export ────────────────────────────────────────────────────
function csvEscape(val) {
  const str = String(val ?? '')
  return (str.includes(',') || str.includes('"') || str.includes('\n'))
    ? '"' + str.replace(/"/g, '""') + '"'
    : str
}

function exportCSV() {
  const headers = ['ID', 'Passenger Name', 'Route', 'Date', 'Amount', 'Status']
  const rows = filteredBookings.value.map(b => [
    b.id,
    csvEscape(b.name),
    csvEscape(b.route),
    csvEscape(formatEthiopian(new Date(b.date), store, t)),
    b.amount,
    b.status
  ])
  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.map(csvEscape).join(','), ...rows.map(e => e.join(','))].join('\n')
  const et = currentEthiopian()
  const dateStr = `${et.year}-${String(et.month).padStart(2, '0')}-${String(et.day).padStart(2, '0')}`
  const link = document.createElement('a')
  link.setAttribute('href', encodeURI(csvContent))
  link.setAttribute('download', `bookings_export_${dateStr}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// ── Auth ──────────────────────────────────────────────────────────
async function handleSignOut() {
  await store.signOut()
  router.push('/login')
}
</script>
