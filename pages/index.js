import React, { useState } from 'react';

const traktoren = {
  TYM: [
    "TYM T255", "TYM T353", "TYM T393", "TYM T433", "TYM T503",
    "TYM T555", "TYM T575", "TYM T654", "TYM T754", "TYM T1054", "TYM T1154"
  ],
  TAFE: [
    "TAFE 35DI", "TAFE 45DI", "TAFE 60DI", "TAFE 8502"
  ]
};

const zubehoer = [
  "Frontlader", "Frontgewicht", "Rasenbereifung", "Ackerschlepper-Bereifung",
  "Forstbereifung", "Anh�ngerkupplung", "Schlegelmulcher", "Fr�se",
  "Schneeschild", "Schneeketten", "Kabine", "Verdeck", "Frontzapfwelle",
  "Heckhydraulik", "Zusatzhydraulik", "Arbeitsscheinwerfer", "Komfortsitz",
  "Radio/Bluetooth", "GPS Vorbereitung", "Klimaanlage", "Heizung",
  "R�ckfahrkamera", "Seitenschneider", "M�hwerk", "Pflug", "Kreiselm�her",
  "Seilwinde", "Holzspalter", "Ladewagen", "D�ngerstreuer"
];

export default function TraktorenKonfigurator() {
  const [marke, setMarke] = useState(null);
  const [modell, setModell] = useState(null);
  const [optionen, setOptionen] = useState([]);
  const [kontakt, setKontakt] = useState({ name: '', email: '', telefon: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (option) => {
    setOptionen(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const handleSubmit = () => {
    console.log({ marke, modell, optionen, kontakt });
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="p-4 text-center text-xl">Vielen Dank f�r Ihre Anfrage!</div>;
  }

  if (!marke) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl mb-4">Willkommen bei Motorschulte</h1>
        <p className="mb-4">Bitte w�hlen Sie eine Marke:</p>
        <div className="flex justify-center gap-4">
          <button className="btn" onClick={() => setMarke('TYM')}>TYM</button>
          <button className="btn" onClick={() => setMarke('TAFE')}>TAFE</button>
        </div>
      </div>
    );
  }

  if (!modell) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl mb-4">W�hlen Sie ein Modell ({marke}):</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {traktoren[marke].map(m => (
            <div key={m} className="border p-4 cursor-pointer" onClick={() => setModell(m)}>
              {m}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (optionen.length < 1) {
    return (
      <div className="p-4">
        <h2 className="text-xl mb-4">W�hlen Sie das Zubeh�r f�r {modell}:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {zubehoer.map(option => (
            <label key={option} className="flex items-center gap-2">
              <input type="checkbox" onChange={() => handleOptionChange(option)} />
              {option}
            </label>
          ))}
        </div>
        <button className="btn mt-4" onClick={() => setOptionen([...optionen])}>Weiter</button>
      </div>
    );
  }

  if (!kontakt.email) {
    return (
      <div className="p-4">
        <h2 className="text-xl mb-4">Ihre Kontaktdaten</h2>
        <div className="space-y-4">
          <input placeholder="Name" className="input" onChange={e => setKontakt({ ...kontakt, name: e.target.value })} />
          <input placeholder="E-Mail" className="input" onChange={e => setKontakt({ ...kontakt, email: e.target.value })} />
          <input placeholder="Telefon" className="input" onChange={e => setKontakt({ ...kontakt, telefon: e.target.value })} />
        </div>
        <button className="btn mt-4" onClick={handleSubmit}>Anfrage absenden</button>
      </div>
    );
  }

  return null;
}
