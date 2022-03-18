/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов 

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

 */






'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против...",            
        ]
    };    
    const adv = document.querySelectorAll('.promo__adv img'),
         mainBg = document.querySelector('.promo__bg'),
         genre = mainBg.querySelector('.promo__genre'),
         movieList = document.querySelector('.promo__interactive-list'),
         addForm = document.querySelector('form.add'),
         addInput = addForm.querySelector('.adding__input'),
         checkbox = addForm.querySelector('[type="checkbox"]');      
    function deleteAdv(arr) {
        arr.forEach((item) => {
            item.remove();
        });               
    }
    function makeChanges() {
        genre.textContent = 'драма'; 
        mainBg.style.backgroundImage = 'url("img/bg.jpg")';
    }    
    function sortArr(arr) {        
        arr.sort();
    }
    function createMovieList (films, parent) {
        parent.innerHTML = ''; 
        sortArr(films);    
        
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film} 
                    <div class="delete"></div>   
                </li>  
        `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentNode.remove();
                movieDB.movies.splice(i, 1);
                
                createMovieList(films, parent);
            });
        });
    }


    addForm.addEventListener('submit', e => {
        e.preventDefault();
        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if(newFilm) {
            if(newFilm.length > 21) {
                newFilm = `${newFilm.slice(0, 22)}...`;
            }
            if(favorite) {
                console.log("Добавляем любимый фильм");
            }
            movieDB.movies.push(newFilm);
            createMovieList(movieDB.movies, movieList); 
        }        

        e.target.reset();
    });    


    createMovieList(movieDB.movies, movieList);    
    deleteAdv(adv);
    makeChanges();      
});