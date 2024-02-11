interface UserData {
  user: UserInfo | null;
  error: Error;
  isLoading: boolean;
}

interface UserInfo {
  code: number;
  msg: string;
  userData: {
    sub: string;
    data: {
      "myinfo.name": string;
    };
  };
}

export type { UserData, UserInfo };
