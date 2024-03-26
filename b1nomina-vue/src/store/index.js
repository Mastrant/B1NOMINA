import { createStore } from "vuex";
import perfil from '@/store/modulos/perfil-vuex'

const Almacen = createStore({    
    modules:{
        perfil
    }

})

export default Almacen