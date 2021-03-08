import React from 'react';
import Card from './card';



function Cardlist(props){
	console.log(props)
	const{robots} = props; 
return(
robots.map(robot =>{
	return <Card id = {robot.id} name ={robot.name} email = {robot.email}/>
})

);
}

export default Cardlist;