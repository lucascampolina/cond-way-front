import React from 'react';

export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <span className="p-1">
      Search:{' '}
            <input
                value={filter || ''}
                onChange={e => setFilter(e.target.value)}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
    </span>
    );
};