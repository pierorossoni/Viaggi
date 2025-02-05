/*
  # Travel Management Schema

  1. New Tables
    - `flights`
      - All flight booking related fields
      - Includes status tracking and payment info
    - `hotel`
      - Hotel booking information
      - Includes contact details and dates

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create flights table
CREATE TABLE IF NOT EXISTS flights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  volo_partenza text NOT NULL,
  volo_finale text NOT NULL,
  scalo text,
  data_volo date NOT NULL,
  orario_volo time NOT NULL,
  compagnia text NOT NULL,
  numero_volo text NOT NULL,
  numero_posto text NOT NULL,
  costo_biglietto decimal(10,2) NOT NULL,
  pagamento text NOT NULL,
  n_prenotazione text NOT NULL,
  volo_comprato text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Create hotel table
CREATE TABLE IF NOT EXISTS hotel (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_hotel text NOT NULL,
  localita text NOT NULL,
  contatto_tel text NOT NULL,
  email text NOT NULL,
  data_prenotazione date NOT NULL,
  data_entrata date NOT NULL,
  data_uscita date NOT NULL,
  prezzo decimal(10,2) NOT NULL,
  hotel_comprato text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own flights"
  ON flights
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own flights"
  ON flights
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own hotel bookings"
  ON hotel
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own hotel bookings"
  ON hotel
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
