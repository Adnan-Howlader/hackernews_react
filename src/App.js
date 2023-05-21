// import logo from './logo.svg';
import './App.css';
import React from 'react';

let Consoles = [
  {
    id: 1,
    name: "nes",
  },
  {
    id: 2,
    name: "switch",
  },
  {
    id: 3,
    name: "gameboy",
  },
  {
    id: 4,
    name: "gamecube",

  },
  {
    id: 5,
    name: "wii",
  },

];

const useSemiPersistentState=(key,initialState)=>{

  let [value, setvalue] = React.useState(localStorage.getItem(key)||initialState);//array destructuring

  React.useEffect(()=>{// runs on first render and when any variable in the array changes
    localStorage.setItem('key',value);
  },[value,key]);

  return [value,setvalue];

};




const App=()=> {

  
  const [searchTerm,setSearchTerm]=useSemiPersistentState('search','switch'); //array destructuring
  
  const handleSearch=(event)=>{
     setSearchTerm(event.target.value);
     console.log(searchTerm)
    
  }
  //create a list of objects that store id and name of nintendo console

 


  const filteredItem=Consoles.filter((Console)=>{
    return Console.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  

  return(

    <>
     <InputWithLabel id="search"  onInputChange={handleSearch} value={searchTerm} type="text" isFocused>
         My Video Game store
      </InputWithLabel>
     <List list={filteredItem}  />
     
     

    </>  
 
  );
  
  
}


const List=({list})=>{//destructuring props object
  return list.map((item)=><Item key={(item.id)} name={item.name} />)};
 



const Item=({name})=>{//destructuring props object
  return <li>{name}</li>};




const InputWithLabel=({type,id,value,onInputChange,children,isFocused})=>{//destructuring props object

  
   

  // //do something here
  // const handleChange=(event)=>{
  //   //updating the states
  //   setSearchTerm(event.target.value);
  //   props.onSearch(event);
  // }

  const inputRef=React.useRef()

  React.useEffect(()=>{
    if(isFocused && inputRef.current){
       //clear the input field
       inputRef.current.focus();
        inputRef.current.value='';
        
      
    }


  },[isFocused])
  

  
  return (
     //returning a fragment
  <> 
  <h1>{children}</h1>
  <label htmlFor={id}>Search: </label>
  <input ref={inputRef}
  type={type}
  onChange={onInputChange}
  value={value} 
  autoFocus={isFocused}
  />
  
  <p>Searching for <strong>{value}</strong></p>
  
 

</>)};

export default App;



