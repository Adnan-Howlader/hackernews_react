// import logo from './logo.svg';
import './App.css';
import React from 'react';

const items = [
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

const getAsyncStories=(resolve,reject)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve({data:{stories:items}});
    },3000);//3 seconds delay and then resolve the promise
  });


}//returns a promise

const useSemiPersistentState=(key,initialState)=>{

  let [value, setvalue] = React.useState(localStorage.getItem(key)||initialState);//array destructuring

  React.useEffect(()=>{// runs on first render and when any variable in the array changes
    localStorage.setItem('key',value);
  },[value,key]);

  return [value,setvalue];

};




const App=()=> {

  
  const [searchTerm,setSearchTerm]=useSemiPersistentState('search','switch'); //array destructuring
  const [Consoles,setConsoles]=React.useState([]);//array destructuring
  const handleSearch=(event)=>{
     setSearchTerm(event.target.value);
     console.log(searchTerm)
    
  }

  React.useEffect(()=>{
    getAsyncStories().then((result)=>setConsoles(result.data.stories));
  },[]);//empty array means it runs only on first render
  
  //create a list of objects that store id and name of nintendo console

  const handleRemoveItem=(item)=>{//filter out the item that matches the id
    const newConsoles=Consoles.filter((Console)=>Console.id!==item.id);
    setConsoles(newConsoles);
  }

 


  const filteredItem=Consoles.filter((Console)=>{
    return Console.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  

  return(

    <>
     <InputWithLabel id="search"  onInputChange={handleSearch} value={searchTerm} type="text" isFocused>
         My Video Game store
      </InputWithLabel>
     <List list={filteredItem} onRemoveItem={handleRemoveItem}  />
     
     

    </>  
 
  );
  
  
}


const List=({list,onRemoveItem})=>{//destructuring props object
  return list.map((item)=><Item key={item.id} item={item} onRemoveItem={onRemoveItem} />)};
 



const Item=({item,onRemoveItem})=>{//destructuring props object
  
  
  function RemoveItem(){
    onRemoveItem(item);
  }

 
  return <div>

  <span>
    {item.name}

  </span>
  <span><button type="button" onClick={()=>onRemoveItem(item)}>Dismiss</button></span>
  
  </div>;
};




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



