<template>
  <div class="list container has-text-centered">
    <h1 class="title">List</h1>
    <ul v-for="mood in moods">
        <li>
            <div class="columns is-mobile">
                <div class="column is-narrow" :class=mood.value>
                    {{ mood.date.slice(0, 24) }}
                </div>
                <div class="column is-narrow" :class=mood.value>
                    {{ mood.value }}
                </div>
                <div class="column is-narrow">
                    <button v-on:click="deleteMood(mood)">&times;</button>
                </div>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import db from '../moodsDb.js'

export default {
  name: 'List',
  data() {
    return {
      moods: [],
    }
  },
  methods: {
    deleteMood: function(mood) {
      const selectedDate = this.moods[this.moods.indexOf(mood)].date
      this.moods.splice(this.moods.indexOf(mood), 1)
      db.moods.where("date").equals(selectedDate).delete()
    },
    getAllmoods: function() {
      return db.moods.toArray().then ((data) => {
        return data
      }).then ((data) => {
        this.moods = data
      })
    },
  },
  watch: {
    moods: {
      handler() {
        this.getAllmoods()
        //localStorage.setItem('moods', JSON.stringify(this.moods))
      },
      deep: true,
    }
  },
  mounted() {
    this.getAllmoods()
    //if (localStorage.getItem('moods')) this.moods = JSON.parse(localStorage.getItem('moods'));
  },
}
</script>

<style>
  .buttons .button { border: 0 }
  .sad {color: #4a89dc}
  .happy {color: #f6bb42}
  .angry {color: #da4453}
  .neutral {color: #37bc9b}
  .anxious {color: #967adc}
</style>
