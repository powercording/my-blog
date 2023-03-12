interface ConstValue {
  EMAIL_REG: RegExp;
  PASSWORD_REG: RegExp;
  PASSWORD_ERR: string;
  ENTER_EMAIL: string;
  ENTER_PASSWORD: string;
  EMAIL_EXIST: string;
  EMAIL_NO_EXIST: string;
  [key: string]: any;
}

export const CONST: ConstValue = {
  EMAIL_REG: new RegExp(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
  PASSWORD_REG: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/,
  PASSWORD_ERR:
    '비밀번호는 한개이상의 숫자, 영문자, 특수문자가 포함되어야합니다.',
  ENTER_EMAIL: '이메일을 입력해 주세요.',
  ENTER_PASSWORD: '비밀번호를 입력해 주세요.',
  EMAIL_EXIST: '이미 존재하는 이메일 입니다.',
  EMAIL_NO_EXIST: '회원가입되어있지 않은 이메일 입니다.',
};
