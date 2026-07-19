<script setup>
import { ref } from 'vue';
import meanleappf from "@/asset/img/meanleappf.jpg";
const testimonials = [
  {
    text: "Hola! My name is Ha Meanleap. I’m currently a Computer Science student with a strong passion for building systems that support business models and startups.",
  },
  {
    text: "I enjoy designing frontends that stand out from the typical AI slop generated styles, and I focus on building efficient backends that are cost effective, reliable, and fully under control to serve users with purpose.",
  },
  {
    text: "Even though I’m still a student, I’ve been able to ship real products online since my freshman year. My latest project is Nahidea, a platform created to encourage open discussion, creativity, and community support. Feel free to check out and see it in action :)",
  },
  {
    text: 'Beyond coding and design, I’m also comfortable with server administration, deployment, cPanel hosting, and Microsoft Admin tools. I have hands‑on knowledge of Ubuntu/Linux systems, which I’m actively expanding as part of my journey to improve myself and scale my side projects'
  },
  {
    text: 'Outside of tech, I enjoy cooking, creating artwork, cycling, and spending time with friends. I also like staying active in different ways to keep life engaging and avoid routine boredom.'
  }
]

const currentIndex = ref(0)

function next() {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length
}
function prev() {
  currentIndex.value =
    (currentIndex.value - 1 + testimonials.length) % testimonials.length
}
</script>

<template>
    <div id="about-con">
            <p id="aboutUs">About</p>
    </div>
    <div id="about-flex">
          <div id="carousel">
    <button @click="prev">‹</button>
    <div id="testimonials">
         <div class="testimonial">
      <p>{{ testimonials[currentIndex].text }}</p>
    </div>
     <div class="dots">
        <span
          v-for="(t, i) in testimonials"
          :key="i"
          :class="['dot', { active: i === currentIndex }]"
          @click="currentIndex = i"
        ></span>
      </div>
    </div>
    <button @click="next">›</button>
  </div>
     <img :src="meanleappf" id="pf" alt="Meanleap_Ha_profile"/>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pangolin&family=Roboto+Slab:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap');
#about-con{
    padding: 20px;
}
#about{
      font-family: "Pangolin", cursive;
    font-weight: 500;
    margin: 0;
    font-size: x-large;
}
#about-flex{
    display: flex;
    align-items: center;
    justify-content: center;
    gap:80px;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 50px;
}
#carousel {
  max-width: 500px;
  display: flex;
  text-align: center;
  font-family: "Space Grotesk", sans-serif;
}
#testimonials{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.testimonial {
  background: #fff;
  padding: 20px;
  border-radius: 10px;

}

button {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #374151;
}

.dots {
  display: flex;
  gap: 8px;
  margin: 0 15px;
}

.dot {
  width: 7px;
  height: 7px;
  background: #d1d5db;
  border-radius: 50%;
  cursor: pointer;
}

.dot.active {
  background: rgb(91, 64, 32);
}

#pf{
    width: 280px;
    height: 280px;
    border-radius:20px;
    object-fit: cover;
}

@media  screen and (max-width: 768px) {
    #about-flex{
        flex-direction: column-reverse;
        gap: 0px;
    }
  #carousel {
  width: 95%;
  margin: auto;
}
}
</style>
