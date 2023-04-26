<script setup lang="ts">
const token = localStorage.getItem('access_token');

const signOut = () => {
    localStorage.removeItem('access_token');
    window.location.reload();
}
</script>

<template>
    <nav class="navigation-container">
        <img src="./assets/logo.svg" width="32" alt="logo" style="cursor: pointer" onclick="window.location.href='/'" />

        <div>
            <router-link v-if="!token" to="/login">Sign in</router-link>
            <router-link v-if="!token" to="/register">Sign up</router-link>
            <a v-else @click="signOut">Sign out</a>
        </div>
    </nav>

    <router-view/>
</template>