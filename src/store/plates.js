import PlatesService from '@/services/Plates.service.js'
export const state = () => ({
    
})

export const getters = {}

export const mutations = {}

export const actions = {
    async getIsPlatesRQ({state, commit}, data){
        let res = await PlatesService.verifyPlates(this.$axios, data)
        return await PlatesService.getIsPlatesRQ(this.$axios, res.results)
    },
    async getRegisters({state, commit}){
        return await PlatesService.getRegisters(this.$axios)
    }
}