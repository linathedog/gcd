import React,{useEffect,useState} from 'react';
import { Html5Entities } from 'html-entities';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd';
import {shuffle} from './functions.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useHistory } from "react-router-dom";
const algorithms = require('./algorithms.json');


const Challenge = (props)=> {
  const [a,setA] = useState("");
  const [b,setB] = useState("");
  const [solved,setSolved] = useState(0);
  const [error,setError] = useState(false);
  const [showCorrect,setShowCorrect] = useState(false);
  let history = useHistory();


  const isNumber =(e)=>{
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
       return true;
    }
    else {
      return false}
  }
  const isSolved = ()=>{

    if(solved===0 && a ===20 && b===4){
      setShowCorrect(true);
      return true;
    }
    if(solved===1 && Number(a) === 2){ //
      setShowCorrect(true);
      return true
    }
    else{
      return false;
    }
  }
  const solve = ()=>{
    setError(false);
    if(solved===0){
      setA(20);
      setB(4);
    }
    if(solved===1){
      setA(2);
    }
  }
  return(
    <div className="challenge-container">
      <div className='challenge-question'>
        <span>{solved<1?"Ας υποθέσουμε ότι ότι αρχικοποιούμε τον αλγόριθμο με τις τιμές a = 4 και b = 20. Μετά την πρώτη επανάληψη του Αλγορίθμου τι τιμές θα έχουν οι μεταβλητές a και b;":null}</span>
        <span>{solved===1?"Πόσες φορές θα εκτελεστεί ο κώδικας που βρίσκεται μέσα στον βρόχο επανάληψης ΟΣΟ;":null}</span>
      </div>
        <div className='challenge-input-container'>
          <Row>
          <Col md="auto" className="small-input">
            <div>
            {solved<1?
              <React.Fragment>
              <InputGroup className="mb-3" >
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">a =</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder=""
                  className={showCorrect?"input-correct":null}
                  aria-describedby="basic-addon1"
                  value={a}
                  maxlength="2"
                  onChange={(e)=>{if(isNumber(e)){setA(e.target.value); setError(false);}}}
                />
              </InputGroup>

              <InputGroup className="mb-3 small-input" >
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">β =</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder=""
                  aria-describedby="basic-addon1"
                  className={showCorrect?"input-correct":null}
                  value={b}
                  maxlength="2"
                  onChange={(e)=>{if(isNumber(e)){setB(e.target.value); setError(false);}}}
                />
              </InputGroup>
              </React.Fragment>:null
            }
            {solved===1?
            <InputGroup className="mb-3 challenge-input-2" >
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Αριθμός Επαναλήψεων =</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder=""
                className={showCorrect?"input-correct":null}
                aria-describedby="basic-addon1"
                value={a}
                maxlength="2"
                onChange={(e)=>{if(isNumber(e)){setA(e.target.value)}}}
              />
            </InputGroup>:null}
          </div>
          </Col>
            <Col className="controls-container">
              <div className="button-container">
              {error?<div>
                Η λύση σας δεν είναι σωστή, προσπαθήστε ξανά!
              </div>:null}
                <div>
                  <div className="button-container-inner">
                    {!showCorrect?<Button variant="success"  onClick={()=>{solve();}}>Λύση</Button>:null}
                    {!showCorrect?<Button onClick={()=>{if(isSolved()){setShowCorrect(true);}else{setError(true);}}}>Υποβολή</Button>:null}
                    {showCorrect&&solved===0?<Button onClick={()=>{setSolved(solved+1); setA(""); setShowCorrect(false);}}>{}Συνέχεια</Button>:null}
                    {showCorrect&&solved===1?<Button onClick={()=>{history.push("/end");}}>Τελος</Button>:null}

                  </div>
                </div>
              </div>
            </Col>
          </Row>

        </div>

    </div>
  )
}



