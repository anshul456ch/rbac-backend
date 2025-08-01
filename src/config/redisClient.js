const Redis = require('ioredis');

const redis = new Redis({
  host: '127.0.0.1', // because Docker maps container port to localhost
  port: 6379
});

redis.on('connect', () => {
  console.log('✅ Redis connected');
});

redis.on('error', (err) => {
  console.error('❌ Redis error:', err);
});

module.exports = redis;
