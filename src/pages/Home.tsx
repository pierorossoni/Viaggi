import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Hotel } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface Flight {
  id: string;
  volo_partenza: string;
  volo_finale: string;
  scalo: string;
  data_volo: string;
  orario_volo: string;
  compagnia: string;
  numero_volo: string;
  numero_posto: string;
  costo_biglietto: number;
  pagamento: string;
  n_prenotazione: string;
  volo_comprato: string;
}

interface HotelBooking {
  id: string;
  nome_hotel: string;
  localita: string;
  contatto_tel: string;
  email: string;
  data_prenotazione: string;
  data_entrata: string;
  data_uscita: string;
  prezzo: number;
  pagamento: string;
  hotel_comprato: string;
}

function Home() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hotels, setHotels] = useState<HotelBooking[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: flightsData } = await supabase
      .from('flights')
      .select('*')
      .order('data_volo', { ascending: true });

    const { data: hotelsData } = await supabase
      .from('hotel')
      .select('*')
      .order('data_entrata', { ascending: true });

    if (flightsData) setFlights(flightsData);
    if (hotelsData) setHotels(hotelsData);
  }

  const openInGoogleMaps = (localita: string) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(localita)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center space-x-4">
        <Link
          to="/registra-voli"
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plane size={24} />
          <span>🛫 Registra Voli</span>
        </Link>
        <Link
          to="/alberghi"
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Hotel size={24} />
          <span>🏨 Alberghi</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">✈️ Voli Prenotati</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2">✈️ Partenza</th>
                  <th className="px-4 py-2">📍 Arrivo</th>
                  <th className="px-4 py-2">🚩 Scalo</th>
                  <th className="px-4 py-2">📅 Data</th>
                  <th className="px-4 py-2">⏰ Orario</th>
                  <th className="px-4 py-2">✈️ Compagnia</th>
                  <th className="px-4 py-2">🔢 N° Volo</th>
                  <th className="px-4 py-2">🪑 Posto</th>
                  <th className="px-4 py-2">💰 Costo</th>
                  <th className="px-4 py-2">💳 Pagamento</th>
                  <th className="px-4 py-2">📝 N° Prenotazione</th>
                  <th className="px-4 py-2">✅ Stato</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <tr key={flight.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{flight.volo_partenza}</td>
                    <td className="px-4 py-2">{flight.volo_finale}</td>
                    <td className="px-4 py-2">{flight.scalo || '-'}</td>
                    <td className="px-4 py-2">
                      {format(new Date(flight.data_volo), 'dd/MM/yyyy', { locale: it })}
                    </td>
                    <td className="px-4 py-2">{flight.orario_volo}</td>
                    <td className="px-4 py-2">{flight.compagnia}</td>
                    <td className="px-4 py-2">{flight.numero_volo}</td>
                    <td className="px-4 py-2">{flight.numero_posto}</td>
                    <td className="px-4 py-2">€{flight.costo_biglietto}</td>
                    <td className="px-4 py-2">{flight.pagamento}</td>
                    <td className="px-4 py-2">{flight.n_prenotazione}</td>
                    <td className="px-4 py-2">
                      {flight.volo_comprato === 'SI' ? '✅' : '⏳'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">🏨 Hotel Prenotati</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2">🏨 Hotel</th>
                  <th className="px-4 py-2">🌍 Località</th>
                  <th className="px-4 py-2">📞 Contatto</th>
                  <th className="px-4 py-2">✉️ Email</th>
                  <th className="px-4 py-2">📅 Prenotazione</th>
                  <th className="px-4 py-2">📅 Check-in</th>
                  <th className="px-4 py-2">📅 Check-out</th>
                  <th className="px-4 py-2">💰 Prezzo</th>
                  <th className="px-4 py-2">💳 Pagamento</th>
                  <th className="px-4 py-2">✅ Stato</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map((hotel) => (
                  <tr key={hotel.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{hotel.nome_hotel}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => openInGoogleMaps(hotel.localita)}
                        className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer flex items-center"
                      >
                        {hotel.localita} 🗺️
                      </button>
                    </td>
                    <td className="px-4 py-2">{hotel.contatto_tel}</td>
                    <td className="px-4 py-2">{hotel.email}</td>
                    <td className="px-4 py-2">
                      {format(new Date(hotel.data_prenotazione), 'dd/MM/yyyy', { locale: it })}
                    </td>
                    <td className="px-4 py-2">
                      {format(new Date(hotel.data_entrata), 'dd/MM/yyyy', { locale: it })}
                    </td>
                    <td className="px-4 py-2">
                      {format(new Date(hotel.data_uscita), 'dd/MM/yyyy', { locale: it })}
                    </td>
                    <td className="px-4 py-2">€{hotel.prezzo}</td>
                    <td className="px-4 py-2">{hotel.pagamento}</td>
                    <td className="px-4 py-2">
                      {hotel.hotel_comprato === 'SI' ? '✅' : '⏳'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
