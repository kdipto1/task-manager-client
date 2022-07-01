import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";

const Dates = () => {
  const [value, onChange] = useState(new Date());
  return (
    <section className="container">
      <h2 className="text-center mt-2">Calendar</h2>
      <Calendar className="mx-auto mt-5" onChange={onChange} value={value} />
    </section>
  );
};

export default Dates;