import React from 'react';
import styled from 'styled-components';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { ModalType } from '../../shared/enum/EnumRepository';

const SearchAui: React.FC = () => {
  const { setStandardModal } = useModalStore();

  const openFindAuiModal = () => {
    setStandardModal({
      modalType: ModalType.FIND,
      title: "AUI (Artist Unique ID)",
      value: null,
      handleChange: () => { },
    });
  };

  return (
    <Text>
      <span>Forgot your URL or AUI(Artist Unique ID)?</span>
      <FindText onClick={openFindAuiModal}>find it</FindText>
    </Text>
  );
};

const Text = styled.p`
  width: 100%;
  display: flex;
  gap: 10px;
  color: ${({ theme }) => theme.colors.color_Gray_05};
  ${({ theme }) => theme.typography.Body_04};
`;

const FindText = styled.span`
  font-style: italic;
  text-decoration: underline;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
    color: ${({ theme }) => theme.colors.color_Gray_03};
  }
  cursor: pointer;
`;


export default SearchAui;
