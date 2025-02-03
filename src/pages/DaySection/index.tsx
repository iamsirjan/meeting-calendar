import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useMeeting } from "./useMeeting";
import { generateTimeSlots } from "./timeutils";
import MeetingModal from "./MeetingModal";
import { parse, differenceInMinutes } from "date-fns";

// Sample Meeting Data
const meetings = [
  {
    title: "Standup Meeting",
    startTime: "08:30 AM",
    endTime: "09:00 AM",
  },
  {
    title: "Team Sync",
    startTime: "11:50 AM",
    endTime: "12:50 PM",
  },

  {
    title: "Team Sync",
    startTime: "12:50 PM",
    endTime: "1:50 PM",
  },
];

// Function to get only the minutes from a given time
const getMinutesFromTime = (time: string): number => {
  const parsedTime = parse(time, "h:mm a", new Date());
  return parsedTime.getMinutes();
};

export const DaySection = () => {
  const times = generateTimeSlots();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setStartTime, setEndTime } = useMeeting();

  const openModalHandler = (selectedTime: string, index: number) => {
    setStartTime(selectedTime);
    setEndTime(times[index * 2 + 2] || times[times.length - 1]);
    onOpen();
  };

  const getTimeDifference = (startTime: string, endTime: string): number => {
    const start = parse(startTime, "h:mm a", new Date());
    const end = parse(endTime, "h:mm a", new Date());
    return differenceInMinutes(end, start);
  };

  return (
    <Box
      borderRadius="9px"
      background="#fff"
      width="100%"
      padding={10}
      maxHeight={"100vh"}
      overflow={"scroll"}
    >
      {/* Date Header */}
      <Box textAlign="center" fontWeight="bold" fontSize="lg">
        {useMeeting().selectedDateFormatted}
      </Box>

      {/* Time Grid */}
      <Grid templateColumns="80px 1fr" position="relative">
        {/* Time Column */}
        <VStack spacing={0} align="stretch">
          {times
            .filter((_, i) => i % 2 === 0)
            .map((time) => (
              <Box
                key={time}
                h="60px"
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-end"
                pr={2}
              >
                <Text fontSize="xs">{time}</Text>
              </Box>
            ))}
        </VStack>

        {/* Meeting Slots */}
        <VStack spacing={0} align="stretch" position="relative">
          {times
            .filter((_, i) => i % 2 === 0)
            .map((time, index) => {
              return (
                <Box
                  key={index}
                  h="60px"
                  display="flex"
                  alignItems="start"
                  justifyContent="center"
                  borderBottom="1px solid gray"
                  borderLeft="2px solid gray"
                  bg={"transparent"}
                  color="white"
                  fontWeight="bold"
                  cursor={"pointer"}
                  onClick={() => openModalHandler(time, index)}
                  position="relative"
                >
                  {meetings
                    .filter(
                      (data) =>
                        data.startTime.split(":")[0] === time.split(":")[0]
                    )

                    .map((meeting, i) => (
                      <Box
                        key={i}
                        position="absolute"
                        left={0}
                        zIndex={999}
                        top={`${getMinutesFromTime(meeting.startTime)}px`}
                        h={`${getTimeDifference(
                          meeting.startTime,
                          meeting.endTime
                        )}px`}
                        bg={"red.100"}
                        w={"100%"}
                        textAlign="center"
                        fontSize="sm"
                        fontWeight="bold"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {meeting.title}
                      </Box>
                    ))}
                </Box>
              );
            })}
        </VStack>
      </Grid>

      {/* Meeting Modal */}
      <MeetingModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default DaySection;
