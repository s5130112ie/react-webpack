import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomInputNumber, DisplayData } from "..";
import { AppDispatch, RootState } from "./../../redux/store";
import { setRoomAndGuest } from "./../../redux/roomsSlice";

interface props {
    guestNumber: number;
    roomNumber: number
}
export const RoomAllocation = (props: props) => {
    const roomNumber: number = props.roomNumber;
    const roomList: number[] = Array(roomNumber)
        .fill(1);    

    const dispatch = useDispatch<AppDispatch>();
    dispatch(setRoomAndGuest({
        guestNumber: props.guestNumber,
        roomNumber: props.roomNumber,
    }));

    return (
        <>
            <DisplayData />
            {roomList.map((room, index) => {
                return (
                    <div key={index}>
                        <CustomInputNumber step={index} />
                    </div>
                )
            })}
        </>
    )
}
