export const successResponse = (res, statusCode, message, data = null) => {
    const response = {
        success: true,
        message,
        ...(data && { data })
    };
    res.status(statusCode).json(response);
};

export const errorResponse = (res, statusCode, message, errors = null) => {
    const response = {
        success: false,
        message,
        ...(errors && { errors })
    };
    res.status(statusCode).json(response);
};
