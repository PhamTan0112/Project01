const CronJob = require("cron").CronJob;
const Flight = require("../models/Flight");

exports.checkDateAvailability = date => {
  if (new Date(date) < new Date()) {
    return false;
  } else {
    return true;
  }
};

exports.runEveryMidnight = () => {

  new CronJob(
    "0 0 0 * * *",
    async function() {
      console.log("You will see this message every midnight", new Date());
      const flightes = await Flight.find({});

      flightes.map(async flight => {
     
       if(flight.journeyDate){
         if(!exports.checkDateAvailability(flight.journeyDate)){
           flight.isAvailable = false;
         }
       }
     
       await flight.save();
     
       })
    },
    null,
    true,
    "Asia/Katmandu"
  );
};
