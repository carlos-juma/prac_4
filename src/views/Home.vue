<template>
    Home

    <div>
      <h1>Users</h1>
      <ul v-if="users">
        <li v-for="user in users" :key="user.id">
          <router-link :to="`/profile?userId=${user.id}`">{{ user.name }}</router-link>
        </li>
      </ul>
      <button @click="fetchUsers">Fetch Users</button>
    </div>
  </template>
  
  <script>
  import { useMainStore } from '../stores/index';
  
  export default {
    setup() {
      const store = useMainStore(); 
  
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:3000/users');
          store.users = await response.json(); 
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
  
      fetchUsers(); 
  
      return { store }; // Access to store if using Pinia
    }
  }
  </script>
  