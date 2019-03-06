import axios from 'axios';
export default {
    async  get(url) {
        const wrapper = `http://localhost:8111/${url}`
        console.log(wrapper)
        try {
            console.log("work")
            let res = await axios.get(wrapper)
            console.log("test")
            let { data } = await res.data;
            console.log("Response")
            return data;
        } catch (e) {
            throw Error(error)
            // console.log(e)
            // return 'blah'
        }

    }

}
