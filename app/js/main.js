const toggle = () => {
    const checkbox = document.querySelector('.checkbox__title');
    const items = document.querySelectorAll('.order-details__item--dynamic');

    const toggleEvent = () => {
            items.forEach(item => {
                item.classList.toggle('order-details__item--hide');
                item.parentNode.classList.toggle('order-details__list--hidden-child');
            });      
    }
    checkbox.addEventListener('click', toggleEvent);
}

toggle();