import React, { useEffect, useState } from 'react';
import citiesData from '../../data/cities.json';

const CitySelect = ({ onChange }) => {
  const [selectedCity, setSelectedCity] = useState('');

  const handleSelectChange = (e) => setSelectedCity(e.target.value);

  useEffect(() => {
    selectedCity && onChange && onChange(selectedCity)
  }, [selectedCity, onChange])

  return (
    <select
      value={selectedCity}
      onChange={handleSelectChange}
      className='block w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
    >
      <option value="" disabled>Select a city</option>
      {citiesData.map((city, index) => (
        <option key={index} value={[city.lat, city.lng]}>{city.city}</option>
      ))}
    </select>
  );
};

export default CitySelect;
