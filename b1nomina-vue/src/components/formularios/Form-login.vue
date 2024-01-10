<template>
    <form class="form-Login" methods="POST" @submit.prevent="Enviar">

        <InputLogin Text="Usuario" Placeholder="Ingresar Usuario" @message="RecibirUsuario">
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
import InputLogin from '@/components/inputs/Input-Login.vue'
import EmailIcon from '@/components/icons/Email-icon.vue'
import PasswordIcon from '../icons/Password-icon.vue';
import HiddenButton from '../botones/Hidden-button.vue';
import LayoutLogin from '../Layouts/LayoutLogin.vue';
import InputCheckboxText from '../inputs/Input-Checkbox-Text.vue';
import SubmitButton from '../botones/Submit-button.vue';

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
        Enviar(evento){
            console.log(this.Usuario, this.Password)
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

