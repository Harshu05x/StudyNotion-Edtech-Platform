import { createSlice } from "@reduxjs/toolkit"

const initialSate = {
    token: localStorage.getItem("studyNotionToken") ? JSON.parse(localStorage.getItem("studyNotionToken")) : null,
    loading: false,
    signupData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialSate,
    reducers: {
        setToken(state,actions){
            state.token = actions.payload
        },  
        setLoading(state,actions){
            state.loading = actions.payload
        },
        setSignupData(state,actions){
            state.signupData = actions.payload
        },
    } 
});

export const { setToken,setSignupData } = authSlice.actions;

export default authSlice.reducer;
