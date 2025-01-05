import React from 'react';
import styled from 'styled-components';
import { SubContainer, SubTitle, SubValue, SubValueBtn, SubValueChange, SubWrapper, Title } from './MemberSetting';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';
import { AlertPosition, AlertType } from '../../shared/enum/EnumRepository';
import MoleculeDivBtn from '../../shared/component/molecule/MoleculeDivBtn';

const Subscription: React.FC = () => {
  const { setStandardAlert } = useStandardAlertStore();

  const handleChangePlan = () => {
    setStandardAlert({
      type: AlertType.ALERT,
      position: AlertPosition.TOP,
      content: "In Preparation..."
    })
  }

  return (
    <SubscriptionComp>
      <Title>Subscription</Title>
      <SubContainer>
        <SubWrapper>
          <SubTitle>Plan</SubTitle>
          <MoleculeDivBtn
            value={""}
            defaultValue={"-"}
            handleClick={handleChangePlan}
            DivChangeStyle={SubValueChange}
            DivStyle={SubValue}
            StyledBtn={SubValueBtn}
          />
        </SubWrapper>
        <SubWrapper>
          <SubTitle>Payment</SubTitle>
          <MoleculeDivBtn
            value={"KB ****"}
            defaultValue={"-"}
            handleClick={handleChangePlan}
            DivChangeStyle={SubValueChange}
            DivStyle={SubValue}
            StyledBtn={SubValueBtn}
          />
        </SubWrapper>
      </SubContainer>
    </SubscriptionComp>
  );
}

const SubscriptionComp = styled.section`
  width: 55%;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

export default Subscription;