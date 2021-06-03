<template>
    <li>
        <div class="form-check">
            <div class="row">
                <div class="col-sm-6">
                    <label class="form-check-label">
                        <input class="checkbox" 
                               type="checkbox" 
                               :checked="checked" 
                               :disabled="checked" 
                               @change="check(todo.id)">
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
                    <div class="btn btn-sm btn-danger" @click="remove(todo.id)">
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
        methods: {
            async check (id) {
                if (this.checked) {
                    return;
                }

                await this.$request.put(`/api/todos/${id}`);

                this.$emit('update');
            },
            async remove (id) {
                await this.$request.delete(`/api/todos/${id}`);

                this.$emit('update');
            },
        },
        computed: {
            checked () {
                return this.todo.completed_at !== null;
            }
        }
    }
</script>