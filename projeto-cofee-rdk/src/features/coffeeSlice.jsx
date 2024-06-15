import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const host = "http://localhost:4000/api/products/"

export const showCoffees = createAsyncThunk(
    "showCoffees",
    async (args, { rejectWithValue }) => {
        const response = await fetch(host);

        try {
            const result = await response.json()
            return result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addCoffee = createAsyncThunk(
    "addCoffee",
    async (data, { rejectWithValue }) => {
        const response = await fetch(host, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        try {
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteCoffee = createAsyncThunk(
    "deleteCofee",
    async (id, { rejectWithValue }) => {
        const response = await fetch(`${host}${id}`, {
            method: "DELETE"
        });
        try {
            const result = await response.json()
            return result;
        } catch (error) {
            return rejectWithValue(error)

        }
    }
)

export const updateCoffee = createAsyncThunk(
    "updateCoffee",
    async (data, { rejectWithValue }) => {
        const response = await fetch(`${host}${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        try {
            const result = await response.json()
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }

    }
)

export const coffeeSlice = createSlice({
    name: "coffeeSlice",
    initialState: {
        coffee: {},
        coffees: [],
        loading: false,
        error: null
    },
    extraReducers: {
        [addCoffee.pending]: (state) => {
            state.loading = true
        },
        [addCoffee.fulfilled]: (state, action) => {
            state.loading = false;
            state.coffees.push(action.payload);
        },
        [addCoffee.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [showCoffees.pending]: (state) => {
            state.loading = true
        },
        [showCoffees.fulfilled]: (state, action) => {
            state.loading = false;
            state.coffees = action.payload
        },
        [showCoffees.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [deleteCoffee.pending]: (state) => {
            state.loading = true;
        },
        [deleteCoffee.fulfilled]: (state, action) => {
            state.loading = false;
            const { _id } = action.payload;
            if (_id) {
                state.coffees = state.coffees.filter((coffee) => coffee._id !== _id)
            }
        },
        [updateCoffee.pending]: (state) => {
            state.loading = true;
        },
        [updateCoffee.fulfilled]: (state, action) => {
            state.loading = true;
            state.coffees = state.coffees.map((coffee) => 
                coffee._id === action.payload._id ? action.payload : coffee
            )
        },
        [updateCoffee.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        }
    },
    
})

export default coffeeSlice.reducer