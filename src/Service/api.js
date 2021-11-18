import axios from "axios";

// axios.defaults.withCredentials = true

export const api = {

    async login(formData) {
        try {
            const response = await axios.post('https://api.demo.cargo-speed.pl/demo/api/v1/login/access_token',
                `grant_type=password&username=${formData.username}&password=${formData.password}`)
            return response
        } catch (e) {
            return e.response
        }
    },

    async getOrders() {
        const token = sessionStorage['accessToken']
        try {
            const response = await axios.get('https://api.demo.cargo-speed.pl/demo/api/v1/orders/many', {headers: {"Authorization": `Bearer ${token}`}})
            return response
        } catch (e) {
            return e.response
        }
    }
}