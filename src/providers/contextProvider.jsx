import React, { createContext, useContext, useState } from 'react'

const context = createContext()

const useTasksContext = () => {
    return useContext(context)
}

const ContextProvider = ({ children }) => {
    const [cards, setCards] = useState([])

    return (
        <context.Provider value={{ cards, setCards }}>
            {children}
        </context.Provider>
    )
}

export { ContextProvider, useTasksContext }