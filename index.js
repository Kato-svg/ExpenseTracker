const expenses = [];

function addExpense(title, amount, category) {
    const expense = {
        id: crypto.randomUUID(),
        category: category,
        amount: Number(amount),
        title: title,
        date: new Date()        
    }

    return expenses.push(expense);
}

function removeExpense(id) {
    const idIndex = expenses.findIndex(expens => expens.id === id);

    if (idIndex === -1) {
        console.warn('Не удалось найти элемент с таким ID!')
    } else {
        expenses.splice(idIndex, 1)
    }
} 
