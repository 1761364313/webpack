<template>
  <div class="home">
    <p class="wb">hello word</p>
    <p class="ss">wellcome to beijing</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  created() {
    this.ss()
    this.dd()
    this.ax()
  },
  methods: {
    ax() {
      axios.create({        
        withCredentials: true
      })  
      axios.get('/api/yunjiuserapp/userapp/member/memberInfo.json?appCont=1').then(res => {
        console.log(res);
      })
    },
    ss() {
      setTimeout(() => {
        console.log(1111);
        console.log(22222);
      }, 1000)
    },
    dd() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(1212122)
          resolve(true)
        }, 1000)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .home{
    width 100%
    height 200px
    background #ff9900
    display flex
    justify-content space-between
    padding 20px
    .wb{
      color #fff
      font-size 20px
    }
  }
</style>