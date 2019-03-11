//Wrapper for unit testing Axios - Currently Defunct
import axios from 'axios';
export default {
    get(url) {
        const wrapper = `http://localhost:8111/${url}`
        console.log(wrapper)
        return axios.get(wrapper)
    },
    then(url) {
        const wrapper = `http://localhost:8111/${url}`
        axios.get(wrapper).then((response) => {
            console.log(response.data)
        })
    }
}