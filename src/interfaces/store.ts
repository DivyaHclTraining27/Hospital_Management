import { IUser } from "./user";

export interface IStore {
  user: IReducer<IUser>;
}

export interface IReducer<T> {
  data: T;
  isLoading: boolean;
  error: string;
}

export /**
 * Description for the below snippet
 *
 * @template T 
 * @param {T} defaultData 
 * @returns {{ data: T; isLoading: boolean; error: string; }} 
 */
const defaultReduxState = <T>(defaultData: T) => ({
  data: defaultData,
  isLoading: false,
  error: "",
});
