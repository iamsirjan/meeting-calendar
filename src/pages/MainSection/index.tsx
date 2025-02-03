import { Box, Flex } from "@chakra-ui/react";
import { DaySection } from "../DaySection";
import { LeftSection } from "../LeftSection";

export const MainSection = () => {
  return (
    <Box
      background={"#F0F0F0"}
      maxHeight={"100vh"}
      w={"100%"}
      overflow={"hidden"}
    >
      <Flex gap={2} padding={10}>
        <LeftSection />
        <DaySection />
      </Flex>
    </Box>
  );
};
