import React, { useContext } from 'react';
import { useState } from "react"
import { Button } from 'react-bootstrap';
import { AltElementsContext, CounterContext } from './App';


export default function Content () {
    const altElementList = useContext(AltElementsContext)
    const {counterList, setCounterList} = useContext(CounterContext);
    
    const [currState, setState] = useState("0");
    const handleClick = () => {
        counterList[0] += 1
        setCounterList([...counterList])
    }
    return (
        <>
            <Button onClick={handleClick}>Press me to update global list {`${counterList}`}</Button>
            <div>{`${counterList}`}</div>
            <div>{currState}</div>
            {altElementList}
        </>
    )
}