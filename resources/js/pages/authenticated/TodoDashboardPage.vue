<template>
    <div>
        <h3>Todo Dashboard</h3>

        <div class="card">
            <div class="card-header">
                Todos
            </div>
            <div class="card-body">
                <div class="list-wrapper">
                    <ul class="d-flex flex-column-reverse todo-list">
                        <li v-for="todo in active">
                            <div class="form-check">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <label class="form-check-label">
                                            <input class="checkbox" type="checkbox" @change="check(todo.id)">
                                            {{todo.description}} 
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
                    </ul>
                </div>
                <br>
                <div class="add-items d-flex">
                    <input type="text" class="form-control todo-list-input" 
                           v-model="text"
                           placeholder="What is planned to do?"> 
                    &nbsp;
                    <button class="add btn btn-primary font-weight-bold todo-list-add-btn" @click="add">
                        Add
                    </button>
                </div>
            </div>
        </div>

        <div class="card mt-5">
            <div class="card-header">
                Completed Todos
            </div>
            <div class="card-body">
                <div class="list-wrapper">
                    <ul class="d-flex flex-column-reverse todo-list">
                        <li v-for="todo in checked">
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input class="checkbox" type="checkbox" checked disabled>
                                    <s>
                                        {{todo.description}} 
                                    </s>
                                    <i class="input-helper"></i>
                                </label> 
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            active: [],
            checked: [],
            text: ''
        }
    },
    methods: {
        async check (id) {
            await this.$request.put(`/api/todos/${id}`);

            this.refresh();
        },
        async remove (id) {
            await this.$request.delete(`/api/todos/${id}`);

            this.refresh();
        },
        async add () {
            await this.$request.post(`/api/todos`, {
                text: this.text
            });

            this.refresh();
        },
        refresh: async function () {
            const response = await this.$request.get('/api/todos');

            const todos = {
                active: [],
                checked: [],
            };

            for (let todo of response.data.todos) {
                todos[todo.completed_at === null ? 'active' : 'checked'].push(todo);
            }

            this.active = todos.active;
            this.checked = todos.checked;
        }
    },
    mounted () {
        this.refresh();
    }
}
</script>
<style>
    .text-right {
        text-align: right;
    }
</style>