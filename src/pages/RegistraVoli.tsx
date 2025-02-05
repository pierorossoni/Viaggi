import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Home } from 'lucide-react';

function RegistraVoli() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    volo_partenza: '',
    volo_finale: '',
    scalo: '',
    data_volo: '',
    orario_volo: '',
    compagnia: '',
    numero_volo: '',
    numero_posto: '',
    costo_biglietto: '',
    pagamento: '',
    n_prenotazione: '',
    volo_comprato: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('flights')
      .insert([
        {
          ...formData,
          costo_biglietto: parseFloat(formData.costo_biglietto)
        }
      ]);

    if (error) {
      alert('Errore durante il salvataggio: ' + error.message);
    } else {
      alert('Volo registrato con successo!');
      navigate('/');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">✈️ Registra Voli</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">✈️ Volo Partenza</label>
            <input
              type="text"
              name="volo_partenza"
              value={formData.volo_partenza}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">📍 Volo Finale</label>
            <input
              type="text"
              name="volo_finale"
              value={formData.volo_finale}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">🚩 Scalo</label>
            <input
              type="text"
              name="scalo"
              value={formData.scalo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">📅 Data Volo</label>
            <input
              type="date"
              name="data_volo"
              value={formData.data_volo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">⏰ Orario Volo</label>
            <input
              type="time"
              name="orario_volo"
              value={formData.orario_volo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">✈️ Compagnia</label>
            <input
              type="text"
              name="compagnia"
              value={formData.compagnia}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">🔢 Numero Volo</label>
            <input
              type="text"
              name="numero_volo"
              value={formData.numero_volo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">🪑 Numero Posto</label>
            <input
              type="text"
              name="numero_posto"
              value={formData.numero_posto}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">💰 Costo Biglietto</label>
            <input
              type="number"
              step="0.01"
              name="costo_biglietto"
              value={formData.costo_biglietto}
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
              <option value="PayPal">PayPal</option>
              <option value="Cartao Nubank">Cartao Nubank</option>
              <option value="Carta Porto">Carta Porto</option>
              <option value="Altro Pagamento">Altro Pagamento</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">📝 N. Prenotazione</label>
            <input
              type="text"
              name="n_prenotazione"
              value={formData.n_prenotazione}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">✅ Volo Comprato</label>
            <select
              name="volo_comprato"
              value={formData.volo_comprato}
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            📥 Inserisci Dati nel Database
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistraVoli;
