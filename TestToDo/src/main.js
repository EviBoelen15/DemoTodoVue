import { createApp } from 'vue'
import { createStore } from 'vuex'

import './style.css'
import App from './App.vue'
import './main.css'


const store = createStore({
    state: {
        name: "Evi",
        todos: []
    }, 
    mutations: {
        ADD_TODO(state, todo) {
            state.todos.push(todo)
        },
        REMOVE_TODO(state, payload) {
            state.todos = state.todos.filter(t => t.content !== payload)
        }, 
        CHANGE_TODO_BOX(state, payload) {
            state.todos.forEach((element) => {
                if(element.content === payload.content && element.category === payload.category) {
                    element.done = payload.done
                  }
            })
        },
        LOAD_LOCAL_TODOS(state, payload) {
            state.todos = payload
        }
        
    },
    actions: {
        addToDo(context, payload) {
            const todo = {
                content: payload.content,
                category: payload.category,
                done: false,
                createdAt: new Date().getTime()
            }
            context.commit("ADD_TODO", todo)
            localStorage.setItem('todos', JSON.stringify(todo))
        },
        removeToDo(context, payload) {
            context.commit("REMOVE_TODO", payload)
        },
        changeToDoBox(context, payload) {
            context.commit("CHANGE_TODO_BOX", payload) 
        },
        loadLocalToDos(context) {
            
            const toDoList = JSON.parse(localStorage.getItem('todos')) || []
            console.log(toDoList)
            context.commit("LOAD_LOCAL_TODOS", toDoList) 
        }
    }
})

createApp(App).use(store).mount('#app')