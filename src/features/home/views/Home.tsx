import { Box, Typography } from "@mui/material";

import { winkFace } from "../../../assets/images";

const Home = () => {
  return (
    <Box
      height="100%"
      width="100%"
      bgcolor="#F1F4F7"
      p={2}
      sx={{ flex: 1, overflowY: "overlay" }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <img src={winkFace} alt="face" width={50} height={50} />
      <Box mt={1} textAlign="center">
        <Typography variant="body1" color="primary">
          We're preparing something special for you,
        </Typography>
        <Typography variant="body1" color="primary">
          explore patients menu for now!
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
