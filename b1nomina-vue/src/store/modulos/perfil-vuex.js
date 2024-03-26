const modulo =  {
    state() {
        return {
            UserID: null,
            SOCIEDAD_ID: null,

        }
    },
    mutations: {
        asignarUserID(state, ID){
            state.UserID = ID;
        },
        asignarSociedadID(state, ID){
            state.SOCIEDAD_ID = ID;
        }
    },
}

export default modulo