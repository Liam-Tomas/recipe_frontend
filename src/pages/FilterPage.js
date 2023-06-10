import React, { useState } from 'react';
import FilterSearch from '../components/FilterSearch';

function FilterPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div>
            <FilterSearch/>
        </div>
    );
}

export default FilterPage;
