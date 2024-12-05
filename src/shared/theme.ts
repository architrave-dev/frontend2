import { DefaultTheme, css } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    color_Gray_01: '#1a1a1a',
    color_Gray_02: '#252525',
    color_Gray_03: '#4d4d4d',
    color_Gray_04: '#7d7d7d',
    color_Gray_05: '#b3b3b3',
    color_Gray_06: '#F0F0F0',
    color_White: '#ffffff',
    color_Alpha_01: 'rgba(0, 0, 0, 0.6)',
    color_Alpha_02: 'rgba(0, 0, 0, 0.2)',
    color_Alpha_03: 'rgba(255, 255, 255, 0.3)',
    color_Alpha_04: 'rgba(255, 255, 255, 0.5)',
    color_Alpha_05: 'rgba(255, 255, 255, 0.6)',
    color_alert_green: "#4CAF50",
    color_alert_red: '#FA4545'
  },
  fontSize: {
    font_H01: '68px',
    font_H015: '50px',
    font_H02: '36px',
    font_H03: '28px',
    font_B00: '1.4vw',
    font_B01: '20px',
    font_B02: '16px',
    font_B03: '14px',
    font_B04: '12px',
  },
  fontWeight: {
    bold: '700',
    semi_bold: '600',
    medium: '500',
    regular: '400',
    decoration: 'underline'
  },
  typography: {
    H_01: css`
      font-size: ${props => props.theme.fontSize.font_H01};
      font-weight: ${props => props.theme.fontWeight.bold};
    `,
    H_015: css`
      font-size: ${props => props.theme.fontSize.font_H015};
      font-weight: ${props => props.theme.fontWeight.bold};
    `,
    H_02: css`
      font-size: ${props => props.theme.fontSize.font_H02};
      font-weight: ${props => props.theme.fontWeight.bold};
    `,
    H_03: css`
      font-size: ${props => props.theme.fontSize.font_H03};
      font-weight: ${props => props.theme.fontWeight.semi_bold};
    `,
    Body_00_1: css`
      font-size: ${props => props.theme.fontSize.font_B00};
      font-weight: ${props => props.theme.fontWeight.medium};
    `,
    Body_01_1: css`
      font-size: ${props => props.theme.fontSize.font_B01};
      font-weight: ${props => props.theme.fontWeight.semi_bold};
    `,
    Body_01_2: css`
      font-size: ${props => props.theme.fontSize.font_B01};
      font-weight: ${props => props.theme.fontWeight.medium};
    `,
    Body_01_2U: css`
      font-size: ${props => props.theme.fontSize.font_B01};
      font-weight: ${props => props.theme.fontWeight.medium};
      font-decoration: ${props => props.theme.fontWeight.decoration};
    `,
    Body_02_1: css`
      font-size: ${props => props.theme.fontSize.font_B02};
      font-weight: ${props => props.theme.fontWeight.medium};
    `,
    Body_02_2: css`
      font-size: ${props => props.theme.fontSize.font_B02};
      font-weight: ${props => props.theme.fontWeight.regular};
    `,
    Body_03_1: css`
      font-size: ${props => props.theme.fontSize.font_B03};
      font-weight: ${props => props.theme.fontWeight.medium};
    `,
    Body_03_2: css`
      font-size: ${props => props.theme.fontSize.font_B03};
      font-weight: ${props => props.theme.fontWeight.regular};
    `,
    Body_04: css`
      font-size: ${props => props.theme.fontSize.font_B04};
      font-weight: ${props => props.theme.fontWeight.regular};
    `,
  }
};

export default theme;