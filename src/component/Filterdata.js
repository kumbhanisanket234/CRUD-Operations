import { createContext, useState, useContext } from "react";

const FilterContext = createContext(null);

function FilterProvider({ children }) {
    const [department, setDepartment] = useState('');
    const [filter, setFilter] = useState('');
    const [themeMode, setThemeMode] = useState(false);
    const [modeName, setModeName] = useState("light Mode");

    const updateDepartment = (dept) => {
        setDepartment(dept);
    };

    const updateList = (title) => {
        setFilter(title);
    }

    return (
        <FilterContext.Provider value={{ department, filter, updateDepartment, updateList, themeMode, setThemeMode, modeName, setModeName }}>
            {children}
        </FilterContext.Provider>
    );
}

function useFilter() {
    return useContext(FilterContext);
}

export { FilterProvider, useFilter }
