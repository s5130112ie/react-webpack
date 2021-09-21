import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Room {
    guestNumber: number;
    roomNumber: number;
    unSetNumber: number;
    result: number[];
}

const initialState = {
    guestNumber: 0,
    roomNumber: 0,
    unSetNumber: 0,
    result: [] as number[],
};

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setRoomAndGuest(state, action: PayloadAction<{ guestNumber: number, roomNumber: number }>) {
            state.guestNumber = action.payload.guestNumber;
            state.roomNumber = action.payload.roomNumber;
            state.unSetNumber = action.payload.guestNumber - action.payload.roomNumber;
            state.result = Array(action.payload.roomNumber)
                .fill(1);
        },
        changeRoomMember(state, action: PayloadAction<{ roomId: number, doAction: string }>) {
            if (action.payload.doAction === "add") {
                state.result[action.payload.roomId] = state.result[action.payload.roomId] + 1;
                state.unSetNumber = state.unSetNumber - 1;
            } else {                
                state.result[action.payload.roomId] = state.result[action.payload.roomId] - 1;
                state.unSetNumber = state.unSetNumber + 1;
            }
        }
    }
})

export const { setRoomAndGuest, changeRoomMember } = roomsSlice.actions;
export default roomsSlice.reducer;
