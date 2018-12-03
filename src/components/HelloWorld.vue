<template>
  <section class="hero is-fullheight">
    <div class="hero-head">
      <header class="navbar">
        <div class="container">
          <Slide right>
            <a class="navbar-item is-active">
              <router-link to="/">Home</router-link>
            </a>
            <a class="navbar-item">
              <router-link to="/list">List</router-link>
            </a>
            <a class="navbar-item">
              <router-link to="/grid">Grid</router-link>
            </a>
          </Slide>
        </div>
      </header>
    </div>

    <div class="hero-body">
      <router-view />
    </div>

    <div class="hero-foot">
      <nav class="tabs is-boxed is-fullwidth">
      </nav>
    </div>

  </section>
</template>


<script>
import db from '../moodsDb.js'
import Current from './CurrentMood.vue'
import { Slide } from 'vue-burger-menu'  // import the CSS transitions you wish to use, in this case we are using `Slide`

export default {
  components: {
    Slide
  },
  name: 'HelloWorld',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .bm-menu {
    background-color: #ffffff;
    opacity: 0.7;
  }
  .bm-overlay {
    background:#ffffff;
  }
  .bm-item-list {
    font-size: 1rem;
  }
</style>
