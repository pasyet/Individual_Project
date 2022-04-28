<template>
  <div class="movie" v-if="movie">
    <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="">
    <div>
      <h1>{{movie.original_title}}</h1>
      <p>{{movie.overview}}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    name: "Details",
    computed:  
    {
    ...mapState([
      "movies"
    ]),
    movie(){
      return this.movies.find(
        movie => movie.id == this.id
      )
      
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  mounted() {
    this.$store.dispatch("callMovies");
  }
}
</script>

<style scoped>
.movie {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 0 5%
}
.movie img{
  height: 75%
}
.movie h1 {
  padding: 1% 20%;
  text-decoration: underline;
  font-size: 50px;
  font-weight: bold;
  text-align: center;
}
.movie p {
  padding: 5% 15%;
  font-size: 25px;
  text-align: left;
}