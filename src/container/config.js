if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

export default {
  PORT: process.env.PORT || 4000,

  // database mongodb
  DB_USER_MONGO: process.env.DB_USER_MONGO,
  DB_KEY_MONGO: process.env.DB_KEY_MONGO,
  DB_HOST_MONGO: process.env.DB_HOST_MONGO,
  DB_CONTAINER_NAME_MONGO: process.env.DB_CONTAINER_NAME_MONGO,
  DB_COLLECTION_NAME_MONGO: process.env.DB_COLLECTION_NAME_MONGO,

  // proxies
  DATTEBAYO_CLIENT_BASE_URL: process.env.DATTEBAYO_CLIENT_BASE_URL,
};
