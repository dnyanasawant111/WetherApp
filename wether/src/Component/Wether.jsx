import React,{useState,useEffect} from 'react'
import Axios from 'axios'
export default function App() {
  const [state,setState]=useState([{
   
    name:'',
    temp:"",
    humidity:"",
    windSpeed:""
    
  }])
  
  const [search,setSearch]=useState("")
  
async  function getData(){
    const result=await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=15bc724e15413bec824d93830caf5b9c`)
  setState({
    name:result.data.name,
    temp:((result.data.main.temp)-273.15).toFixed(2),
     humidity:result.data.main.humidity,
    windSpeed:result.data.wind.speed
   
  })
  console.log(result.data)
  }

  async  function getData1(){
    const result=await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=15bc724e15413bec824d93830caf5b9c`)
  setState({
    name:result.data.name,
    temp:((result.data.main.temp)-273.15).toFixed(2),
     humidity:result.data.main.humidity,
     windSpeed:result.data.wind.speed
   
  })
  console.log(result.data)
  }
  
    useEffect(()=>{
      if(search.length==0){
       getData1() 
      }
      
    },[])
  
  
  function onchange(event){
    setSearch(event.target.value)
  }
  
 const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`;
const time = new Date();
const gettime=(`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`);

  return (
    <div className='main'>
      <input placeholder='Enter city name to search Temperature' className="form-control" type={"text"} onChange={onchange}/> <br/>
      
    <button class="btn btn-warning" onClick={getData}> Get Temperture </button> <br/> <br/>
      
      <div className='gridd'>  
        
        <img className='img' src="https://clipartspub.com/images/clipart-clouds-animated-3.png"/>
        
        <p>   <img className='img1' src="https://vectorified.com/images/location-icon-png-transparent-5.png"/> <strong> {state.name} </strong></p>
      <p > <strong> Date: {currentDate}</strong> </p> 
      <p > <strong> Time: {gettime}</strong> </p> 
     <p> <strong> Temp:{state?.temp}	℃
 </strong> </p> 
         <p> <strong>  Humidity:{state.humidity}% </strong> </p> 
         <p> <strong>  Wind Speed:{state.windSpeed}	m/sec </strong> </p> 
   
      </div>
    
    </div>
  )
}
