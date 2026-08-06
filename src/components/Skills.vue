<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDatabase, faDesktop, faCode, faPalette, faServer, faCodeMerge, faLeftRight } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const hardSkills = [
  {label: 'Languages:', value: "JavaScript, PHP, C#, Dart, Java, SQL, Python, C++, HTML, CSS", icon: faCode},
  {label: 'Frontend:', value: "React, Vue, Flutter", icon: faDesktop},
 
  {label: 'Design:', value: "Figma, Adobe Photoshop,  Canva, Vegas Pro, Cap Cut", icon: faPalette},
  {label: 'Version Control:', value: "Git/GitHub", icon: faCodeMerge},
  {label: 'APIs:', value: "REST, Postman, Authentication & Security basics", icon: faLeftRight},
  {label: 'Backend:', value: "Node.js, Express.js, Supabase, PostgreSQL, MariaDB, Microsoft Access, MySQL, Redis, Upstash, AWS S3", icon: faDatabase},
  {label: 'Deployment, Hosting and Administration:', value: "Hostinger, Render, cPanel, Server management, CDN, Window Server Adminstration(Microsoft)", icon: faServer},
]

const softSkills = [
  "Communication",
 
  "Problem-solving",
 
  "Creativity",

  "Adaptability",
  "Collaboration",
  
  "Initiative",
  "Sales",
  "Marketing",

  "Management"
]
</script>

<template>
  <div id="skills-page">
    <div id="skill-div">
      <p id="skills">Skills</p>
    </div>
    <br/>
    <div class="skills-section">
      <h2 class="section-title">Hard Skills</h2>
      <div class="skills-grid">
        <div v-for="(skill, index) in hardSkills" :key="index" class="skill-card hard">
          <div class="skill-label"><FontAwesomeIcon :icon="skill.icon" /> {{ skill.label }}</div>
          <div class="skill-value">{{ skill.value }}</div>
        </div>
      </div>
    </div>

    <div class="skills-section">
      <h2 class="section-title">Soft Skills</h2>
      <div class="skills-grid">
        <div v-for="(skill, index) in softSkills" :key="index" class="skill-card soft">
          {{ skill }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&family=Roboto+Slab:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pangolin&family=Roboto+Slab:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap');
#skill{
    font-family: "Pangolin", cursive;
    font-weight: 500;
    margin: 0;
    font-size: x-large;
}
#skills-page {
  font-family: "Space Grotesk", sans-serif;
  padding: 20px;
  min-height: 100vh;
}

.title {
  font-family: "Roboto Slab", serif;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 40px;
  color: #1f2937;
}

.skills-section {
  margin-bottom: 50px;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 20px;
  color:grey;
  font-family: 'Times New Roman', Times, serif
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.skill-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 14px rgba(0,0,0,0.08);
  font-size: 1rem;
  line-height: 1.5;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.skill-label{
  font-weight: 500;
  margin-bottom: 5px;
  font-family: sans-serif;
  opacity: 0.9;
}
.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.12);
}


</style>
