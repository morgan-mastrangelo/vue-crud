<script setup lang="ts">
    import {reactive, ref} from "vue";
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import axios from "axios";
    import JSAlert from "js-alert";
    import * as yup from 'yup';
    import Input from "@/components/Input.vue";
    import Button from "@/components/Button.vue";
    import serverURL from "@/config/serverURL";

    const inputData = ref({
        email: {
            type: "text",
            placeholder: "Username or Email",
            icon: "las la-envelope"
        },
        password: {
            type: "password",
            placeholder: "Password",
            icon: "las la-credit-card"
        }
    });

    const data = reactive({
        email: '',
        password: ''
    })

    const schema = yup.object({
        email: yup.string().required().email(),
        password: yup.string().required().min(6).max(30)
    })

    const login = async () => {
        const input = {
            email: data.email,
            password: data.password
        }

        await axios.post(serverURL.login, input)
            .then(({ data }) => {
                localStorage.setItem('access_token', data.token);
                JSAlert.alert(data.message, null, JSAlert.Icons.Success).then(() => {
                    window.location.href = "/";
                });
            })
            .catch(({response:{data}}) => JSAlert.alert(data.message, null, JSAlert.Icons.Failed));
    }
</script>

<template>
    <div id="app" class="full-screen-flex animated-background">
        <div class="auth-card">
            <Form @submit="login" :validation-schema="schema">
                <h1>SIGN IN</h1>
                <Input
                    :type="inputData.email.type"
                    :placeholder="inputData.email.placeholder"
                    :icon="inputData.email.icon"
                    name="email"
                    v-model="data.email"
                />
                <Field name="email" v-model="data.email" style="display: none" />
                <ErrorMessage name="email" />

                <Input
                    :type="inputData.password.type"
                    :placeholder="inputData.password.placeholder"
                    :icon="inputData.password.icon"
                    name="password"
                    v-model="data.password"
                />
                <Field name="password" v-model="data.password" style="display: none" />
                <ErrorMessage name="password" />

                <a href="/register">You don't have an account?</a>
                <Button>LOGIN</Button>
            </Form>
        </div>
    </div>
</template>