<script setup lang="ts">
import axios from "axios";
import JSConfetti from "js-confetti";
import serverURL from "@/config/serverURL";
import { userData } from "@/store";

const token = localStorage.getItem('access_token');

if (token) {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const jsConfetti = new JSConfetti();

    axios.get(serverURL.accessToken, config)
        .then(({data}) => {
            userData.firstname = data.firstname;
            userData.lastname = data.lastname;
            userData.email = data.email;
            userData.date = data.date;
            jsConfetti.addConfetti();
        })
        .catch(error => localStorage.removeItem('access_token'));
}
</script>

<template>
    <div class="home-background">
        <span/>
        <span/>
        <span/>
        <h1>TEMP</h1>
        <h2 v-if="userData.firstname">Hi, {{ userData.firstname }}</h2>
    </div>

    <div class="auth-container">
        <button v-if="!userData.firstname" onclick="window.location.href='/login'">SIGN IN</button>
        <button v-if="!userData.firstname" onclick="window.location.href='/register'">SIGN UP</button>
        <p v-else>
            Welcome to my TEMP app!<br />
            I built this site with Vue.js Framework.<br />
            It is nice to meet you here, and I hope to learn<br />
            more about wide web development.
        </p>
    </div>
</template>