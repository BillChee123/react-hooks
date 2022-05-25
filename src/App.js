import React, { createContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Content from './Content';

export const AltElementsContext = createContext()
export const CounterContext = createContext()

function AltElement(props) {
  const [isHighlighted, setHighlight] = useState(props.isHighlight);
  const [elementColor, setColor] = useState("");
  const domElement = props.element
  const text = props.value
  const handleHighlight = () => {
    console.log("Handle Highlight")
    const shouldHighlight = !isHighlighted;
    setHighlight(shouldHighlight);
    const currColor = shouldHighlight ? "blue" : ""
    setColor(currColor)
    domElement.style.backgroundColor = currColor
  }
  return (
    <><Form.Check type="switch" checked={isHighlighted} onClick={handleHighlight} /><div style={{backgroundColor: elementColor}}>{text}</div></>
  )
}

function App() {
  const [altElementList, setAltElementList] = useState([]);
  const [isModalToggled, setModalToggled] = useState(false);
  const [counterList, setCounterList] = useState([3,1,2,3]);
  useEffect(() => {
    const currList = [];
    document.querySelectorAll('[aria-label]').forEach((element) => {
      const altElement = <AltElement element={element} isHighlight={false} value={element.getAttribute('aria-label')}/>
      currList.push(altElement)
    });
    setAltElementList(currList);
    console.log(currList)
  }, [])
  return (
    <div className="App">
      <div aria-label='Alternate Label 1'>Element with aria-label</div>
      <div>Element without aria-label</div>
      <div aria-label='Alternate Label 2'>Element with aria-label</div>
      <div>Element without aria-label</div>
      <div aria-label='Alternate Label 3'>Element with aria-label</div>
      <div>Element without aria-label</div>
      <AltElementsContext.Provider value={altElementList}>
      <CounterContext.Provider value={{counterList, setCounterList}}>
        <Button onClick={() => setModalToggled(!isModalToggled)}>Toggle Modal</Button>
        {isModalToggled && <MyModal />}
      </CounterContext.Provider>
      </AltElementsContext.Provider>
    </div>
  );
}

const MyModal = () => {
  return (
    <Modal.Dialog >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Content />
        This is Modal Body
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default App;
