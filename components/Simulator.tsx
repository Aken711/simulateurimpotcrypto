import { useState } from "react"

export default function Simulator() {
  const [achat, setAchat] = useState(0)
  const [portefeuille, setPortefeuille] = useState(0)
  const [vente, setVente] = useState(0)

  const plusValue = vente - (achat * (vente / portefeuille || 1))
  const impot = plusValue > 0 ? plusValue * 0.3 : 0

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Simulateur de plus-value crypto 🇫🇷</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm">Montant total d'achat (€)</label>
          <input type="number" className="w-full border rounded p-2" value={achat} onChange={e => setAchat(parseFloat(e.target.value) || 0)} />
        </div>

        <div>
          <label className="block mb-1 text-sm">Valeur totale du portefeuille au moment de la vente (€)</label>
          <input type="number" className="w-full border rounded p-2" value={portefeuille} onChange={e => setPortefeuille(parseFloat(e.target.value) || 0)} />
        </div>

        <div>
          <label className="block mb-1 text-sm">Montant vendu (€)</label>
          <input type="number" className="w-full border rounded p-2" value={vente} onChange={e => setVente(parseFloat(e.target.value) || 0)} />
        </div>

        <div className="pt-4 border-t mt-4 text-gray-800">
          <p><strong>Plus-value estimée :</strong> {plusValue.toFixed(2)} €</p>
          <p><strong>Impôt estimé (30%) :</strong> {impot.toFixed(2)} €</p>
        </div>
      </div>
    </div>
  )
}
