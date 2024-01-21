import { useEffect, useState } from "react";

const useCurrencyInfo = (currency: string) => {
  const [date, setDate] = useState({});
  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
    )
      .then((res) => res.json())
      .then((res) => setDate(res[currency]));
  }, [currency]);

  return date;
};

export default useCurrencyInfo;
