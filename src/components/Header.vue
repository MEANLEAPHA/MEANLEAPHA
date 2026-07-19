<script setup>
import {ref, defineProps} from 'vue';

// img
import logo from '@/asset/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// Import the specific icons you need
import { faBars} from '@fortawesome/free-solid-svg-icons';

defineProps({
  avatar: {
    type: String,
    default: logo
  },
  username: {
    type: String,
    default: 'Guess'
  },
  


})

 const openDropDown = ref(false);

</script>
<template>
  <header>
    <div id="header-left">
      <p id="username">Ha Meanleap</p>
    </div>
    
    <div class="header-right">

      <ul class="header-right-u1">
        <a href="#home" class="spam-a">Home</a>
        <a href="#aboutUs" class="spam-a">About</a>
        <a href="#skills" class="spam-a">Skills</a>
        <a href="#activelearning" class="spam-a">Active Learning</a>
        <a href="#experience" class="spam-a">Experience</a>
        <a href="#projects" class="spam-a">Projects</a>
        <a href="#contact" class="spam-a">Contact</a>
      </ul>
      
      <div id="user-div">
        <FontAwesomeIcon :icon="faBars" @click="openDropDown = !openDropDown"/>
        <div v-if="openDropDown" class="dropdown">
            <ul class="header-right-u2">
              <a href="#home" class="spam-a">Home</a>
              <a href="#aboutUs" class="spam-a">About</a>
              <a href="#skills" class="spam-a">Skills</a>
              <a href="#activelearning" class="spam-a">Active Learning</a>
              <a href="#experience" class="spam-a">Experience</a>
              <a href="#projects" class="spam-a">Projects</a>
              <a href="#contact" class="spam-a">Contact</a>
            </ul>
        </div>
      </div>
    </div>


  </header>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pangolin&family=Roboto+Slab:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap');
header{
    display:flex;
    flex-direction: row;
    width: 100%;
    margin: 0;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0px;
    border-bottom: 2px solid rgba(118, 118, 118, 0.497);
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: rgb(255, 247, 237);
}
#header-left{
  display: flex;
  justify-content: start;
  gap: 5px;
  width: 20%;
  margin: 0;
  padding: 0px 10px;
  align-items: center;
}
#pf{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
#username{
  font-size: 26px;
  font-weight: 500;
  color: rgb(47, 28, 5);
 font-family: 'Times New Roman', Times, serif;
  margin: 0;
}


.header-right{
    display: flex;
    align-items: center;
    justify-content: end;
    width: 80%;
    height: auto;
    padding-right: 15px;
}
.header-right-u1{
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 20px;
    width: 100%;
    height: 100%;
    padding: 5px 0px;
}
.header-right-u1 a{
    font-family: "Pangolin", cursive;
    font-weight: 500;
    margin: 0;
    cursor: pointer;
    text-decoration: none;
    color: black;
} 
.header-right-u1 a:hover{
margin: 0;
  text-decoration: orange underline;
  transform: scale(1.1);
  
}

#user-div{

  height: auto;
  padding: 5px;
  border-radius: 5px;
  display: none;
  border: 2px solid grey;
}
.dropdown{
  position: absolute;
 top: 50px;
  border-radius: 8px;
  height: auto;
  padding: 10px;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index:2;
  border: 1px solid grey;
  right: 0;
  

}
.header-right-u2{
display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 0px 30px;
  list-style: none;
}
.header-right-u2 a{
  color: black;
  text-decoration: none;
 font-family: "Pangolin", cursive;
}
@media screen and (max-width: 768px) {
  #header-left{
    width: 50%;
  }
  .header-right{
    width: 20%;
}
  #user-div{
    display: block;
  }
  
  .header-right-u1{
    display: none;
  }
}
header{
   padding: 10px 0px;
}
</style>