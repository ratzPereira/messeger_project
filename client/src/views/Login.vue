<template>
  <div class="home">
    <img alt="Chat" src="../assets/logo.png" class="logo" />
    <div class="formLogin">
      <form @submit.prevent="onSubmit">
        <div class="errorMessage" v-if="errorMessage">{{ errorMessage }}</div>
        <div class="field-area">
          <label for="input-username">Name:</label>
          <input
            type="text"
            :class="{ error: rules.username }"
            id="input-username"
            v-model="form.username"
            placeholder="Insert your name"
          />
          <span class="error-message" v-show="rules.username">
            {{ rules.username }}
          </span>
        </div>
        <div class="field-area">
          <label for="input-password">Password:</label>
          <input
            type="password"
            :class="{ error: rules.password }"
            id="input-password"
            v-model="form.password"
            placeholder="Insert your password"
          />
          <span class="error-message" v-show="rules.password">
            {{ rules.password }}
          </span>
        </div>

        <div class="field-area">
          <button class="button-register" type="submit">Join</button>
        </div>
      </form>
      <p class="link-register">
        <router-link to="/">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { apiPublic } from '../services/api'
export default {
  name: 'home',
  components: {},

  data: () => ({
    errorMessage: null,
    form: {
      username: null,
      password: null,
    },
    rules: {
      username: null,
      password: null,
    },
  }),
  methods: {
    validate() {
      this.rules = {
        username: !this.form.username ? 'Please insert your name' : false,
        password: !this.form.password ? 'Please insert your password' : false,
      }
      return !this.rules.username && !this.rules.password
    },
    async onSubmit() {
      if (!this.validate()) {
        return
      }
      try {
        const response = await apiPublic.post('/users/login', this.form)

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('emoji', response.data.emoji)

        this.$router.push('/chat')
      } catch (error) {
        console.log(error)
        this.errorMessage = 'Login failed'
      }
    },
  },
}
</script>

<style lang="scss">
.logo {
  width: 60%;
  margin: 10px 20%;
}

.emoji-list {
  border: 1px solid #999;
  border-radius: 3px;
  font-size: 25px;
  line-height: 45px;
  display: grid;
  grid-template-columns: 17% 17% 17% 17% 17% 17%;
  justify-content: space-between;
  padding: 5px;
}
.emoji-list.error {
  border: 1px solid red;
}

.emoji {
  text-align: center;
  width: 50px;
  height: 50px;
  padding: 2px;
  cursor: pointer;
}

.emoji:hover {
  border: 1px solid cyan;
  border-radius: 50%;
  background-color: cyan;
}

.label-emoji {
  color: #999;
  padding-bottom: 5px;
}

.link-register {
  text-align: center;
}

a {
  display: block;
  text-decoration: none;
  padding: 10px;
}
</style>
