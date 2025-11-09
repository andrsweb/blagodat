document.addEventListener('DOMContentLoaded', () => {
    const inputGroups = document.querySelectorAll('.input-group');
    const guestsDropdown = document.querySelector('.guests-dropdown');
    
    let adultsCount = 2;
    let childrenCount = 0;

    inputGroups.forEach((group) => {
        const inputType = group.getAttribute('data-input');
        
        group.addEventListener('click', (e) => {
            if (e.target.closest('.guests-dropdown')) return;
            
            if (inputType === 'checkin' || inputType === 'checkout') {
                const dateInput = group.querySelector('.input-hidden');
                dateInput.showPicker();
            } else if (inputType === 'guests') {
                closeAllDropdowns();
                guestsDropdown.classList.toggle('active');
            }
        });

        if (inputType === 'checkin' || inputType === 'checkout') {
            const dateInput = group.querySelector('.input-hidden');
            const valueSpan = group.querySelector('.input-group-value');
            
            dateInput.addEventListener('change', () => {
                if (dateInput.value) {
                    const date = new Date(dateInput.value);
                    const formatted = formatDate(date);
                    valueSpan.textContent = formatted;
                }
            });

            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            if (inputType === 'checkin') {
                dateInput.value = formatDateForInput(today);
                valueSpan.textContent = formatDate(today);
            } else {
                dateInput.value = formatDateForInput(tomorrow);
                valueSpan.textContent = formatDate(tomorrow);
            }
        }
    });

    if (guestsDropdown) {
        const btns = guestsDropdown.querySelectorAll('.guests-btn');
        const adultsCountSpan = guestsDropdown.querySelector('[data-count="adults"]');
        const childrenCountSpan = guestsDropdown.querySelector('[data-count="children"]');
        const valueSpan = document.querySelector('[data-input="guests"] .input-group-value');

        btns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.getAttribute('data-action');
                const target = btn.getAttribute('data-target');

                if (target === 'adults') {
                    if (action === 'increase') {
                        adultsCount++;
                    } else if (action === 'decrease' && adultsCount > 1) {
                        adultsCount--;
                    }
                    adultsCountSpan.textContent = adultsCount;
                } else if (target === 'children') {
                    if (action === 'increase') {
                        childrenCount++;
                    } else if (action === 'decrease' && childrenCount > 0) {
                        childrenCount--;
                    }
                    childrenCountSpan.textContent = childrenCount;
                }

                updateGuestsValue();
                updateButtonStates();
            });
        });

        function updateGuestsValue() {
            const adultsText = declension(adultsCount, ['взрослый', 'взрослых', 'взрослых']);
            const childrenText = declension(childrenCount, ['ребенок', 'ребенка', 'детей']);
            valueSpan.textContent = `${adultsCount} ${adultsText}, ${childrenCount} ${childrenText}`;
        }

        function updateButtonStates() {
            const decreaseAdultsBtn = guestsDropdown.querySelector('[data-target="adults"][data-action="decrease"]');
            const decreaseChildrenBtn = guestsDropdown.querySelector('[data-target="children"][data-action="decrease"]');
            
            decreaseAdultsBtn.disabled = adultsCount <= 1;
            decreaseChildrenBtn.disabled = childrenCount <= 0;
        }

        updateButtonStates();
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.input-group')) {
            closeAllDropdowns();
        }
    });

    function closeAllDropdowns() {
        if (guestsDropdown) {
            guestsDropdown.classList.remove('active');
        }
    }

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    function formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function declension(number, forms) {
        const n = Math.abs(number) % 100;
        const n1 = n % 10;
        if (n > 10 && n < 20) return forms[2];
        if (n1 > 1 && n1 < 5) return forms[1];
        if (n1 === 1) return forms[0];
        return forms[2];
    }
});
