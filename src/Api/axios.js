import axios from "axios";

const axiosInstance=axios.create({
    // local instance of firebase functions
    // baseURL:"http://127.0.0.1:5001/clone-82725/us-central1/api"

    // deployed version of firebase functions
    baseURL:"https://api-7a46szjjhq-uc.a.run.app/"


    // deployed version of amazon server on render.com
    // baseURL:"https://amazon-clone-deploy.onrender.com/"
})

export {axiosInstance}