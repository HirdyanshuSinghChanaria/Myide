import { Box, VStack} from '@chakra-ui/react';
import { Editor } from "@monaco-editor/react";
import { useState, useEffect } from 'react';
import { CODE_SNIPPETS } from './Constants';
import LanguageSelector from './LanguageSelector';
import ACTIONS from '../Actions';
import Output from '../components/Output';


const CodeEditor = ({socketRef, roomID, onCodeChange, onLanguageChange}) => {
  const [value, setValue] = useState({});
  const [language, setLanguage] = useState("Choose Language");

  

  const handleEditorChange = (value) => {
    setValue(value);
    onCodeChange(value);
    if(socketRef.current){
      // console.log("working", value);
      socketRef.current.emit(ACTIONS.CODE_CHANGE, {  //it emits the event from C->S || S->C
        roomID: roomID,
        code: value,
      })
    }
  }


  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    onLanguageChange(newLanguage);
    socketRef.current.emit(ACTIONS.LANGUAGE_CHANGE, {
      roomID: roomID,
      language: newLanguage,
    });
  }
  

  useEffect(() => {
    setValue(CODE_SNIPPETS[language]);
  },[language]);

  //handle code change
  useEffect(()=>{
    if(socketRef.current){
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({code}) => {
        if(code !== value){
          setValue(code);
        }
      });
    }

    return () => {
      if (socketRef.current){
        socketRef.current.off(ACTIONS.CODE_CHANGE);
      }
    }
  }, [socketRef.current]);


  //handle language change
  useEffect(()=>{
    if(socketRef.current){
      socketRef.current.on(ACTIONS.LANGUAGE_CHANGE, ({language}) => {
        setLanguage(language);
      });
    }

    return () => {
      if (socketRef.current){
        socketRef.current.off(ACTIONS.LANGUAGE_CHANGE);
      }
    }
  }, [socketRef.current]);

  return (
    <Box>
      <VStack backgroundColor={"#232946"} padding={2} borderRadius="12px" boxShadow="0 2px 16px #eebbc322">
        <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#232946", padding: "10px 20px 11px 20px ", width: '100%' }}>
          <LanguageSelector language={language} onSelect={handleLanguageChange} />
        </div>
        <Box height="67vh">
          <Editor 
                height="65vh"
                width="177vh" 
                theme="vs-dark" 
                options={{
                  minimap: { enabled: false },
                  fontSize: 16,
                  fontFamily: 'Fira Mono, monospace',
                  lineNumbers: "on",
                  scrollbar: { vertical: "auto" },
                  overviewRulerBorder: false,
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  cursorBlinking: "smooth",
                  smoothScrolling: true,
                  renderLineHighlight: "all",
                  renderIndentGuides: true,
                  renderWhitespace: "all",
                  background: "#232946"
                }}
                language ={language} 
                value={value}
                onChange={handleEditorChange}
          />
          <br></br>
        </Box>
        <Box height="20vh">
          <Output sourceCode={value} language={language} />
        </Box>
      </VStack>
    </Box>
  )
}

export default CodeEditor

