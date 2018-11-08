<template>
  <div id="app">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <h4 class="title center-align">TO DO LIST</h4>
        <form @submit.prevent="addTodo">
          <input type="text" name="text" v-model="input">
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
        </form>
        <a @click="deleteAll" class="waves-effect waves-light btn-small right">DELETE</a>
        <Todo 
          :todoItems="todoItems"
          @todo-toggled="onTodoToggled" />
      </div>
    </div>
  </div>
</template>

<script>
import Todo from '@/components/Todo'

export default {
  name: 'app',
  components: {
    Todo
  },
  data() {
    return {
      todoItems: [],
      input: null,
      feedback: null,
    }
  },
  methods: {
    addTodo() {
      if (this.input) {
        // create a new todo item
        let newTodoItem = {
          title: this.input,
          isCompleted: false,
          id: this.todoItems.length + 1
        }
        // add to array
        this.todoItems.push(newTodoItem)
        this.input = null
        this.feedback = null
      } else {
        this.feedback = 'Please input a new todo!'
      }
    },
    deleteAll() {
      this.todoItems.splice(0, this.todoItems.length);
    },
    onTodoToggled(newTodoItem) {
      this.todoItems.forEach(todoItem => {
        if (todoItem.id === newTodoItem.id) {
          todoItem.isCompleted =  !todoItem.isCompleted
        } 
      })
    }
  },
  created() {
    this.todoItems = [
      { title: 'Vue Practice', isCompleted: true, id: '1'},
      { title: 'Using firebase to deploy application', isCompleted: false, id: '2'},
      { title: 'Upload codes to github', isCompleted: true, id: '3'}
    ]
  }
}
</script>

<style>
</style>