export function Test() {
  const [currentAlg,setCurrentAlg] = useState(0);
  const [algorithm, setAlgorithm] = useState(shuffle(algorithms[0].code));
  //const [algorithm, setAlgorithm] = useState(algorithms[0].code);
  const [description,setDescription] = useState(algorithms[0].description);
  const [solved,setSolved] = useState(false);
  const [challengesSolved,setChallengesSolved] = useState(!algorithms[0].challenges);
  const [showErrors,setShowErrors] = useState(false);
  const [hiddenSolved,setHiddenSolved] = useState(false);
  useEffect(()=>{
    console.log(algorithm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[algorithm]);
  const entities = new Html5Entities();


  function handleOnDragEnd(result) {
    if (!result.destination) return;
    setShowErrors(false);
    console.log(result);
    let items = Array.from(algorithm);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    items= [...items];
    setAlgorithm(items);

  }


  const solveOrder = ()=>{
    let arr = [algorithm];
    algorithm.forEach((item,index)=>{
      arr[item.id-1]=item;
      arr[item.ordered] = true;
    });
    setAlgorithm(arr);
    setSolved(true);
  }
  const checkOrder = ()=> {
    let i = 1;
    let is_solved = true;
    let arr = [...algorithm];
    arr.forEach((item,index)=>{
      if(item.id===Number(i)){

          arr[index].ordered=true;
      }
      else{
          is_solved = false
          arr[index].ordered=false;
      }
      i++;
    });
    if(!is_solved){
      setShowErrors(true);
    }
    setSolved(is_solved);
    setAlgorithm(arr);
  }


  const nextAlg = () => {

      if(algorithms[currentAlg+1]){
        setAlgorithm(shuffle(algorithms[currentAlg+1].code));
        //setAlgorithm(algorithms[currentAlg+1].code);
        setDescription(algorithms[currentAlg+1].description);
        setCurrentAlg(currentAlg+1);
        setChallengesSolved(!algorithms[currentAlg+1].challenges)
        setSolved(false);
        setHiddenSolved(false);
      }
  }


  return (
    <div className="main-container">
      <Row>
        <Col className="description-row">
          <Row>
          <h2>{algorithms[currentAlg].name}</h2>
          {/*<Button  onClick={()=>{shufleAlg();}}>Ανακάτεμα</Button>*/}
          </Row>
          <Row>
            <p>
              {description}
            </p>
          </Row>
          {!challengesSolved&&hiddenSolved?
            <Row>

              <Challenge solved={solved} currentAlg={currentAlg}/>

            </Row>:null}
          {!hiddenSolved?
            <Row>
              <div className="challenge-container">
                <div className='challenge-question'>
                  <span>Βαλτε τις εντολές του αλγορίθμου στην σωστή σειρά. Μετακινήστε μία μία τις εντολές σέρνοντας τες στην θέση που επιθυμείτε.</span>
                </div>
                  <div className='challenge-input-container'>
                    <Row >
                      <Col className="controls-container">
                        <div>
                          <div className="button-container">
                            <div className="button-container-inner">
                              <Button disabled={solved} onClick={()=>{solveOrder();}}>Λύση</Button>
                              <Button variant={!solved?'success':'secondary'}  disabled={solved} onClick={()=>{checkOrder();}}>Έλεγχος Λύσης</Button>
                              <Button variant={solved?'success':'secondary'} disabled={!solved}  onClick={()=>{if(challengesSolved){nextAlg();}else{setHiddenSolved(true);}}}>Συνέχεια <FontAwesomeIcon icon={faArrowRight}/></Button>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>

                  </div>

              </div>
            </Row>:null}

        </Col>
        <Col md="auto">
          <Row>
            <div className='algorithm-container'>
              <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="algorithm" >
                {(provided) => (
                  <ul className="algorithm" {...provided.droppableProps} ref={provided.innerRef}>
                    {algorithm.map(({id, value,ordered},index) => {
                      return (
                        <Draggable key={id}  draggableId={id}  index={index} isDragDisabled={solved}>
                          {(provided) => (
                            <li ref={provided.innerRef}  className={(!ordered&&showErrors?'invalid-item':null)+ ' unselectable ' + (ordered&&solved?'solved-item':null)} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <p>
                                { entities.decode(value) }
                              </p>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
                </Droppable>
              </DragDropContext>
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
}





export function Test2() {


  return (
    <div>
      <h1>This is a test </h1>
      <DragDropContext>
      <Droppable droppableId="algorithm">
        {(provided) => (
          <ul className="algorithm">
            ...
          </ul>
        )}
      </Droppable>
      </DragDropContext>
    </div>
  );
}
