document.addEventListener('DOMContentLoaded', () => {
    
    const seatElements = document.querySelectorAll('.seat');
    const visibleInput = document.querySelector('#selected-seats');
    const form = document.querySelector('form');

    const seatCountSpan = document.getElementById('seat-count');
    const totalPriceSpan = document.getElementById('total-price');
    const selectedSeats = new Set();

    // 🪙 Row-wise pricing
    const rowPrices = {
        'A': 300, 'B': 200, 'C': 200, 'D': 200, 'E': 200,
        'F': 200, 'G': 200, 'H': 200, 'I': 100, 'J': 100,
        'K': 100, 'L': 100, 'M': 100, 'N': 100, 'O': 100, 'P': 100
    };

    // 🎟️ Seat selection
    seatElements.forEach(seat => {
        seat.addEventListener('click', () => {
            const seatValue = seat.dataset.seat;

            if (selectedSeats.has(seatValue)) {
                selectedSeats.delete(seatValue);
                seat.classList.remove('selected');
            } else {
                selectedSeats.add(seatValue);
                seat.classList.add('selected');

                // Animation
                seat.animate([{ transform: 'scale(1.4)' }, { transform: 'scale(1)' }], {
                    duration: 150,
                    easing: 'ease-out'
                });
            }

            visibleInput.value = Array.from(selectedSeats).join(', ');
            seatCountSpan.textContent = selectedSeats.size;

            // Calculate total
            let totalPrice = 0;
            selectedSeats.forEach(seatVal => {
                const row = seatVal.charAt(0);
                totalPrice += rowPrices[row] || 0;
            });
            totalPriceSpan.textContent = totalPrice;

            // Clear old hidden inputs
            document.querySelectorAll('input.seat-hidden').forEach(el => el.remove());

            // Add new hidden inputs
            selectedSeats.forEach(seatVal => {
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'seats';
                hiddenInput.value = seatVal;
                hiddenInput.classList.add('seat-hidden');
                form.appendChild(hiddenInput);
            });
        });
    });

    // 🕒 Time selection
    const timeButtons = document.querySelectorAll('.showtime-btn');
    const timeHiddenInput = document.getElementById('selected-showtime');

    timeButtons.forEach(button => {
        button.addEventListener('click', () => {
            timeButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            timeHiddenInput.value = button.dataset.time;
        });
    });

    // 📅 Date selection — only if boxes are already in HTML
    const dateBoxes = document.querySelectorAll('.date-box');
    const selectedDateInput = document.getElementById('selected-date');

    dateBoxes.forEach(box => {
        box.addEventListener('click', () => {
            dateBoxes.forEach(b => b.classList.remove('selected'));
            box.classList.add('selected');
            selectedDateInput.value = box.dataset.date;
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const dateContainer = document.getElementById('date-scroll-container');
    const selectedInput = document.getElementById('selected-date');

    if (!dateContainer || !selectedInput) return;

    const daysToShow = 10;
    const today = new Date();

    for (let i = 0; i < daysToShow; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);

        const day = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
        const dateNum = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

        const button = document.createElement('button');
        button.classList.add('date-button');
        button.innerHTML = `<div>${day}</div><div>${dateNum} ${month}</div>`;
        button.setAttribute('data-value', date.toISOString().split('T')[0]);

        button.addEventListener('click', () => {
            document.querySelectorAll('.date-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedInput.value = button.getAttribute('data-value');
        });

        if (i === 0) {
            button.classList.add('active');
            selectedInput.value = button.getAttribute('data-value');
        }

        dateContainer.appendChild(button);
    }
});
