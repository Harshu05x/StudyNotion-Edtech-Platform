import { createSlice } from "@reduxjs/toolkit"

const initialSate = {
    user: localStorage.getItem("studyNotionUser") ? JSON.parse(localStorage.getItem("studyNotionUser")) : null,
    loading: false,
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialSate,
    reducers: {
        setUser(state,actions){
            state.user = actions.payload
        },
        setLoading(state,actions){
            state.loading = actions.payload
        },
    } 
});

export const { setUser, setLoading } = profileSlice.actions;

export default profileSlice.reducer;
