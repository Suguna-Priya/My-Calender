import { useState } from 'react'

import leftarrow from './assets/left-arrow.png'
import rightarrow from './assets/right-arrow.png'
import january from './assets/january.jpg';


import './App.css'

function App() {

  const [selectedDate,setSelectedDate] = useState(new Date())
  const currentDate = new Date().getDate();

  const dayOfWeek = ['Sun','Mon','Tues','Wed','Thu','Fri','Sat'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  //console.log(selectedDate);

  const daysInMonth = () =>{

    const daysArray=[];

    const firstDay = new Date(selectedDate.getFullYear(),selectedDate.getMonth(),1);
    const lastDay = new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,0);
    
    for(let i=0;i<firstDay.getDay();i++){
      daysArray.push(null);
    }

    for(let i=1;i<=lastDay.getDate();i++){
      daysArray.push(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),i));
    }

    return daysArray;

  }

  const handleChangeMonth=(e)=>{
    const newMonth = parseInt(e.target.value);
    //console.log(newMonth);
    setSelectedDate(new Date(selectedDate.getFullYear(), newMonth, 1))
  }

  const handleChangeYear =(e)=>{
    const newYear = parseInt(e.target.value);

    setSelectedDate(new Date(newYear,selectedDate.getMonth(),1));
  }

  const nextMonthChange = ()=>{
    setSelectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,1));
  }

  const prevMonthChange=()=>{
    setSelectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()-1,1));
  }

  const isSameDay=(date1,date2)=>{
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  }

  console.log(selectedDate.getMonth())
  
  return (
    <>
      <div className={`calender-app ${(selectedDate.getMonth()===2 || selectedDate.getMonth()===3 || selectedDate.getMonth()===4)? "spring" 
      : (selectedDate.getMonth()===11 || selectedDate.getMonth()===1 || selectedDate.getMonth()===0)? "winter" 
      : (selectedDate.getMonth()===5 || selectedDate.getMonth()===6 || selectedDate.getMonth()===7)? "summer": "autunm"}`}>
        <div className="header">
          <button onClick={prevMonthChange}>
            <img src={leftarrow} className='arrow' />
          </button>

          <select name="month" value={selectedDate.getMonth()} onChange={handleChangeMonth}>
            {months.map((month,index)=>(
              <option value={index} key={index}>{month}</option>
            ))}
          </select>

          <select name="year" value={selectedDate.getFullYear()} onChange={handleChangeYear}>
            { 
              Array.from({length:20},(_,i)=> selectedDate.getFullYear() - 10 +i).map((year)=>(
                <option value={year} key={year}>{year}</option>
              ))
            }
          </select>
          <button  onClick={nextMonthChange}>
          <img src={rightarrow} className='arrow'/>
          </button>
        </div>
        <div className="daysOfWeek">
          {dayOfWeek.map((day)=>(
            <div key={day} className='day'>{day}</div>
          ))}
        </div>

        <div className="dates">
          {daysInMonth().map((day,index)=>(
            <div key={index} className={day?`date ${isSameDay(day,new Date())? "currentDate" : ""}`:"empty"}>
              {day?day.getDate():""}</div>
          ))}
        </div>
        
        <p className='footer'>Designed By <span>Suguna Priya</span></p>

      </div>
    </>
  )
}

export default App
