import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CurrentCity() {
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    // Retrieve current location coordinates using browser geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getCurrentCityName(latitude, longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const getCurrentCityName = (latitude:number, longitude:number) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    axios
      .get(url)
      .then((response) => {
        const address = response.data.address;
        // console.log(address)
        if (address.city) {
          setCityName(address.city);
        } else if (address.town) {
          setCityName(address.town);
        } else if (address.village) {
          setCityName(address.village);
        } else {
          setCityName('City name not found');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Current City:</h2>
      <p>{cityName || 'Lodging...'}</p>
    </div>
  );
}

export default CurrentCity;