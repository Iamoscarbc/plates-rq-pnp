const base = '/api/info-plate'
export default {
    verifyPlates: ($axios, data) => {
        return $axios.$post(`https://api.platerecognizer.com/v1/plate-reader/`, data, {
            headers: {
              Authorization: "Token a4e1dcaa4dc604b05ef59a8b63ef030e839edcf7",
            },
        })
    },
    getIsPlatesRQ: ($axios, data) => {
        return $axios.$post(`${base}/filter`, data)
    },
    getRegisters: ($axios) => {
        return $axios.$get(`${base}/all`)
    },
    putRegisterId: ($axios, id) => {
        return $axios.$put(`${base}/register/${id}`)
    },
    getGraphicEfficacyLevel: ($axios, date) => {
        return $axios.$get(`${base}/lvlefficacy/${date}`)
    },
    getGraphicProductivityLevel: ($axios, date) => {
        return $axios.$get(`${base}/lvlproductivity/${date}`)
    },
}