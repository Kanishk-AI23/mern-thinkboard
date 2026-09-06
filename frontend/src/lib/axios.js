import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5001/api",  //This sets the base URL for all requests made using this axios instance to the backend API.
});                                        //We didn't use the full URL in every request, instead we can just use the endpoint (like "/notes", "/users") and axios will automatically prepend the base URL.
export default api;

// This code creates an axios instance with a base URL pointing to the backend API. 
// It allows you to make HTTP requests to the backend easily by using this global instance throughout your frontend application.
// This allows you to make requests to the backend without having to specify the full URL each time, making your code cleaner and easier to maintain.
                                               
