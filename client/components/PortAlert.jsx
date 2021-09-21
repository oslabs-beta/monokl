import * as React from 'react';
//Material UI - Material
import {Alert,Stack } from "@mui/material"


export default function PortAlert() {
  return (
    <Stack sx={{ width: '35%' }} spacing={2}>
      <Alert variant="outlined" severity="error">
        Invalid port number — please try again.
      </Alert>
    </Stack>
  );
}
