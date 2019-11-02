// instance of axios file
import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://assignment-cms.firebaseio.com/'
})

export default instance;