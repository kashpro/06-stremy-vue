export const phoneValidator = (value) => /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value);
export const birthValidator = (value) => new Date(value) >= new Date("1920-01-01");
export const booleanValidator = (value) => !!value;