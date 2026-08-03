<script setup>
import { ref } from 'vue'

const activeLearning = ref([
  { subject: "Linux Server Administration", progress: 25, gradient: "linear-gradient(90deg, #2563eb, #10b981)" },
  { subject: "AI and Machine Learning", progress: 30, gradient: "linear-gradient(90deg, #ef4444, #f59e0b)" },
  { subject: "Software Engineering SDLC", progress: 20, gradient: "linear-gradient(90deg, #7c3aed, #2563eb)" },
  { subject: "DevOps Essential", progress: 10, gradient: "linear-gradient(90deg, #14b8a6, #ec4899)" },
  { subject: "Type Script / Angular", progress: 70, gradient: "linear-gradient(90deg, #14b8a6, #ec4899)" },
  { subject: "Vue JS", progress: 55, gradient: "linear-gradient(90deg, #14b8a6, #ec4899)" },
  { subject: "Laravel", progress: 60, gradient: "linear-gradient(90deg, #14b8a6, #ec4899)" },
  { subject: "MongoDB", progress: 40, gradient: "linear-gradient(90deg, #14b8a6, #ec4899)" },
  { subject: "Spanish Language", progress: 15, gradient: "linear-gradient(90deg, #14b8a6, #ec4899)" },
])
</script>

<template>
 
  <div id="active-learning">
     <p id="activelearning">Active Learning</p>
     <br/>
    <div class="learning-grid">
      <div v-for="(item, index) in activeLearning" :key="index" class="learning-line">
        <p class="subject">{{ item.subject }}</p>
        <div class="progress-bar">
            <div class="line" :style="{ background: 'yellowgreen', width: item.progress + '%' }"></div>
            <span class="progress-text">{{ item.progress }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pangolin&family=Roboto+Slab:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap');
#active-learning {
  font-family: "Space Grotesk", sans-serif;
  padding: 20px;
  background: rgb(240, 240, 240);

}
#activelearning{
  font-family: "Pangolin", cursive;
    font-weight: 500;
    margin: 0;
    font-size: x-large;
}
.title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
  color: #1f2937;
}

.learning-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.learning-line {
  display: flex;
  flex-direction: column;
  gap: 0px;
}

.subject {
  font-weight: 600;
  margin:0;
  margin-bottom: 5px;
}
.progress-bar{
    display: flex;
    align-items: center;
    gap: 15px;
}
.line {
  height: 12px;
  border-radius: 6px;
  transition: width 0.8s ease;
  animation: pulse 2s infinite alternate;
}

.progress-text {
  font-size: 0.9rem;
  color: #374151;
  font-weight: 500;
  text-align: right;
}

@keyframes pulse {
  from { filter: brightness(1); }
  to { filter: brightness(1.2); }
}
</style>
