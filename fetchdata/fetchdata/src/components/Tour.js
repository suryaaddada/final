import React, { useState } from "react";
import JoyRide from "react-joyride";
import { Tooltip } from "react-tippy"


const TOUR_STEPS = [
  {
    target: ".home",
    content:
      "This is a Home page where you can see the state wise covid-19 cases till 2021 records, here all the information is there like active cases, Recovered Cases, Confirmed Cases etc",
  },
  {
    target: ".patient",
    content: "This is the Patient List where you can see all the details regarding patient",
  },
  {
    target: ".nurse",
    content:
      "This is the Nurse list where the patient can see which nurse is assigned to them and which device is assigned to them along with nurse name",
  },
  {
    target: ".device",
    content: "This is the Device list where all the details regarding Device is present",
  },
];

// Tour component
const Tour = () => {
  const [runTour, setRunTour] = useState(false);

  const handleTourStart = () => {
    console.log("Starting tour...");
    setRunTour(true);
  };

 

  return (
    <>
    <Tooltip title="start Tour">
        <div  className="tour-icon">
        <i class="fa fa-plane" aria-hidden="true" onClick={handleTourStart} style={{fontSize:"25px",color:"red"}}></i>
        </div>
  
    </Tooltip>
     
      
      <JoyRide
        steps={TOUR_STEPS}
        continuous={true}
        showSkipButton={true}
        run={runTour}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          buttonNext: {
            backgroundColor: "green",
          },
          buttonBack: {
            marginRight: 10,
          },
        }}
        locale={{
          last: "End tour",
          skip: "Close tour",
        }}
      />
    </>
  );
};

export default Tour;
