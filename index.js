const expenses = [];

const categories = {
    food: 'Еда',
    transport: 'Транспорт',
    purchases: 'Покупки',
    house: 'Дом',
    health: 'Здоровье',
    entertainment: 'Развлечения',
    sport: 'Спорт',
    education: 'Образование',
    subscriptions: 'Подписки',
    other: 'Другое'
};

function addExpense(title, amount, category) {
    const expense = {
        id: crypto.randomUUID(),
        category: category,
        amount: Number(amount),
        title: title,
        date: new Date()     
    }

    expenses.push(expense)

    return expenses;
}

function removeExpense(id) {
    const idIndex = expenses.findIndex(expens => expens.id === id);

    if (idIndex === -1) {
        console.warn('Не удалось найти элемент с таким ID!')
    } else {
        expenses.splice(idIndex, 1)
        renderExpenses()
    }
} 

const form = document.querySelector('.add-expense__form')
const sumField = document.querySelector('.form__input--number')
const nameField = document.querySelector('.form__input--name')
const categoryField = document.querySelector('#category')
const listExpenses = document.querySelector('#expenses-list')
const filterCategory = document.querySelector('#category-filter')

form.addEventListener('submit', (event) => {
    event.preventDefault();

    addExpense(nameField.value, sumField.value, categoryField.value)
    
    renderExpenses()

    form.reset();
})

function createExpenseElement(expense) {

    const formattedAmount = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB'
    }).format(expense.amount);

    const formattedDate = new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(expense.date);

    const year = expense.date.getFullYear();
    const month = String(expense.date.getMonth() + 1).padStart(2, '0');
    const day = String(expense.date.getDate()).padStart(2, '0');

    const li = document.createElement('li');
    li.classList.add('history__item');

    const article = document.createElement('article');
    article.classList.add('transaction')

    const divInfo = document.createElement('div')
    divInfo.classList.add('transaction__info')

    const infTitle = document.createElement('h3')
    infTitle.classList.add('transaction__title')
    infTitle.textContent = expense.title

    const infCategory = document.createElement('p')
    infCategory.classList.add('transaction__category')
    infCategory.textContent = categories[expense.category]

    const infDate = document.createElement('time')
    infDate.classList.add('transaction__date')
    infDate.textContent = formattedDate
    infDate.dateTime = `${year}-${month}-${day}`;
    
    const divDetails = document.createElement('div')
    divDetails.classList.add('transaction__details')

    const infSum = document.createElement('p')
    infSum.classList.add('transaction__amount')
    infSum.textContent = formattedAmount

    const infButton = document.createElement('button')
    infButton.classList.add('transaction__delete', 'button', 'button--danger')
    infButton.textContent = 'Удалить'
    infButton.type = 'button'
    infButton.dataset.id = expense.id
    infButton.addEventListener('click', (e) => {
        removeExpense(e.currentTarget.dataset.id)
    })


    divInfo.append(infTitle, infCategory, infDate)
    divDetails.append(infSum, infButton)

    article.append(divInfo, divDetails)
    li.append(article)

    return li;
}

function getFilteredExpenses() {
    const selectedCategory = filterCategory.value;

    if (selectedCategory === '') {
        return expenses;
    }

    return expenses.filter(expense => {
        return expense.category === selectedCategory;
    });
}

function renderExpenses() {
    listExpenses.innerHTML = '';

    const expensesToRender = getFilteredExpenses();

    expensesToRender.forEach(expense => {
        const expenseElement = createExpenseElement(expense);
        listExpenses.append(expenseElement);
    });
}

filterCategory.addEventListener('change', () => {
    renderExpenses();
});

