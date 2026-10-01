import './styles.css';
import { Book, BookFilter, formatBook, Catalog } from './task1-types';
import { addBook, removeBook } from './task2-functions';
import { applyFilters, filterByAuthor, filterByMinYear } from './task3-filters';
import { createBookFromForm } from "./task4-integration";
// Готовые данные для старта
let initialBooks: Catalog = {
  '1': {id: '1', title: 'TypeScript Guide', authors: ['John Doe'], year: 2023},
  '2': {id: '2', title: 'JavaScript Basics', authors: ['Jane Smith'], year: 2022},
  '3': {id: '3', title: 'Матча, плед и дедлайны', authors: ['Хлоя Ли'], year: 2024},
};

// TODO: Студенты пишут код ниже
const bookList = document.querySelector('#bookList') as HTMLDivElement;
const form = document.querySelector('#bookForm') as HTMLFormElement;
const filterBtn = document.querySelector('#applyFilters') as HTMLButtonElement;
const authorInput = document.querySelector('#filterAuthor') as HTMLInputElement;
const yearInput = document.querySelector('#filterYear')as HTMLInputElement;
const errorMessage = document.querySelector('#errorMessage')as HTMLDivElement;

function renderBooks(books: Book[]) {
  bookList.innerHTML = books.map(book => 
    `<div class="book-card">${formatBook(book)}</div>`
  ).join('');
}

// Отрисовать начальные книги
renderBooks(Object.values(initialBooks));

// Обработчик формы
document.getElementById('bookForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  // TODO: Получить данные из формы, добавить книгу, перерисовать
  errorMessage.textContent = '';
  try {
    const  fromData = new FormData(form);

    const newBook = createBookFromForm(fromData);

    initialBooks = addBook(initialBooks, newBook)

    form.reset()
    renderBooks(Object.values(initialBooks))
  }
  catch (error) {
    if (error instanceof Error) {
      errorMessage.textContent = error.message
    }
  }
});

// Обработчик фильтров
document.getElementById('applyFilters')?.addEventListener('click', () => {
  // TODO: Применить фильтры, перерисовать
  const filters: BookFilter[] = [];
  const author = authorInput.value.trim();
  const year = yearInput.value.trim();

  // Добавляем только те фильтры, для которых пользователь заполнил поле.
  if (author !== '') {
    filters.push(filterByAuthor(author));
  }

  if (year !== '') {
    filters.push(filterByMinYear(Number(year)));
  }

  const books = applyFilters(Object.values(initialBooks), filters);
  renderBooks(books);
});