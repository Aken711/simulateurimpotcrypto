import { useEffect, useMemo, useState } from "react";
import Select from "react-select";

interface Transaction {
  id: string;
  type: "buy" | "sell";
  crypto: string;
  amount: number;
  date: string;
}

interface PricesData {
  [date: string]: {
    [crypto: string]: number;
  };
}

export default function MultiSimulator() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [prices, setPrices] = useState<PricesData>({});
    const [loadingPrices, setLoadingPrices] = useState(true);
    const [result, setResult] = useState<string | null>(null);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadPrices() {
      try {
        const res = await fetch("/final-prices-2024.json");
        const data = await res.json();
        setPrices(data);
      } catch (error) {
        console.error("Erreur chargement prix", error);
      } finally {
        setLoadingPrices(false);
      }
    }
    loadPrices();
  }, []);

  const cryptoList = useMemo(() => {
    const firstDate = Object.keys(prices)[0];
    return firstDate ? Object.keys(prices[firstDate]) : [];
  }, [prices]);

  function handleCryptoChange(value: string, id: string) {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, crypto: value } : tx))
    );
  }

  function handleAddTransaction() {
    setTransactions((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        type: "buy",
        crypto: "",
        amount: 0,
        date: "",
      },
    ]);
  }

  function getPriceAtDate(crypto: string, date: string): number | null {
    if (!prices[date]) return null;
    const price = prices[date][crypto.toUpperCase()];
    return price ?? null;
  }

  function handleCalculate() {
    const holdings: { [crypto: string]: number } = {};
    let totalSell = 0;
    let totalBuyCost = 0;
    let totalValueAtSell = 0;

    const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));

    for (const tx of sorted) {
      if (!tx.crypto || !tx.date || !tx.amount) continue;
      const price = getPriceAtDate(tx.crypto, tx.date);
      if (!price) continue;

      if (tx.type === "buy") {
        holdings[tx.crypto] = (holdings[tx.crypto] || 0) + tx.amount / price;
        totalBuyCost += tx.amount;
      } else {
        const valuePortefeuille = Object.entries(holdings).reduce((sum, [crypto, qty]) => {
          const p = getPriceAtDate(crypto, tx.date);
          return sum + (p ? p * qty : 0);
        }, 0);

        const plusValue = tx.amount - (totalBuyCost * (tx.amount / valuePortefeuille));
        totalSell += tx.amount;
        totalValueAtSell += plusValue;
      }
    }

    if (totalSell < 305) {
      setResult("Exonération : vos cessions sont inférieures à 305€. Pas d'impôt.");
    } else if (totalValueAtSell <= 0) {
      setResult("Moins-value ou aucune plus-value. Aucun impôt à payer.");
    } else {
      const taxe = totalValueAtSell * 0.30;
      setResult(`Plus-value imposable : ${totalValueAtSell.toFixed(2)} €\nImpôts à payer (30%) : ${taxe.toFixed(2)} €`);
    }

    setShowResultModal(true);
  }


  return (
    <div className="space-y-4">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleAddTransaction}
      >
        Ajouter une transaction
      </button>

      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center border p-4 rounded"
        >
          <select
            className="p-2 border rounded bg-white text-black"
            value={tx.type}
            onChange={(e) =>
              setTransactions((prev) =>
                prev.map((t) =>
                  t.id === tx.id ? { ...t, type: e.target.value as "buy" | "sell" } : t
                )
              )
            }
          >
            <option value="buy">Achat</option>
            <option value="sell">Vente</option>
          </select>

          <Select
            options={cryptoList.map((c) => ({ value: c, label: c }))}
            onChange={(selected: { value: string; label: string } | null) =>
              handleCryptoChange(selected?.value || "", tx.id)
            }
            value={tx.crypto ? { value: tx.crypto, label: tx.crypto } : null}
            placeholder="Crypto"
            isSearchable
            styles={{
              control: (base) => ({ ...base, backgroundColor: 'white', color: 'black' }),
              menu: (base) => ({ ...base, backgroundColor: 'white', color: 'black' }),
              singleValue: (base) => ({ ...base, color: 'black' })
            }}
          />

          <input
            type="number"
            className="p-2 border rounded bg-white text-black"
            placeholder="Montant en €"
            value={tx.amount || ""}
            onChange={(e) =>
              setTransactions((prev) =>
                prev.map((t) =>
                  t.id === tx.id ? { ...t, amount: parseFloat(e.target.value) } : t
                )
              )
            }
          />

          <input
            type="date"
            className="p-2 border rounded bg-white text-black"
            value={tx.date || ""}
            onChange={(e) =>
              setTransactions((prev) =>
                prev.map((t) =>
                  t.id === tx.id ? { ...t, date: e.target.value } : t
                )
              )
            }
          />

          <button
            className="text-red-600 underline text-sm"
            onClick={() =>
              setTransactions((prev) => prev.filter((t) => t.id !== tx.id))
            }
          >
            Supprimer
          </button>
        </div>
      ))}

      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => setShowEmailModal(true)}
      >
        Calculer les plus-values
      </button>

      {showResultModal && result && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-black">
            <h2 className="text-lg font-semibold mb-4">Résultat de la simulation</h2>
            <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded border">
              {result}
            </pre>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowResultModal(false)}
                className="bg-green-600 text-white px-4 py-2 rounded text-sm"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-black">
            <h2 className="text-lg font-semibold mb-4">Avant de voir le résultat</h2>
            <p className="mb-2 text-sm">Entrez votre e-mail si vous souhaitez recevoir nos prochaines améliorations (facultatif).</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full p-2 border rounded mb-4 bg-white text-black"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-sm text-gray-600"
              >
                Annuler
              </button>
              <button
                onClick={async () => {
                  setShowEmailModal(false);
                  if (email.trim()) {
                    try {
                      await fetch("https://formspree.io/f/xwkgrqgz", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, source: "simulateur-crypto" }),
                      });
                    } catch (error) {
                      console.error("Erreur lors de l’envoi de l’email", error);
                    }
                  }
                  handleCalculate();
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
