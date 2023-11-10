import React, { useState } from 'react'
import Input from './Components/Input'
import useCurrencyInfo from './hooks/useCurrencyInfo'

const App = () => {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)
  
  const currencyInfo = useCurrencyInfo(from)
  
  const options = Object.keys(currencyInfo)
  
  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }


    return (
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url("https://img.freepik.com/free-vector/digital-money-transfer-technology-background_1017-17454.jpg?w=740&t=st=1699549117~exp=1699549717~hmac=5d9456fdb844cb92820839c7b92141e79890552afada36f66876d7fd12dc6f33)`,
        }}>
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}>
              <div className="w-full mb-1">
                <Input
                  label="From"
                  amount={amount}
                  onAmountChange={setAmount}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  currencyOptions={options}
                  selectCurrency={from}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  onClick={swap}
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5">
                  swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <Input
                  label="To"
                  amount={convertedAmount}
                  onCurrencyChange={(currency) => setTo(currency)}
                  currencyOptions={options}
                  selectCurrency={to}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default App