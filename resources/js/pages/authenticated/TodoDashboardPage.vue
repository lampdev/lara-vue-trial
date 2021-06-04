<template>
    <div>
        <h3>Todo Dashboard</h3>

        <div class="card">
            <div class="card-header">
                Todos
            </div>
            <div class="card-body">
                <div class="list-wrapper">
                    <ul class="d-flex flex-column-reverse todo-list" v-if="todos.active.length > 0">
                        <todo v-for="todo in todos.active" 
                              v-bind:key="todo.id" 
                              :todo="todo"
                              v-on:update="refresh"></todo>
                    </ul>
                    <div class="alert alert-info" v-else>
                        There are no items yet
                    </div>
                </div>
                <br>
                <div class="add-items d-flex">
                    <input type="text" class="form-control todo-list-input" 
                           v-model="itemDescription"
                           placeholder="What is planned to do?"
                           v-on:keydown.enter="add"> 
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
                    <ul class="d-flex flex-column-reverse todo-list" v-if="todos.checked.length > 0">
                        <todo v-for="todo in todos.checked" 
                              v-bind:key="todo.id" 
                              :todo="todo"
                              v-on:update="refresh"></todo>
                    </ul>
                    <div class="alert alert-info" v-else>
                        There are no completed items yet
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Todo from "@/components/Todo.vue";

export default {
    components: {
        [Todo.name]: Todo
    },
    data () {
        return {
            todos: {
                active: [],
                checked: [],
            },
            itemDescription: ''
        }
    },
    methods: {
        async add () {
            if (this.itemDescription.length === 0) {
                return;
            }

            await this.$request().post(`/api/todos`, {
                text: this.itemDescription
            });

            this.itemDescription = '';

            this.refresh();
        },
        refresh: async function () {
            const response = await this.$request().get('/api/todos');

            const todos = {
                active: [],
                checked: [],
            };

            for (let todo of response.data.todos) {
                todos[todo.completed_at === null ? 'active' : 'checked'].push(todo);
            }

            this.todos = todos;
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