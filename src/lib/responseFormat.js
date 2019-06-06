class ResponseFormat {
    constructor() {
        this.statusCode = {
            SUCCESS: 200,
            CREATED: 201,
            NO_CONTENT: 204,
            CONFLICT: 409,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            PRECONDITION_FAILED: 412,
            NOT_FOUND: 404,
            INTERNAL_SERVER_ERROR: 500,
            SERVICE_UNAVAILABLE: 503,
            UNPROCESSABLE_ENTITY: 422
        };
    }

    getResponseObject(type, code, message, data, infoObj) {
        let resObject = {
            status: type,
            status_code: code,
            message: message
        };
        if (infoObj) {
            if (infoObj.total_count || infoObj.total_count == 0) {
                resObject.total_count = infoObj.total_count;
                if (infoObj.fetched_count) {
                    resObject.fetched_count = infoObj.fetched_count;
                }
            }
        }
        if (data) {
            resObject.data = data;
        }
        return resObject;
    }

    getSocketResponseObject(status, to, type, data) {
        let resObject = {
            status: status,
            to: to,
            type: type,
            data: data,
            socketAcknowledgement: true
        }
        return resObject;
    }

}

export default new ResponseFormat();