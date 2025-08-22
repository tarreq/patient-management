import { Box, Typography } from "@mui/material";

import { winkFace } from "../../../assets/images";

const Home = () => {
  return (
    <Box
      height="100vh"
      width="100%"
      bgcolor="bg.main"
      p={2}
      sx={{ flex: 1, overflowY: "overlay" }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <img src={winkFace} alt="face" width={50} height={50} />
      <Box mt={1} textAlign="center">
        <Typography variant="body2" color="primary">
          We're preparing something special for you,
        </Typography>
        <Typography variant="body2" color="primary">
          explore patients section for now!
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
