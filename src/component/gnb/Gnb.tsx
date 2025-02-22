import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Navigation from './Navigation';
import Hamburger from './Hamburger';
import User from './UserComp';
import { useMenu } from '../../shared/hooks/useMenu';
import { useTitle } from '../../shared/hooks/useTitle';
import { ModalType } from '../../shared/enum/EnumRepository';
import { useModalStore } from '../../shared/store/portal/modalStore';

const Gnb: React.FC = () => {
  const location = useLocation();
  const { isMenuOpen, closeMenu } = useMenu();
  const { setStandardModal } = useModalStore();
  useTitle();

  const openRegisterModal = () => {
    setStandardModal({
      modalType: ModalType.REGISTER,
      title: null,
      value: null,
      handleChange: () => { }
    });
  };
  return (
    <>
      <GnbSection>
        <LeftSection>
          <Hamburger />
          {location.pathname !== '/' &&
            <SlidingNavigation $isMenuOpen={isMenuOpen}>
              <Navigation />
            </SlidingNavigation>
          }
        </LeftSection>
        {location.pathname === '/' ? (
          <RegisterButton onClick={openRegisterModal}>Register</RegisterButton>
        ) : (
          <User />
        )}
      </GnbSection>
      {isMenuOpen && <TransparentLayer onClick={closeMenu} />}
    </>
  );
}

const GnbSection = styled.section`
  position: absolute;
  top: 0px;
  width: 100%;
  height: calc(12vh);
  max-height: 140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 6vw;
  background-color: transparent;
`;

const LeftSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 2vw;
`;

const SlidingNavigation = styled.div<{ $isMenuOpen: boolean; }>`
  height: 100%;
  display: flex;
  align-items: center;
  opacity: ${({ $isMenuOpen }) => ($isMenuOpen ? 1 : 0)};
  transform: translateX(${({ $isMenuOpen }) => ($isMenuOpen ? '0' : 'calc(-15vw)')});
  transition: opacity 0.5s ease-in-out, transform 0.7s ease-in-out;
  z-index: 3;
`;


const TransparentLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 2;
`;

const RegisterButton = styled.div`
  text-decoration: underline;
  cursor: pointer;
  ${({ theme }) => theme.typography.Body_02_2};
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export default Gnb;