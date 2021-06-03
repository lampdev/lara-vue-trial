<template>
    <div class="row mt-5">
        <div class="col-12 col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header">
                    Register
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="loginEmail" class="form-label">Email address</label>
                        <input type="email" v-model="email" class="form-control" id="loginEmail">
                    </div>
                    <div class="mb-3">
                        <label for="loginPassword" class="form-label">Password</label>
                        <input type="password" v-model="password" class="form-control" id="loginPassword">
                    </div>
                    <div class="d-flex flex-column align-items-center">
                        <button class="btn btn-primary mb-3" 
                                v-bind:class="{'btn-disabled': !canBeRegistered}"
                                :disabled="!canBeRegistered" 
                                @click="register">
                            Register
                        </button>
                        <router-link :to="{name: 'login'}">Already have an account?</router-link>
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
        async register () {
            if (!this.canBeRegistered) {
                return;
            }

            await this.$request.get('/sanctum/csrf-cookie');

            const response = await this.$request.post('/api/register', {
                email: this.email,
                password: this.password,
            });

            if (response.errors !== undefined) {
                alert(response.message);

                return;
            } 

            window.localStorage.setItem('authToken', response.token);

            this.$router.push('/auth/todo-dashboard');
        }
    },
    computed: {
        canBeRegistered () {
            return this.email.length >= 4 &&
                   this.password.length >= 4;
        }
    }
}
</script>
