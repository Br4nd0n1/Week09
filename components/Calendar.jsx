import React from 'react';
import { Box, Button, Grid, GridItem, Badge } from "@chakra-ui/react";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteFromDatabase } from "../api/dBHelper";
import { refreshData } from "../api/utilitties";
import Link from 'next/link';
const Calendar = () => {
  // Get the current date
  const date = new Date();
  const dateName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // Get the number of days in the current month
  
  const [month, setMonth] = React.useState(date.getMonth() + 1);
  const [year, setYear] = React.useState(date.getFullYear());
  const [startReached, setStartReached] = React.useState(month === 0);
  const [endReached, setEndReached] = React.useState(month === 11);
  const [events, setEvents] = React.useState([]);

  refreshData(setEvents, "events")
  // Create an array of days
  let daysInMonth = new Date(date.getFullYear(), month, 0).getDate();
  const [days, setDays] = React.useState(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  function handleDateUpdate(newMonth)
  {
     setMonth(newMonth)
  }

  function getEventData(localEvent, calendarDate) {
    let data = []
    data = localEvent && localEvent.map((item) => { 
      if(item.date == calendarDate) {
        return (
        <>
        <br></br><Link href={`/events/${item.id}`} color="blue.500">{item.title}</Link>
        <Badge
    color="red.500"
    bg="inherit"
    transition={"0.2s"}
    _hover={{
    bg: "inherit",
    transform: "scale(1.2)",
    }}
    float="right"
    size="xs"
    onClick={() => deleteFromDatabase("events",item.id)}
> <FaTrash />  </Badge>
        </>
        );
      }
      return null;
    })
    return data.filter(filterItem => filterItem !== null);;
  }
  
  function getDay(i)
  {
    let localDay = i + 1
    if (localDay < 10)
    {
      return `0${localDay}`
    }
    return localDay
  }

  React.useEffect(() => {
    daysInMonth = new Date(date.getFullYear(), month, 0).getDate();
    setDays(Array.from({ length: daysInMonth }, (_, i) => getDay(i)));
    
    if(month == 12)
    {
      setEndReached(true);
      console.log("End Reached")
    }
    else if(month == 1)
    {
      setStartReached(true);
    }
    else
    {
      setStartReached(false);
      setEndReached(false);
    }
  }, [month]);
  
   const handleChangeYear = (event) => {
     setYear(event.target.value);
   };

   const getYearOptions = () => {
     const currentYear = (new Date()).getFullYear();
     let years = [];
     for(let i = currentYear; i <= currentYear + 100; i++) {
       years.push(i);
     }
     return years;
   };


   console.log(events)
   return (
     <Box>
       <p>{dateName[month-1]}</p>
       <Button isDisabled={startReached} onClick={() => handleDateUpdate(month-1)}>Prev</Button>
       <Button isDisabled={endReached} onClick={() => handleDateUpdate(month+1)}>Next</Button>
       <select value={year} onChange={handleChangeYear}>
         {getYearOptions().map((yearOption, index) => (
           <option key={index} value={yearOption}>{yearOption}</option>
         ))}
       </select>
       <Grid templateColumns='repeat(7, 1fr)' gap={6}>
         {days.map((day, index) => (
           <GridItem key={index} w='100%' h='20' bg='blue.500'>
             {day}.{getEventData(events,`${year}-${month}-${day}`)}
           </GridItem>
         ))}
       </Grid>
     </Box>
   );
 };

 export default Calendar;
