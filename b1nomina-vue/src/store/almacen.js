import { reactive } from "vue";

const almacen = reactive({
    userID: null,
    updatedUserID(userID) {
        this.userID = userID
    },
    SociedadID: null,
    updatedSociedadID(SociedadID) {
        if(SociedadID == Number) {
            this.SociedadID = SociedadID
        }  
    },
});

export default almacen