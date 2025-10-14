import {Box, Button, Menu, MenuItem, MenuButton, MenuList, Text } from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "./Constants";
    
const languages = Object.entries(LANGUAGE_VERSIONS);
    
const LanguageItem = ({ language, version, isSelected, onSelect }) => {
  const backgroundColor = isSelected ? "#eebbc3" : "#232946";
  const color = isSelected ? "#232946" : "#eebbc3";

  return (
    <MenuItem
      key={language}
      color={color}
      fontSize="sm"
      bg={backgroundColor}
      _hover={{
        color: "#232946",
        bg: "#eebbc3",
      }}
      onClick={() => onSelect(language)}
    >
      {language}
      &nbsp;
      <Text as="span" color="#b8c1ec" fontSize="sm">({version})</Text>
    </MenuItem>
  );
};

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <Box>
      <Box style={{ display: "flex" }}>
        <Menu>
          <MenuButton as={Button} bg="#eebbc3" color="#232946" _hover={{ bg: "#f6c177" }}>{language}</MenuButton>
          <MenuList bg="#232946">
            {languages.map(([lang, version]) => (
              <LanguageItem
                key={lang}
                language={lang}
                version={version}
                isSelected={lang === language}
                onSelect={onSelect}
              />
            ))}
          </MenuList>
          <br></br>
        </Menu>
      </Box>
    </Box>
  );
};

export default LanguageSelector;