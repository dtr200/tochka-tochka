/**
 * Переключатель чекбокса
 */

const setCheckboxToggle = () => {
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

/**
 * Переключатель кастомного селекта.
 * Устанавливает background.
 */

const customizeSelect = () => {
    let isOpen = false;
    const openEvents = [];

    const selectList = document.querySelectorAll('.input-field__list-container');

    const getItem = (list, tag) => {
        return Array.prototype.filter.call(list, (item) => 
                    item.nodeName === tag);
    }

    const setOptionValue = (e) => {
        const value = e.target.textContent;
        const ul = e.target.parentNode;
        const span = ul.previousSibling.previousSibling;

        if(!span.classList.contains('input-field__display--selected'))
            span.classList.add('input-field__display--selected')

        span.innerText = value;
        ul.removeEventListener('click', setOptionValue);
        ul.classList.add('input-field__list--hide');        
    }

    const removeListeners = () => {
        
        openEvents.forEach(({ element, event, method }) =>
            element.removeEventListener(event, method));

        openEvents.length = 0;
    }

    const closeSelect = () => {
        const ul = document.querySelectorAll('.input-field__list');
 
        ul.forEach(item => {
            if(!item.classList.contains('input-field__list--hide'))
                item.classList.add('input-field__list--hide');
        });

        removeListeners();
    }

    const showOptions = (e) => {
        e.stopPropagation();
        isOpen = !isOpen;
        if(e.target.nodeName === 'LI') return;

        const ul = getItem(e.target.childNodes, 'UL')[0];
 
        ul.classList.toggle('input-field__list--hide');

        ul.addEventListener('click', setOptionValue);        
        document.body.addEventListener('click', closeSelect);

        openEvents.push(
            {
                element: ul,
                event: 'click',
                method: setOptionValue
            }, 
            {
                element: document.body,
                event: 'click',
                method: closeSelect
            }
        );
    }

    selectList.forEach(select => 
        select.addEventListener('click', showOptions));
}

setCheckboxToggle();
customizeSelect();