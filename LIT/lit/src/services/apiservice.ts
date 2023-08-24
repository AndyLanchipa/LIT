const BASE_URL = "https://api.example.com"; // Replace with your API base URL

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions<T> {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: T;
  queryParams?: Record<string, string | number | boolean>;
}

type APIFunction<T, V> = (
  options: RequestOptions<T>
) => Promise<ApiResponse<V>>;

function createAPIFunction<T, V>(
  method: HttpMethod,
  url: string
): APIFunction<T, V> {
  return async function (options: RequestOptions<T>): Promise<ApiResponse<V>> {
    const requestUrl = `${BASE_URL}${url}`;

    try {
      const { headers, body, queryParams } = options;

      let requestUrlWithParams = requestUrl;
      if (queryParams) {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          params.append(key, String(value));
        });
        requestUrlWithParams = `${requestUrl}?${params.toString()}`;
      }

      const response = await fetch(requestUrlWithParams, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || response.statusText);
      }

      const responseData: V = await response.json();
      return {
        data: responseData,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.message || "An error occurred",
      };
    }
  };
}

const GET = createAPIFunction<undefined, any>("GET", "/users");
const POST = createAPIFunction<any, any>("POST", "/users");
const PUT = createAPIFunction<any, any>("PUT", "/users");
const DELETE = createAPIFunction<undefined, any>("DELETE", "/users");

export { GET, POST, PUT, DELETE };
