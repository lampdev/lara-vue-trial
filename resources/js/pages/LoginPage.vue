<template>
    <div class="row mt-5">
        <div class="col-12 col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header">
                    Login
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="loginEmail" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="loginEmail" v-model="email">
                    </div>
                    <div class="mb-3">
                        <label for="loginPassword" class="form-label">Password</label>
                        <input type="password" class="form-control" id="loginPassword" v-model="password">
                    </div>
                    <div class="d-flex flex-column align-items-center">
                        <button class="btn btn-primary mb-3"
                                @click="login"
                                v-bind:class="{'btn-disabled': !canBeLogged}"
                                :disabled="!canBeLogged">
                            Login
                        </button>
                        <router-link :to="{name: 'register'}">Don't have an account?</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login () {
            if (!this.canBeLogged) {
                return;
            }

            await this.$request.get('/sanctum/csrf-cookie');

            const response = await this.$request.post('/api/login', {
                email: this.email,
                password: this.password,
            });

            const data = response.data;

            if (data.errors !== undefined) {
                alert(data.message);

                return;
            } 

            if (data.token === undefined || response.status !== 200) {
                alert('Something went wrong. Please try to reload page');

                return;
            }

            window.localStorage.setItem('authToken', data.token);

            this.$router.push('/auth/todo-dashboard');
        }
    },
    computed: {
        canBeLogged () {
            return this.email.length >= 4 &&
                   this.password.length >= 4;
        }
    }
}
</script>
