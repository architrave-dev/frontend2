import React, { useState } from 'react';
import styled from 'styled-components';


const SearchBar: React.FC = () => {
  const [aui, setAui] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', aui);
  };

  return (
    <SearchWrapper>
      <Input
        type="text"
        value={aui}
        onChange={(e) => setAui(e.target.value)}
        placeholder="작가 이름을 검색해 주세요."
      />
      <Button onClick={handleSearch}>검색</Button>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  width: 400px;
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSize.font_B02};
  border: 1px solid #ccc;
  outline: none;
  background-color: #f5f5f5;
`;

const Button = styled.button`
  width: 140px;
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.fontSize.font_B02};
  border: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  
  &:hover {
    background-color: #333;
  }
`;


export default SearchBar;
