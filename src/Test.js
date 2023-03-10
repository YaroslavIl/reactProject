import React from 'react';
import { useState, createRef } from 'react';

import { useEffect } from 'react';


  

function Test() {
    let ref = React.createRef()
    console.log(ref);

    const [coment, setComent] = useState([])

    useEffect(() => {
    fetch('https://reqres.in/api/users?page=2')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }, []);


    let addComent = () => {
        let inputValue = ref.current.value
        let cometns = [...coment, inputValue]
        console.log(cometns);
        setComent(cometns)
        ref.current.value = ''
    }

    return (
        <div>
            <input type="text"  ref={ref}/>
            <button onClick={addComent}>add</button>
            <div>{coment.map((item, index) => (<div key={index}> {item}</div>))}</div>
            <button></button>
        </div>
    );
};

export default Test;