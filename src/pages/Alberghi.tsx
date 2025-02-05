import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Home } from 'lucide-react';

function Alberghi() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome_hotel: '',
    localita: '',
    contatto_tel: '',
    email: '',
    data_prenotazione: '',
    data_entrata: '',
    data_uscita: '',
    prezzo: '',
    pagamento: '',
    hotel_comprato: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('hotel')
      .insert([
        {
          ...formData,
          prezzo: parseFloat(formData.prezzo)
        }
      ]);

    if (error) {
      alert('Errore durante il salvataggio: ' + error.message);
    } else {
      alert('Hotel registrato con successo!');
      navigate('/');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">🏨 Registra Hotel</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">🏨 Nome Hotel</label>
            <input
              type="text"
              name="nome_hotel"
              value={formData.nome_hotel}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">🌍 Località</label>
            <input
              type="text"
              name="localita"
              value={formData.localita}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">📞 Contatto Tel</label>
            <input
              type="tel"
              name="contatto_tel"
              value={formData.contatto_tel}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">✉️ Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">📅 Data Prenotazione</label>
            <input
              type="date"
              name="data_prenotazione"
              value={formData.data_prenotazione}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">📅 Data Entrata</label>
            <input
              type="date"
              name="data_entrata"
              value={formData.data_entrata}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">📅 Data Uscita</label>
            <input
              type="date"
              name="data_uscita"
              value={formData.data_uscita}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">💰 Prezzo</label>
            <input
              type="number"
              step="0.01"
              name="prezzo"
              value={formData.prezzo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">💳 Pagamento</label>
            <select
              name="pagamento"
              value={formData.pagamento}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Seleziona metodo</option>
              <option value="Paypal">Paypal</option>
              <option value="Carta-Credito">Carta-Credito</option>
              <option value="Bonifico">Bonifico</option>
              <option value="Carta-Debito">Carta-Debito</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">✅ Hotel Comprato</label>
            <select
              name="hotel_comprato"
              value={formData.hotel_comprato}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Seleziona stato</option>
              <option value="SI">SI</option>
              <option value="NO">NO</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Home size={20} className="mr-2" />
            🏠 Torna alla Home
          </button>
          
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            📥 Inserisci Dati nel Database
          </button>
        </div>
      </form>
    </div>
  );
}

export default Alberghi;
