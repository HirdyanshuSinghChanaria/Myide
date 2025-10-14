import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Link, Text } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { v4 as uuid } from 'uuid';
// import EditorPage from './EditorPage';


const Home = () => {
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState('');
  const [username, setUsername] = useState('');

  function createNewRoom(event){
    event.preventDefault();             

    const id = uuid();
    console.log(id);
    setRoomID(id);

    toast.success("New room created successfully!");
  }

  function joinRoom(){
    if (!roomID || !username){
      toast.error("Please fill in all the fields");
      return;
    }

    setUsername(username.trim());

    //redirect to editor page
    navigate(`/editor/${roomID}`, {
      state: { username: username }                 //used to pass data from one page to another (state property of react router navigate function)
    });
  }

  return (
    <Box display="flex" minHeight="100vh" flexDirection="column" justifyContent="center" padding="24px" backgroundColor="#1a2236" color="#f8f8f2">
      <Box margin="0 auto" maxWidth="30rem" width="100%" padding="60px" borderRadius="16px" backgroundColor="#232946" boxShadow="0px 8px 32px 0px rgba(44, 62, 80, 0.3)">
        <br></br>
        <form>
          <FormControl className="form-element" marginBottom="16px">
            <FormLabel htmlFor="roomID" color="#eebbc3">Room ID</FormLabel>
            <Input id="roomID" name="roomID" value={roomID} onChange={(e) => setRoomID(e.target.value)} variant="outline" background="#121629" color="#eebbc3" borderColor="#eebbc3" _focus={{ borderColor: "#eebbc3" }} />
          </FormControl>
          <FormControl className="form-element" marginBottom="16px">
            <FormLabel htmlFor="username" color="#eebbc3">Username</FormLabel>
            <Input id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} variant="outline" background="#121629" color="#eebbc3" borderColor="#eebbc3" _focus={{ borderColor: "#eebbc3" }} />
          </FormControl><br></br>
          <Button type="submit" onClick={joinRoom} variant="solid" alignSelf="center" padding="12px 24px" fontWeight="bold" borderRadius="25px" style={{ backgroundColor: '#eebbc3', color: '#232946', display: 'flex', justifyContent: 'center', margin: 'auto', boxShadow: '0 2px 8px #eebbc355' }}>Join</Button>
        </form><br></br>
        <Text className="link" textAlign="center" color="#b8c1ec">Don't have an invite? <br />
          <Link as={RouterLink} onClick={createNewRoom} textDecoration="none" color="#eebbc3" fontWeight="bold" _hover={{ color: '#f6c177' }}>Create new room</Link>
        </Text>
      </Box>
    </Box>
  );
}

export default Home;






//rafce - boilerplate for react arrow function component with export
//onChange={(e) => {setRoomID(e.target.value)} - so that whenever a user types in the roomID, it will be updated in the state
//setRoomID(id) in function createNewRoom(event) - to set the new unique roomID in the state