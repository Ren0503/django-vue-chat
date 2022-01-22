<template>
  <div>
    <LoginForm @login-handler="loginHandler" />
  </div>
</template>

<script>
import LoginForm from "../components/auth/LoginForm.vue"

export default {
  name: "Login",
  components: {
    LoginForm,
  },

  methods: {
    loginHandler(data) {
      data["next_url"] = this.$route.params.nextUrl
        ? this.$route.params.nextUrl
        : "/"
      this.$store.commit("login", data)
    },
  },
}
</script>