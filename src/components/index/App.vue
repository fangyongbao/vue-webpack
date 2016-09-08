<template>
  <div class="g-body">
      <header-com></header-com>
      <div class="g-main">
    	    <game-com></game-com>
      </div>
  </div>
</template>

<script>
import headerCom from '../common/headerCom'
import gameCom from './game/gameCom'

export default {
  components: {
    headerCom,
    gameCom
  }
}
</script>

<style lang="sass">
html, body{height: 100%;}
.g-body{
  height: 100%;position: relative;overflow: hidden;
  .g-main{
  	position: absolute;top: 44px;bottom: 0;left: 0;right: 0;width: 100%; 
  }
}
</style>
