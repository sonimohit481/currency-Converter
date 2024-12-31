import { useEffect, useState } from "react";

const useCurrencyInfo = (baseCurrency: string) => {
  const [data, setData] = useState<Record<string, number>>({});
  const fallbackURL = `https://latest.currency-api.pages.dev/v1/currencies/${baseCurrency}.json`;

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`
        );
        if (!response.ok) throw new Error("Failed to fetch from primary API");
        const result = await response.json();
        setData(result[baseCurrency]);
      } catch {
        try {
          const fallbackResponse = await fetch(fallbackURL);
          if (!fallbackResponse.ok) throw new Error("Fallback API failed");
          const fallbackResult = await fallbackResponse.json();
          setData(fallbackResult[baseCurrency]);
        } catch (error) {
          console.error("Failed to fetch currency data:", error);
        }
      }
    };

    fetchCurrencyData();
  }, [baseCurrency, fallbackURL]);

  return data;
};

export default useCurrencyInfo;
