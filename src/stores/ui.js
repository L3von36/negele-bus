import { defineStore } from 'pinia'
import { supabase } from '../lib/supabase'
import { translations } from '../lib/translations'
import * as Sentry from '@sentry/vue'
import { toast } from '../lib/toast'

export const useUiStore = defineStore('ui', {
  state: () => ({
    user: null,
    userProfile: null,
    isAuthenticated: false,
    isInitialized: false,
    activeLang: localStorage.getItem('lang') || 'en',
    // We'll move the heavy translations to a separate import if needed, 
    // but for now we'll keep them accessible here.
    translations: translations
  }),

  getters: {
    t: (state) => (key) => {
      const lang = state.activeLang || 'en'
      const dict = state.translations[lang] || state.translations['en']
      if (key.includes('.')) {
        const [main, sub] = key.split('.')
        return dict[main]?.[sub] || state.translations['en'][main]?.[sub] || key
      }
      return dict[key] || state.translations['en'][key] || key
    }
  },

  actions: {
    async init() {
      if (this.isInitialized) return

      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          this.user = session.user
          this.isAuthenticated = true
          await this.fetchProfile(session.user.id)
        }
      } catch (err) {
        console.error('[uiStore.init]', err)
      } finally {
        this.isInitialized = true
      }

      supabase.auth.onAuthStateChange(async (event, session) => {
        if (session) {
          this.user = session.user
          this.isAuthenticated = true
          await this.fetchProfile(session.user.id)
        } else {
          this.user = null
          this.userProfile = null
          this.isAuthenticated = false
        }
      })
    },

    async fetchProfile(userId) {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
      if (data) this.userProfile = data
      if (error) {
        console.error('[fetchProfile]', error)
        try { Sentry.captureException(error) } catch (_) {}
      }
    },

    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      this.user = data.user
      this.isAuthenticated = true
      await this.fetchProfile(data.user.id)

      if (!this.userProfile) {
        this.signOut()
        throw new Error('Account setup incomplete. Contact your administrator.')
      }

      return data
    },

    async signOut() {
      await supabase.auth.signOut()
      this.user = null
      this.userProfile = null
      this.isAuthenticated = false
    },

    setLanguage(lang) {
      this.activeLang = lang
      localStorage.setItem('lang', lang)
    }
  }
})
