import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Wrap,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { useMeeting } from "./useMeeting";
import { generateTimeSlots } from "./timeutils";

const MeetingModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    selectedDate,
    setSelectedDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    guests,
    guestEmail,
    setGuestEmail,
    addGuest,
    removeGuest,
  } = useMeeting();
  const times = generateTimeSlots();

  console.log(startTime);
  console.log(endTime);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody marginTop={3}>
          <Flex flexDirection={"column"} gap={4}>
            {/* Title Input */}
            <Input placeholder="Enter Title" size="md" />

            {/* Date Picker */}
            <Box>
              <Text fontWeight="bold" fontSize="sm" mb={1}>
                Select Date
              </Text>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Box>

            {/* Time Selection */}
            <Box>
              <Text fontWeight="bold" fontSize="sm" mb={1}>
                Start Time
              </Text>
              <Select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Select>
            </Box>

            <Box>
              <Text fontWeight="bold" fontSize="sm" mb={1}>
                End Time
              </Text>
              <Select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              >
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Select>
            </Box>

            {/* Guest Email Input */}
            <Box>
              <Text fontWeight="bold" fontSize="sm" mb={1}>
                Add Guests (Press Enter to add)
              </Text>
              <Input
                placeholder="Enter email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addGuest()}
              />
              <Wrap mt={2}>
                {guests.map((email, index) => (
                  <Tag key={index} colorScheme="blue" borderRadius="full">
                    <TagLabel>{email}</TagLabel>
                    <TagCloseButton onClick={() => removeGuest(email)} />
                  </Tag>
                ))}
              </Wrap>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex gap={4}>
            <Button onClick={onClose} colorScheme="gray">
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MeetingModal;
