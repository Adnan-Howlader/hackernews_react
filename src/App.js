// import logo from './logo.svg';
import './App.css';
import React from 'react';





const App=()=> {

  let [searchTerm, setSearchTerm] = React.useState("nes");//array destructuring
  
  const handleSearch=(event)=>{
     setSearchTerm(event.target.value);
     console.log(searchTerm)
  }
  //create a list of objects that store id and name of nintendo console

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


  
  const filteredItem=Consoles.filter((Console)=>{
    return Console.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  





  return(

    <>
     <Search onSearch={handleSearch}  search={searchTerm}/>
     <List list={filteredItem} />

    </>
  
 
  );

 
      
    
  
}


const List=(prop)=>{

  return (
   
    <>
    {prop.list.map(function(item){
      
       
    
    
    
      return <div key={item.id}> {item.name} </div>
    })}
    </>)

  
}

const Search=(props)=>{

  


  // //do something here
  // const handleChange=(event)=>{
  //   //updating the states
  //   setSearchTerm(event.target.value);
  //   props.onSearch(event);
  // }
  

  
  return (
     
  <>
  <h1>My arcade stores</h1>
  <label htmlFor="search">Search: </label>
  <input id="search" type="text" onChange={props.onSearch}  />
  
  <p>Searching for <strong>{props.search}</strong></p>
  
 


    




</>)};







export default App;



