import { useId } from "react";

interface AppInputProps {
  label: string;
  amount: number;
  onAmountChange?: (amount: number) => void;
  onCurrencyChange: (currency: string) => void;
  currencyOptions: string[];
  selectCurrency: string;
  amountDisable?: boolean;
  currencyDisable?: boolean;
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions,
  selectCurrency,
  amountDisable = false,
  currencyDisable = false,
}) => {
  const inputId = useId();

  return (
    <div className="bg-white p-3 rounded-lg text-sm flex shadow-sm">
      <div className="w-1/2">
        <label
          htmlFor={inputId}
          className="text-gray-500 mb-2 inline-block font-semibold"
        >
          {label}
        </label>
        <input
          id={inputId}
          className="outline-none w-full bg-transparent py-1.5 text-gray-700"
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-gray-500 mb-2 w-full font-semibold">Currency</p>
        <select
          className="rounded-lg px-2 py-1 bg-gray-100 text-gray-700 cursor-pointer outline-none"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency: string) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AppInput;
