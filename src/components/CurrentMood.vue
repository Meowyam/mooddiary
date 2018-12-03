<template>

    <div class="container has-text-centered">

        <h1 class="title">
        How are you feeling now?
        </h1>
        <div v-if="this.currentMood">
            <font-awesome-icon v-if="this.currentMood.icon" :icon="['fas', this.currentMood.icon]" :class=this.currentMood.value size=6x />
        </div>
        <div v-if="this.currentMood" :class="['currentmood',this.currentMood.value]">
            {{this.currentMood.value}}
        </div>
        <div class="columns buttons is-mobile is-centered">
            <div class="column moodEmoji">
                <button v-on:click="addMood('neutral')" class="button is-large">
                <font-awesome-icon icon="meh-blank" size="lg" class="neutral" />
                <div class="moodTag neutral">neutral</div>
                </button>
            </div>
            <div class="column moodEmoji">
                <button v-on:click="addMood('happy')" class="button is-large">
                <font-awesome-icon icon="smile" size="lg" class="happy" />
                <div class="moodTag happy">happy</div>
                </button>
            </div>
            <div class="column moodEmoji">
                <button v-on:click="addMood('sad')" class="button is-large">
                <font-awesome-icon icon="frown" size="lg" class="sad" />
                <div class="moodTag sad">sad</div>
                </button>
            </div>
            <div class="column moodEmoji">
                <button v-on:click="addMood('anxious')" class="button is-large">
                <font-awesome-icon icon="frown-open" size="lg" class="anxious" />
                <div class="moodTag anxious">anxious</div>
                </button>
            </div>    
            <div class="column moodEmoji">    
                <button v-on:click="addMood('angry')" class="button is-large">
                <font-awesome-icon icon="angry" size="lg" class="angry" />
                <div class="moodTag angry">angry</div>
                </button>
            </div>

        </div>
    </div>

</template>

<script>
import db from '../moodsDb.js'

export default {
  name: 'CurrentMood',
  data() {
    return {
      moods: [],
      currentMood: [],
    }
  },
  methods: {
    addMood(mood) {
      let today = Date()
      let icon
      if (mood == 'neutral') {
        icon = 'meh-blank'
      } else if (mood == 'happy') {
        icon = 'smile'
      } else if (mood == 'sad') {
        icon = 'frown'
      } else if (mood == 'anxious') {
        icon = 'frown-open'
      } else if (mood == 'angry') {
        icon = 'angry'
      }
      this.moods.push({date: today, value: mood, icon: icon})
      db.moods.add({date: today, value: mood, icon: icon})
    },
    deleteMood(mood) {
      const selectedDate = this.moods[this.moods.indexOf(mood)].date
      console.log(selectedDate)
      this.moods.splice(this.moods.indexOf(mood), 1)
      db.moods.where("date").equals(selectedDate).delete()
    },
    async getAllmoods() {
      const data = await db.moods.toCollection().sortBy('date')
      console.log('all ', data)
      /*return db.moods.sortBy('value').then ((data) => {
        return data
      }).then ((data) => {
        console.log('all ', data)
      })*/
    },
    async getLastmood() {
      const latestDate = await db.moods.orderBy('date').last()
      console.log('last ', latestDate)

      if (latestDate) {
        this.currentMood = latestDate
      } else {
        this.currentMood = {date: new Date(), value: 'neutral', icon: 'meh-blank'}
      }
      /*return db.moods.orderBy('date').last ((data) => {
        return data
      }).then ((data) => {
        if (data) {
          this.currentMood = data
        } else {
          this.currentMood = {date: new Date(), value: 'neutral', icon: 'meh-blank'}
        }

      })*/
    }
  },
  watch: {
    moods: {
      handler() {
        this.getLastmood()
        //localStorage.setItem('moods', JSON.stringify(this.moods))
      },
      deep: true,
    }
  },
  mounted() {
    console.log('App mounted!')
    this.getAllmoods()
    this.getLastmood()
    //if (localStorage.getItem('moods')) this.moods = JSON.parse(localStorage.getItem('moods'));
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .currentmood {
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
  }
  .moodEmoji button { display: block !important }
  .buttons .button { border: 0 }
  .sad {color: rgb(74,137,220)}
  .happy {color: rgb(246,187,66)}
  .angry {color: rgb(218,68,83)}
  .neutral {color: rgb(55,188,155)}
  .anxious {color: rgb(150,122,220)}
</style>
