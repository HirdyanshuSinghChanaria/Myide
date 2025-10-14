import React from 'react';
import { Avatar, Box, Text } from '@chakra-ui/react';

function User({ username }) {
  return (
    <Box display="flex" alignItems="center" flexWrap="wrap" gap="10px" padding="7px">
      <Avatar name={username} bg="#eebbc3" color="#232946" />
      <Text color="#eebbc3" fontWeight="bold">{username}</Text>
    </Box>
  );
}

export default User;
