import api from './api';

const CONTACT_BASE = '/contact';

export const contactService = {
    submitContact: async (contactData) => {
        try {
            const response = await api.post(CONTACT_BASE, contactData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default contactService;
