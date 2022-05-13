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
    },
    async putRegisterId({state, commit}, data){
        return await PlatesService.putRegisterId(this.$axios, data)
    },
    async getGraphicEfficacyLevel({state, commit}, data){
        return await PlatesService.getGraphicEfficacyLevel(this.$axios, data)
    },
    async getGraphicProductivityLevel({state, commit}, data){
        return await PlatesService.getGraphicProductivityLevel(this.$axios, data)
    }
}