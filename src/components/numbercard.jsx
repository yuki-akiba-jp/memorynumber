import { Box } from "@chakra-ui/react";
export function NumberCard({ number }) {
  return (
    <Box
      fontWeight="bold"
      fontSize={{ base: "200px", md: "300px", lg: "400px" }}
    >
      {number}
    </Box>
  );
}
