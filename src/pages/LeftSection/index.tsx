import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
export const LeftSection = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <Box>
      <Calendar onChange={setDate} value={date} minDetail="year" />
    </Box>
  );
};
