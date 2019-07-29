import "./scss/main.scss";

import renderUI from './render';

function EventController() {
    const incomeForm = document.querySelector('#income');
    const expenseForm = document.querySelector('#expense');
    const wastesList = document.querySelector('#wastes');

    const budget = new renderUI();

    budget.showDate();
    budget.showBudget();
    budget.addWastes();

    incomeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        budget.submitIncome();
    });

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        budget.submitExpense();
    });

    wastesList.addEventListener('click', (e) => {
        budget.removeFromLs(e);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    EventController();
});