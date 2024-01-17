<template>
    <form class="form-Login" methods="POST" @submit.prevent="Enviar">

        <InputLogin Text="RUT" Placeholder="Ingresar RUT" @message="RecibirUsuario">
            <template #FirtIcon> 
                <EmailIcon />                   
            </template>
        </InputLogin>

        <InputLogin Text="Contraseña" Placeholder="Ingresar Contraseña" Input-Type="password" @message="RecibirPassword">
            <template #FirtIcon> 
                <PasswordIcon />
            </template>

            <template #SecondIcon> 
                <HiddenButton />
            </template>
        </InputLogin>
        
        <LayoutLogin>
            <template #Recuerdame>         
                <InputCheckboxText Text="Recuerdame" />
            </template>
            <template #TextLink>                    
                <span class="text-recuperar">¿Has olvidado tu Contraseña?</span>
            </template>
        </LayoutLogin>

        <SubmitButton Text="Enviar"/>

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
    },

    data() {
        return {
            Usuario: '',
            Password: '',
            recordarCredenciales: '',
            loginError: false,
            
        }
    },    
    methods: {
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

            //genera un json
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
            console.log(payload)

            // Genera la peticion POST
            await axios.post(`/login?username=${this.Usuario}&password=${this.Password}`, payload, config)
            .then( 
                res => {
                    console.log(res)

                    //si el estado es OK
                    if(res.status==202){
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
                    document.form.reset();
                    //JSON con el mensaje de error
                    const data = error.data.message
                    //mostrar mensaje de error en consola
                   console.log(data)
                }
            )
            // this.$router.push('/sociedad');
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
</style>

