<template>
  <div class="home">
    this is home 
    <p class="ss">wellcome to beijing</p>
  </div>
</template>

<script>
export default {
  name: 'home',
  created() {
    this.ss()
  },
  methods: {
    ss() {
      setTimeout(() => {
        console.log(1111);
      }, 1000)
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
  }
</style>