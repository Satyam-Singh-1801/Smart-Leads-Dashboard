export interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface LeadData {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  createdBy?: UserData;
  createdAt: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: Array<{ path: string[]; message: string }>;
    };
  };
}
