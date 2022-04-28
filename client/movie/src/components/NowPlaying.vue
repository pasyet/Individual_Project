
<template>

  <div class="home">
    <h1>Now Playing Today</h1>
    <div class="movies">
      <div class="affiche" v-for="(movie, index) in movies" :key="index">
        <div class="poster">
          <router-link :to="{name: 'Details', params: {id: movie.id}}" :key="movie.id">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="">
            <!-- <router-link :to="`/detail_nowplyaning/${movie.poster_path}`">See More</router-link> -->
            <router-view :key="$route.path"></router-view>
          </router-link>
        </div>
        <div class="title">
            <h1>{{movie.original_title}}</h1>
        </div>
      </div>   
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex"
export default {
  name: 'NowPlaying',
  computed:  
  {
    ...mapState([
      "movies"
    ])
  },
  mounted() {
    this.$store.dispatch("callMovies");
  }
}
  
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
}
.movies {
  display: flex;
  overflow-x: scroll;
  margin-bottom: 5%
}
.affiche {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin: 0px 5px;
  border-radius: 0px 0px 15px 15px;
}
.affiche .title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title h1 {
  text-align: center;
  color: black;
  font-size: 16px;
  height: 70px;
}
.poster {
  width: 200px;
  height: 300px;
  background-color: white;
  pointer-events: none;
  overflow: hidden;
}
.poster img{
  width: 200px;
  height: 300px;
  border-bottom: white 2px solid;
  z-index: 2;
  pointer-events: all;
  transition: 1.5s ease-in-out
}
.poster img:hover {
  transition: 1.5s ease-in-out;
  transform: scale(1.2);
  cursor: pointer
}
::-webkit-scrollbar {
  display: none;
}
</style>
