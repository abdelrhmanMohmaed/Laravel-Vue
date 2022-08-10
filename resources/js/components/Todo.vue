<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        TODO
                    </div>

                    <div class="card-body">
                        <div class="input-group">
                            <input type="text" placeholder="TODO" class="form-control" aria-label="todo"
                                aria-describedby="todo" v-model="todo_input" />
                            <div class="input-group-append">
                                <button v-if="!edit_todo_id" type="button" class="btn btn-info text-white"
                                    @click="saveTodo()">ADD</button>
                                <button v-else type="button" class="btn btn-info text-white" @click="updateTodo()">
                                    Update
                                </button>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-danger float-end" type="submit" @click="resetTodo()">
                            Reset
                        </button>
                        <table class="table table-striped table-hover mt-4">
                            <thead>
                                <th>S.no</th>
                                <th>Name</th>
                                <th>Active</th>
                            </thead>
                            <tbody>
                                <tr v-for="(todo, index) in todos" :key="index">
                                    <td>{{ ++index }}</td>
                                    <td>{{ todo.name }}</td>
                                    <td>
                                        <button class="btn btn-sm btn-info " type="submit" @click="editTodo(--index)">
                                            Edit
                                        </button>
                                        <button class="btn btn-sm btn-danger" type="submit"
                                            @click="deleteTodo(--index)">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            todos: [],
            api: 'http://127.0.0.1:8000/api/todos',
            todo_input: '',
            edit_todo_id: '',
            edit_index: '',
        }
    },
    mounted() {
        this.axios.get(this.api).then((response) => {
            this.todos = response.data
            console.log(response.data)
        })
        console.log("Component mounted.");
    },
    methods: {
        saveTodo() {
            if (this.todo_input.length > 0) {
                let data = { 'name': this.todo_input };
                this.axios.post(this.api, data).then((response) => {
                    this.todos.push(response.data);
                    this.todo_input = ' ';
                    // console.log(response.data);
                })
            }
        },
        deleteTodo(index) {
            let id = this.todos[index].id;
            if (id) {
                this.axios.delete(this.api + "/" + id).then((response) => {
                    let data = this.todos.splice(index, 1);
                    // console.log(data);
                });
            }
        },
        editTodo(index) {
            let edit_todo_id = this.todos[index].id;
            if (edit_todo_id) {
                this.todo_input = this.todos[index].name;
                this.edit_todo_id = edit_todo_id;
                this.edit_index = index
            }
            // console.log(edit_todo_id);
        },
        updateTodo() {
            if (this.todo_input.length > 0) {
                let data = { 'name': this.todo_input };
                this.axios.patch(this.api + '/' + this.todos[this.edit_index].id, data).then((response) => {

                    this.todos[this.edit_index].name = response.data['name'];
                    this.resetTodo();
                    // console.log(response.data);
                })
            }
        },
        resetTodo() {
            this.todo_input = '';
            this.edit_index = '';
            this.edit_todo_id = '';
        }
    },
};
</script>
