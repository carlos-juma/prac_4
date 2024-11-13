import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    users: [],
    currentUser: null,
    userTodos: [],
    userPosts: [],
  }),

  actions: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
            throw new Error('Error fetching users');
        }
        this.users = await response.json();
      } 
      catch (error) {
        console.error('Error fetching users:', error);
        // Consider error handling like notifying the user
      }
    },

    async fetchUser(userId) {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (!response.ok) {
          throw new Error('Error fetching user');
        }
        this.currentUser = await response.json();
      } catch (error) {
        console.error('Error fetching user:', error);
        // Handle error
      }
    },

    async fetchUserTodos(userId) {
      try {
        const response = await fetch(`http://localhost:3000/todos?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Error fetching todos');
        }
        this.userTodos = await response.json();
      } catch (error) {
        console.error('Error fetching todos:', error);
        // Handle error
      }
    }, 

    async fetchUserPosts(userId) {
      // Similar to fetchUserTodos
    },

    async addPost(post) {
      try {
        const response = await fetch('http://localhost:3000/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(post) 
        });
        if (!response.ok) { 
          throw new Error('Error adding post');
        }
        const data = await response.json();
        this.userPosts.push(data);
      } catch (error) {
        console.error('Error adding post:', error);
        // Handle error
      }
    },

    async updatePost(post) {
      try {
        const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
          method: 'PUT', // Or PATCH depending on your API
          // ...headers etc.
        });
        if (!response.ok) {
          throw new Error('Error updating post');
        }
        // Find index of existing post in userPosts array and update  
      } catch (error) {
        console.error('Error updating post:', error);
        // Handle error
      }
    },

    async deletePost(postId) {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Error deleting post');
        }
        // Remove post from userPosts array
      } catch (error) {
        console.error('Error deleting post:', error);
        // Handle error
      }
    },
  },
});
