<template>
  <div class="todo">
    <h5>Items</h5>
    <ul>
      <p v-for="item in items" :key="item.id" @click.prevent="toggleItem(item)">
        <label>
          <input type="checkbox" :checked="item.isCompleted"/>
          <span>{{ item.title }}</span>
        </label>
      </p>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    todoItems: Array
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
    toggleItem(item) {
      this.$emit('todo-toggled', item)
    }
  },
  mounted() {
    this.items = this.todoItems
  }
}
</script>

<style>
html, input {
  font-family: 'Lato', sans-serif;
}
</style>
