<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Register Form</h2>
        <div class="text-center mb-5 text-dark">
          Register to create your account!
        </div>
        <div class="card my-5">
          <form
            class="card-body cardbody-color p-lg-5"
            @submit.prevent="submitRegister"
            id="register-form"
          >
            <div class="text-center">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                class="
                  img-fluid
                  profile-image-pic
                  img-thumbnail
                  rounded-circle
                  my-3
                "
                width="200px"
                alt="profile"
              />
            </div>

            <div class="mb-3">
              <input
                type="text"
                v-model="newUser.username"
                class="form-control"
                id="newUser-username"
                placeholder="username"
              />
            </div>

            <div class="mb-3">
              <input
                type="email"
                v-model="newUser.email"
                class="form-control"
                id="newUser-email"
                placeholder="email"
              />
            </div>

            <div class="mb-3">
              <input
                type="password"
                v-model="newUser.password"
                class="form-control"
                id="newUser-password"
                placeholder="password"
              />
            </div>

            <div class="mb-3">
              <input
                type="number"
                v-model="newUser.phoneNumber"
                class="form-control"
                id="newUser-phoneNumber"
                placeholder="phoneNumber"
              />
            </div>

            <div class="mb-3">
              <input
                type="text"
                v-model="newUser.address"
                class="form-control"
                id="newUser-address"
                placeholder="address"
              />
            </div>

            <div class="text-center">
              <button type="submit" class="btn btn-color px-5 mb-5 w-100">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      newUser: {
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      },
    };
  },
  methods: {
    submitRegister(event) {
      this.$store.dispatch("register", this.newUser);
      this.$router.push("/login");
      event.target.reset()
    },
  },
};
</script>
<style>
.btn-color {
  background-color: #688ed5;
  color: #fff;
}
.profile-image-pic {
  height: 200px;
  width: 200px;
  object-fit: cover;
}
#register-body {
  background-color: #abd2ff;
}
a {
  text-decoration: none;
}
</style>