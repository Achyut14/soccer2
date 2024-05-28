// src/Matches.js

import React from 'react';
import moment from 'moment';

const Matches = ({ matches }) => {
  return (
    <div>
      <h2>Matches</h2>
      {matches.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {matches.map(({ id, homeTeam, awayTeam, utcDate }) => {
              const matchDate = moment(utcDate).format('LL');
              const matchTime = moment(utcDate).format('LT');

              return (
                <tr key={id}>
                  <td>{homeTeam.name}</td>
                  <td>{awayTeam.name}</td>
                  <td>{matchDate}</td>
                  <td>{matchTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default Matches;
