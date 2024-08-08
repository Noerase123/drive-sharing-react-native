import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getStatus } from "../store/reducers/ProcessBookingSlice";

export default function useTimer() {
  const [accepted, setAccepted] = useState(0);
  const [started, setStarted] = useState(0);
  const [pickedUp, setPickedUp] = useState(0);
  const {status} = useSelector(getStatus);

  const resetTimer = () => {
    setAccepted(0);
    setStarted(0);
    setPickedUp(0);
  }

  useEffect(() => {
    if (status === 'accepted') {
      setTimeout(() => {
        setAccepted(prev => prev + 1);
      }, 1000);
    }
  }, [status, accepted]);

  useEffect(() => {
    if (status === 'picked-up') {
      setTimeout(() => {
        setPickedUp(prev => prev + 1);
      }, 1000);
    }
  }, [status, pickedUp]);

  useEffect(() => {
    if (status === 'started') {
      setTimeout(() => {
        setStarted(prev => prev + 1);
      }, 1000);
    }
  }, [status, started]);
  
  return {
    accepted,
    started,
    pickedUp,
    resetTimer
  }

}
