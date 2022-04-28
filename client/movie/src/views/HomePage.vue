<template>
<div>
  <Header></Header>
  <MoviesList> </MoviesList>
</div>
</template>

<script>
import MoviesList from '../components/MoviesList.vue'
import Header from '../components/NowPlaying.vue'
export default {
  name: 'HomePage',
  components: {
    MoviesList,
    Header
  }
}
</script>
<style>
body {
  background-color: #F2D2BD;
}
</style>