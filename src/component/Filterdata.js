import { createContext, useState, useContext } from "react";

const FilterContext = createContext(null);

function FilterProvider({ children }) {
    const [department, setDepartment] = useState('');
    const [filter, setFilter] = useState('');


    const updateDepartment = (dept) => {
        setDepartment(dept);
    };

    const updateList = (title) => {
        setFilter(title);
    }

    return (
        <FilterContext.Provider value={{ department, filter, updateDepartment, updateList }}>
            {children}
        </FilterContext.Provider>
    );
}

function useFilter() {
    return useContext(FilterContext);
}

export { FilterProvider, useFilter }
