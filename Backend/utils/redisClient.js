// // File: Backend/utils/redisClient.js
// import { createClient } from "redis";

// const redisClient = createClient({
// 	url: process.env.REDIS_URL || "redis://localhost:6379",
// });

// redisClient.on("error", (err) => console.error("Redis Client Error", err));

// await redisClient.connect();

// export default redisClient;


const question_text= "-----------";
const trimmedQuestion = question_text?.trim()??null;
console.log(trimmedQuestion);