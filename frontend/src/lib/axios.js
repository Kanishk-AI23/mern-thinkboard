import axios from "axios"

//in production, ther is no localhost so we have to make this dynamic
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"
const api = axios.create({
    baseURL: BASE_URL,  
});                                        

// This code creates an axios instance with a base URL pointing to the backend API. 
// It allows you to make HTTP requests to the backend easily by using this global instance throughout your frontend application.
// This allows you to make requests to the backend without having to specify the full URL each time, making your code cleaner and easier to maintain.
                                               
