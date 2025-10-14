import { Box, Button } from "@chakra-ui/react";
import { executeCode } from "../API";
import { useState} from "react";

const Output = ({ sourceCode, language}) => {
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);


  const runCode = async () => {
      if (!language) {
        console.log("language is undefined");
        return;
      }
      if (!sourceCode) {
        console.log("sourceCode is empty");
        return;
      }
      console.log("language:", language);
      // console.log("sourceCode:", sourceCode);
      try {
        const { run: result } = await executeCode(language, sourceCode);
      //   console.log("data:", run:result);
        setOutput(result.output);
        result.stderr ? setIsError(true) : setIsError(false);
        // onOutputChange(result.output);
      } catch (error) {
        console.log("error:", error);
      }
    };


    // useEffect(() => {
    //   socketRef.current.emit(ACTIONS.OUTPUT_CHANGE, {
    //     roomID: roomID,
    //     output: output,
    //   });
    // }, [output])

   
 
  return (
    <Box w="100%">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#232946", width: "100%", paddingBottom: "7px" }}>
        <Button bg="#eebbc3" color="#232946" _hover={{ bg: "#f6c177" }}> Output: </Button>
        <Button colorScheme="pink" bg="#eebbc3" color="#232946" _hover={{ bg: "#f6c177" }} onClick={runCode}>Run Code</Button>
      </div>
      <Box height="13vh" width="177vh" border="1px solid" borderRadius={4} borderColor="#eebbc3" padding={3} color={isError ? "#f25042" : "#eebbc3"} background="#121629">
        {output ? output : 'Click "Run Code" to see the output'}
      </Box>
    </Box>
  );
};

export default Output;