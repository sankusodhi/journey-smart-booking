// src/components/BookingForm.tsx

import { useState } from 'react'
import { supabase } from "@/lib/supabaseClient";

function BookingForm() {
  const [busId, setBusId] = useState('')
  const [date, setDate] = useState('')
  const [status] = useState('confirmed')
  const [message, setMessage] = useState('')

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()

    const user = await supabase.auth.getUser()
    if (!user.data.user) {
      setMessage('Please log in first.')
      return
    }

    const { data, error } = await supabase.from('bookings').insert([
      {
        bus_id: busId,
        date,
        user_email: user.data.user.email,
        status,
      },
    ])

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Booking successful!')
    }
  }

  return (
    <form onSubmit={handleBooking} className="p-4 space-y-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Bus ID"
        className="border px-4 py-2 w-full"
        value={busId}
        onChange={(e) => setBusId(e.target.value)}
        required
      />
      <input
        type="date"
        className="border px-4 py-2 w-full"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 w-full">
        Book Now
      </button>
      {message && <p className="text-center mt-2 text-red-500">{message}</p>}
    </form>
  )
}

export default BookingForm
