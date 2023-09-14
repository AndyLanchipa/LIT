const BASE_URL = "http://localhost:3000";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions<T> {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: T;
  queryParams?: Record<string, string | number | boolean>;
}

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(
  url: string,
  method: HttpMethod,
  options: RequestOptions<T>
): Promise<ApiResponse<T>> {
  const requestUrl = new URL(url, BASE_URL);

  if (options.queryParams) {
    Object.entries(options.queryParams).forEach(([key, value]) => {
      requestUrl.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(requestUrl.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    try {
      const errorResponse = await response.json();
      throw new ApiError(errorResponse.error || response.statusText);
    } catch (error) {
      throw new ApiError(response.statusText);
    }
  }

  const responseData: T = await response.json();
  return {
    data: responseData,
  };
}

type APIFunction<V> = <T>(
  url: string,
  options: RequestOptions<T>
) => Promise<ApiResponse<V>>;

function createAPIFunction<V>(method: HttpMethod): APIFunction<V> {
  return async function <T>(
    url: string,
    options: RequestOptions<T>
  ): Promise<ApiResponse<V>> {
    try {
      const response = await fetchApi<T>(url, method, options);
      return {
        data: response.data as V,
      };
    } catch (error: any) {
      return {
        error: error.message || "An error occurred",
      };
    }
  };
}

const GET = createAPIFunction<any>("GET");
const POST = createAPIFunction<any>("POST");
const PUT = createAPIFunction<any>("PUT");
const DELETE = createAPIFunction<any>("DELETE");

export { GET, POST, PUT, DELETE, ApiError };
