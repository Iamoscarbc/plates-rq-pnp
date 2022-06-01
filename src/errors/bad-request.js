export class BadRequestError {
    constructor(data, status) {
        this.data = data
        this.status = status
    }
}