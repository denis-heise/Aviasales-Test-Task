import {createTickets} from './get-data.js';
import {renderedTickets} from './tickets-type.js';

const NUMBER_FILTER_STOPS = 3;
const stopsBlock = document.querySelector('.main-page__type-stops');
const checkStops = stopsBlock.querySelectorAll('.check');
const allLabel = stopsBlock.querySelector('.all');
const allCheck = allLabel.querySelector('.check');

stopsBlock.addEventListener('click', function(evt){
    let target = evt.target;
    evt.preventDefault();
    const labelStop = target.closest('.main-page__stops-label');
    const checkbox = labelStop.querySelector('.check');
    renderedTickets.forEach(item => item.remove());

    // Добавляем/удаляем галочку у всех чекбоксов
    if(labelStop.classList.contains('all') && !checkbox.classList.contains('visible')){
        checkStops.forEach(item => item.classList.add('visible'));
    } else if(labelStop.classList.contains('all') && checkbox.classList.contains('visible')){
        checkStops.forEach(item => item.classList.remove('visible'));
    };

    //добавляем галочку всеv чекбоксам, если выбрано более 3 вида фильтра по остановкам
    setTimeout(function(){
        let checkStopsVisible = stopsBlock.querySelectorAll('.visible');
        if (checkStopsVisible.length > NUMBER_FILTER_STOPS){
            checkStops.forEach(item => item.classList.add('visible'));
        } 
    }, 100)

    // Добавляем/удаляем галочку у одного чекбокса/у чекбокса "Все", если выбраны все и убираем у одного из других
    if(!labelStop.classList.contains('all') && !checkbox.classList.contains('visible')){
        checkbox.classList.add('visible');
    } else if(!labelStop.classList.contains('all') && checkbox.classList.contains('visible')){
        checkbox.classList.remove('visible');
        allCheck.classList.remove('visible');
    };    

    createTickets();
});

export {checkStops};