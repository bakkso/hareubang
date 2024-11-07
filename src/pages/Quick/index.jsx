import React, { useCallback, useState } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './QuickPage.css';

const categories = [
  { 
    id: 'travel', 
    name: '제주 여행 🗿', 
    subcategories: [
      { 
        name: '식당', 
        situations: [
          { 
            name: '주문',
            sentences: ['메뉴판 볼 수 있나요? 🥘', '주문 할게요 🙋🏼‍♀️', '추천하는 메뉴가 있나요? 🙌']
          },
          { 
            name: '결제',
            sentences: ['이거 얼마예요? 💸', '에누리 되나요? 👌🏼', "현금으로 결제할게요 💰"]
          },
          { 
            name: '예약',
            sentences: ["오늘 예약했어요 ✔️", '창가자리 앉을 수 있나요? 🪟', '몇시에 닫아요? 🚪']
          }
        ]
      },
      { 
        name: '숙박', 
        situations: [
          { 
            name: '체크인',
            sentences: ['예약했어요', '방 업그레이드 가능한가요?', '와이파이 비밀번호가 뭔가요?']
          },
          { 
            name: '체크아웃',
            sentences: ['체크아웃하려고 합니다', '짐 보관 가능한가요?', '택시 불러주실 수 있나요?']
          },
          { 
            name: '조식',
            sentences: ['조식은 몇 시까지인가요?', '룸서비스 가능한가요?', '채식 메뉴가 있나요?']
          }
        ]
      },
      { 
        name: '교통', 
        situations: [
          { 
            name: '렌트',
            sentences: ['차 렌트하고 싶어요', '보험은 어떻게 되나요?', '내비게이션 있나요?']
          },
          { 
            name: '도착지',
            sentences: ['여기서 공항까지 얼마나 걸리나요?', '이 주소로 가주세요', '요금이 얼마인가요?']
          },
          { 
            name: '예약',
            sentences: ['버스 예약하고 싶어요', '표 환불 가능한가요?', '막차가 몇 시인가요?']
          }
        ]
      }
    ] 
  }
];

const QuickPage = () => {
  const { setInputText } = useTranslation();
  const navigate = useNavigate();
  //console.log("QuickPage rendered, onSentenceSelect:", onSentenceSelect);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedSituation, setSelectedSituation] = useState(null);
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [userInput, setUserInput] = useState('');

  // useEffect(() => {
  //   console.log("QuickPage mounted or updated, onSentenceSelect:", onSentenceSelect);
  // }, [onSentenceSelect]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setSelectedSubcategory(null);
    setSelectedSituation(null);
    setSelectedSentence(null);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory === selectedSubcategory ? null : subcategory);
    setSelectedSituation(null);
    setSelectedSentence(null);
  };

  const handleSituationClick = (situation) => {
    setSelectedSituation(situation === selectedSituation ? null : situation);
    setSelectedSentence(null);
  };

  const handleSentenceClick = useCallback((sentence) => {
    setSelectedSentence(sentence);
    setInputText(sentence);
    navigate('/regular');  // RegularPage로 이동
  }, [setInputText, navigate]);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      setInputText(userInput.trim());
      setUserInput('');
      navigate('/regular');
    }
  };
  

  return (
    <div className="quick-page">
      <h2 className="situation-title">상황 선택</h2>

      <div className="categories">
        {categories.map((category) => (
          <div key={category.id} className="category-container">
            <button
              className={`category-button ${selectedCategory === category.id ? 'selected' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>

            {selectedCategory === category.id && (
              <div className="subcategories">
                {category.subcategories.map((subcategory) => (
                  <button
                    key={subcategory.name}
                    className={`subcategory-button ${selectedSubcategory === subcategory.name ? 'selected' : ''}`}
                    onClick={() => handleSubcategoryClick(subcategory.name)}
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
            )}

            {selectedSubcategory && (
              <div className="situations">
                {category.subcategories.find(sub => sub.name === selectedSubcategory).situations.map((situation) => (
                  <button
                    key={situation.name}
                    className={`situation-button ${selectedSituation === situation.name ? 'selected' : ''}`}
                    onClick={() => handleSituationClick(situation.name)}
                  >
                    {situation.name}
                  </button>
                ))}
              </div>
            )}

{selectedSituation && (
        <div className="recommended-sentences">
          <h2>추천 문장:</h2>
          {categories
            .find(cat => cat.id === selectedCategory)
            .subcategories.find(sub => sub.name === selectedSubcategory)
            .situations.find(sit => sit.name === selectedSituation)
            .sentences.map((sentence, index) => (
              <button
                key={index}
                className={`sentence-button ${selectedSentence === sentence ? 'selected' : ''}`}
                onClick={() => handleSentenceClick(sentence)}
              >
                {sentence}
              </button>
            ))}


                <div className="user-input-section">              
                  <h3>또는 번역할 문장을 입력하세요</h3>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={userInput}
                      onChange={handleUserInput}
                      placeholder="Type your sentence here"
                      className="user-input-field"
                    />
                    <button type="submit" className="submit-button">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

QuickPage.propTypes = {
  onSentenceSelect: PropTypes.func
};

export default QuickPage;