import ratelimit from "../config/upstash.js";   


const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit(req.ip); //This line calls the 'limit' method of the 'ratelimit' instance, passing the client's IP address (req.ip) as an argument. The 'limit' method checks if the client has exceeded the allowed number of requests within the specified time window. It returns an object containing a 'success' property, which indicates whether the request is allowed (true) or rate-limited (false). This ensures that one heavy testers (identefied by their IP address) get locked out for a certain time period, preventing them from overwhelming the server with too many requests in a short time frame. While other users can continue to use the API normally. This is a common technique used to protect APIs from abuse and maintain server performance.
        if (!success) {
            return res.status(429).json({ message: "Too many requests, please try again later." });
        }
        next();
    
    
    } catch (error){
        console.error("Error in rate limiter middleware:", error);
        next(error); // Pass the error to the next middleware for handling
    }
 

}

export default rateLimiter;
