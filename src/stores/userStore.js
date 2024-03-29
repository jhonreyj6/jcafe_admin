import { defineStore } from "pinia";

export const userStore = defineStore('user', {
    state: () => ({
      user: null,
      access_token : null,
      profile_image: null,
    }),

    getters: {
      authUser: (state) => {
        return state.user
      },
      
      accessToken: (state) => {
        return state.access_token
      },
      
    },

    persist: true,
});