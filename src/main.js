import { createApp } from 'vue'
import App from './App.vue'
import { tilt, flip } from './motion'
import './style.css'

createApp(App).directive('tilt', tilt).directive('flip', flip).mount('#app')
