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
}