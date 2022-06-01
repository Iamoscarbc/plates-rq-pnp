import { BadRequestError, NotFoundError, UnknownError } from '@/errors'

export default ({ $axios, store }) => {
    $axios.onRequestError(err => {
        throw err
    })

    $axios.onResponseError(err => {
        const { data, status } = err.response
        switch (status) {
            case 400:
                throw new BadRequestError(data, status)
                break;
            case 404:
                throw new NotFoundError(data, status)
                break;
            default:
                throw new UnknownError(data, status)
        }
    })
}