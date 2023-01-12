import axios from 'axios'

const rootURL =
  'https://rn-expense-book-default-rtdb.asia-southeast1.firebasedatabase.app/'

export const storeExpense = async expenseData => {
  const res = await axios.post(`${rootURL}/expenses.json`, expenseData)
  const id = res.data.name
  return id
}

export const fetchExpense = async () => {
  const res = await axios.get(`${rootURL}/expenses.json`)

  const expenses = []

  for (const key in res.data) {
    const expenseObj = {
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      description: res.data[key].description,
    }
    expenses.push(expenseObj)
  }

  return expenses
}

export const firebase_updateExpense = (id, expenseData) => {
  return axios.put(`${rootURL}/expenses/${id}.json`, expenseData)
}
export const firebase_deleteExpense = id => {
  return axios.delete(`${rootURL}/expenses/${id}.json`)
}
