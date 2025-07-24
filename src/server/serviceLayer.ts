"use server"

import { config } from "dotenv";
import axios, {AxiosRequestConfig} from "axios";

config({ path: "../../.env" });

interface SessionData {
  cookie: string;
  sessionId: string;
}

interface LoginResponse {
  SessionId: string;
}

const SAP_SERVICE_LAYER = axios.create({
  baseURL: process.env.SAP_SERVICE_LAYER_URL || 'http://192.168.100.15:50001/b1s/v1',
  timeout: 10000,
});

let currentSession: SessionData | null = null;

export async function clearSession() {
    currentSession = null;
    }
export async function login(): Promise<SessionData> {
  try {
    const response = await SAP_SERVICE_LAYER.post<LoginResponse>('/Login', {
      CompanyDB: process.env.SAP_DB_DATABASE,
      UserName: process.env.SAP_DB_USER,
      Password: process.env.SAP_DB_PASSWORD,
    });
    
    if (!response.headers['set-cookie']) {
      throw new Error('No session cookie received');
    }

    currentSession = {
      cookie: response.headers['set-cookie'].join(';'),
      sessionId: response.data.SessionId
    };
    
    return currentSession;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Login failed:', error.response?.data || error.message);
    }
    throw error;
  }
}


export async function makeAuthenticatedRequest<T>(config: AxiosRequestConfig): Promise<T> {
  if (!currentSession?.sessionId) {
    throw new Error('No active session - please login first');
  }

  try {
    const response = await SAP_SERVICE_LAYER.request<T>({
      ...config,
      headers: {
        ...config.headers,
        Cookie: currentSession.cookie,
        'B1S-SessionID': currentSession.sessionId
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearSession();
      throw new Error('Session expired - please login again');
    }
    throw error;
  }
}
