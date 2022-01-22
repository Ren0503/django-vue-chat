<template>
  <SendEmail
    :errors="errors"
    :success="success"
    @handle-submit="requestToken"
    heading="Resend Activation Email"
    sub_heading="activate your account by giving email "
    success_message="Your activation email has been sent"
  />
</template>
<script>
import gql from "graphql-tag"
import SendEmail from "../components/shared/SendEmail.vue"
export default {
  name: "ResendActivationEmail",
  components: {
    SendEmail,
  },
  data() {
    return {
      errors: [],
      success: false,
    }
  },
  methods: {
    requestToken(data_) {
      let RESET_QUERY = gql`
        mutation($email: String!) {
          resendActivationEmail(email: $email) {
            success
            errors
          }
        }
      `
      this.$apollo.mutate({
        mutation: RESET_QUERY,
        variables: data_,
        update: (cache, { data }) => {
          try {
            let errors = data.resendActivationEmail.errors
            this.success = data.resendActivationEmail.success
            if (errors) {
              this.errors = errors.email
            }
          } catch (e) {
            console.log(e)
          }
        },
      })
    },
  },
}
</script>