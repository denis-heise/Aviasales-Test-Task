import {createTickets} from './get-data.js';
const typeTicket = document.querySelector('.main-page__type-ticket');
const oneType = typeTicket.querySelectorAll('.main-page__one-type');
let renderedTickets;

window.addEventListener('onload', createTickets())

setInterval(function(){
    renderedTickets = document.querySelectorAll('.main-page__one-ticket');
}, 500)

typeTicket.addEventListener('click', function(evt){
    let target = evt.target;
    renderedTickets.forEach(item => item.remove());
    oneType.forEach(item => item.classList.remove('checked-type'));
    target.classList.add('checked-type');
    createTickets();
});
export {renderedTickets};