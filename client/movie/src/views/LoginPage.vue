<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Login Form</h2>
        <div class="text-center mb-5 text-dark">
          Login to access your account!
        </div>
        <div class="card my-5">
          <form class="card-body cardbody-color p-lg-5" @submit.prevent="loginSubmit"
                            id="login-form">

                            <div class="text-center">
                                <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                                    class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="200px"
                                    alt="profile">
                            </div>

                            <div class="mb-3">
                                <input type="email" v-model="user.email" class="form-control" id="login-email"
                                    placeholder="email">
                            </div>

                            <div class="mb-3">
                                <input type="password" v-model="user.password" class="form-control" id="login-password"
                                    placeholder="password">
                            </div>

                            <div class="text-center"><button type="submit"
                                    class="btn btn-color px-5 mb-5 w-100">Login</button></div>

                            <div id="emailHelp" class="form-text text-center mb-5 text-dark">
                                Not Registered? <a href="#" class="text-dark fw-bold">
                                <router-link to="/register">Create an Account</router-link></a>
                            </div>

                            <div class="social-auth-links text-center mt-2 mb-3">
                            <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
                            </div>
                        </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";
import Swal from "sweetalert2";
export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
      params: {
        client_id:
          "924524534896-k6es6g7ne1tegoa0qc542vlombulcbvi.apps.googleusercontent.com",
      },
    };
  },
  components: {
    GoogleLogin,
  },
  methods: {
    loginSubmit() {
      this.$store
        .dispatch("login", this.user)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            title: `Welcome to ${this.user.email}`,
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("email", this.user.email);
          this.$store.commit("SET_EMAIL", this.user.email);
          this.$router.push("/");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.messages,
          });
        });
    },
    onSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token
      this.$store.dispatch('onSignIn', id_token)
      this.$router.push('/')
    },
    onFailure(error) {
      console.log(error);
    },
  },
  computed: {
    email(){
      return this.$store.state.email
    }
  }
};
</script>

<style>
</style>