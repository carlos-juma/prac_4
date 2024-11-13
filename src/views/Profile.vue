<template>
    <div v-if="currentUser">
      <h2>{{ currentUser.name }}</h2>
      <p>{{ currentUser.email }}</p>
      <router-link :to="`/todos?userId=${currentUser.id}`">View Todos</router-link>
      <router-link :to="`/posts?userId=${currentUser.id}`">View Posts</router-link>
    </div>
    <div v-else>Loading...</div>
</template>
  
  <script>
    import { useMainStore } from '../stores/index';
    export default {
        props: ['userId'],
        setup(props) {
        const store = useMainStore();
    
        const fetchUser = async () => {
            try {
            const response = await fetch(`http://localhost:3000/users/${props.userId}`);
            store.currentUser = await response.json();
            } catch (error) {
            console.error('Error fetching user:', error);
            }
        }
    
        fetchUser();
    
        return { store }; 
        }
    }
  </script>
  