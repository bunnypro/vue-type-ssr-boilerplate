<template>
  <div id="app">
      <nav>
          <router-link to="/" class="btn" active-class="active" exact>Home</router-link>
          <router-link to="/about" class="btn" active-class="active" exact>About</router-link>
      </nav>
      <main>
          <transition name="fade-left" mode="out-in">
            <router-view class="animate-p3s"></router-view>
          </transition>
      </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>
