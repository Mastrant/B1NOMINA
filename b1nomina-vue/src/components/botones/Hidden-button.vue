<template>

    <button class="button" type="button" @click="show">
        <div class="icon-conted" v-show="showPassword">
            <HiddeIcon />
        </div>
        <div class="icon-conted" v-show="!showPassword">
            <ShowIcon />
        </div>
    </button>
    
</template>

<script>
import HiddeIcon from '../icons/Hidde-icon.vue';
import ShowIcon from '../icons/Show-icon.vue';

export default {
    data() {
        return {
            showPassword: true
        }
    },
    components: {
        HiddeIcon,
        ShowIcon
    },
    methods: {
        show(){
            this.showPassword = !this.showPassword;
            (this.showPassword) ? this.$emit("inputType",'password'): this.$emit("inputType", 'text')
        }
    },
}

</script>

<style scope>
.button {
    border: none;
    background: white;
    cursor: pointer;
}


</style>