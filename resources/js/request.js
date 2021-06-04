export default {
    install (Vue, options) {
        Vue.prototype.$request = () => {
            const auth = window.localStorage.getItem('authToken');

            const config = {
                withCredentials: true,
            };

            if (auth !== null) {
                config.headers = {
                    Authorization: `Bearer ${auth}`
                }
            }

            const client = axios.create(config);

            client.interceptors.response.use(
                response => {
                    return response;
                },
                error => {
                    if (error.response.status === 401 || error.response.status === 419) {
                        window.localStorage.removeItem('authToken');
                    }

                    return Promise.reject(error.response);
                }
            );

            return client;
        };
    }
};