import { useEffect, useState } from "react";
import "./App.css";
import { tenureData } from "./utils/tenureData";
import { numberWithCommas } from "./utils/functions";
import { TextInput } from "./components/text-input";
import { SliderInput } from "./components/slider-input";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);
  const [errorObj, setErrorObj] = useState({
    costErr: "",
    interestErr: "",
    feeError: "",
  });

  const calcEmi = (downpayment) => {
    //EMI amount = [P x R X (1+R)^N]/[(1+R)^N-1]
    if (!cost) return;
    const loanAmount = cost - downpayment;
    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;

    const EMI =
      (loanAmount * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
      ((1 + rateOfInterest) ** numOfYears - 1);

    return Number(EMI / 12).toFixed(0);
  };

  const calcDP = (emi) => {
    if (!cost) return;
    const downPaymentPrecent = 100 - (emi / calcEmi(0)) * 100;
    return Number((downPaymentPrecent / 100) * cost).toFixed(0);
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }
    const emi = calcEmi(downPayment);
    setEmi(emi);
  }, [tenure, cost]);

  const updateEMI = (e) => {
    if (!cost) return;
    const dPayment = Number(e.target.value);
    setDownPayment(dPayment.toFixed(0));
    const emi = calcEmi(dPayment);
    setEmi(emi);
  };
  const updateDownPayment = (e) => {
    if (!cost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));
    const dp = calcDP(emi);
    setDownPayment(dp);
  };

  const totDownPayment = () => {
    return numberWithCommas(
      (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
    );
  };

  const totLoanAmount = () => {
    return numberWithCommas((emi * tenure).toFixed(0));
  };
  return (
    <div className="App">
      <span className="title">EMI Calculator</span>

      <TextInput
        title="Total Cost of Asset"
        inputType="number"
        state={cost}
        setState={setCost}
        min={0}
      />

      <TextInput
        title="Interest Rate (%)"
        inputType="number"
        state={interest}
        setState={setInterest}
        min={0}
        max={100}
      />

      <TextInput
        title="Processing Fee (%)"
        inputType="number"
        state={fee}
        setState={setFee}
        min={0}
        max={100}
      />

      <SliderInput
        title="Down Payment"
        underlinedTitle={`Total Down Payment : ${totDownPayment()}`}
        state={downPayment}
        setState={updateEMI}
        minValue={0}
        maxValue={cost}
        labelMin={`0%`}
        labelMax={`100%`}
      />

      <SliderInput
        title="Loan Per Month"
        underlinedTitle={`Total Loan Amount : ${totLoanAmount()}`}
        state={emi}
        setState={updateDownPayment}
        minValue={calcEmi(cost)}
        maxValue={calcEmi(0)}
      />

      <div className="form-field">
        <span className="sub-title">Tenure</span>
        <div className="tenure-container">
          {tenureData.map((t) => {
            return (
              <button
                className={`tenure-button ${
                  t === tenure ? "tenureSelected" : ""
                }`}
                onClick={() => setTenure(t)}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
