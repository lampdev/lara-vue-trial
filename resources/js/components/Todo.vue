<template>
    <li>
        <div class="form-check">
            <div class="row">
                <div class="col-sm-6">
                    <label class="form-check-label">
                        <input class="checkbox" 
                               type="checkbox" 
                               :checked="checked" 
                               v-model="status"
                               @change="check">
                        <s v-if="checked">
                            {{todo.description}}
                        </s>
                        <span v-else>
                            {{todo.description}}
                        </span> 
                        <i class="input-helper"></i>
                    </label> 
                </div>
                <div class="col-sm-6 text-right">
                    <div class="btn btn-sm btn-danger" @click="remove">
                        delete
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>
<script>
    export default {
        name: 'todo',
        props: ['todo'],
        data () {
            return {
                status: false
            }
        },
        methods: {
            async check () {
                await this.$request().put(`/api/todos/${this.todo.id}`, {
                    status: this.status
                });

                this.$emit('update');
            },
            async remove () {
                await this.$request().delete(`/api/todos/${this.todo.id}`);

                this.$emit('update');
            },
        },
        computed: {
            checked () {
                return this.todo.completed_at !== null;
            }
        },
        created () {
            this.status = this.checked;
        }
    }
</script>