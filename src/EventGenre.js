import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    const getData = () => {
      const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
      const data = genres.map((genre) => {
        const value = events.filter(({ summary} ) =>
          summary.includes(genre)
        ).length;
        return { name: genre, value };
      });
      return data.filter((genre) => { return genre.value > 0});
    };
    setData(() => getData());
  }, [events]);

  const COLORS = ['#678fe4', '#b588d5', '#e186b7', '#f39099', '#f0a384'];

  return (
    <ResponsiveContainer id="pie-container" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenre;
