import { SizeData, WorkData } from '../dto/EntityRepository';
import { AlertPosition, AlertType } from '../enum/EnumRepository';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';



export const useValidation = () => {
  const { setStandardAlert } = useStandardAlertStore();


  const isNumeric = (str: string) => {
    return /^\d+$/.test(str);
  }

  const isValidYear = (value: string): boolean => {
    if (!isNumeric(value)) {
      setStandardAlert({
        type: AlertType.CONFIRM,
        position: AlertPosition.TOP,
        content: "Only numbers are allowed.",
      });
      return false;
    }
    if (value.length > 4) {
      setStandardAlert({
        type: AlertType.CONFIRM,
        position: AlertPosition.TOP,
        content: "Invalid YEAR format.",
      });
      return false;
    }
    return true;
  }

  const isValidNumber = (value: string) => {
    if (value === "") return true;
    const regex = /^[0-9]+(\.[0-9]?)?$/;
    return regex.test(value);
  }

  const isValidSize = (value: string) => {
    if (!value.includes("x")) { return false; }
    const result = value.split("x").every(isValidNumber);
    if (!result) {
      setStandardAlert({
        type: AlertType.CONFIRM,
        position: AlertPosition.TOP,
        content: "Invalid Size format.\nOnly positive numbers, including 0, with up to one decimal place are allowed.",
        // content: "Invalid Size format.\nOnly positive numbers, including 0, with up to one decimal place are allowed.\n\nExamples of invalid: \n    9.99 => 2 decimals \n    9.999 => 3 decimals \n    -9 => negative numbers",
      });
    }
    return result;
  };

  const checkType = (field: keyof WorkData, value: string): boolean | void => {
    switch (field) {
      case 'prodYear':
        if (!isValidYear(value)) {
          return;
        }
        break;
      case 'size':
        if (!isValidSize(value)) {
          return;
        }
        break;
      default:
        break;
    }
    return true;
  }

  return {
    checkType,
  };
};

