<template>
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><router-link to='/'> Movie Kece</router-link></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item" v-if="!email">
          <a class="nav-link" ><router-link to='/'>Home</router-link></a>
        </li>
        <li class="nav-item" v-if="email">
          <a class="nav-link" ><router-link to='/'>Hi, {{ this.email }}</router-link></a>
        </li>
        <li class="nav-item" v-if="!email">
          <a class="nav-link"><li><router-link to='/login'>Login</router-link></li></a>
        </li>
        <li class="nav-item" v-if="email">
          <a class="nav-link" ><router-link to='/mybookmark'>My Bookmark</router-link></a>
        </li>  
        <li class="nav-item" v-if="email">
          <a  @click="logout" class="nav-link"><router-link to='/'>Log Out</router-link></a>
        </li>  
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'NavBar',
  methods: {
    logout () {
      Swal.fire({
        icon: 'success',
        title: `Log Out Success`,
        showConfirmButton: false,
        timer: 1500
      })
      localStorage.clear()
      localStorage.removeItem('access_token')
      localStorage.removeItem('email')
      this.$store.commit('SET_EMAIL', '')
    }
  },
  computed: {
    email(){
      return this.$store.state.email
    }
  }
}
</script>

<style>
.btn-color{
  background-color: #3f76dd;
  color: #fff;
  
}
.profile-image-pic{
  height: 200px;
  width: 200px;
  object-fit: cover;
}
.cardbody-color{
  background-color: #ebf2fa;
}
a{
  text-decoration: none;
}
</style>
