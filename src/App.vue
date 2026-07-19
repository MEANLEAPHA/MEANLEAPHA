<script setup>

  import Header from "@/components/Header.vue";
  import Home from "@/components/Home.vue";
  import Contact from "@/components/Contact.vue";

  import Works from './components/Works.vue';
  import About from './components/About.vue';
  import Skills from './components/Skills.vue';

  import Learning from './components/Learning.vue';
  import Experience from './components/Experience.vue';

</script>
<template>
  <Header />
  <main>
    <Home />
    <About />
    <Skills />
    <Learning />
    <Experience/>
    <Works />
  </main>
  <Contact />
</template>

