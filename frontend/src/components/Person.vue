<template>
  <div>
    <h1>Данные о людях</h1>
    <div v-if="people.length">
      <div v-for="(person, index) in people" :key="index">
        <p><strong>Имя:</strong> {{ person.name }}</p>
        <p><strong>password:</strong> {{ person.password }}</p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { reactive, onMounted } from 'vue';


const people = reactive([]);

const getPersonData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/users');
        people.length = 0;
        response.data.forEach(user => people.push(user));
        console.log('Данные о людях:', response.data);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
};

onMounted(() => {
    getPersonData();
});
</script>
