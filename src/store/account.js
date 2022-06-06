export const state = () => ({
    
})

export const getters = {}

export const mutations = {}

export const actions = {
    async login({state, commit}, data){
        return await this.$auth.loginWith('local',{data})
    },
    async logout({state, commit}, data){
        return await this.$auth.logout('local')
    },
}