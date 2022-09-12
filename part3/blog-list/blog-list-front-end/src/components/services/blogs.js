import axios from 'axios';

const baseUrl='/api/blogs';

const createBlog=(newBlog)=>{
   return axios.post(baseUrl,newBlog)
    .then(response=>response.data)
}
export default {
    createBlog
}