<template>
    <form class="form-Login" methods="POST" @submit.prevent="Enviar">

        <InputLogin Text="RUT" Placeholder="Ingresar RUT" v-model="Usuario">
            <template #FirtIcon> 
                <EmailIcon />                   
            </template>
        </InputLogin>

        <InputLogin Text="Contraseña" Placeholder="Ingresar Contraseña" Input-Type="password" v-model="Password">
            <template #FirtIcon> 
                <PasswordIcon />
            </template>

            <template #SecondIcon> 
                <HiddenButton />
            </template>
        </InputLogin>
        {{ Password }}
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
//componentes
import InputLogin from '@/components/inputs/Input-Login.vue';
import EmailIcon from '@/components/icons/Email-icon.vue'
import PasswordIcon from '../icons/Password-icon.vue';
import HiddenButton from '../botones/Hidden-button.vue';
import LayoutLogin from '../Layouts/LayoutLogin.vue';
import InputCheckboxText from '../inputs/Input-Checkbox-Text.vue';
import SubmitButton from '../botones/Submit-button.vue';
import alertError from '@/components/alertas/alert-Error.vue';
import alertWarning from '@/components/alertas/alert-Warning.vue';

//librerias
import axios from 'axios';

import InputBaseVue from '../inputs/Input.Base.vue';
import { ref } from 'vue';

export default {
    //nombre componente
    name: 'FormularioLogin',

    //componentes Utilizados
    methods: {
        //recibe el valor emitido del input -- Usuario --

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
            console.log(payload)

            // Genera la peticion POST
            await axios.post(`/login?username=${this.Usuario}&password=${this.Password}`, payload, config)
            .then( 
                res => {
                    //muestra la respuesta
                    console.log(res)

                    //si el estado es OK
                    if(res.status==202 || res.status==200){
                        //Almacena el token en el local Storage
                        localStorage.setItem('token', res.data.token)
                        //almacena el id del usuario en el local Storage
                        localStorage.setItem('userId', res.data.userId)
                        // Envia a la pagina sociedad
                        this.$router.push('/sociedad')
                    }
                }
            )
            .catch (
                error => {
                    console.log(error.response)
                    if(error.response.status==401){
                        this.loginError.credenciales = true
                    } else if (error.response.status==500) {
                        this.loginError.server = true;
                    }
                }
            )
        },
    },
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
        InputBaseVue,
    },
    setup(){

        const Usuario = ref('')
        const Password = ''
        const  loginError = {
            credenciales: false,
            server: false,
        }
        let ah= ref('')

        return {
            Usuario,
            Password,
            loginError,
            ah,
            
        }
    }

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

