import React from "react";
import { Select, HStack, IconButton } from "@chakra-ui/react";
import { ArrowLeftRight } from "lucide-react";

const languages = ["제주 방언", "한글 표준어", "영어", "중국어"];

export const LanguageSelector = ({ sourceLanguage, targetLanguage, setSourceLanguage, setTargetLanguage, handleSwapLanguages }) => {
  return (
    <HStack spacing={2} justifyContent="space-between">
      <Select
        value={sourceLanguage}
        onChange={(e) => setSourceLanguage(e.target.value)}
        size="sm"
        width="40%"
      >
        {languages
          .filter((lang) => lang !== targetLanguage)
          .map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
      </Select>
      <IconButton
        icon={<ArrowLeftRight />}
        onClick={handleSwapLanguages}
        aria-label="Swap languages"
        size="sm"
      />
      <Select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
        size="sm"
        width="40%"
      >
        {languages
          .filter((lang) => lang !== sourceLanguage)
          .map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
      </Select>
    </HStack>
  );
};
