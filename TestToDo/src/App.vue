<template>

  <main class="app">

    <section class="greeting">

      <h2 class="title">
        whats up, {{name}} <!--<input type="text" placeholder="Your name here" v-model="name" />-->
      </h2>

    </section>

    <section class="create-todo">
      <h3>CREATE A TO DO ITEMm</h3>

      <form @submit.prevent="addToDo">
        <h4>Whats on your to do list?</h4>

        <input type="text" placeholder="e.g Make a video" v-model=input_content />

        <h4>Pick a category</h4>
        <div class="options">
          <label>
            <input type="radio" name="category" value="business" v-model="input_category" />
            <span class="bubble business"></span>
            <div>Business</div>
          </label>
          <label>
            <input type="radio" name="category" value="personal" v-model="input_category" />
            <span class="bubble personal"></span>
            <div>personal</div>
          </label>
        </div>

        <input type="submit" value="Add to do" />

      </form>

    </section>

    <section class="todo-list">
      <h3>TO DO LIST</h3>
      <div class="list">

        <div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`">

          <ToDoItem v-model="todo.done" :category="todo.category" :content="todo.content"
            @removeToDo="$store.dispatch('removeToDo', todo.content)"></ToDoItem>
        </div>

      </div>
    </section>

  </main>

</template>


<script>
import ToDoItem from '../components/ToDoItem.vue';

export default {
  name: 'App',
  components: {
    ToDoItem
  },
  data() {
    return {
      input_content: "",
      input_category: "",
      todoCheck: false
    }
  },
  methods: {
    addToDo() {
      if (this.input_content.trim() === '' || this.input_category === null) {
        return
      }
      this.$store.dispatch("addToDo", {content: this.input_content, category: this.input_category})
      this.input_content = ''
      this.input_category = null
    },

    removeToDo(content) {
      this.todos = this.todos.filter(t => t.content !== content)
    },

    changeToDoBox(toDoObject) {
      console.log(toDoObject)
      this.todos.forEach((element) => {
        if(element.content === toDoObject.content && element.category === toDoObject.category) {
          element.done = toDoObject.done
        }
      })
    },
  },
  computed: {
    todos_asc() {
      return this.$store.state.todos.sort((a, b) => b.createdAt - a.createdAt)
    },
    name() {
      return this.$store.state.name
    }
  },
  watch: {
    todos: {
      handler: function (newTodo) {
        localStorage.setItem('todos', JSON.stringify(newTodo))
      },
      deep: true
    }
  },
  mounted() {
    this.$store.dispatch("loadLocalToDos")
  }
}
</script>