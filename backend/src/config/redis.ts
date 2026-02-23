import Redis from "ioredis";

const redisClient = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379",
  {
    enableOfflineQueue: false,
    maxRetriesPerRequest: 1,
  },
);

redisClient.on("connect", () => console.log("[Redis] Connected"));
redisClient.on("error", (err: any) =>
  console.error("[Redis] Error:", err.message),
);

export default redisClient;
