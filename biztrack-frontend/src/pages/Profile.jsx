// src/pages/Profile.jsx
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { getUserFromToken } from "../services/auth";

const Profile = () => {
  const user = getUserFromToken();

  if (!user) {
    return <Typography variant="h6">User not logged in.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            User Profile
          </Typography>
          <Typography variant="body1">
            <strong>Username:</strong> {user.sub}
          </Typography>
          <Typography variant="body1">
            <strong>Role:</strong> {user.role}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
