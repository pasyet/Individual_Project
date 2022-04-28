<template>
  <div class="container">
    <center>
      <h1>My bookmark List</h1>
    </center>
      <div class="row justify-content-start mb-5">
        <div v-for="bookmark in bookmarks"
            :key="bookmark.id">
          <div class="col-3">
            <div class="card mx-auto my-2" style="width: 12rem">
              <img
                :src="bookmark.Movie.imgUrl"
                class="card-img-top"
              />
              <div class="card-body card-body">
                   <h5 class="card-title"><router-link :to="`/detail/${bookmark.Movie.id}`">Title: {{bookmark.Movie.title}}</router-link></h5>
              </div>
            </div>
          </div>
        </div>
    </div>
    <center>
      <h3 v-if="bookmarks.length < 1" class="text-center"><br><br><br><i class="fa fa-file" aria-hidden="true"></i> Bookmarks not added yet</h3>
    </center>
    
  </div>
</template>

<script>
export default {
  name: 'BookmarkPage',
  computed: {
    bookmarks () {
      return this.$store.state.bookmark
    }
  },
  created () {
    this.$store.dispatch('getBookmark')
  }
}
</script>

<style>
</style>