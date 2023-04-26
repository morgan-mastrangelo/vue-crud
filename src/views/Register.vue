<script setup lang="ts">
import {reactive, ref} from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import axios from "axios";
import * as yup from 'yup';
import JSAlert from 'js-alert';
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import serverURL from "@/config/serverURL";

const inputData = ref({
    email: {
        type: "text",
        placeholder: "Username or Email",
        icon: "las la-envelope"
    },
    name: {
        type: "text",
        placeholder: "First Name",
        icon: "las la-user"
    },
    lastname: {
        type: "text",
        placeholder: "Last Name",
        icon: "las la-user"
    },
    password: {
        type: "password",
        placeholder: "Password",
        icon: "las la-credit-card"
    },
    confirm: {
        type: "password",
        placeholder: "Confirm Password",
        icon: "las la-credit-card"
    }
});

const data = reactive({
    email: "",
    name: "",
    lastname: "",
    password: "",
    confirm: "",
})

const schema = yup.object({
    email: yup.string().required().email(),
    name: yup.string().required(),
    lastname: yup.string().required(),
    password: yup.string().required().min(6).max(30),
    confirm: yup.string().required().oneOf([yup.ref('password'), null], "Passwords must match")
});

const register = async () => {
    const input = {
        email: data.email,
        firstname: data.name,
        lastname: data.lastname,
        password: data.password,
        confirm: data.confirm
    }

    await axios.post(serverURL.register, input)
        .then(({ data }) => {
            JSAlert.alert(data.message, null, JSAlert.Icons.Success).then(() => {
                window.location.href="/login";
            })
        })
        .catch(({ response: { data }}) => JSAlert.alert(data.message, null, JSAlert.Icons.Failed));
}
</script>

<template>
    <div id="app" class="full-screen-flex animated-background">
        <div class="auth-card">
            <Form @submit="register" :validation-schema="schema">
                <h1>SIGN UP</h1>
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
                    :type="inputData.name.type"
                    :placeholder="inputData.name.placeholder"
                    :icon="inputData.name.icon"
                    name="name"
                    v-model="data.name"
                />
                <Field name="name" v-model="data.name" style="display: none" />
                <ErrorMessage name="name" />

                <Input
                    :type="inputData.lastname.type"
                    :placeholder="inputData.lastname.placeholder"
                    :icon="inputData.lastname.icon"
                    name="lastname"
                    v-model="data.lastname"
                />
                <Field name="lastname" v-model="data.lastname" style="display: none" />
                <ErrorMessage name="lastname" />

                <Input
                    :type="inputData.password.type"
                    :placeholder="inputData.password.placeholder"
                    :icon="inputData.password.icon"
                    name="password"
                    v-model="data.password"
                />
                <Field name="password" v-model="data.password" style="display: none" />
                <ErrorMessage name="password" />

                <Input
                    :type="inputData.confirm.type"
                    :placeholder="inputData.confirm.placeholder"
                    :icon="inputData.confirm.icon"
                    name="confirm"
                    v-model="data.confirm"
                />
                <Field name="confirm" v-model="data.confirm" style="display: none" />
                <ErrorMessage name="confirm" />

                <a href="/login">You already have an account?</a>
                <Button>REGISTER</Button>
            </Form>
        </div>
    </div>
</template>