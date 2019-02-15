import axios from 'axios';
export default {
    get(url) {
        const proxyUrl = `http://localhost:8111/${url}`
        console.log(proxyUrl)
        return axios.get(proxyUrl)

    }
}