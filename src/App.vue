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
import db from '@/firebase/init'

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
        db.collection('items').add({
          title: this.input,
          isCompleted: false
        })
        // eslint-disable-next-line
        .catch(console.log)
        this.input = null
        this.feedback = null
      } else {
        this.feedback = 'Please input a new todo!'
      }
    },
    deleteAll() {
      let ref = db.collection("items")
      this.todoItems.forEach(deleteItem => {
        ref.doc(deleteItem.id).delete()
          .then(() => {
            this.todoItems.filter(item => {
              return item.id !== deleteItem.id
            })
          })
          // eslint-disable-next-line
          .catch(console.log);
      })
    },
    onTodoToggled(newTodoItem) {
      db.collection('items').doc(newTodoItem.id).update({
          isCompleted:  !newTodoItem.isCompleted
        })
        .then(() => {
          this.todoItems.forEach(todoItem => {
            if (todoItem.id === newTodoItem.id) {
              todoItem.isCompleted =  !newTodoItem.isCompleted
            } 
          })
        })
        // eslint-disable-next-line
        .catch(console.log)
    }
  },
  created() {
    db.collection('items').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          // eslint-disable-next-line
          console.log(change.type, change)
          if (change.type == 'added') {
            let item = change.doc.data()
            item.id = change.doc.id
            this.todoItems.push(item)
          }
        })
      })
  }
}
</script>

<style>
</style>
