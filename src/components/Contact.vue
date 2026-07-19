<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope, faPhone, faHouse } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { ref } from 'vue';

const formData = ref({
  username: '',
  email: '',
  phones: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const responseMessage = ref('');

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    const res = await fetch(`https://remindwho.site/send/message`, {
      method: 'POST',
      headers: {   
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.value)
    });

    const data = await res.json(); 
    responseMessage.value = data.msg;
  } catch (err) {
    responseMessage.value = 'Something went wrong :( please try again later';
  } finally {
    isSubmitting.value = false;
  };
};

</script>
<template>
    <footer>
        <p id="contact">Contact</p>
        <div id="contect-flex">
            <div id="contact-div">
                <p class="contact-p"><FontAwesomeIcon :icon="faEnvelope" /> Email: <a href="mailto:meanleapha@gmail">meanleapha@gmail.com</a></p>
                <p class="contact-p"><FontAwesomeIcon :icon="faGithub" /> GitHub: <a href="https://github.com/MEANLEAPHA">https://github.com/MEANLEAPHA</a></p>
                <p class="contact-p"><FontAwesomeIcon :icon="faPhone" /> Phone: 061752924</p>
                <p class="contact-p"><FontAwesomeIcon :icon="faHouse" /> Address: Khan Tuol Kork, Phnom Penh</p>
            </div>
            <div >
                 <form class="contact-form" @submit.prevent="handleSubmit">
                    <span id="send-label">Send me a message</span>
                    <div class="form-row">
                    <input v-model="formData.username" type="text" placeholder="Your Name" required />
                    <input v-model="formData.email" type="email" placeholder="Your Email" required />
                    </div>
                    <div class="form-row">
                    <input v-model="formData.phones" type="tel" placeholder="Your Phone" />
                    <input v-model="formData.subject" type="text" placeholder="Subject" />
                    </div>
                    <textarea v-model="formData.message" placeholder="Your Message" rows="5" required></textarea>
                    <button type="submit" class="submit-btn" :disabled="isSubmitting">
                    {{ isSubmitting ? 'Sending...' : 'Send' }}
                    </button>
                    <p v-if="responseMessage" style="text-align: center;">{{ responseMessage }}</p>
                </form>
            </div>
        </div>
        <br/>
        <br>
        <hr/>
        <p id="update" >This website will always updated based on the latest information</p>
    </footer>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pangolin&family=Roboto+Slab:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap');
footer{
    padding: 50px 20px 10px 20px;
      background: rgb(240, 240, 240);
}

#contact{
  font-family: "Pangolin", cursive;
    font-weight: 500;
    margin: 0;
    font-size: x-large;
}
#contect-flex{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
   align-items: start;
   padding-right: 80px;
   flex-wrap: wrap;
   padding-left: 30px;
}
#contact-div{
    margin-top: 10px;

    font-family: sans-serif;
    opacity: 1;
    font-weight: 500;
}
.contact-p{
    font-family: sans-serif;
    opacity: 1;
    font-weight: 500;
}
.contact-p a{
    text-decoration: none;
    color: black;
}
.contact-p a:hover{
    text-decoration: underline;
    color: blue
}

#update{
    margin-top: 20px;
    text-align: center;
    font-family: 'Times New Roman', Times, serif;
    opacity: 1;
    font-size: large;
    color: grey;
    font-weight: 500;
}
#qr-div{
    display:flex;
    align-items: start;
    flex-direction: column;
    
    justify-content: start;
    width: auto;
    gap: 5px;
    padding: 0;
    margin: 0;
    font-family: sans-serif;
 
}
#qr-span{
    font-family: sans-serif;
    opacity: 1;
    font-size: small;
   margin-left: 2px;
}



.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
}
#send-label{
    font-family: sans-serif;
    opacity: 0.9;
    font-weight: 400;
    margin: 0;
    font-size: large;
    text-align: center;
}

.form-row {
  display: flex;
  gap: 1rem;
  
}

.form-row input,
.contact-form textarea {
  flex: 1;
  min-height: 38px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: "Roboto Slab", serif;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.contact-form textarea {
  resize: vertical;
}



.submit-btn {
  background: antiquewhite;
  color: grey;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  height: 48px;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background: burlywood;
  transform: translateY(-2px);
  color: black;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}


@media screen and (max-width: 768px){
      #contect-flex{
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
   padding-right:0;
   gap: 20px;
   padding-left: 0;
}  

}
</style>