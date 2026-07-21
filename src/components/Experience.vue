<script setup>
const experiences = [
  {
    year: "November 22, 2024 - March 15, 2025",
    title: "Graphics Designer & Marketing",
    description: "Designed marketing posters as Facebook page admin for Bayon Web"
  },
  {
    year: "February 2, 2025 - July 23, 2025",
    title: "Book Seller in College",
    description: "Running a book stall for Western University students on campus."
  },
  {
    year: "November 16, 2025 - Present",
    title: "Running an E-commerce Store",
    description: "Selling books, toys&games, artwork, and other items on Otthor store ."
  },
  {
    year: "March 24, 2026 - Present",
    title: "Project Lead - Nahidea",
    description: "Led project development for Nahidea social community site."
  },
]
</script>

<template>
  <div id="experience-div">
    <p id='experience'>Experience</p>
    <br />
    <br />
    <div class="timeline">
      <div v-for="(exp, index) in experiences" :key="index" class="timeline-item">
        <div class="year">{{ exp.year }}</div>
        <div class="timeline-content">
           <div class="bullet"></div>
          <div class="content">
            <h2 class="exp-title">{{ exp.title }}</h2>
            <p class="exp-description">{{ exp.description }}</p>
          </div>
        </div>
       
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pangolin&family=Roboto+Slab:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap');
#experience-div {
  font-family: "Space Grotesk", sans-serif;
  padding: 20px;
   background: rgb(240, 240, 240);


}
#experience{
  font-family: "Pangolin", cursive;
    font-weight: 500;
    margin: 0;
    font-size: x-large;
}

.title {
  font-size: 2rem;
  margin-bottom: 40px;
  color: #1f2937;

}

.timeline {
  position: relative;

  padding-left: 20px;
  border-left: 2px solid #d1d5db;

}

.timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
  position: relative;
}

.year {
  font-weight: 600;
  margin-right: 15px;
  color: grey;
  min-width: 60px;
}

.bullet {
  width: 10px;
  height: 10px;
  background:#eec58e;
  border-radius: 50%;
  margin-right: 15px;
  margin-top: 6px;
}

.content {
  flex: 1;
}
.timeline-content{
  display: flex;
  flex-direction: row;
  align-items: start;
  width: auto;
}

.exp-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 6px;
  color: #111827;
    font-family: 'Times New Roman', Times, serif;
}

.exp-description {
  font-size: 0.95rem;
  color: #374151;
  line-height: 1.4;
}
@media screen and (max-width: 768px){
.timeline-item{
    flex-direction: column;
    gap: 5px;
  }
}
</style>
