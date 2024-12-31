import { useState } from "react";
import { AppInput } from "./components";
import useCurrencyInfo from "./hook/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState<number>(0);
  const [from, setFrom] = useState<string>("usd");
  const [to, setTo] = useState<string>("inr");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo); // Valid currencies for dropdown

  const convertAmount = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(0); // Reset conversion after swapping
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat ">
      <div className="w-full max-w-md mx-auto border border-gray-200 rounded-lg p-6 backdrop-blur-sm bg-white/80 shadow-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convertAmount();
          }}
        >
          {/* From Currency */}
          <div className="w-full mb-2">
            <AppInput
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amt) => setAmount(amt)}
            />
          </div>

          {/* Swap Button */}
          <div className="relative w-full h-0.5 my-4 flex justify-center">
            <button
              type="button"
              className="absolute -top-3 border-2 border-white rounded-full bg-red-600 text-white px-3 py-1"
              onClick={swapCurrencies}
            >
              Swap
            </button>
          </div>

          {/* To Currency */}
          <div className="w-full mt-2 mb-4">
            <AppInput
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable // Disable manual input for converted amount
            />
          </div>

          {/* Convert Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg shadow hover:bg-red-700 transition"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
