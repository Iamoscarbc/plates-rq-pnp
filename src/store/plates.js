import PlatesService from '@/services/Plates.service.js'
export const state = () => ({
    
})

export const getters = {}

export const mutations = {}

export const actions = {
    async getIsPlatesRQ({state, commit}, data){
        let res = await PlatesService.verifyPlates(this.$axios, data)
        let mapper = res.results.map( x => x.plate.substring(0, 3) + '-' + x.plate.substring(3, 6))
        res.plates = mapper
        return await PlatesService.getIsPlatesRQ(this.$axios, res)
    },
}