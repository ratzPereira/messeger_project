<template>
  <div id="app">
    <div class="container">
      <div class="header">
        <button class="btn-logout">Logout</button>
        <h1>Welcome to Twinder</h1>
      </div>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #cde;
}

app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialised;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  background-color: #fff;
  max-width: 400px;
  margin: 0 auto 10px;
  min-height: 600px;
  border-radius: 5px;
}

.header {
  position: relative;
  height: 40px;
  background-color: #635aaa;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.btn-logout {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 5px;
  background-color: #150a75;
  color: #fff;
  border: 0;
  border-radius: 3px;
  padding: 5px;
  margin: 5px;
}

h1 {
  font-size: 18px;
  line-height: 20px;
  padding-top: 10px;
  color: #eee;
  text-align: center;
}

.field-area {
  padding: 5px 10px;
}

label {
  display: none;
}

input {
  display: block;
  width: 100%;
  border: 1px solid #999;
  padding: 10px;
  border-radius: 3px;
}

.error-message {
  font-size: 11px;
  color: red;
}

.button-register {
  cursor: pointer;
  background-color: #66f;
  border: none;
  border-radius: 3px;
  padding: 15px;
  width: 100%;
  color: #eee;
  font-size: 18px;
}
</style>
