<template>
<guest-layout>
    <v-row align="center" justify="center" style="height: 100vh">
        <v-col cols="12" sm="12" md="10" lg="4">
            <application-logo/>
            <v-card>
                <v-card-text>
                    <v-form @submit.prevent="login">
                        <div>
                            <v-text-field v-model="form.email" prepend-inner-icon="mdi-email" label="Email" type="email" outlined dense :error-messages="form.errors.email" />
                            <v-text-field v-model="form.password" prepend-inner-icon="mdi-lock" label="Password" outlined dense :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'" :error-messages="form.errors.password" @click:append="showPassword = !showPassword" />
                        </div>
                        <div class="d-flex align-center justify-space-between flex-wrap">
                            <v-checkbox v-model="form.remember_me" label="Remember me" class="mt-0" hide-details=""/>
                            <Link :href="route('password.request')">
                            Forgot Password?
                            </Link>
                        </div>
                        <v-btn :loading="form.processing" type="submit" block color="red lighten-1" dark class="mt-3">Login</v-btn>
                    </v-form>
                </v-card-text>
                <v-card-text class="d-flex align-center justify-center flex-wrap">
                    <span class="me-2"> New on our platform? </span>
                    <Link :href="route('register')"> Create an account </Link>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</guest-layout>
</template>

<script>
import ApplicationLogo from "../../components/ApplicationLogo.vue";
import GuestLayout from "../../layouts/GuestLayout.vue"

export default {
    components: {
        ApplicationLogo,
        GuestLayout
    },
    data() {
        return {
            showPassword: false,
            isLoading: false,
            form: this.$inertia.form({
                email: null,
                password: null,
                remember_me: false,
            }),
        };
    },
    methods: {
        login() {
            this.form.post("/login");
        },
    },
};
</script>
