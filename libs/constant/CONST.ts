interface ConstValue {
  EMAIL_REG: RegExp;
  PASSWORD_REG: RegExp;
  PASSWORD_ERR: string;
  [key: string]: any;
}

export const CONST: ConstValue = {
  EMAIL_REG: new RegExp(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
  PASSWORD_REG: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/,
  PASSWORD_ERR:
    '비밀번호는 한개이상의 숫자, 영문자, 특수문자가 포함되어야합니다.',
};
