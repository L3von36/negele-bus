import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { supabase } from './supabase'
import { BOOKING_STATUS } from './constants'

// --- HELPER ---
const mapRoute = (r) => ({ ...r, from: r.from_city, to: r.to_city, blockedSeats: r.blocked_seats })

// --- QUERIES ---

export function useRoutes() {
  return useQuery({
    queryKey: ['routes'],
    queryFn: async () => {
      const { data, error } = await supabase.from('routes').select('*').order('created_at', { ascending: true })
      if (error) throw error
      return data.map(mapRoute)
    }
  })
}

export function useBuses() {
  return useQuery({
    queryKey: ['buses'],
    queryFn: async () => {
      const { data, error } = await supabase.from('buses').select('*').order('id', { ascending: true })
      if (error) throw error
      return data
    }
  })
}

export function useBookings(options = {}) {
  const { limit = 200, offset = 0 } = options
  return useQuery({
    queryKey: ['bookings', { limit, offset }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)
      if (error) throw error
      return data
    }
  })
}

export function useDrivers() {
  return useQuery({
    queryKey: ['drivers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'driver')
        .order('full_name', { ascending: true })
      if (error) throw error
      return data
    }
  })
}

export function useDriverBus(userId) {
  return useQuery({
    queryKey: ['driverBus', userId],
    queryFn: async () => {
      if (!userId) return null
      const { data: busData, error: busError } = await supabase
        .from('buses')
        .select('*')
        .eq('driver_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (busError) throw busError
      if (!busData) return null

      if (busData.route_id) {
        const { data: routeData } = await supabase
          .from('routes')
          .select('*')
          .eq('id', busData.route_id)
          .maybeSingle()

        if (routeData) {
          busData.routes = mapRoute(routeData)
        }
      }
      return busData
    },
    enabled: !!userId
  })
}

// --- MUTATIONS ---

export function useAddBooking() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (bookingData) => {
      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    }
  })
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    }
  })
}

export function useToggleBoarding() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, boarded }) => {
      const { error } = await supabase.from('bookings').update({ boarded }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    }
  })
}

export function useUpdateBusStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const { error } = await supabase.from('buses').update({ status }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buses'] })
      queryClient.invalidateQueries({ queryKey: ['driverBus'] })
    }
  })
}

export function useAssignRouteToBus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ busId, routeId }) => {
      const { error } = await supabase.from('buses').update({ route_id: routeId || null }).eq('id', busId)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buses'] })
    }
  })
}

export function useAssignDriverToBus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ busId, driverId }) => {
      const { error } = await supabase.from('buses').update({ driver_id: driverId || null }).eq('id', busId)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buses'] })
    }
  })
}

export function useAddRoute() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (routeData) => {
      const dbData = {
        from_city: routeData.from,
        to_city: routeData.to,
        price: routeData.price,
        duration: routeData.duration || '---',
        distance: routeData.distance || '---',
        active: true,
        blocked_seats: []
      }
      const { error } = await supabase.from('routes').insert([dbData])
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] })
    }
  })
}

export function useUpdateRoute() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, routeData }) => {
      const dbData = {
        from_city: routeData.from,
        to_city: routeData.to,
        price: routeData.price,
        distance: routeData.distance || '---',
        duration: routeData.duration || '---',
      }
      const { error } = await supabase.from('routes').update(dbData).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] })
    }
  })
}

export function useDeleteRoute() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('routes').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] })
    }
  })
}

export function useToggleRouteStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, active }) => {
      const { error } = await supabase.from('routes').update({ active }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] })
    }
  })
}

export function useAddBus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (busData) => {
      const { error } = await supabase.from('buses').insert([busData])
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buses'] })
    }
  })
}

export function useDeleteBus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('buses').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buses'] })
    }
  })
}
export function useToggleSeat() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ routeId, seatNumber }) => {
      const { data: route, error: fetchError } = await supabase
        .from('routes')
        .select('blocked_seats')
        .eq('id', routeId)
        .single()
      if (fetchError) throw fetchError

      let blocked = route.blocked_seats || []
      if (blocked.includes(seatNumber)) {
        blocked = blocked.filter(s => s !== seatNumber)
      } else {
        blocked = [...blocked, seatNumber]
      }

      const { error: updateError } = await supabase
        .from('routes')
        .update({ blocked_seats: blocked })
        .eq('id', routeId)
      if (updateError) throw updateError
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] })
    }
  })
}
