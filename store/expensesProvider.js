import { createContext, useReducer, useContext } from 'react'
import reducer from './reducer'

const ExpensesContext = createContext()

const initialState = {
  expensesState: [],
}

const ExpensesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses })
  }

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id })
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } })
  }

  return (
    <ExpensesContext.Provider
      value={{
        ...state,
        addExpense,
        deleteExpense,
        updateExpense,
        setExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  )
}

export const useExpenses = () => {
  return useContext(ExpensesContext)
}

export default ExpensesContextProvider
