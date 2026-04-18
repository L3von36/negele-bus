import { reactive } from 'vue'
import { supabase } from './lib/supabase'

export const store = reactive({
  user: null,
  userProfile: null,
  isAuthenticated: false,
  isInitialized: false,
  activeLang: 'en',

  bookings: [],
  routes: [],
  buses: [],
  drivers: [],
  driverBus: null,

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
      },
      nav: {
        driver_portal: 'Driver Portal',
        admin_portal: 'Admin Portal',
        navigation: 'Navigation'
      },
      onboarding: {
        title: 'How It Works',
        subtitle: 'Book your seat in 3 easy steps',
        intro: "Rafiki will guide you through the whole process. He's done this a thousand times. 🚌",
        step0_label: 'Choose Language',
        step0_desc: 'Set your preference',
        step0_full: 'Our platform supports English, Amharic, and Afaan Oromo. You can switch any time using the menu in the top right corner.',
        step0_tip1: 'Tap the language switcher',
        step0_tip2: 'Select your preferred language',
        step0_tip3: 'UI updates instantly',
        step1_label: 'Choose Your Route',
        step1_desc: 'Search for Buses',
        step1_full: 'Pick your departure city, destination, and travel date. Just like you see it here — clean and simple.',
        step1_tip1: 'Choose your departure city',
        step1_tip2: 'Select destination',
        step1_tip3: 'Pick a travel date',
        step2_label: 'Pick a Seat',
        step2_desc: 'Compare & Select',
        step2_full: 'The seat map shows every seat on the bus. Grey = taken. White = available. Orange = yours.',
        step2_tip1: 'Grey seats are already taken',
        step2_tip2: 'Tap any white seat to select',
        step2_tip3: 'Confirm to move to booking',
        step3_label: 'Select Seat',
        step3_desc: 'Pick Your Spot',
        step3_full: 'The seat map shows all available spots. Gray = taken. White = open. Orange = yours.',
        step3_tip1: 'Gray seats are already booked',
        step3_tip2: 'Tap any white seat to select',
        step3_tip3: 'Confirm to proceed to booking',
        step4_label: 'Get QR Ticket',
        step4_desc: 'Your Ticket is Ready',
        step4_full: 'Once confirmed, you will get a digital ticket with a QR code. Show it to the driver at the station.',
        step4_tip1: 'Take a screenshot of the QR code',
        step4_tip2: 'No account needed to book',
        step4_tip3: 'Scan the QR code to board',
        mascot_lang: "Choose your preferred language! 🌍",
        mascot_welcome: "First, pick where you're going! ✈️",
        mascot_dest: "Now select your destination 🎯",
        mascot_date: "Pick your travel date 📅",
        mascot_search: "Hit search! I'll find the best buses 🚌",
        mascot_pick: "Green = available. Tap one! 🟢",
        mascot_seat_num: "Seat #{num}? Great choice! 😄",
        mascot_success: "You're booked! Your QR is ready 🎉",
        mascot_save: "Save this QR code to your phone! 📱",
        mascot_screenshot: "Or take a screenshot! 📸",
        mascot_boarding: "Show it to the driver at the gate ✅",
        month_1: 'Meskerem', month_2: 'Tekemt', month_3: 'Hidar', month_4: 'Tahsas', month_5: 'Tir', month_6: 'Yakatit',
        month_7: 'Magabit', month_8: 'Miyazya', month_9: 'Ginbot', month_10: 'Sene', month_11: 'Hamle', month_12: 'Nehase', month_13: 'Pagume',
        bottom_tip1_title: 'Take a Screenshot',
        bottom_tip1_desc: 'Take a screenshot of your QR code so it\'s accessible offline at the station.',
        bottom_tip2_title: 'Save to Gallery',
        bottom_tip2_desc: 'Tap "Save QR" on the confirmation page to download it directly to your phone.',
        bottom_tip3_title: 'One QR, One Seat',
        bottom_tip3_desc: 'One QR code = one seat. Don\'t share it with others to avoid boarding conflicts.'
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
      },
      nav: {
        driver_portal: 'የአሽከርካሪዎች ክፍል',
        admin_portal: 'የአስተዳዳሪ ክፍል',
        navigation: 'ዳሰሳ'
      },
      onboarding: {
        title: 'እንዴት ነው የሚሰራው?',
        subtitle: 'ቦታዎን በ 3 ቀላል ደረጃዎች ይያዙ',
        intro: "ራፊቂ በሂደቱ ውስጥ ይመራዎታል። ይህንን በሺዎች የሚቆጠሩ ጊዜያት አድርጎታል። 🚌",
        step0_label: 'ቋንቋ ይምረጡ',
        step0_desc: 'ምርጫዎን ያስተካክሉ',
        step0_full: 'መድረካችን እንግሊዝኛን፣ አማርኛን እና አፋን ኦሮሞን ይደግፋል። ከላይ በቀኝ በኩል ያለውን ሜኑ በመጠቀም በማንኛውም ጊዜ መቀየር ይችላሉ።',
        step0_tip1: 'የቋንቋ መቀየሪያውን ይንኩ',
        step0_tip2: 'የሚመርጡትን ቋንቋ ይምረጡ',
        step0_tip3: 'ወዲያውኑ ይቀየራል',
        step1_label: 'መስመርዎን ይምረጡ',
        step1_desc: 'አውቶቡሶችን ፈልግ',
        step1_full: 'መነሻዎን፣ መድረሻዎን እና የጉዞ ቀንዎን ይምረጡ። ልክ እዚህ በሚያዩት መልኩ - ቀላል እና ግልጽ።',
        step1_tip1: 'የመነሻ ከተማዎን ይምረጡ',
        step1_tip2: 'መድረሻዎን ይምረጡ',
        step1_tip3: 'የጉዞ ቀኑን ይምረጡ',
        step2_label: 'ወንበር ይምረጡ',
        step2_desc: 'ያመሣክሩ እና ይምረጡ',
        step2_full: 'የወንበር ካርታው በአውቶቡስ ውስጥ ያለውን እያንዳንዱን ወንበር ያሳያል። ግራጫ = የተያዘ። ነጭ = ክፍት። ብርቱካንማ = የእርስዎ።',
        step2_tip1: 'ግራጫ ወንበሮች አስቀድመው የተያዙ ናቸው',
        step2_tip2: 'ለመምረጥ ማንኛውንም ነጭ ወንበር ይንኩ',
        step2_tip3: 'ወደ ማስያዣው ለመሄድ ያረጋግጡ',
        step3_label: 'ወንበር ይምረጡ',
        step3_desc: 'ቦታዎን ይያዙ',
        step3_full: 'የመቀመጫ ካርታው ያሉትን ክፍት ቦታዎች ያሳያል። ግራጫ = የተያዘ። ነጭ = ክፍት። ብርቱካናማ = የእርስዎ።',
        step3_tip1: 'ግራጫ ወንበሮች አስቀድመው የተያዙ ናቸው',
        step3_tip2: 'ለመምረጥ ማንኛውንም ነጭ ወንበር ይንኩ',
        step3_tip3: 'ወደ ማስያዝ ለመቀጠል ያረጋግጡ',
        step4_label: 'የQR ቲኬት ያግኙ',
        step4_desc: 'ቲኬትዎ ዝግጁ ነው',
        step4_full: 'ካረጋገጡ በኋላ የQR ኮድ ያለው ዲጂታል ቲኬት ያገኛሉ። ጣቢያው ሲደርሱ ለሾፌሩ ያሳዩ።',
        step4_tip1: 'የQR ኮዱን ስክሪንሾት ያንሱ',
        step4_tip2: 'ትኬት ለመቁረጥ አካውንት አያስፈልግም',
        step4_tip3: 'ለመሳፈር የQR ኮዱን ያሳዩ',
        mascot_lang: "የሚመርጡትን ቋንቋ ይምረጡ! 🌍",
        mascot_welcome: "መጀመሪያ የት መሄድ እንደሚፈልጉ ይምረጡ! ✈️",
        mascot_dest: "አሁን መድረሻዎን ይምረጡ 🎯",
        mascot_date: "የጉዞ ቀንዎን ይምረጡ 📅",
        mascot_search: "ፈልግ የሚለውን ይንኩ! ምርጥ አውቶቡሶችን አገኝልዎታለሁ 🚌",
        mascot_pick: "አረንጓዴ = ክፍት ነው። አንዱን ይንኩ! 🟢",
        mascot_seat_num: "ወንበር ቁጥር #{num}? ምርጥ ምርጫ ነው! 😄",
        mascot_success: "ቦታው ተይዟል! የQR ቲኬትዎ ዝግጁ ነው 🎉",
        mascot_save: "ይህንን የQR ኮድ በስልክዎ ያስቀምጡ! 📱",
        mascot_screenshot: "ወይም ፎቶ (screenshot) ያንሱት! 📸",
        mascot_boarding: "በመግቢያው ላይ ለአሽከርካሪው ያሳዩ ✅",
        month_1: 'መስከረም', month_2: 'ጥቅምት', month_3: 'ህዳር', month_4: 'ታህሳስ', month_5: 'ጥር', month_6: 'የካቲት',
        month_7: 'መጋቢት', month_8: 'ሚያዝያ', month_9: 'ግንቦት', month_10: 'ሰኔ', month_11: 'ሐምሌ', month_12: 'ነሐሴ', month_13: 'ጳጉሜ',
        bottom_tip1_title: 'ፎቶ (Screenshot) ያንሱ',
        bottom_tip1_desc: 'መነሻ ጣቢያው ኢንተርኔት ባይኖር እንኳን በቀላሉ ለማሳየት የQR ኮዱን ፎቶ (screenshot) ያንሱ።',
        bottom_tip2_title: 'በስልክዎ ያስቀምጡ',
        bottom_tip2_desc: 'ቲኬቱን በቀጥታ ወደ ስልክዎ ለማውረድ በማረጋገጫ ገጹ ላይ "Save QR" የሚለውን ይንኩ።',
        bottom_tip3_title: 'አንድ ቲኬት፣ አንድ ወንበር',
        bottom_tip3_desc: 'አንድ የQR ኮድ ለአንድ ወንበር ብቻ የሚያገለግል ነው። ለመሳፈር መደራረብን ለማስቀረት ለሌላ ሰው አያጋሩት።'
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
      },
      nav: {
        driver_portal: 'Bakka Konkolaachisaa',
        admin_portal: 'Bakka Bulchiinsaa',
        navigation: 'Navigeshinii'
      },
      onboarding: {
        title: 'Akkamitti Hojjeta?',
        subtitle: 'Sadarkaa 3 salphaan teessoo keessan qabadhaa',
        intro: "Rafiiqiin adeemsa hunda keessatti isin qajeelcha. Inni kana yeroo kumaatama hojjeteera. 🚌",
        step0_label: 'Afaan Filadhaa',
        step0_desc: 'Filannoo keessan addeessaa',
        step0_full: 'Sironni keenya afaanota sadii: Ingiliffa, Amaariffaa fi Afaan Oromoo ni deggara. Menuu mirga gubbaa jiruun yeroo barbaaddan jijjiiruu dandeessu.',
        step0_tip1: 'Jijjiiraa afaanii tuqaa',
        step0_tip2: 'Afaan dhalootaa keessan filadhaa',
        step0_tip3: 'Saphlaatti jijjiirama',
        step1_label: 'Karaa Keessan Filadhaa',
        step1_desc: 'Awtobusii Barbaadi',
        step1_full: 'Iddoo ka\'umsaa, bakka gahuu fi guyyaa imalaa keessan filadhaa. Akkuma asitti argitanitti - qulqulluu fi salphaadha.',
        step1_tip1: 'Iddoo ka\'umsaa keessan filadhaa',
        step1_tip2: 'Bakka gahuu keessan filadhaa',
        step1_tip3: 'Guyyaa imalaa filadhaa',
        step2_label: 'Teessoo Filadhaa',
        step2_desc: 'Dorgomsiisaa & Filadhaa',
        step2_full: 'Kaartaan teessoo teessowwan hunda agarsiisa. Giraay = kan qabame. Adi = banaa. Burtukaana = kan kee.',
        step2_tip1: 'Teessonni giraay duraan qabamaniiru',
        step2_tip2: 'Filachuuf teessoo adi kamiyyuu tuqi',
        step2_tip3: 'Gara galmeessaatti darbuuf mirkaneessi',
        step3_label: 'Teessoo Filadhaa',
        step3_desc: 'Bakka Keessan Qabadhaa',
        step3_full: 'Kaartaan teessoo teessowwan hunda agarsiisa. Giraay = kan qabame. Adi = banaa. Burtukaana = kan kee.',
        step3_tip1: 'Teessonni giraay duraan qabamaniiru',
        step3_tip2: 'Filachuuf teessoo adi kamiyyuu tuqi',
        step3_tip3: 'Gara galmeessaatti darbuuf mirkaneessi',
        step4_label: 'Tikkeettii QR Fudhadhaa',
        step4_desc: 'Tikeetiin Keessan Qophiidha',
        step4_full: 'Mirkanaa\'naan tikeetii diijitaalaa koodii QR qabu ni argattu. Moonaatti konkolaachisatti agarsiisaa.',
        step4_tip1: 'Koodii QR "screenshot" godhaa',
        step4_tip2: 'Herregni addaa hin barbaachisu',
        step4_tip3: 'Yaabbachuuf koodii QR agarsiisaa',
        mascot_lang: "Afaan filannoo keessanii filadhaa! 🌍",
        mascot_welcome: "Jalqaba eessa deemuuf akka jirtan filadhaa! ✈️",
        mascot_dest: "Amma bakka gahuu keessan filadhaa 🎯",
        mascot_date: "Guyyaa imalaa keessan filadhaa 📅",
        mascot_search: "Barbaadi kan jedhu tuqaa! Awtobusii gaarii isiniif barbaada 🚌",
        mascot_pick: "Magariisa = banaadha. Tokko tuqi! 🟢",
        mascot_seat_num: "Teessoo lakk. #{num}? Filannoo gaariidha! 😄",
        mascot_success: "Galmeeffameera! Tikeetiin QR keessan qophiidha 🎉",
        mascot_save: "Koodii QR kana bilbila keessan irratti olkaayaa! 📱",
        mascot_screenshot: "Ykn \"screenshot\" godhaatii qabadhaa! 📸",
        mascot_boarding: "Gara moonaatti yeroo seentan agarsiisaa ✅",
        month_1: 'Fulbaana', month_2: 'Onkololeessa', month_3: 'Sadaasa', month_4: 'Muddee', month_5: 'Amajjii', month_6: 'Guraandhala',
        month_7: 'Bitootessa', month_8: 'Eebila', month_9: 'Caamsaa', month_10: 'Waxabajjii', month_11: 'Aadoolessa', month_12: 'Hagayya', month_13: 'Qaammee',
        bottom_tip1_title: '"Screenshot" Godhaa',
        bottom_tip1_desc: 'Buufata geejjibatti yeroo Intarneetiin hin jirre salphaatti agarsiisuuf koodii QR "screenshot" godhaa.',
        bottom_tip2_title: 'Bilbilatti Olkaayaa',
        bottom_tip2_desc: 'Tikeetii keessan kallattiin gara bilbila keessaniitti buusuuf "Save QR" kan jedhu tuqaa.',
        bottom_tip3_title: 'Tikeetii Tokko, Teessoo Tokko',
        bottom_tip3_desc: 'Koodii QR tokko teessoo tokko qofaaf tajaajila. Iddoo imalaa irratti wal-dhabbii uumuuf namoota biroof hin qoodinaa.'
      }
    }
  },

  // Getters
  get totalRevenue() {
    return this.bookings
      .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
      .reduce((sum, b) => sum + Number(b.amount), 0)
  },

  get activeBusesCount() {
    return this.buses.filter(b => b.status === 'Active').length
  },

  // Actions
  async init() {
    // Check for existing session
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      this.user = session.user
      this.isAuthenticated = true
      await this.fetchProfile(session.user.id)
      if (this.userProfile?.role === 'driver') await this.fetchDriverBus()
    }

    await Promise.all([
      this.fetchRoutes(),
      this.fetchBuses(),
      this.fetchBookings(),
      this.fetchDrivers()
    ])

    this.isInitialized = true

    // Enable Realtime Subscriptions
    supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => this.fetchBookings())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'routes' }, () => this.fetchRoutes())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'buses' }, () => this.fetchBuses())
      .subscribe()

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        this.user = session.user
        this.isAuthenticated = true
        await this.fetchProfile(session.user.id)
        if (this.userProfile?.role === 'driver') await this.fetchDriverBus()
        // Re-fetch drivers now that we're authenticated (RLS requires auth to read profiles)
        await this.fetchDrivers().catch(() => {})
      } else {
        this.user = null
        this.userProfile = null
        this.driverBus = null
        this.isAuthenticated = false
        this.drivers = []
      }
    })
  },

  async fetchDriverBus() {
    const { data: busData, error: busError } = await supabase
      .from('buses')
      .select('*')
      .eq('driver_id', this.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    
    if (busError) {
      console.error('Error fetching driver bus:', busError)
      return
    }

    if (busData) {
      // 2. If bus has a route_id, pull the route data separately
      // This bypasses the foreign key relationship error (PGRST200)
      if (busData.route_id) {
        const { data: routeData, error: routeError } = await supabase
          .from('routes')
          .select('*')
          .eq('id', busData.route_id)
          .maybeSingle()
        
        if (routeData) {
          busData.routes = {
            ...routeData,
            from: routeData.from_city,
            to: routeData.to_city
          }
        }
      }
      this.driverBus = busData
    }
  },

  async fetchDrivers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'driver')
      .order('full_name', { ascending: true })

    if (data) this.drivers = data
    if (error) console.error('[fetchDrivers] Error:', error)
  },

  async fetchProfile(userId) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
    if (data) this.userProfile = data
    if (error) console.error('Error fetching profile:', error)
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    this.user = data.user
    this.isAuthenticated = true

    // Load the user's profile (role, full_name, etc.)
    await this.fetchProfile(data.user.id)

    if (!this.userProfile) {
      // Auth succeeded but no profile row exists — misconfigured account
      this.user = null
      this.isAuthenticated = false
      throw new Error('Account setup incomplete. Contact your administrator.')
    }

    // Load driver-specific data
    if (this.userProfile.role === 'driver') {
      await this.fetchDriverBus().catch(() => {})
    }

    // Load drivers list now that we have an authenticated session
    await this.fetchDrivers().catch(() => {})

    return data
  },

  async signOut() {
    await supabase.auth.signOut().catch(() => {})
    this.user = null
    this.userProfile = null
    this.driverBus = null
    this.isAuthenticated = false
  },

  async fetchRoutes() {
    const { data } = await supabase.from('routes').select('*').order('created_at', { ascending: true })
    if (data) this.routes = data.map(r => ({ ...r, from: r.from_city, to: r.to_city, blockedSeats: r.blocked_seats }))
  },

  async fetchBuses() {
    const { data } = await supabase.from('buses').select('*').order('id', { ascending: true })
    if (data) this.buses = data
  },

  async fetchBookings() {
    const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
    if (data) this.bookings = data
  },

  async addBooking(bookingData) {
    const { error } = await supabase.from('bookings').insert([bookingData])
    if (error) console.error('Error adding booking:', error)
    else await this.fetchBookings()
  },

  async cancelBooking(id) {
    const b = this.bookings.find(b => b.id === id)
    if (!b) return
    const prev = b.status
    b.status = 'Canceled'
    const { error } = await supabase.from('bookings').update({ status: 'Canceled' }).eq('id', id)
    if (error) { b.status = prev; console.error('Error canceling booking:', error) }
  },

  async confirmBooking(id) {
    const b = this.bookings.find(b => b.id === id)
    if (!b) return
    const prev = b.status
    b.status = 'Confirmed'
    const { error } = await supabase.from('bookings').update({ status: 'Confirmed' }).eq('id', id)
    if (error) { b.status = prev; console.error('Error confirming booking:', error) }
  },

  async toggleBoarding(id) {
    const b = this.bookings.find(b => b.id === id)
    if (b) {
      // Optimistic update — reflect change immediately
      b.boarded = !b.boarded
      const { error } = await supabase.from('bookings').update({ boarded: b.boarded }).eq('id', id)
      if (error) {
        // Revert on failure
        b.boarded = !b.boarded
        console.error('Error toggling boarding:', error)
      }
    }
  },

  async addRoute(routeData) {
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
    if (error) console.error('Error adding route:', error)
    else await this.fetchRoutes()
  },

  async toggleRouteStatus(id) {
    const r = this.routes.find(r => r.id === id)
    if (r) {
      const prev = r.active
      r.active = !r.active
      const { error } = await supabase.from('routes').update({ active: r.active }).eq('id', id)
      if (error) { r.active = prev; console.error('Error toggling route:', error) }
    }
  },

  async toggleSeat(routeId, seatNumber) {
    const r = this.routes.find(r => r.id === routeId)
    if (r) {
      let seats = [...r.blockedSeats]
      const idx = seats.indexOf(seatNumber)
      if (idx > -1) seats.splice(idx, 1)
      else seats.push(seatNumber)
      
      const { error } = await supabase.from('routes').update({ blocked_seats: seats }).eq('id', routeId)
      if (error) console.error('Error toggling seat:', error)
    }
  },

  async addBus(busData) {
    const { error } = await supabase.from('buses').insert([busData])
    if (error) console.error('Error adding bus:', error)
    else await this.fetchBuses()
  },

  async updateRoute(id, routeData) {
    const dbData = {
      from_city: routeData.from,
      to_city: routeData.to,
      price: routeData.price,
      distance: routeData.distance || '---',
      duration: routeData.duration || '---',
    }
    const { error } = await supabase.from('routes').update(dbData).eq('id', id)
    if (error) console.error('Error updating route:', error)
    else await this.fetchRoutes()
  },

  async deleteRoute(id) {
    const { error } = await supabase.from('routes').delete().eq('id', id)
    if (error) console.error('Error deleting route:', error)
    else await this.fetchRoutes()
  },

  async deleteBus(id) {
    const { error } = await supabase.from('buses').delete().eq('id', id)
    if (error) console.error('Error deleting bus:', error)
    else await this.fetchBuses()
  },

  async updateBusStatus(id, newStatus) {
    // Optimistic update — reflect change immediately in UI
    if (this.driverBus?.id === id) {
      this.driverBus = { ...this.driverBus, status: newStatus }
    }
    const idx = this.buses.findIndex(b => b.id === id)
    if (idx !== -1) this.buses[idx] = { ...this.buses[idx], status: newStatus }

    const { error } = await supabase.from('buses').update({ status: newStatus }).eq('id', id)
    if (error) console.error('Error updating bus status:', error)
  },

  async assignRouteToBus(busId, routeId) {
    // e.target.value is always a string; empty string means "Unassigned" → send null
    const value = routeId || null
    const { error } = await supabase.from('buses').update({ route_id: value }).eq('id', busId)
    if (error) console.error('Error assigning route to bus:', error)
    else await this.fetchBuses()
  },

  async assignDriverToBus(busId, driverId) {
    // e.target.value is always a string; empty string means "Unassigned" → send null
    const value = driverId || null
    const { error } = await supabase.from('buses').update({ driver_id: value }).eq('id', busId)
    if (error) console.error('Error assigning driver to bus:', error)
    else await this.fetchBuses()
  },

  setLanguage(lang) { this.activeLang = lang }
})

export const t = (key) => {
  const lang = store.activeLang || 'en'
  const dict = store.translations[lang] || store.translations['en']
  if (key.includes('.')) {
    const [main, sub] = key.split('.')
    return dict[main]?.[sub] || store.translations['en'][main]?.[sub] || key
  }
  return dict[key] || store.translations['en'][key] || key
}
