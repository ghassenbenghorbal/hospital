<template>
<admin-layout>
    <div class="px-5 pt-2">
        <div v-for="(item,index) in items" :key="index">
            <v-row>
            <v-col>
                <div>
                    <div class="text-h6 font-weight-regular">{{item.title}}</div>
                    <div class=" text-subtitle-2 font-weight-light">{{item.subtitle}}</div>
                </div>
            </v-col>
            <v-col cols="8">
                <v-card>
                    <v-card-text style="">
                        <v-form @submit.prevent="item.method">
                            <v-text-field v-for="input in item.inputs" :key="input.label" v-model="input.data" :label="input.label" :readonly="input.readonly" outlined dense></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-end bg-gray">
                        <div>
                            <v-btn outlined color="red accent-2" @click="item.button.method()">{{item.button.name}}</v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-divider v-if="index < 2" class="my-4"/>
        </div>
    </div>
</admin-layout>
</template>

<script>
import AdminLayout from '../layouts/AdminLayout.vue'
import {
    changeNameEmail,
    changePassword,
    generateApiToken
} from "../methods/profile/profile.js"
export default {
    components: {
        AdminLayout
    },
    data() {
        return {
            items: [{
                    title: "Profile Information",
                    subtitle: "Update your account's profile information and email address.",
                    inputs: [{
                            label: "Name",
                            data: "",
                            readonly: false
                        },
                        {
                            label: "Email",
                            data: "",
                            readonly: false
                        }
                    ],
                    button: {
                        name: "Save",
                        method: changeNameEmail
                    }
                },
                {
                    title: "Update Password",
                    subtitle: "Ensure your account is using a long, random password to stay secure.",
                    inputs: [{
                            label: "Current Password",
                            data: "",
                            readonly: false
                        },
                        {
                            label: "New Password",
                            data: "",
                            readonly: false
                        }
                    ],
                    button: {
                        name: "Save",
                        method: changePassword
                    }
                },
                {
                    title: "Generate API Token",
                    subtitle: "Create an API Token for your applications.",
                    inputs: [{
                            label: "Name",
                            data: "",
                            readonly: false
                        },
                        {
                            label: "API Token",
                            data: "",
                            readonly: true
                        }
                    ],
                    button: {
                        name: "Generate",
                        method: this.getApiToken
                    }
                }
            ]
        }
    },
    methods: {
        changeNameEmail() {

        },
        changePassword() {

        },
        getApiToken() {
            generateApiToken(this.items[2].inputs[0].data).then(resp => {
                this.items[2].inputs[1].data = resp
            })
        }
    },

}
</script>

<style>
.bg-gray{
    --tw-bg-opacity: 1;
    background-color: rgb(249 250 251 / var(--tw-bg-opacity));
}
</style>
