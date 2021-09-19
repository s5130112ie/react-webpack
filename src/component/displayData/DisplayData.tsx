import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export const DisplayData = () => {    
    const unSetNumber: number = useSelector((state: RootState) => state.unSetNumber);
    const result: number[] = useSelector((state: RootState) => state.result);

    return (
        <div>
            <div>未分配人數 {unSetNumber} {`, 資料列: [ ${result.join(" , ")} ]`}</div>
        </div>
    )
}