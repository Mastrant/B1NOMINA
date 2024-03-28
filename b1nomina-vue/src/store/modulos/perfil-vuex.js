const perfilModulo =  {
    namespaced: true,
    state() {
        return {
            UserID: null,
            SOCIEDAD_ID: null,

        }
    },
    getters: {
        getUserID: (state) => state.UserID,
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

export default perfilModulo