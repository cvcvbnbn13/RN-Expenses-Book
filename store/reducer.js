import { initialState } from './expensesProvider'

const reducer = (state, action) => {
  if (action.type === 'SET') {
    const inverted = action.payload.reverse()
    return {
      ...state,
      expensesState: inverted,
    }
  }

  if (action.type === 'ADD') {
    return {
      ...state,
      expensesState: [{ ...action.payload }, ...state.expensesState],
    }
  }

  if (action.type === 'UPDATE') {
    const itemIndex = state.expensesState.findIndex(
      expense => expense.id === action.payload.id
    )
    // 要被更新的
    const updatedExpense = state.expensesState[itemIndex]
    // 更新好的內容
    const updatedContent = { ...updatedExpense, ...action.payload.data }
    // 全體
    const updatedExpenses = [...state.expensesState]
    updatedExpenses[itemIndex] = updatedContent
    return { ...state, expensesState: updatedExpenses }
  }

  if (action.type === 'DELETE') {
    console.log(state.expensesState)
    return {
      ...state,
      expensesState: state.expensesState.filter(
        expense => expense.id !== action.payload
      ),
    }
  }

  return state
}

export default reducer
