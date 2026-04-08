import { reactive } from 'vue'

export const store = reactive({
  isAuthenticated: false,
  activeLang: 'en',
  
  translations: {
    en: {
      official: 'Official Transport Authority',
      travel: 'Travel with',
      confidence: 'confidence.',
      subtext: 'Book your seat in seconds — no account needed.',
      search_buses: 'Search Buses',
      departure: 'Departure',
      destination: 'Destination',
      date: 'Date',
      popular_routes: 'Popular Routes',
      boarding_pass: 'Boarding Pass',
      confirmed: 'Booking Confirmed.',
      ready: 'Your ticket is ready.',
      passenger: 'Passenger',
      phone: 'Phone',
      seat: 'Seat',
      bus: 'Bus',
      total: 'Total',
      book_another: 'Book Another Ticket',
      available: 'buses available',
      select_seat: 'Select Seat',
      almost_there: 'Almost there!',
      sub_almost: 'Just your name & phone number',
      confirm_booking: 'Confirm Booking',
      yours: 'Yours',
      taken: 'Taken',
      open: 'Open',
      brand_subtitle: 'Transport Authority',
      front: 'FRONT',
      name_placeholder: 'Full Name',
      phone_placeholder: 'Phone Number (09...)',
      station_note: 'Show this at the station. SMS sent to {phone}.',
      seats_available: 'seats available',
      buses_available: 'buses available',
      from_label: 'From',
      etb_label: 'ETB',
      depart_label: 'Depart',
      arrive_label: 'Arrive',
      select_departure: 'Select departure',
      select_destination: 'Select destination',
      select_date: 'Select date',
      brand_name: 'Negele Borena',
      terms_agreement: 'By booking you agree to the',
      terms_of_service: 'terms of service',
      features_title: 'Fast, Reliable & Safe',
      feature_1_title: 'Instant Booking',
      feature_1_desc: 'Skip the long lines and book your seat from anywhere in under a minute.',
      feature_2_title: 'Secure & Safe',
      feature_2_desc: 'All our partner buses and drivers are officially verified by the Transport Authority.',
      feature_3_title: '24/7 Digital Support',
      feature_3_desc: 'Manage your tickets or ask questions anytime through our centralized system.',
      copyright: '© 2026 Negele Borena Transport Authority',
      cities: {
        'negele-borena': 'Negele Borena',
        'addis-ababa': 'Addis Ababa',
        'hawassa': 'Hawassa',
        'moyale': 'Moyale',
        'yabello': 'Yabello'
      }
    },
    am: {
      official: 'ይፋዊ የትራንስፖርት ባለስልጣን',
      travel: 'በመተማመን',
      confidence: 'ይጓዙ።',
      subtext: 'ወንበርዎን አሁኑኑ ያስይዙ - ምንም አካውንት አያስፈልግም።',
      search_buses: 'አውቶቡሶችን ፈልግ',
      departure: 'መነሻ',
      destination: 'መድረሻ',
      date: 'ቀን',
      popular_routes: 'ታዋቂ መስመሮች',
      boarding_pass: 'የመሳፈሪያ ቲኬት',
      confirmed: 'ቦታ ተይዟል！',
      ready: 'ቲኬትዎ ዝግጁ ነው።',
      passenger: 'ተጓዥ',
      phone: 'ስልክ',
      seat: 'ወንበር',
      bus: 'አውቶቡስ',
      total: 'ጠቅላላ ዋጋ',
      book_another: 'ሌላ ቲኬት ይቁረጡ',
      available: 'አውቶቡሶች ይገኛሉ',
      select_seat: 'ወንበር ምረጥ',
      almost_there: 'ሊጠናቀቅ ትንሽ ቀርቷል!',
      sub_almost: 'ስምዎን እና ስልክዎን ያስገቡ',
      confirm_booking: 'ቦታ መያዙን አረጋግጥ',
      yours: 'የእርስዎ',
      taken: 'የተያዘ',
      open: 'ክፍት',
      brand_subtitle: 'የትራንስፖርት ባለስልጣን',
      front: 'ፊት',
      name_placeholder: 'ሙሉ ስም',
      phone_placeholder: 'የስልክ ቁጥር (09...)',
      station_note: 'ይህንን ቲኬት በመነሻ ጣቢያው ያሳዩ። ኤስኤምኤስ ወደ {phone} ተልኳል።',
      seats_available: 'ወንበሮች ይገኛሉ',
      buses_available: 'አውቶቡሶች ይገኛሉ',
      from_label: 'ከ',
      etb_label: 'ብር',
      depart_label: 'መነሻ',
      arrive_label: 'መድረሻ',
      select_departure: 'መነሻ ይምረጡ',
      select_destination: 'መድረሻ ይምረጡ',
      select_date: 'ቀን ይምረጡ',
      brand_name: 'ነገሌ ቦረና',
      terms_agreement: 'ቦታ በመያዝዎ',
      terms_of_service: 'በአገልግሎት ውሎች',
      features_title: 'ፈጣን፣ አስተማማኝ እና ደህንነቱ የተጠበቀ',
      feature_1_title: 'ወዲያውኑ ቦታ መያዝ',
      feature_1_desc: 'ከረጅም ተርታ መጠበቅ ሳያስፈልግዎት ካሉበት ሆነው ወንበርዎን አሁኑኑ ይያዙ።',
      feature_2_title: 'አስተማማኝ እና ደህንነቱ የተጠበቀ',
      feature_2_desc: 'ሁሉም አውቶቡሶቻችን እና አሽከርካሪዎቻችን በትራንስፖርት ባለስልጣን የተረጋገጡ ናቸው።',
      feature_3_title: '24/7 ዲጂታል ድጋፍ',
      feature_3_desc: 'በማንኛውም ጊዜ ትኬትዎን ያስተዳድሩ ወይም ጥያቄዎችን ይጠይቁ።',
      copyright: '© 2026 ነገሌ ቦረና የትራንስፖርት ባለስልጣን',
      cities: {
        'negele-borena': 'ነገሌ ቦረና',
        'addis-ababa': 'አዲስ አበባ',
        'hawassa': 'ሀዋሳ',
        'moyale': 'ሞያሌ',
        'yabello': 'ያቤሎ'
      }
    },
    om: {
      official: 'Abbaa Taayitaa Geejjibaa',
      travel: 'Itti amanamummaadhaan',
      confidence: 'imalaa.',
      subtext: 'Salphaatti teessoo keessan qabadhu — herregni hin barbaachisu.',
      search_buses: 'Awtobusii Barbaadi',
      departure: 'Ka\'umsa',
      destination: 'Gahuu',
      date: 'Guyyaa',
      popular_routes: 'Karaalee Beekamoo',
      boarding_pass: 'Tikkeettii Seensaa',
      confirmed: 'Galmeeffameera.',
      ready: 'Tikeetiin keessan qophiidha.',
      passenger: 'Imaltoota',
      phone: 'Bilbila',
      seat: 'Teessoo',
      bus: 'Otobisii',
      total: 'Gatii Waliigalaa',
      book_another: 'Tikeetii Biraa Bitadhu',
      available: 'otobisii jiran',
      select_seat: 'Teessoo filadhu',
      almost_there: 'Xiqqootu hafe!',
      sub_almost: 'Maqaa fi bilbila keessan qofa',
      confirm_booking: 'Galmeessuu mirkaneessi',
      yours: 'Kan kee',
      taken: 'Kan qabame',
      open: 'Banaadha',
      brand_subtitle: 'Abbaa Taayitaa Geejjibaa',
      front: 'FULDURA',
      name_placeholder: 'Maqaa Guutuu',
      phone_placeholder: 'Lakk. Bilbilaa (09...)',
      station_note: 'Kana buufata geejjibatti agarsiisaa. SMS\'n gara {phone} ergameera.',
      seats_available: 'teessoowwan jiran',
      buses_available: 'otobisii jiran',
      from_label: 'Irraa',
      etb_label: 'ETB',
      depart_label: 'Ka\'umsa',
      arrive_label: 'Gahuu',
      select_departure: 'Iddoo ka\'umsaa filadhu',
      select_destination: 'Iddoo gahuu filadhu',
      select_date: 'Guyyaa filadhu',
      brand_name: 'Nageellee Booraanaa',
      terms_agreement: 'Galmeessuudhaan',
      terms_of_service: 'waliigaltee tajaajilaa',
      features_title: 'Saffisaa, Amanamaa fi Nageenya',
      feature_1_title: 'Galmee Hatattamaa',
      feature_1_desc: 'Tarree jalaa ba\'uun bakka jirtan hundatti daqiiqaa tokko gadiitti teessoo qabadhaa.',
      feature_2_title: 'Nageenya Amansiisaa',
      feature_2_desc: 'Awtobusoonni fi abbootiin konkolaataa keenya hundi Abbaa Taayitaa Geejjibaan mirkanaa\'aniiru.',
      feature_3_title: 'Degaarsa Diijitaalaa 24/7',
      feature_3_desc: 'Yeroo kamiyyuu tikeetii keessan bulchuun ykn gaaffii gaafachuun ni danda\'ama.',
      copyright: '© 2026 Abbaa Taayitaa Geejjibaa Nageellee Booraanaa',
      cities: {
        'negele-borena': 'Nageellee Booraanaa',
        'addis-ababa': 'Finfinnee',
        'hawassa': 'Hawaasaa',
        'moyale': 'Mooyaalee',
        'yabello': 'Yaabeelloo'
      }
    }
  },

  bookings: [
    { id: '1092', name: 'Amanuel Tesfaye', route: 'Addis Ababa → Hawassa', date: 'Today, 14:00', amount: 850, status: 'Confirmed' },
    { id: '1091', name: 'Kidist Worku', route: 'Negele Borena → Addis Ababa', date: 'Today, 09:30', amount: 1200, status: 'Confirmed' },
    { id: '1090', name: 'Bereket Desta', route: 'Moyale → Yabello', date: 'Yesterday, 16:45', amount: 600, status: 'Completed' },
    { id: '1089', name: 'Feven Alemu', route: 'Addis Ababa → Negele Borena', date: 'Yesterday, 11:00', amount: 1200, status: 'Completed' },
    { id: '1088', name: 'Yonas Tilahun', route: 'Hawassa → Addis Ababa', date: 'Yesterday, 08:15', amount: 850, status: 'Canceled' }
  ],
  
  routes: [
    { id: 'R1', from: 'Addis Ababa', to: 'Hawassa', price: 850, duration: '4h 30m', distance: '275 km', active: true, blockedSeats: [2, 3] },
    { id: 'R2', from: 'Negele Borena', to: 'Addis Ababa', price: 1200, duration: '10h 00m', distance: '590 km', active: true, blockedSeats: [] },
    { id: 'R3', from: 'Moyale', to: 'Yabello', price: 600, duration: '3h 15m', distance: '205 km', active: true, blockedSeats: [1, 2, 3, 4] },
    { id: 'R4', from: 'Hawassa', to: 'Negele Borena', price: 750, duration: '6h 00m', distance: '320 km', active: false, blockedSeats: [] }
  ],
  
  buses: [
    { id: 'B01', plate: 'ET-34521', capacity: 45, status: 'Active' },
    { id: 'B02', plate: 'ET-89102', capacity: 45, status: 'Maintenance' },
    { id: 'B03', plate: 'ET-11234', capacity: 30, status: 'Active' },
    { id: 'B04', plate: 'ET-55678', capacity: 60, status: 'Active' }
  ],

  // Getters
  get totalRevenue() {
    return this.bookings
      .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
      .reduce((sum, b) => sum + b.amount, 0)
  },

  get activeBusesCount() {
    return this.buses.filter(b => b.status === 'Active').length
  },

  // Actions
  login() {
    this.isAuthenticated = true
  },

  logout() {
    this.isAuthenticated = false
  },

  cancelBooking(id) {
    const b = this.bookings.find(b => b.id === id)
    if (b) b.status = 'Canceled'
  },
  
  confirmBooking(id) {
    const b = this.bookings.find(b => b.id === id)
    if (b) b.status = 'Confirmed'
  },

  addRoute(routeData) {
    this.routes.push({
      id: 'R' + (this.routes.length + 1),
      ...routeData,
      blockedSeats: []
    })
  },

  updateRoute(id, updatedData) {
    const r = this.routes.find(r => r.id === id)
    if (r) {
      Object.assign(r, updatedData)
    }
  },

  toggleRouteStatus(id) {
    const r = this.routes.find(r => r.id === id)
    if (r) r.active = !r.active
  },

  toggleSeat(routeId, seatNumber) {
    const r = this.routes.find(r => r.id === routeId)
    if (r) {
      const idx = r.blockedSeats.indexOf(seatNumber)
      if (idx > -1) {
        r.blockedSeats.splice(idx, 1)
      } else {
        r.blockedSeats.push(seatNumber)
      }
    }
  },

  addBus(busData) {
    this.buses.push({
      id: 'B' + String(this.buses.length + 1).padStart(2, '0'),
      ...busData,
      status: 'Active'
    })
  },

  updateBusStatus(id, newStatus) {
    const b = this.buses.find(b => b.id === id)
    if (b) b.status = newStatus
  },

  setLanguage(lang) {
    this.activeLang = lang
  }
})

export const t = (key) => {
  const lang = store.activeLang || 'en'
  const dict = store.translations[lang] || store.translations['en']
  
  // Handle nested keys like 'cities.addis-ababa'
  if (key.includes('.')) {
    const [main, sub] = key.split('.')
    return dict[main]?.[sub] || store.translations['en'][main]?.[sub] || key
  }
  
  return dict[key] || store.translations['en'][key] || key
}
