import axios from "axios";

export const API_URL = "http://localhost:3001";
export const ContentType = "Content-Type";
const applicationjson = "application/json";

// 아이디 중복체크

export const UserIdCheckApi = async (id: string): Promise<any> => {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/users`,
    })
    
    let result: boolean = true;
    for(let user of response.data){
      if (user.loginid === id) {
        result = false
        break
      }
    }
    return result
  } catch (error) {
    console.log(error) 
  }
};

// 기업 아이디 중복체크
export const CompanyIdCheckApi = async (id: string): Promise<any> => {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/users`,
    })

    let result: boolean = true;
    for(let user of response.data){
      if (user.loginid === id) {
        result = false
        break
      }
    }
  
    return result
  } catch (error) {
    console.log(error)
  }
};

// 로그인 
export const LoginApi = async (payload: Object): Promise<any> => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_URL}/users`,
      headers: {
        [ContentType]: applicationjson,
      },
      data: payload
    });
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

// 로그아웃
export const LogoutApi = async (): Promise<any> => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_URL}/logout`,
    });
    return response.data
  } catch (error) {
    console.log(error)
  }
}

type PayloadType = {
  userid: string;
  isVerify: boolean;
}

// 비밀번호 바꾸기 전에 아이디랑 이름 일치하는지 확인
export const passwordCheckIdApi = async (payload: PayloadType): Promise<any> => {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/users`,
      headers: {
        [ContentType]: applicationjson
      },
      data: payload
    })
  
    let Passwordverify = true

    for (const user of response.data as any) {
      if (user.loginid === payload.userid) {
        payload.isVerify  = Passwordverify
        break
      }
    }
    return payload
  } catch (error) {
    console.log(error)
  }
};

// 비밀번호 수정본 반영해주기
export const newPasswordApi = async (payload: PayloadType): Promise<any> => {
  console.log(payload)
  try {
    const response = await axios({
      method: "POST",
      url: `${API_URL}/newpassword`,
      headers: {
        [ContentType]: applicationjson
      },
      data: payload
    })
  
    return response.data
  } catch (error) {
    console.log(error)
  }
};

export type UserType = {
  name:string,
  phone:string,
  verify: boolean
}

// 휴대폰 인증(회원가입(유저, 기업))
export const PhoneNumberCheckApi = async (phonenumber: string): Promise<any> => {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/users`,
      headers: {
        [ContentType]: applicationjson
      }
    })
    let Obj: UserType | null = null;
    for (let user of response.data) {
      if (user.phone === phonenumber) {
        Obj = {
          name: user.name,
          phone: user.phone,
          verify: true,
        };
        break;
      }
    }
    return Obj
  } catch (error) {
    console.log(error)
  }
};

// 휴대폰 인증(비밀번호 재설정, 아이디 찾기할 때)
export const SearchIdCheckApi = async (payload: any): Promise<any> => {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/users`,
      headers: {
        [ContentType]: applicationjson
      }
    })
    let Obj: UserType | null = null;
    for (let user of response.data) {
      if (user.phone === payload.phonenumber) {
        Obj = {
          name: user.name,
          phone: user.phone,
          verify: true,
        };
        break;
      }
    }
    return Obj
  } catch (error) {
    console.log(error)
  }
};

// 약관 동의 불러오기
export const GetAgreementApi = async (): Promise<any> => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_URL}/agreement`,
    });
    return response.data
  } catch (error) {
    console.log(error)
  }
};

// 회원 탈퇴
export const DeleteUserApi = async () => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `${API_URL}/users`,
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}