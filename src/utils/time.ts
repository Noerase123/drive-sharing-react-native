export const msToTime = (ms: number) => {
  const seconds = parseFloat((ms / 1000).toFixed(2));
  const minutes = parseFloat((ms / (1000 * 60)).toFixed(2));
  const hours = parseFloat((ms / (1000 * 60 * 60)).toFixed(2));
  const days = parseFloat((ms / (1000 * 60 * 60 * 24)).toFixed(2));
  if (seconds < 60) return seconds + ' secs';
  else if (minutes < 60) return minutes + ' mins';
  else if (hours < 24) return hours + ' hrs';
  else return days + ' days';
};