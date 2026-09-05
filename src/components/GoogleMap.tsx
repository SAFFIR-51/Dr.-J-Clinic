import React from 'react';

const LAT = 37.4262867;
const LNG = 126.7480493;

export default function GoogleMap() {
  return (
    <iframe
      src={`https://www.google.com/maps?q=${LAT},${LNG}&z=17&hl=ko&output=embed`}
      style={{ width: '100%', height: '100%', border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="닥터제이앤미의원 위치"
      allowFullScreen
    />
  );
}
