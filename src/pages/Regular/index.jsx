import React, { useState, useEffect } from "react";
import { useTranslation } from '../context/TranslationContext';
import { useBookmark } from '../context/BookmarkContext';
import { Box, VStack, Textarea, IconButton, useToast } from "@chakra-ui/react";
import { LanguageSelector } from "../../components/Layout/LanguageSelector";
import { ArrowRight, Bookmark } from "lucide-react";
import "./RegularPage.css";

const LANGUAGES = ["제주 방언", "한글 표준어", "영어", "중국어"];

// 미리 정의된 번역 쌍들
const TRANSLATIONS = [
  {
    standard: "제주엔 참 좋은 것이 많이 있습니다.",
    dialect: "제주엔 참 종거 만쑤다양"
  },
  {
    standard: "제주도 사투리 정말로 귀하고 아름다운 보물입니다.",
    dialect: "제주도 사투리 촘말로 귀하고 아름다운 보물이우다"
  },
  {
    standard: "감자랑 고구마랑 무랑",
    dialect: "지슬이랑 감저랑 놈삐랑"
  },
  {
    standard: "낚시하는 사람을 어부라고 부릅니다",
    dialect: "낚시하는 사람을 보재기옌 불러마씨"
  },
  {
    standard: "바다로 한라산으로 갈겁니다",
    dialect: "바당으로 한락산으로 갈거우다"
  },
  {
    standard: "Thank you",
    dialect: "고맙수다"
  },
  {
    standard: "Jeju dialect is a precious and beautiful treasure",
    dialect: "제주도 사투리 촘말로 귀하고 아름다운 보물이우다"
  },
  {
    standard: "여기 어떤게 맛좋아 마심?",
    dialect: "여기서 어떤 게 맛있나요?"
  }
];

const RegularPage = () => {
  const { inputText, setInputText, translationText } = useTranslation();
  const [outputText, setOutputText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState(LANGUAGES[1]);
  const [targetLanguage, setTargetLanguage] = useState(LANGUAGES[0]);
  const { addBookmark } = useBookmark();
  const toast = useToast();

  useEffect(() => {
    if (inputText) {
      setSourceLanguage(LANGUAGES[1]); // 한글 표준어
      setTargetLanguage(LANGUAGES[0]); // 제주 방언
    }
  }, [inputText]);

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  const findTranslation = (text) => {
    // 입력된 텍스트와 정확히 일치하는 번역 찾기
    const exactMatch = TRANSLATIONS.find(
      t => t.standard.toLowerCase() === text.toLowerCase()
    );
    if (exactMatch) return exactMatch.dialect;

    // 영어 입력인 경우 확인
    if (/^[A-Za-z\s.,!?]+$/.test(text)) {
      const englishMatch = TRANSLATIONS.find(
        t => t.standard.toLowerCase() === text.toLowerCase()
      );
      if (englishMatch) return englishMatch.dialect;
    }

    return text; // 매칭되는 번역이 없으면 입력 텍스트 그대로 반환
  };

  const handleTranslate = () => {
    // QuickPage에서 온 경우 저장된 번역 사용
    if (translationText && sourceLanguage === LANGUAGES[1] && targetLanguage === LANGUAGES[0]) {
      setOutputText(translationText);
    } else {
      // 일반 입력의 경우 번역 매칭 시도
      const translation = findTranslation(inputText);
      setOutputText(translation);
    }
  };

  const handleBookmark = () => {
    if (outputText) {
      addBookmark({
        input: inputText,
        output: outputText
      });
      toast({
        title: "북마크 추가",
        description: "번역 쌍이 북마크에 추가되었습니다.",
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
            languages={LANGUAGES}
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