import api from '../api/axiosConfig';

export const axiosService = {

    getGameStatistics: async () => {
        try {
            const response = await api.get('/api/game-statistics');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getCurrentGames: async () => {
        try {
            const response = await api.get('/api/current-games');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getServerStatus: async () => {
        try {
            const response = await api.get('/api/server-status');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
