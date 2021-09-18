import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function PortAlert() {
  return (
    <Stack sx={{ width: '35%' }} spacing={2}>
      <Alert variant="outlined" severity="error">
        Invalid port number — please try again.
      </Alert>
    </Stack>
  );
}
