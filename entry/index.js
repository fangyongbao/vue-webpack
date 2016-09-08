import Vue from 'vue'
import VueResource from 'vue-resource'
import 'common.scss'
import App from '../src/components/index/App'

Vue.use(VueResource)

new Vue({
	el: 'body',
	components: { App }
})
