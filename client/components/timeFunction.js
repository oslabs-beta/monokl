export function timeFunction(connectionTIME){
    let interval = 60;
    let timeDifference = new Date() - new Date(connectionTIME);
    //Less than 1 minute
    if (timeDifference < 60000) {
      //every 1 second
      return interval = 1;
      //Less than 5 minutes
    } else if (timeDifference > 60000 && timeDifference < 300000) {
      //every 1 minute
    return interval = 60;
      //more than 1 hour but less than 2 hours
    } else if (timeDifference > 3600000 && timeDifference < 7200000) {
      //every 5 minutes= 300 seconds
      return interval = 300;
    } else if (timeDifference > 14400000) {
      //every 30 minutes = 1800 seconds
      return interval = 1800;
    }
}
