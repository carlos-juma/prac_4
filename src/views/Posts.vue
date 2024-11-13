<template>
    Posts<template>
    <div>
      <h2>Posts</h2>
      <button @click="showAddForm = true">Add Post</button>
      <div v-if="showAddForm">
        <h3>New Post</h3>
        <input type="text" v-model="newPostTitle" placeholder="Title">
        <textarea v-model="newPostBody" placeholder="Body"></textarea>
        <button @click="addPost">Save</button>
      </div>
  
      <ul v-if="userPosts">
        <li v-for="post in userPosts" :key="post.id">
          <h3>{{ post.title }} </h3>
          <p>{{ post.body }}</p>
  
          <button @click="showEditForm(post)">Edit</button>
          <button @click="deletePost(post.id)">Delete</button>
  
          <div v-if="showEditForm[post.id]">
            <h3>Edit Post</h3>
            <input type="text" v-model="post.title" placeholder="Title">
            <textarea v-model="post.body" placeholder="Body"></textarea>
            <button @click="updatePost(post)">Update</button>
          </div>
        </li>
      </ul>
      <div v-else>Loading...</div>
    </div>
  </template>
  
  <script>
  import { useMainStore } from '../stores/index';
  
  export default {
    props: ['userId'],
    setup(props) {
      const store = useMainStore(); 
  
      const newPostTitle = ref('');
      const newPostBody = ref('');
      const showAddForm = ref(false);
      const showEditForm = ref({});
  
      // ... fetchUserPosts() action from Pinia store
  
      const addPost = async () => {
        try {
          const response = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: props.userId,
              title: newPostTitle.value,
              body: newPostBody.value,
            })
          });
  
          const data = await response.json();
          // Ideally, update the store (Pinia) instead of refetching
          store.userPosts.push(data); 
  
          newPostTitle.value = '';
          newPostBody.value = '';
          showAddForm.value = false;
        } catch (error) {
          console.error('Error adding post:', error);
        }
      };
  
      const updatePost = async (post) => {
        try {
          // ... PUT request logic (similar to addPost)
          // Update store
          showEditForm[post.id] = false;
        } catch (error) {
          console.error('Error updating post:', error);
        }
      };
  
      const deletePost = async (postId) => {
        try {
          await fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE',
          });
          // Update store
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      };
  
      const toggleEditForm = (post) => {
        showEditForm.value[post.id] = true;
      }
  
      return { 
        store, newPostTitle, newPostBody, toggleEditForm, showEditForm,
        addPost, updatePost, deletePost, showEditForm
      };
    },
  }
  </script>
  
</template>