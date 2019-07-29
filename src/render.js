export default class renderUI {
    constructor() {
        this.currentDate = document.querySelector('#date');
        this.currentBudget = document.querySelector('#budget');
        this.incomeFrom = document.querySelector('#income');
        this.incomeValue = document.querySelector('#income-value');
        this.incomeDescription = document.querySelector('#income-description');
        this.expenseForm = document.querySelector('#expense');
        this.expenseValue = document.querySelector('#expense-value');
        this.expenseDescription = document.querySelector('#expense-description');
        this.wastesList = document.querySelector('#wastes');
        this.itemList = JSON.parse(localStorage.getItem('wastes')) || [];
        this.itemId = 0;
    }

    showDate() {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();

        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
         ];

        this.currentDate.innerHTML = `${months[month]} ${year}`;
    }

    submitExpense() {
        const expValue = this.expenseValue.value;
        const expDescription = this.expenseDescription.value;

        let amount = parseInt(expValue);
        this.expenseValue.value = '';
        this.expenseDescription.value = '';

        let expense = {
            type: "expense",
            id: this.itemId,
            description: expDescription,
            amount
        };

        if(expDescription !== '' && expValue !== null) {
            this.itemId++;
            this.itemList.push(expense);
            this.addBudgetToLs();
            this.addWastes();
            this.showBudget();
        };
    }

    submitIncome() {
        const incValue = this.incomeValue.value;
        const incDescription = this.incomeDescription.value;

        let amount = parseInt(incValue);
        this.incomeValue.value = '';
        this.incomeDescription.value = '';

        let income = {
            type: "income",
            id: this.itemId,
            description: incDescription,
            amount
        };

        if(incDescription !== '' && incValue !== '') {
            this.itemId++;
            this.itemList.push(income);
            this.addBudgetToLs();
            this.addWastes();
            this.showBudget();
        }
    }

    addWastes() {
        const wastes = JSON.parse(localStorage.getItem('wastes'));

        if(wastes) {
            this.wastesList.innerHTML = wastes.map((item, index) => {
            if(item.type === 'income') {
                return `
                <div class="spending-item">
                    <div class="spending-item__description">${item.description}</div>
                    <div class="spending-item__value"> + ${item.amount}</div>
                    <div class="spending-item__delete" data-index="${index}">&#10006</div>
                </div>`;
            } else {
                return `
                <div class="spending-item">
                    <div class="spending-item__description">${item.description}</div>
                    <div class="spending-item__value"> - ${item.amount}</div>
                    <div class="spending-item__delete" data-index="${index}">&#10006</div>
                </div>`;
            }
            }).join(''); 
        };
    }

    addBudgetToLs() {
        localStorage.setItem('wastes', JSON.stringify(this.itemList));
    }

    removeFromLs(e) {
        const el = e.target;
        this.itemList.splice(el.dataset.index, 1);
        this.addBudgetToLs();
        this.addWastes();
        this.showBudget();
    }

    showBudget() {
        const budget = JSON.parse(localStorage.getItem('wastes'));

        let allIncomes = 0;
        let allExpenses = 0;
        
        budget.forEach(item => {
            if(item.type === 'income') {
                allIncomes += item.amount;
            }
            else {
                allExpenses += item.amount;
            }
        });

        let total = allIncomes - allExpenses;

        this.currentBudget.innerHTML = total;
    }

}