import MultiSimulator from "@/components/MultiSimulator"
import EmailForm from "@/components/EmailForm"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 p-6 space-y-6">
      <section className="w-full max-w-5xl mx-auto text-center p-6 space-y-4">
  <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
    📈 Simulateur de Plus-Value Crypto 🇫🇷
  </h1>
  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
    Estimez vos gains, vos plus-values, et votre imposition fiscale sur vos transactions crypto en quelques secondes.
    Outil gratuit et informatif pour les particuliers et investisseurs français.
  </p>
</section>
      {/* Warning et explication */}
      <div className="w-full max-w-5xl mx-auto p-4 space-y-6 mb-8 animate-fade-in">
        {/* 🛑 Avertissement */}
        <div className="flex items-start bg-yellow-100 text-yellow-800 p-4 rounded-lg border border-yellow-300">
          <span className="text-2xl mr-3">⚠️</span>
          <div>
            <strong>Attention :</strong> Cet outil est en bêta.<br />
            Il est recommandé de vérifier manuellement vos calculs pour éviter toute erreur fiscale.
            <br />Cet outil est uniquement à but informatif et ne remplace pas un conseil professionnel.
          </div>
        </div>

        {/* 📚 Explication */}
        <div className="flex items-start bg-blue-100 text-blue-800 p-4 rounded-lg border border-blue-300">
          <span className="text-2xl mr-3">ℹ️</span>
          <div>
            <strong>Comment sont calculées vos plus-values crypto ?</strong>
            <p className="mt-2 text-sm">
              Lorsque vous vendez une crypto contre des euros, votre plus-value est calculée ainsi :
            </p>
            <pre className="bg-white p-2 rounded mt-2 text-gray-800 text-sm whitespace-pre-wrap break-words">
  Plus-value = Montant vendu (€) - (Coût d'acquisition total (€) × (Montant vendu (€) ÷ Valeur totale du portefeuille (€) au moment de la vente))
</pre>
            <p className="mt-2 text-sm">
              Le coût d’acquisition est réparti au prorata de la valeur de votre portefeuille au moment de la vente.
            </p>
          </div>
        </div>
      </div>

      {/* Simulateur */}
      <section className="section">
        <MultiSimulator />
      </section>

      {/* Formulaire email */}
      <section className="section">
        <EmailForm />
      </section>

      {/* Footer */}
      <section className="section text-sm text-gray-500 text-center">
        🛑 Cet outil est uniquement à but informatif.
      </section>

      <footer className="text-center text-xs text-gray-400 py-4">
        © {new Date().getFullYear()} – Simulateur crypto fait avec ❤️par Bryan 
      </footer>

    </main>
  )
}
