<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = reactive({
  name: '',
  password: '',
});

const loginUser = async () => {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      name: user.name,
      password: user.password,
    });
    console.log('Пользователь найден:', response.data);
    router.push('/person');
  } catch (error) {
    console.error('Ошибка при входе:', error.response?.data || error.message);
    alert('Неверное имя или пароль!');
  }
};

const registerUser = async () => {
  try {
    const response = await axios.post('http://localhost:3000/users', {
      name: user.name,
      password: user.password,
    });
    console.log('Пользователь зарегистрирован:', response.data);
    router.push('/person');
  } catch (error) {
    console.error('Ошибка при регистрации:', error.response?.data || error.message);
    alert('Ошибка при регистрации! Возможно, имя уже занято.');
  }
};
</script>

<template>
  <div>
    <h1>Вход или регистрация</h1>
    <form @submit.prevent>
      <label for="name">Имя:</label>
      <input type="text" id="name" v-model="user.name" required />

      <label for="password">Пароль:</label>
      <input type="password" id="password" v-model="user.password" required />

      <button @click="loginUser">Войти</button>
      <button @click="registerUser">Зарегистрироваться</button>
    </form>
  </div>
</template>
