<template>
    <div class="grid container has-text-centered">
      <h1 class="title">Grid</h1>
      <div class="thisYear has-text-centered">
        <h2 class="subtitle">{{year}}</h2>
      </div>
      <div class="columns">
        <div class="column" v-for="month in months">                         
          {{month.name}}
          <div v-for="n in month.days">
            <ul>
              <li class="blank">
                {{ n }}
              </li>
            </ul>
            <div v-for="mood in moodArr" class="moods" v-if="mood.month == month.name && mood.day == n && mood.year == year">
              <div class="heart" v-if="mood.month == month.name && mood.day == n && mood.year == year">
                <font-awesome-icon icon="heart" size="lg" :style="{'color':'rgb('+mood.value[0] + ',' + mood.value[1] +',' + mood.value[2]+')'}" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import db from '../moodsDb.js'

export default {
  name: 'Grid',
  data() {
    return {
      moodArr: [],
      blank: true,
      year: new Date().getFullYear(),
      months: [
          {name: 'Jan', days: 31},
          {name: 'Feb', days: 28},
          {name: 'Mar', days: 31},
          {name: 'Apr', days: 30},
          {name: 'May', days: 31},
          {name: 'Jun', days: 30},
          {name: 'Jul', days: 31},
          {name: 'Aug', days: 31},
          {name: 'Sep', days: 30},
          {name: 'Oct', days: 31},
          {name: 'Nov', days: 30},
          {name: 'Dec', days: 31}
        ],
      daysInmonths: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    }
  },
  methods: {
    deleteMood: function(mood) {
      const selectedDate = this.moods[this.moods.indexOf(mood)].date
      this.moods.splice(this.moods.indexOf(mood), 1)
      db.moods.where("date").equals(selectedDate).delete()
    },
    sortMoods: function() {
      return db.moods.orderBy('date').toArray().then ((data) => {
        return data
      }).then ( data => {
        const moodArray = []

        data.forEach(function (mood, index) {
            const sad = [ 74, 137, 220 ]
            const happy = [ 246, 187, 66 ]
            const angry = [ 218, 68, 83 ]
            const neutral = [ 55, 188, 155 ]
            const anxious = [ 150, 122, 220 ]

            let l = moodArray.length -1
            let month = mood.date.slice(4,7)
            let day = mood.date.slice(8,10)
            let year = mood.date.slice(11,15)
            let value = eval(mood.value)

            if (((l+1) > 0) && (month == moodArray[l].month && day == moodArray[l].day && year == moodArray[l].year)) {

              [...Array(2)].forEach((_, x) => {
                value[x] = Math.floor(Math.sqrt(((Math.pow(eval(value[x]), 2) + Math.pow(eval(moodArray[l].value[x]), 2)))/2))
              })
/*
              value[0] = Math.floor(Math.sqrt(((Math.pow(eval(value[0]), 2) + Math.pow(eval(m[l].value[0]), 2)))/2))
              value[1] = Math.floor(Math.sqrt(((Math.pow(eval(value[1]), 2) + Math.pow(eval(m[l].value[1]), 2)))/2))
              value[2] = Math.floor(Math.sqrt(((Math.pow(eval(value[2]), 2) + Math.pow(eval(m[l].value[2]), 2)))/2))
*/             
              moodArray.splice(l,1,{
                  month: month,
                  day: day,
                  year: year,
                  value: value
              })

            } else {
              moodArray.push({
                  month: month,
                  day: day,
                  year: year,
                  value: value
              })
            }
        })
        this.moodArr = moodArray
      })
    }
  },
  watch: {
    moods: {
      handler() {
        this.sortMoods()
      },
      deep: true,
    }
  },
  mounted() {
    this.sortMoods()
  },
}
</script>

<style>
  .buttons .button { border: 0 }
  ul { font-size: 0.8rem; margin: 0.2rem; }
  .heart { display: flex; position: relative; z-index: 10; margin-top: -1.5rem }
  .blank { color: rgb(170,170,170); position: relative; z-index: 30 }
  .thisYear { margin: 1.5rem 0 }
  svg {margin: auto}
</style>