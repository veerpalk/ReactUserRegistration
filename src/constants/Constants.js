//export const API_URL = process.env.BACKEND_APP_API_URL || 'http://localhost:9090'; 
// BACKEND_APP_API_URL: https://adsologist-api.onrender.com
export const API_URL = process.env.NODE_ENV === 'production' ? 'https://adsologist-api.onrender.com' : 'http://localhost:9090';
