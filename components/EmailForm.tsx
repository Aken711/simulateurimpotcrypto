import { useState } from "react"

export default function EmailForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("https://formspree.io/f/xwkgrqgz", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (res.ok) {
      setSubmitted(true)
      setEmail("")
      setShowToast(true)

      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    }
  }

  return (
    <div className="relative">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300 opacity-100">
          Merci pour votre inscription ! 🎉
        </div>
      )}

      <div className="card section mt-8">
        <h2 className="title">Recevoir les mises à jour 🔔</h2>

        {submitted ? (
          <p className="text-green-600">Merci ! Vous recevrez les prochaines nouveautés :)</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Votre adresse email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              S'inscrire
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
