<template>
    
  <div class="container">
      <h1 class="text-center mb-3">Movies</h1>
    <div>
      <form @submit.prevent="search">
        <div class="form-group has-search">
            <span class="fa fa-search form-control-feedback"></span>
            <input type="text" class="form-control" placeholder="Search" v-model="query.title">
        </div>

        <select
          class="form-select form-select-lg col-md-4"
          aria-label="Genre Search"
          v-model="query.genre"
        >
          <option value=""><label>Choose Genre Movie</label></option>
          <option value="Horror">Horror</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
          <option value="Sci-Fiction">Sci-Fiction</option>
        </select>
        <br />
        <br />
        <button class="btn btn-outline-secondary col-sm-1" type="submit">
          Search
        </button>
      </form>
      <hr/>
    </div>
    <div class="row justify-content-start">
      <MoviesItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      ></MoviesItem>
    </div>
    <br />
    <center>
      <div v-if="this.query.clear === true">
        <a href="" @click.prevent="clearSearch">Clear Search</a>
      </div>
    </center>
    <br /><br /><br />
    <nav aria-label="Page navigation example" v-if="movies.length !== 0">
      <ul class="pagination justify-content-center" v-if="totalPage > 0">
        <li class="page-item" v-for="page in totalPage" :key="page">
          <a class="page-link" href="#" @click.prevent="nextPage(page)">{{
            page
          }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import MoviesItem from "./MoviesItem.vue";

export default {
  name: "MoviesList",
  components: {
    MoviesItem,
  },
  data() {
    return {
      query: {
        page: 1,
        title: "",
        genre: "",
        clear: false,
      },
      record: false,
      results: null,
      voiceList: [],
      play: false,
      synthVoice: null,
      synthText: "Hello, I am your personal speaker!",
    };
  },
  computed: {
    movies() {
      // console.log(this.$store.state.movies,'movie list');
      return this.$store.state.movies2;
    },
    totalPage() {
      // console.log(this.$store.state.totalPage);
      return this.$store.state.totalPage;
    },
  },
  methods: {
    nextPage(pageNow) {
      this.query.page = pageNow;
      this.$store.dispatch("MoviesPage", this.query);
    },
    addToBookmark(id) {
      this.$store.dispatch("addBookmark", id);
    },
    search() {
      this.query.page = 1;
      this.query.clear = true;
      this.$store.dispatch("MoviesPage", this.query);
    },
    clearSearch() {
      this.page = 0;
      this.query.title = "";
      this.query.genre = "";
      this.query.clear = false;
      // console.log(this.query);
      this.$store.dispatch("MoviesPage", this.query);
    },
    onResults(data) {
      // console.log(data);
      this.results = data;
    },
    unrecognized() {
      alert("Speech was not recognized with satisfying confidence.");
    },
    listVoices(list) {
      this.voiceList = list;
    }
  },
  created() {
    this.$store.commit("SET_EMAIL", localStorage.getItem("email"));
    this.$store.dispatch("getMovies");
    this.$store.dispatch("MoviesPage", this.query);
  },
};
</script>

<style lang="css">
.main {
  width: 50%;
  margin: 50px auto;
}

.has-search .form-control {
  padding-left: 2.375rem;
}

.has-search .form-control-feedback {
  position: absolute;
  z-index: 2;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.375rem;
  text-align: center;
  pointer-events: none;
  color: #aaa;
}
</style>