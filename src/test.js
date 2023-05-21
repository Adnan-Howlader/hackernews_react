const user={
    id:'1',
    firstName:'Robin',
    lastName:'Wieruch',
    country:'Germany',
    city:'Berlin',

}


const {id,country,city,...userWithoutAddress}=user;//deconstructing the object

console.log(userWithoutAddress);
console.log(city);


