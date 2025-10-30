
/* triggers */
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

/* connect triggers to database */
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON patients
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

/* patient table */
CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';

CREATE TABLE patients(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  fullname VARCHAR(80) NOT NULL,
  age SMALLINT CHECK (age > 0) NOT NULL,
  state_medic medical_state DEFAULT 'hech narsa' NOT NULL,
  medic_history TEXT NOT NULL,
  contact_info JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE medical_state AS ENUM (
  'diabet',
  'gipertenziya',
  'astma',
  'yurak_kasalligi',
  'appendix',
  'gripp',
  'hech narsa'
);

/* appointments table */
CREATE TYPE appointment_status AS ENUM (
  'rejalashtirilgan',
  'tugallangan',
  'bekor_qilingan'
);

CREATE TABLE appointments(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id),
    doctor_name VARCHAR(80) NOT NULL,
    appoint_time DATE DEFAULT CURRENT_DATE NOT NULL,
    status_appoint appointment_status DEFAULT 'rejalashtirilgan' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);