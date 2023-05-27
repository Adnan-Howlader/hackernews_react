// import logo from './logo.svg';
import './App.css';
import React from 'react';

let items = [
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


//reducer function
const consoleReducer=(state,action)=>{
  if(action.type==='FETCH_INIT'){
    return {...state,isLoading:true,isError:false};
  }
  else if(action.type==='FETCH_SUCCESS'){
    return {data:action.payload,isError:false,isLoading:false};
  }

  else if(action.type==='REMOVE_CONSOLE'){
    const new_consoles=state.data.filter((Console)=>Console.objectID
    !==action.payload.objectID  );
    return {data:new_consoles,isError:false,isLoading:false};
  }
  else if(action.type==='SET_ERROR'){
    return {...state,isError:true,isLoading:false}
  }
  else{
    throw new Error();
  }
  
};



const getAsyncStories=(resolve,reject)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve({consoles:items});//it sends resolved promise 
      //reject(new Error('Error occured'));//it sends rejected promise

    },3000);//0 seconds delay and then resolve the promise
  });


}//returns a promise

const useSemiPersistentState=(key,initialState)=>{

  let [value, setvalue] = React.useState(localStorage.getItem(key)||initialState);//array destructuring

  React.useEffect(()=>{// runs on first render and when any variable in the array changes
    localStorage.setItem('key',value);
  },[value,key]);

  return [value,setvalue];

};

const API_ENDPOINT='https://hn.algolia.com/api/v1/search?query='






const App=()=> {

  

  
  const [searchTerm,setSearchTerm]=useSemiPersistentState('search',''); //array destructuring
  // const [Consoles,setConsoles]=React.useState([]);//array destructuring
  const [Consoles,dispatchConsoles]=React.useReducer(consoleReducer,{data:[],isError:false,isLoading:true});//array destructuring



  const handleSearch=(event)=>{
     setSearchTerm(event.target.value);
     console.log(searchTerm)
    
  }
  

  React.useEffect(()=>{

    //loading
    dispatchConsoles({type:'FETCH_INIT'});

    //getAsyncStories().then((result)=>
    //dispatchConsoles({type:'SET_CONSOLE',payload:result.consoles})).catch(error=>dispatchConsoles({type:'SET_ERROR'}));
    
   if (!searchTerm) return;
    fetch(`${API_ENDPOINT}${searchTerm}`)
    .then(response=>response.json())
    .then((result)=>{
      
      dispatchConsoles({type:'FETCH_SUCCESS',payload:result.hits})}
    ).catch(error=>dispatchConsoles({type:'SET_ERROR'}));
   
  }  ,[searchTerm]);//empty array means it runs only once on first render

  
    
  
//empty array means it runs only once on first render

  //create a list of objects that store id and name of nintendo console

  const handleRemoveItem=(item)=>{//filter out the item that matches the id
    //const newConsoles=Consoles.filter((Console)=>Console.id!==item.id);
    dispatchConsoles({type:'REMOVE_CONSOLE',payload:item});
   
  }

 


  const filteredItem=Consoles.data.filter((Console)=>{
    //if console.title is not none

    
     
    if (Console.title!==null){

        return Console.title.toLowerCase().includes(searchTerm.toLowerCase());}
  
  });
  
  

  return(

    <>
     <InputWithLabel id="search"  onInputChange={handleSearch} value={searchTerm} type="text" isFocused>
         Hackernews 
      </InputWithLabel>

      {Consoles.isError && <p>Something went wrong...</p>}

      {Consoles.isLoading?<p>Loading...</p>:<List list={filteredItem} onRemoveItem={handleRemoveItem}  />}
     
     
     

    </>  
 
  );
  
  
}


const List=({list,onRemoveItem})=>{//destructuring props object
  return list.map((item)=><Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />)};
 



const Item=({item,onRemoveItem})=>{//destructuring props object
  
  
  function RemoveItem(){
    onRemoveItem(item);
  }

 
  return <div>

  <span>
    {item.title}

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



