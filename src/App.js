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
  const [isModalToggled, setModalToggled] = useState(true);
  const [counterList, setCounterList] = useState([3,1,2,3]);
  const updateAltElementList = () => {
    const altAttributes = ["aria-label", "cms-id", "alt"]
    const currList = [];
    altAttributes.forEach(attr => {
      document.querySelectorAll(`[${attr}]`).forEach((element) => {
        const altElement = <AltElement element={element} isHighlight={false} value={element.getAttribute(attr)}/>
        currList.push(altElement)
      });
    })
    setAltElementList(currList);
    console.log(currList)
  }

  useEffect(() => {
    updateAltElementList();
    console.log("Fired once")
    const observer = new MutationObserver((mutations) => {
      console.log("Observing")
      console.log(mutations)
      updateAltElementList();
    })
    observer.observe(document.body, {
      characterDataOldValue: true,
      subtree: true,
      childList: true,
      characterData: true,
    })
  }, [])
  const addElement = () => {
    const altElement = document.createElement('div');
    altElement.textContent = "New Element"
    altElement.setAttribute('aria-label', 'Appended')
    document.getElementById('main-body').appendChild(altElement);
    console.log("Add element")
    console.log(document.getElementById('main-body'))
  }
  return (
    <div id="main-body" className="App">
      <Button onClick={addElement}>Click me to add element</Button>
      <div aria-label='Alternate Label 1'>Element with aria-label</div>
      <div>Element without aria-label</div>
      <div aria-label='Alternate Label 2'>Element with aria-label</div>
      <div>Element without aria-label</div>
      <div aria-label='Alternate Label 3'>Element with aria-label</div>
      <div>Element without aria-label</div>
      <div cms-id="12345">Highlight me</div>
      <img src="avatar.png" alt="Avatar" width="200" height="200"></img>
      <div></div>
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
