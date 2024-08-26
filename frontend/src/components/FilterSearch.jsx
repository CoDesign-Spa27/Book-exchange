import React, { useState } from 'react';

const FilterSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass the search term back to the parent component
  };

  return (
    <div className="p-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#000" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

      <input
        type="text"
        placeholder="Search by genre or author..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full bg-white text-black p-2 border rounded-lg shadow-sm"
      />
      
    </div>
  );
};

export default FilterSearch;
