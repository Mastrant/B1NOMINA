<template>
    <form class="form-Login" methods="POST" @submit.prevent="Enviar">

        <InputLogin Text="Usuario" Placeholder="Ingresar Usuario" @message="RecibirUsuario">
            <template #FirtIcon> 
                <EmailIcon />                   
            </template>
        </InputLogin>
        <InputLogin Text="Contraseña" Placeholder="Ingresar Contraseña" :Input-Type="inputTipeLogin" @message="RecibirPassword">

            <template #FirtIcon> 
                <PasswordIcon />
            </template>

            <template #SecondIcon> 
                <HiddenButton @inputType="showPassword"/>
            </template>
        </InputLogin>

        <LayoutLogin>
            <template #default>         
            </template>
            <template #TextLink>                    
                <span class="text-recuperar">¿Has olvidado tu Contraseña?</span>
            </template>
        </LayoutLogin>

        <div class="showError">
            <alertError v-show="loginError.credenciales"/>
            <alertWarning v-show="loginError.server"/>
        </div>

        <div class="contend-button">
            <SubmitButton Text="Enviar"/>
        </div>        
    </form>
</template>

<script>

import { defineAsyncComponent } from 'vue';

//componentes
const InputLogin = defineAsyncComponent(() => import('@/components/inputs/Input-Login.vue') )
const EmailIcon = defineAsyncComponent(() => import('@/components/icons/Email-icon.vue'));
const PasswordIcon = defineAsyncComponent(() => import('../icons/Password-icon.vue'));
const HiddenButton = defineAsyncComponent(() => import('../botones/Hidden-button.vue'));
import LayoutLogin from '../Layouts/LayoutLogin.vue';
const InputCheckboxText = defineAsyncComponent(() => import('../inputs/Input-Checkbox-Text.vue'));
const SubmitButton = defineAsyncComponent(() => import('../botones/Submit-button.vue'));
const alertError = defineAsyncComponent(() => import('@/components/alertas/alert-Error.vue'));
const alertWarning = defineAsyncComponent(() => import('@/components/alertas/alert-Warning.vue'));

//librerias
import axios from 'axios';

export default {
    //nombre componente
    name: 'FormularioLogin',

    //componentes Utilizados
    components: {
        InputLogin,
        EmailIcon,
        PasswordIcon,
        HiddenButton,
        LayoutLogin,
        InputCheckboxText,
        SubmitButton,
        alertError,
        alertWarning,
    },

    data() {
        return {
            Usuario: '',
            Password: '',
            inputTipeLogin: 'password',
            loginError: {
                credenciales: false,
                server: false,
            },
        }
    },
    methods: {

        //Cambia el tipo de input de la contraseña

        showPassword(value){
            this.inputTipeLogin = value;
        },

        //recibe el valor emitido del input -- Usuario --
        RecibirUsuario(value) {
            this.Usuario = value;
        },

        //recibe el valor emitido del input -- Password --
        RecibirPassword(value) {
            this.Password = value;
        },

        // Detecta el evento Submit y realiza la consulta a la api
        async Enviar(){

            //genera un json con la informacion del login
            const payload = {
                username: this.Usuario,
                password: this.Password
            }

            //configura que el tipo de mensaje enviado sea de tipo JSON
            let config = {
                headers: {
                    "Content-Type": "aplication/json",
                },
            }

            //Muestra los datos enviado Test
            //console.log(payload)

            // Genera la peticion POST
            await axios.post(`/login?username=${this.Usuario}&password=${this.Password}`, payload, config)
            .then( 
                res => {
                    //muestra la respuesta
                    //console.log(res)

                    //si el estado es OK
                    if(res.status==202 || res.status==200 || res.status==201){
                        //Almacena el token en el local Storage
                        localStorage.setItem('token', res.data.token)
                        //almacena el id del usuario en el local Storage
                        localStorage.setItem('userId', res.data.userId)
                        // Envia a la pagina sociedad
                        this.$router.push('sociedad')
                    }
                }
            )
            .catch (
                error => {

                    if(error.response.status==401){
                        this.loginError.credenciales = true

                    } else if (error.response.status==500) {
                        this.loginError.server = true;
                    } else {
                        console.log(error.message)
                    }
                }
            )
        },
    },
}

</script>


<style scoped>
/* Estilos generales*/


form.formLogin {
    max-width: 475px;
}

/* Estilos del span enviado en el Layout como Slot*/
span.text-recuperar {
    text-align: end;
    color: #4D4D4D;
    font-size: 14px;
    font-family: "Poppins-Bold",Helvetica;
    font-weight: 300;
    word-wrap: break-word;
    cursor: pointer;
}

div.contend-button {
    box-sizing: content-box;
}

div.showError{
    display: flex;
    flex-direction: column;
    padding-top: 12px;


}


</style>

