import { CareerData, MemberInfoData, SizeData, WorkData } from '../dto/EntityRepository';
import { AlertPosition, AlertType, CountryType, WorkType } from '../enum/EnumRepository';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';
import { CreateWorkReq } from '../dto/ReqDtoRepository';



export const useValidation = () => {
  const { setStandardAlert } = useStandardAlertStore();


  const isNumeric = (str: string): boolean => {
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

  const isValidNumber = (value: string): boolean => {
    if (value === "") return true;
    const regex = /^[0-9]+(\.[0-9]?)?$/;
    return regex.test(value);
  }

  const isValidSize = (value: SizeData): boolean => {
    const { width, height, depth } = value;

    if (!isValidNumber(width) || !isValidNumber(height) || (depth && !isValidNumber(depth))) {
      setStandardAlert({
        type: AlertType.CONFIRM,
        position: AlertPosition.TOP,
        content: "Invalid Size format.\nOnly positive numbers, including 0, with up to one decimal place are allowed.",
        // content: "Invalid Size format.\nOnly positive numbers, including 0, with up to one decimal place are allowed.\n\nExamples of invalid: \n    9.99 => 2 decimals \n    9.999 => 3 decimals \n    -9 => negative numbers",
      });
      return false;
    }
    return true;
  };

  const isValidWorkType = (value: string): boolean => {
    const isValid = Object.values(WorkType).includes(value as WorkType);
    if (!isValid) {
      setStandardAlert({
        type: AlertType.CONFIRM,
        position: AlertPosition.TOP,
        content: "Invalid work type.",
      });
      return false;
    }
    return true;
  };

  const isValidCountry = (value: string): boolean => {
    const isValid = Object.values(CountryType).includes(value as CountryType);
    if (!isValid) {
      setStandardAlert({
        type: AlertType.CONFIRM,
        position: AlertPosition.TOP,
        content: "Country not supported yet.",
      });
      return false;
    }
    return true;
  };

  const isValidPrice = (value: string): boolean => {
    const regex = /^[0-9]+$/;
    const isValid = regex.test(value);
    if (!isValid) {
      setStandardAlert({
        type: AlertType.CONFIRM,
        position: AlertPosition.TOP,
        content: "Invalid price format. Only positive integers (without '+') are allowed.",
      });
    }

    return isValid;
  };

  const checkType = (
    field:
      keyof WorkData |
      keyof CreateWorkReq |
      keyof CareerData |
      keyof MemberInfoData,
    value: string | SizeData): boolean | void => {
    switch (field) {
      case 'prodYear':
      case 'yearFrom':
      case 'year':
        if (!isValidYear(value as string)) {
          return;
        }
        break;
      case 'size':
        if (!isValidSize(value as SizeData)) {
          return;
        }
        break;
      case 'workType':
        if (!isValidWorkType(value as string)) {
          return;
        }
        break;
      case 'price':
        if (!isValidPrice(value as string)) {
          return;
        }
        break;
      case 'country':
        if (!isValidCountry(value as string)) {
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

