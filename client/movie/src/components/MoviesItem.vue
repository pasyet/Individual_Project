<template>
  <!-- <div class="col-3">
    <div class="card mx-auto my-2" style="max-width: 540px">
      <img
        :src="movie.imgUrl"
        class="card-img-top"
      />
      <div class="card-body card-body">
        <h5 class="card-title"><router-link :to="`/detail/${movie.id}`">{{movie.title}}</router-link></h5>
        <p class="card-text"> Rating: {{movie.rating}}</p>
        <p class="card-text"> Genre: {{movie.Genre.name}}</p>
        <a v-if="email" href="#" class="btn btn-primary" @click.prevent="addToBookmark(movie.id)"><i class="fas fa-heart fa-lg mr-2"  aria-hidden="true"></i></a>
        </div>
      </div>
    </div> -->
    
    <div class="col-md-4 col-lg-4 col-xl-4">
    <div class="card mb-2 bg-gradient-dark">
      <img class="card-img-top" :src="movie.imgUrl" :alt="movie.title" />
      <div class="card-img-overlay d-flex flex-column justify-content-end">
        <h5 class="card-title text-white font-weight-bolder">{{ movie.title }}</h5>
        <p class="card-text text-white pb-2 pt-1">{{ movie.Genre.name }}</p>
        <!-- <router-link class="text-white" :to="{ name: 'DetailNewsPage', params: { id: `${movie.id}` } }">See More</router-link> -->
        <router-link :to="`/detail/${movie.id}`">See More</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoviesItem',
  props:["movie"],
  data () {
      return {
        id : 0
      }
  },
  computed: {
    email(){
      return this.$store.state.email
    }
  },
  methods:{
    addToBookmark(id){
      console.log('movie item', id);
      this.$store.dispatch('addBookmark', id)
    }
  },
  created() {
  }
}
</script>

<style>
</style>