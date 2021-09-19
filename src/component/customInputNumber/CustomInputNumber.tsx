import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRoomMember } from "../../../redux/roomsSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import styles from "./CustomInputNumber.module.css";

interface props {
    step: number;
}

export const CustomInputNumber = (props: props) => {
    const max: number = 4;
    const min: number = 1;
    const rules = new RegExp('[0-9]');
    const speed: number = 200; // 連續點擊的加減速度
    let refInterval = useRef<any>(null);
    let refCount = useRef(1);
    const dispatch = useDispatch<AppDispatch>();
    const [inputNumber, setInputNumber] = useState(min);
    const isDisabled: boolean = useSelector((state: RootState) => state.isDisabled);

    const setNumber = (newValue) => {
        if (newValue < min || !rules.test(newValue)) {
            return setInputNumber(min);
        }
        if (newValue > max) {
            return setInputNumber(max);
        }
        return setInputNumber(Math.round(Number(newValue)));
    }

    useEffect(() => {
        if (inputNumber !== refCount.current) {
            dispatch(changeRoomMember({
                roomId: props.step,
                doAction: inputNumber > refCount.current ? "add" : "sub",
            }));
            refCount.current = inputNumber;
        }
    }, [inputNumber]);

    return (
        <div className={styles.inputGroup}>
            <div className={styles.title}>
                {`房間 ${props.step + 1}`}
            </div>
            <div className={`${styles.utilFormat} ${inputNumber === min && styles.disable}`}
                onMouseDown={() => {
                    let i = 0;
                    refInterval.current = setInterval(() => {
                        setNumber(inputNumber - 1 - i);
                        i++;
                        return;
                    }, speed)
                    if (i === 0) {
                        setNumber(inputNumber - 1);
                    }
                }}
                onMouseUp={() => clearInterval(refInterval.current)}
            >-</div>
            <input
                className={`${styles.inputNumber} ${styles.utilFormat} `}
                min={min}
                max={max}
                type="number"
                value={inputNumber}
                onChange={(e) => setNumber(Number(e.target.value))}
            />
            <div
                className={`${styles.utilFormat} ${(inputNumber === max || isDisabled) && styles.disable}`}
                onMouseDown={() => {
                    if (isDisabled) { return; }
                    let i = 0;
                    refInterval.current = setInterval(() => {
                        setNumber(inputNumber + 1 + i);
                        i++;
                        return;
                    }, speed)
                    if (i === 0) {
                        setNumber(inputNumber + 1);
                    }
                }}
                onMouseUp={() => clearInterval(refInterval.current)}
            >+</div>
        </div>
    )
}