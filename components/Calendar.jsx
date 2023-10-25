import React from 'react';
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";

import { refreshData } from "../api/utilitties";
const Calendar = () => {
  // Get the current date
  const date = new Date();
  
  // Get the number of days in the current month
  const [month, setMonth] = React.useState(date.getMonth() + 1);
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

  function getEventData(localEvent, day) {
    let data = []
    data = localEvent && localEvent.map((item) => { 
      if(item.description == day) {
        return <p >{item.title}</p>;
      }
      return null;
    })
    return data.filter(filterItem => filterItem !== null);;
  }
  

  React.useEffect(() => {
    daysInMonth = new Date(date.getFullYear(), month, 0).getDate();
    setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    
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
  console.log(events)
  return (
    <Box>
      
      {/* <p>{month}</p> */}
      <Button isDisabled={startReached} onClick={() => handleDateUpdate(month-1)}>Prev</Button>
      <Button isDisabled={endReached} onClick={() => handleDateUpdate(month+1)}>Next</Button>
      <Grid templateColumns='repeat(7, 1fr)' gap={6}>
        {days.map((day, index) => (
          <GridItem key={index} w='100%' h='20' bg='blue.500'>
            {day}{getEventData(events,day)}
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Calendar;
