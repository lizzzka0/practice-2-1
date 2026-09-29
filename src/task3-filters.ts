// Задание 3: Фильтрация
// Использование функций высшего порядка и предикатов для поиска данных

import { Book, BookFilter } from "./task1-types";

// TODO 1: Создайте фильтр по имени автора
// Параметры:
//   - authorName (string): имя или часть имени автора для поиска
// Возвращает: функцию типа BookFilter, которая возвращает true, если автор есть в списке book.authors
// Подсказка: используйте метод массива .some() и приведите строки к нижнему регистру для нечувствительного поиска.
export const filterByAuthor = (authorName: string): BookFilter => {
  const normalizedAuthor = authorName.toLowerCase();
  return (book: Book): boolean => {
    for (const author of book.authors) {
      if (author.toLowerCase().includes(normalizedAuthor)) {
        return true;
      }
    }
    return false;
  };
};

// TODO 2: Создайте фильтр по минимальному году издания
// Параметры:
//   - year (number): минимальный год
// Возвращает: функцию типа BookFilter, которая возвращает true, если book.year >= year
// Подсказка: не забудьте проверить, что book.year !== undefined, иначе будет ошибка.
export const filterByMinYear = (year: number): BookFilter => {
  return (book: Book): boolean => {
    if (book.year !== undefined && book.year >= year) {
      return true;
    }
    return false;
  };
};

// TODO 3: Создайте фильтр по минимальному рейтингу
// Параметры:
//   - rating (number): минимальный рейтинг
// Возвращает: функцию типа BookFilter, которая возвращает true, если book.rating >= rating
export const filterByMinRating = (rating: number): BookFilter => {
  return (book: Book): boolean => {
    if (book.rating !== undefined && book.rating >= rating) {
      return true;
    }
    return false;
  };
};

// TODO 4: Примените массив фильтров к массиву книг
// Параметры:
//   - books (Book[]): исходный массив книг
//   - filters (BookFilter[]): массив функций-предикатов
// Возвращает: новый массив Book[], содержащий только те книги, которые проходят ВСЕ фильтры
// Подсказка: используйте метод массива .filter() в сочетании с .every().
export const applyFilters = (books: Book[], filters: BookFilter[]): Book[] => {
  return books.filter((book: Book) => {
    return filters.every((filter: BookFilter) => filter(book));
  });
};