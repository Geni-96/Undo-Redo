import React from 'react';
import './App.css';

type Point = {
  x:number,
  y:number
}
function App() {
  const [cur,setCur] = React.useState<Point[]>([]);
  const [popped,setPopped] = React.useState<Point[]>([]);
  function handlePlaceCircle(e:React.MouseEvent<HTMLDivElement>){
    const {clientX , clientY} = e;
    setCur([...cur, {x:clientX, y:clientY}]);
  }
  function handleUndo(){
    let newCur = [...cur];
    let element: Point | undefined = newCur.pop()
    if (element){
      setPopped([...popped, element]);
      setCur(newCur);
    }
  }
  function handleRedo(){
    let newpopped = [...popped];
    let element: Point | undefined = newpopped.pop();
    if (element){
      setCur([...cur,element]);
      setPopped(newpopped);
    }
  }
  return (
    <>
      <div className="App" onClick={handlePlaceCircle}>
        {cur.map((p)=>(<div className="point" style={{left: p.x, top: p.y}}></div>))}
      </div>
      <button disabled={cur.length===0} onClick={handleUndo} className="buttons">Undo</button>
      <button disabled = {popped.length===0} onClick={handleRedo} className="buttons">Redo</button>
    </>
  );
}

export default App;
