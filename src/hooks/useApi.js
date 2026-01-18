import { useState, useCallback } from 'react';
import api from '../services/api';

export const useApi = (url, method = 'GET') => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(
        async (body = null, config = {}) => {
            setLoading(true);
            setError(null);
            try {
                const response = await api({
                    url,
                    method,
                    data: body,
                    ...config
                });
                setData(response.data);
                return response.data;
            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message;
                setError(errorMessage);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [url, method]
    );

    return { data, loading, error, request };
};

export default useApi;
