import { useState } from "react";

export const LoanCalculator = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [tenure, setTenure] = useState<number | "">("");
  const monthlyRate = 0.04; // 4% flat monthly interest
  const managementFeeRate = 0.01;
  const insuranceFeeRate = 0.01;

  const isValidAmount =
    typeof amount === "number" && amount >= 200000 && amount <= 1000000;
  const isValidTenure =
    typeof tenure === "number" && tenure > 0 && tenure <= 6;

  const interest =
    isValidAmount && isValidTenure ? amount * monthlyRate * tenure : 0;
  const fees =
    isValidAmount && isValidTenure
      ? amount * (managementFeeRate + insuranceFeeRate)
      : 0;
  const totalRepayable =
    isValidAmount && isValidTenure ? amount + interest : 0; // excludes fees
  const monthlyPayment =
    isValidAmount && isValidTenure ? totalRepayable / tenure : 0;

  return (
    <div className="bg-gradient-to-br from-sky-50 to-cyan-50 p-8 rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount (₦)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="₦200,000 (MIN)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
            min={200000}
            max={1000000}
          />
          {!isValidAmount && amount !== "" && (
            <p className="text-red-500 text-sm mt-1 animate-fade-in-up">
              Amount must be between ₦200,000 and ₦1,000,000
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest Rate (% flat monthly)
          </label>
          <input
            type="text"
            value="4%"
            disabled
            readOnly
            className="w-full bg-gray-100 px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tenure (months)
          </label>
          <input
            type="number"
            value={tenure}
            onChange={(e) =>
              setTenure(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="6 (MAX)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
            min={1}
            max={6}
          />
          {!isValidTenure && tenure !== "" && (
            <p className="text-red-500 text-sm mt-1 animate-fade-in-up">
              Maximum tenure is 6 months
            </p>
          )}
        </div>
      </div>

      <div className="text-center">
        {isValidAmount && isValidTenure && (
          <div className="mt-6 text-lg text-gray-800 space-y-4 animate-fade-in-up">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-sky-100">
              <p className="font-semibold text-sky-800">Upfront Fees</p>
              <p>
                <strong>Management + Insurance:</strong>{" "}
                ₦{fees.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{" "}
                (payable once before loan disbursement)
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-sky-100">
              <p className="font-semibold text-sky-800">Loan Repayment Details</p>
              <p>
                <strong>Total Interest:</strong>{" "}
                ₦{interest.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </p>
              <p>
                <strong>Total Repayable:</strong>{" "}
                ₦{totalRepayable.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{" "}
                ({tenure} {tenure === 1 ? "month" : "months"})
              </p>
                <p>
                  <strong>Monthly Payment:</strong>{" "}
                  ₦{monthlyPayment.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
