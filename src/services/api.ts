const rawBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://crypto-threads-be-production.up.railway.app/api/v1/";

const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

console.log("API_BASE_URL", API_BASE_URL);

interface RequestOptions extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

export async function get<T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<{ data?: T; success: boolean; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }
}

export async function post<T = any>(
  url: string,
  body: any,
  options: RequestOptions = {}
): Promise<{ data?: T; success: boolean; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API POST Error:", error);
    throw error;
  }
}

export async function patch<T = any>(
  url: string,
  body: any,
  options: RequestOptions = {}
): Promise<{ data?: T; success: boolean; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API PATCH Error:", error);
    throw error;
  }
}

export async function del<T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<{ data?: T; success: boolean; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API DELETE Error:", error);
    throw error;
  }
}
