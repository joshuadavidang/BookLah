import { UserType } from "@/types/concertDetails";

interface UserInfo {
  code: number;
  msg: string;
  userData: {
    sub: string;
    data: {
      "myinfo.name": string;
      userType: UserType;
    };
  };
}

interface UserData {
  name: string;
  userId: string;
  userType: UserType;
}

export type { UserData, UserInfo };
