<script>
  export default{

    // declare data function
    data (){
      return {
        name: 'Hello gossiper',
        status: "pending",
        tasks: ['task one', 'task two', 'task three'],
        link: 'https://google.com'
      };
    },
    methods:{
      toggleStatus(){
        if(this.status === 'active'){
          this.status = 'pending'
        }
        else if(this.status === 'pending'){
          this.status = 'inactive'
        }
        else{
          this.status = "active"
        }
      }
    }
  }
</script>
<template>
  <!-- render the data using double curlybrace -->
   <h1>{{ name }}</h1>
   <!-- v-if -->
   <p v-if="status === 'active'">User is active</p> 
   <!-- v-else-if -->
   <p v-else-if="status === 'pending'">User is pending</p>
   <!-- v-else -->
   <p v-else>User is inactive</p>

   <h3>Task: </h3>
   <ul>
      <!-- v-for -->
      <li v-for="task in tasks" v-bind:key="task">{{ task }}</li>
   </ul>
     <!-- v-bind is for make attr call data not string -->
   <a :href="link">Google</a>
   <br/> <br/>
   <button @nclick="toggleStatus">Change Status</button>
</template>
<style scoped>

</style>

<!-- 
<script setup>
        import {ref, onMounted} from 'vue';

        const name= ref('Hello gossiper');
        const status = ref("pending");
        const tasks = ref(['task one', 'task two', 'task three']);
        const link = ref('https://google.com');

        const newTask = ref('');

        const  toggleStatus = () => {
           if(status.value === 'active'){
              status.value = 'pending'
            }
            else if(status.value === 'pending'){
              status.value = 'inactive'
            }
            else{
              status.value = "active"
            }
        };


        const addTask = () =>{
          if(newTask.value.trim() !== ''){
            tasks.value.push(newTask.value);
            newTask.value = ''
          }
        };

        const deleteTask = (index) => {
          tasks.value.splice(index, 1);
        }
        
onMounted(async () => {
  try{
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await res.json();
    tasks.value = data.map((task) => task.title)
  }
  catch(err){   
    console.log('error fetching task')
  }
})
</script>
<template>
  
   <h1>{{ name }}</h1>

   <p v-if="status === 'active'">User is active</p> 
 
   <p v-else-if="status === 'pending'">User is pending</p>
   
   <p v-else>User is inactive</p>

   <h3>Task: </h3>
   <form @submit.prevent="addTask">
    <label for="newTask">
       Add Task
    </label>
    <input type="text" id="newTask" name="newTask" v-model="newTask">
    <button type="submit">Submit</button>
   </form>
   <ul>
      
      <li v-for="(task, index) in tasks" v-bind:key="task">
        <span>
          {{ task }}
        </span>
        <button @click="deleteTask(index)">
          X
        </button>
        
      </li>
   </ul>
   
   <a :href="link">Google</a>
   <br/> <br/>
   <button @click="toggleStatus">Change Status</button>
</template>
<style scoped>

</style> -->






  <!-- render the data using double curlybrace -->
   <h1>{{ name }}</h1>
   <!-- v-if -->
   <p v-if="status === 'active'">User is active</p> 
   <!-- v-else-if -->
   <p v-else-if="status === 'pending'">User is pending</p>
   <!-- v-else -->
   <p v-else>User is inactive</p>




   <h3>Task: </h3>
   <form @submit.prevent="addTask">
    <label for="newTask">
       Add Task
    </label>
    <input type="text" id="newTask" name="newTask" v-model="newTask">
    <button type="submit">Submit</button>
   </form>
   <ul>
      <!-- v-for -->
      <li v-for="(task, index) in tasks" v-bind:key="task">
        <span>
          {{ task }}
        </span>
        <button @click="deleteTask(index)">
          X
        </button>
        
      </li>
   </ul>
     <!-- v-bind is for make attr call data not string -->
   <a :href="link">Google</a>
   <br/> <br/>
   <button @click="toggleStatus">Change Status</button>