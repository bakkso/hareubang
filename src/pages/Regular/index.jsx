import React, { useState } from "react";
import { useTranslation } from '../context/TranslationContext';
import { useBookmark } from '../context/BookmarkContext';
import { Box, VStack, Textarea, IconButton, useToast } from "@chakra-ui/react";
import { LanguageSelector } from "../../components/Layout/LanguageSelector";
import { ArrowRight, Bookmark } from "lucide-react";
import "./RegularPage.css";

const RegularPage = () => {
  const { inputText, setInputText } = useTranslation();
  const [outputText, setOutputText] = useState("");
  const languages = ["제주 방언", "한글 표준어", "영어", "중국어"];
  const [sourceLanguage, setSourceLanguage] = useState(languages[1]);
  const [targetLanguage, setTargetLanguage] = useState(languages[0]);
  const { addBookmark } = useBookmark();
  const toast = useToast();


  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  const handleTranslate = () => {
    setOutputText(inputText);
  };

  const handleBookmark = () => {
    if (outputText) {
      addBookmark(outputText);
      toast({
        title: "북마크 추가",
        description: "번역 결과가 북마크에 추가되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box className="regular-page">
      <VStack spacing={4} align="stretch" width="100%">
        <Box className="language-selector">
          <LanguageSelector
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            setSourceLanguage={setSourceLanguage}
            setTargetLanguage={setTargetLanguage}
            handleSwapLanguages={handleSwapLanguages}
            selectWidth="40%"
            selectSize="sm"
            containerWidth="100%"
          />
        </Box>

        <Box className="text-container input-container">
          <Textarea
            className="text-area"
            placeholder="번역할 내용을 입력하세요"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            size="sm"
          />
          <Box className="button-container">
            <IconButton
              className="translate-button"
              icon={<ArrowRight />}
              onClick={handleTranslate}
              aria-label="Translate"
              colorScheme="orange"
              size="md"
            />
          </Box>
        </Box>

        <Box className="text-container output-container">
        <Textarea
          className="text-area output-area"
          placeholder="번역 결과"
          value={outputText}
          readOnly
          size="sm"
        />
        <Box className="output-footer">
          <IconButton
            className="bookmark-button"
            icon={<Bookmark />}
            onClick={handleBookmark}
            aria-label="Bookmark"
            colorScheme="orange"
            size="sm"
          />
        </Box>
      </Box>
      </VStack>
    </Box>
  );
};

export default RegularPage;