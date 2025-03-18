import { APPLICATION_JSON, GET, INCLUDE } from "../constants/api";
import { IApiResponse, ICustomFetchParams } from "../interfaces/api";

export const apiUrl = "http://localhost:3000";
// import.meta.env.VITE_API_URL;

export /**
 * Description for the below snippet
 *
 * @template T
 * @template U
 * @param {ICustomFetchParams<T>} param0
 * @param {ICustomFetchParams<T>} param0.path
 * @param {ICustomFetchParams<T>} [param0.method="GET"]
 * @param {ICustomFetchParams<T>} param0.data
 * @returns {Promise<IApiResponse<U>>}
 */
const customFetch = async <T, U>({
  path,
  method = GET,
  data,
}: ICustomFetchParams<T>): Promise<IApiResponse<U>> => {
  const result = await fetch(`${apiUrl}/${path}`, {
    method,
    body: data ? JSON.stringify(data) : null,
    headers: APPLICATION_JSON,
    credentials: INCLUDE,
  })
    .then((resp) => resp.json())
    .then((result) => result)
    .catch((e) => {
      throw new Error(e?.message);
    });

  return result;
};
