
<template>
  <label>
    <input 
    type="checkbox" 
    :checked="modelValue" 
    @change="editToDoBox($event.target)" />

    <span :class="`bubble ${category}`"></span>
  </label>

  <div class="todo-content">
    <input type="text" :value="content" />
  </div>

  <div class="actions">
    <button class="delete" @click="removeToDoItem">Delete</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLocalDone: false
    }
  },
  methods: {
    removeToDoItem() {
      this.$emit('removeToDo')
    },
    editToDoBox(targetValue) {
      /*
      this.$emit('changeToDoBox', {
        done: this.isLocalDone,
        content: this.content,
        category: this.category
      })*/
      
      console.log(targetValue.checked)
      console.log(targetValue.value)
      
      this.$emit('update:modelValue', targetValue.checked)
    }
  },
  props: {
    done: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }, 
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ["removeToDo", "update:modelValue"],
  mounted() {
    this.isLocalDone = this.done
    }
}
</script>
