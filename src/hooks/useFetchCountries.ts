import gql from "graphql-tag";
import { Country } from "../types /Country";
import { useQuery } from "@apollo/react-hooks";

export const FETCH_COUNTRY = gql`
  query countries(
    $code: StringQueryOperatorInput
    $currency: StringQueryOperatorInput
    $continent: StringQueryOperatorInput
  ) {
    countries(
      filter: { code: $code, currency: $currency, continent: $continent }
    ) {
      code
      name
      native
      phone
      continent {
        name
      }
      capital
      currency
      languages {
        name
      }
      emoji
      emojiU
      states {
        name
      }
    }
  }
`;
type Paginated = {
  offset: number;
  limit: number;
};
export interface FetchCountriesArgs extends Paginated {
  code?: string;
  currency?: string;
  continent?: string;
}

export const useFetchCountries = (params?: FetchCountriesArgs) =>
  useQuery<{ countries: Country[] }, FetchCountriesArgs>(FETCH_COUNTRY, {
    variables: params,
    fetchPolicy: "cache-and-network",
  });
