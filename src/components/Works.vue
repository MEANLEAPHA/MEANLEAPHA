<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import gossiper from '@/asset/img/1.png';
import spammy from '@/asset/img/2.png';
import thegreenriddle from '@/asset/img/3.png';
import otthorstore from '@/asset/img/4.png';
import picocolor from '@/asset/img/5.png';
import naidea from '@/asset/img/6.png';
import remindwho from '@/asset/img/7.png';
import bibliophilebird from '@/asset/img/8.png';

// --- data ---------------------------------------------------------------
const cards = reactive([
  { caption: 'BibliophileBird', src: bibliophilebird,  alt: 'bibliophileBird-logo-img', href: 'https://github.com/MEANLEAPHA', des:'Online Book store' },
  { caption: 'Otthor Store', src: otthorstore,  alt: 'otthorStore-logo-img', href: 'https://github.com/MEANLEAPHA', des:'Online Book store, Toy, Art and Secondhand'},
  { caption: 'Spammy', src: spammy ,   alt: 'Spammy-logo-img', href: 'https://github.com/MEANLEAPHA', des:'Spam feature built in Nahidea site'},
  { caption: 'The Green Riddle', src: thegreenriddle, alt: 'Thegreenriddle-logo-img', href: 'https://github.com/MEANLEAPHA', des: 'Friendly Tracking network tool, JWT convertor and Hash guessing' },
  { caption: 'Nahidea', src: naidea,  alt: 'Nahidea-logo-img', href: 'https://github.com/MEANLEAPHA', des:'Social Community - sharing confession, content and ask question' },
  { caption: 'Reminwho', src: remindwho,    alt: 'Remindwho-logo-img', href: 'https://github.com/MEANLEAPHA', des: 'Friendly reminder on important task or event for self reminder and friend reminder'},
  { caption: 'Gossiper',  src: gossiper,   alt: 'Gossiper-logo-img', href: 'https://github.com/MEANLEAPHA', des: 'Real time chat system built in Nahidea site'},
  { caption: 'PicoColor',src: picocolor, alt: 'picoColor-logo-img', href: 'https://github.com/MEANLEAPHA', des: 'Friendly  color palette generator matching' },
 
])
const trackRef = ref(null)
const cardEls = new Map() // index -> element, kept outside reactivity on purpose

// reactive UI state that the template reads from — we never touch style.* directly
const cardStyles = reactive(cards.map(() => ({})))
const activeCaption = ref('')
const activeDes = ref('')


function setCardRef(el, index) {
  if (el) cardEls.set(index, el)
  else cardEls.delete(index)
}

// one stable closure per card, created once — not a fresh arrow function per render
const cardRefSetters = cards.map((_, i) => (el) => setCardRef(el, i))

function cardCenter(card) {
  return card.offsetLeft + card.offsetWidth / 2
}

function update() {
  const track = trackRef.value
  if (!track) return

  const trackRect = track.getBoundingClientRect()
  const trackCenter = track.scrollLeft + trackRect.width / 2
  const span = trackRect.width * 0.55

  let closestIdx = 0
  let closestDist = Infinity

cardEls.forEach((cardEl, i) => {
    const center = cardCenter(cardEl)
    const dist = center - trackCenter
    const absDist = Math.abs(dist)
    if (absDist < closestDist) { closestDist = absDist; closestIdx = i }

    const norm = Math.min(absDist / span, 1)
    const dir = dist < 0 ? 1 : -1

    const scale = 1 - norm * 0.32
    const blur = norm * 7
    const gray = norm
    const opacity = 1 - norm * 0.45
    const rotateY = dir * norm * 45
    const translateZ = -norm * 220
    const translateX = dir * norm * -40

    cardStyles[i] = {
      transform: `perspective(1200px) translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
      filter: `blur(${blur}px) grayscale(${gray})`,
      opacity,
      zIndex: 100 - Math.round(absDist),
    }
  })

  activeCaption.value = cards[closestIdx].caption
  activeDes.value = cards[closestIdx].des
}

function onWheel(e) {
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    e.preventDefault()
    trackRef.value.scrollLeft += e.deltaY
  }
}

let ticking = false
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => { update(); ticking = false })
    ticking = true
  }
}

onMounted(() => {
  const track = trackRef.value
  const mid = cardEls.get(Math.floor(cards.length / 2))
  track.scrollLeft = cardCenter(mid) - track.getBoundingClientRect().width / 2

  track.addEventListener('wheel', onWheel, { passive: false })
  track.addEventListener('scroll', onScroll)
  window.addEventListener('resize', update)

  setTimeout(update, 50)
})

onBeforeUnmount(() => {
  const track = trackRef.value
  track?.removeEventListener('wheel', onWheel)
  track?.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <div id="project-div">
    <p id="projects">Projects</p>

  </div>
  
    <div class="stage">
      <div class="track" ref="trackRef">
        <div
          v-for="(card, i) in cards"
          :key="card.src"
          class="card"
          :ref="cardRefSetters[i]"
          :style="cardStyles[i]"
        >
            <a :href="card.href">
                <img :src="card.src" :alt="card.alt">
            </a>  
        </div>
      </div>

      <div class="caption">{{ activeCaption }}</div>
      <div class="des">{{ activeDes }}</div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pangolin&family=Roboto+Slab:wght@100..900&family=Space+Grotesk:wght@300..700&family=Caveat:wght@500;600&display=swap');

#project-div {
  padding: 20px;
}
#projects {
  font-family: "Pangolin", cursive;
  font-weight: 500;
  margin: 0;
  font-size: x-large;
}

.stage {
  position: relative;
  width: 100%;
  height: 65vh;
  display: flex;
  align-items:start;
  justify-content: center;
  
}

.track {
  display: flex;
  align-items: center;
  gap: 8px;
  height:300px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  padding: 0 calc(50vw - 150px);
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 100%;
  perspective: 1200px;
}
.track::-webkit-scrollbar { display: none; }

.card {
  position: relative;
  flex: 0 0 auto;
  width: 500px;
  height: 250px;
  scroll-snap-align: center;
  border-radius: 4px;
  overflow: hidden;
  background: #1a2740;
  transform-style: preserve-3d;
  transition:
              filter 0.5s ease,
              opacity 0.5s ease;
  will-change: transform, filter, opacity;
}


.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
  -webkit-user-drag: none;
}

.caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 120px;
  text-align: center;
  font-size: 34px;
  color: black;
  opacity: 0.8;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  pointer-events: none;
}
.des {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 80px;
  text-align: center;
  font-size: 20px;
  color: black;
  opacity: 0.8;
  font-family: sans-serif;
  pointer-events: none;
}
@media screen and (max-width:768px) {
  .card {
    width: 300px;
    height: 150px;
  }
  .caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 150px;
  text-align: center;
  font-size: 28px;
  color: black;
  opacity: 0.8;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  pointer-events: none;
}
.des {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100px;
  padding: 0px 20px;
  text-align: center;
  font-size: 16px;
 
}
}

</style>