import { useEffect, useState } from "react";
import "./App.css";
import { tenureData } from "./utils/tenureData";

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
  }, [tenure]);

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

  return (
    <div className="App">
      <span className="title">EMI Calculator</span>
      <span className="sub-title">Total Cost of Asset</span>
      <input
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Total cost of Assets"
      />

      <span className="sub-title">Interest Rate (%)</span>
      <input
        type="number"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        placeholder="Interest Rate (%)"
      />

      <span className="sub-title">Processing Fee (%)</span>
      <input
        type="number"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        placeholder="Processing Fee (%)"
      />

      <span className="sub-title">Down Payment</span>
      <div>
        <input
          type="range"
          value={downPayment}
          onChange={updateEMI}
          min={0}
          max={cost}
          className="slider"
        />
        <div className="lables">
          <label>0%</label>
          <b>{downPayment}</b>
          <label>100%</label>
        </div>
      </div>

      <span className="sub-title">Loan Per Month</span>
      <div>
        <input
          type="range"
          value={emi}
          onChange={updateDownPayment}
          min={calcEmi(cost)}
          max={calcEmi(0)}
          className="slider"
        />
        <div className="lables">
          <label>{calcEmi(cost)}</label>
          <b>{emi}</b>
          <label>{calcEmi(0)}</label>
        </div>
      </div>

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
  );
}

export default App;
