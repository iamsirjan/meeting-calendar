import { Box } from "@chakra-ui/react";
import { DaySection } from "../DaySection";

export const MainSection = () => {
  return (
    <Box background={"#000"} minHeight={"100vh"} w={"100%"}>
      <DaySection />
    </Box>
  );
};
