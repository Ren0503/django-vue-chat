<template>
  <div>
    <RegisterForm @handle-register="registerHandler" />
  </div>
</template>
<script>
import RegisterForm from "@/components/auth/RegisterForm.vue"

export default {
  name: "Register",
  components: {
    RegisterForm,
  },

  methods: {
    registerHandler(data) {
      this.$store.commit("register", data)
    },
  },
}
</script>

