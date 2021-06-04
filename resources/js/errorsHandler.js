export default {
    install (Vue, options) {
        Vue.prototype.$errorMessage = (errors) => {
            const message = [];

            for (let field in errors) {
                message.push(...errors[field]);
            }

            return message.join(', ');
        }
    }
}