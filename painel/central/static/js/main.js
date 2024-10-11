
// ==> Toast
function showToast(toastType, message=null, checkReload=null, closeAutomatic=null) {
    var wrapperToast = document.querySelector(".wrapper-toast");
    const toast = document.createElement('div');
    toast.className = 'bg-light toast shadow';
    wrapperToast.appendChild(toast);

    const toastIcon = document.createElement('div');
    toastIcon.className = 'container-1';

    const toastContent = document.createElement('div');
    toastContent.className = 'container-2';

    const title = document.createElement('p');
    title.className = 'neo-bold';

    const subtitle = document.createElement('p');

    toastContent.appendChild(title);
    toastContent.appendChild(subtitle);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.onclick = () => closeToast(toast);

    toast.appendChild(toastIcon);
    toast.appendChild(toastContent);
    toast.appendChild(closeBtn);

    switch (toastType) {
        case 'success':
            toast.classList.add('border-toast-success');
            toastIcon.innerHTML = '<i class="fas fa-check-circle text_green"></i>';
            title.textContent = translations.toast_title_success;
            subtitle.textContent = message || translations.toast_subtitle_success;
            break;
        case 'error':
            toast.classList.add('border-toast-erro');
            toastIcon.innerHTML = '<i class="fas fa-times-circle text_red"></i>';
            title.textContent = translations.toast_title_erro;
            subtitle.textContent = message || translations.toast_subtitle_erro;
            closeAutomatic = false
            break;
        case 'info':
            toast.classList.add('border-toast-info');
            toastIcon.innerHTML = '<i class="fas fa-info-circle text_info"></i>';
            title.textContent = translations.toast_title_info;
            subtitle.textContent = message || translations.toast_subtitle_info;
            if (closeAutomatic == true) {
                closeAutomatic = closeAutomatic
            } else {
                closeAutomatic = false
            }
            break;
        case 'warning':
            toast.classList.add('border-toast-warning');
            toastIcon.innerHTML = '<i class="fas fa-exclamation-circle text_warning"></i>';
            title.textContent = translations.toast_title_warning;
            subtitle.textContent = message || translations.toast_subtitle_warning;
            if (closeAutomatic == true) {
                closeAutomatic = closeAutomatic
            } else {
                closeAutomatic = false
            }
            break;
    }

    // Class to trigger the animation
    setTimeout(() => {
        toast.classList.add('toast-active');
    }, 50);
    
    // Show toast
    wrapperToast.style.zIndex = "3";
    toast.style.transform = "translateX(0)";


    if (closeAutomatic) {
        setTimeout(() => {
            if (checkReload) {
                window.location.reload();
            } else {
                closeToast(toast);
            }
        }, checkReload ? 3000 : 3000);
    };
};

function closeToast(toastElement) {
    const wrapperToast = document.querySelector(".wrapper-toast");
    toastElement.style.transform = "translateX(400px)";
    setTimeout(() => {
        toastElement.remove();
        if (wrapperToast.children.length === 0) {
            wrapperToast.style.zIndex = '-1';
        };
    }, 400);
};

// success <i class="fas fa-check-square"></i>
// erro <i class="fas fa-times-circle"></i>
// info <i class="fas fa-info-circle"></i>
// warning <i class="fas fa-exclamation-circle"></i>
// help <i class="fas fa-question-circle"></i>

// showToast("success", "eeeeeeeee", false, true);
// showToast("info", "aaaaaaaaaaaaaaa", false, true);
// showToast("error", "bbbb", false, true);
// showToast("warning", "cccccccc", false, true);


// ==> Tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

// ==> Sidebar
$(document).ready(function(){ 
    let expand_sidebar = document.querySelector('#expand_sidebar');
    expand_sidebar.addEventListener('click', (event) => {
        let block_sidebar = document.querySelector('#block_sidebar');
        block_sidebar.classList.toggle("d-none");
        block_sidebar.classList.toggle("d-md-block");
        block_sidebar.classList.toggle("d-block");
    });
});

// ==> Theme
// Set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
// Get a cookie
function getCookie(name) {
let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
// Change the theme
function toggleTheme() {
    let theme = getCookie("theme");
    if (theme === "light") {
        setCookie("theme", "dark", 365);
        location.reload();
    } else if (theme === "dark") {
        setCookie("theme", "light", 365);
        location.reload();
    } else {
        setCookie("theme", "dark", 365);
        location.reload();
    }
}
// Selects all elements with the class 'theme-toggle'
let themeToggles = document.querySelectorAll(".theme-toggle");
themeToggles.forEach(function(toggle) {
    toggle.addEventListener("click", toggleTheme);
});

// ==> Language
document.querySelectorAll('.selected-value').forEach(selected => {
    selected.addEventListener('click', function() {
        // Close all other 'custom-options' before opening this one
        document.querySelectorAll('.custom-options').forEach(options => {
            options.style.display = 'none';
        });
        // Open options related to this 'selected-value'
        this.nextElementSibling.style.display = 'block';
    });
});
// Add click event for each 'custom-option'
document.querySelectorAll('.custom-option').forEach(option => {
    option.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        // Update all hidden selects and submit corresponding forms
        document.querySelectorAll('#real-select').forEach(select => {
            select.value = value;
        });
        document.querySelectorAll('#language_form').forEach(form => {
            form.submit();
        });
    });
});
// Click event to close 'custom-options' if clicked out
window.addEventListener('click', function(e) {
    document.querySelectorAll('.custom-select').forEach(customSelect => {
        if (!customSelect.contains(e.target)) {
            customSelect.querySelector('.custom-options').style.display = 'none';
        }
    });
});

// ==> Sort columns tables
function sortTable(n, t=1) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable2");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            x = x.innerHTML
            y = y.innerHTML
            
            if (t != 1) {
                if (x == '-') {
                    x = 0
                } else if (y == '-') {
                    y = 0
                }
            }
            if (t == 1) {
                if (dir == "desc") {
                        if (x.toLowerCase() > y.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "asc") {
                    if (x.toLowerCase() < y.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else {
                if (dir == "desc") {
                        if (parseFloat(x) > parseFloat(y)) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "asc") {
                    if (parseFloat(x) < parseFloat(y)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

// =============> Only Generics Abobe <===================

// ==> Forms, button disabled/able on submit
const pathsToCheck = [
    '/add-group/',
    '/edit-group/',
    '/add-strategy/',
    '/edit-strategy/',
    '/add-set-of-numbers/',
    '/edit-set-of-numbers/',
    '/meus-dados/',
    '/edit-account-whatsapp/',
    '/manager/',
];
if (pathsToCheck.some(path => window.location.pathname.includes(path))) {
    window.addEventListener('load', (event) => {
        var form_validating = document.querySelectorAll('.validating');
        form_validating.forEach(form => {
            form.addEventListener('submit', () => {
                form.submit.disabled = true;
                form.submit.value = translations.validating;
            });
        });
    });
};

function ableButton(target) {
    target.submit.disabled = false;
    target.submit.value = translations.to_save;
};

// ==> Cataloguer
if (window.location.pathname.includes('/cataloguer/')) {
    window.addEventListener('load', (event) => {
        function formatTime(epochTime) {
            const date = new Date(epochTime * 1000); // Multiply epoch time by 1000 to convert from seconds to milliseconds
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        }
        const obj = JSON.parse(cataloguer_historic);
        const games = document.querySelector('.games');
        const values_cards_brasileiroaovivo = {
            'Tie': '🟡',
            'R': '🔵',
            'L': '🟢',
        }
        const values_cards_spanish = {
            'Tie': '⚪',
            'R': '🔵',
            'L': '🟡',
        }
        const values_dragon = {
            'Tie': '🟢',
            'R': '🟡',
            'L': '🔴',
        }
        const values_cards = {
            'Tie': '🟠',
            'R': '🔵',
            'L': '🔴',
        }
        const values_crazytime = {
            '1': '1️⃣',
            '2': '2️⃣',
            '5': '5️⃣',
            '10': '🔟',
            'b1': '🎯',
            'b2': '🍭',
            'b3': '🔘',
            'b4': '🗝️',
        }
        const values_double_plus = {
            'gold': '🟡',
            'white': '⚪',
            'green': '🟢',
            'blue': '🔵',
        }
        const values_baccarat = {
            'T': '🟢',
            'P': '🔵',
            'B': '🔴',
        }
        for (var key in obj){
            var value = obj[key][0].split(',');
            let game = document.createElement('div');
            for (let n = 0; n < value.length; n++) {
                let span = document.createElement('span');
                span.classList.add('d-inline-block', 'mt-1', 'ms-1', 'border', 'rounded-pill', 'px-1', );
                
                if (key == 'Football Studio - Evolution' || key == 'Bac Bo - Evolution' || key == 'Football Studio Dice - Evolution' || key == 'Bac Bo Ao Vivo - Evolution') {
                    value[n] = values_cards[value[n]]
                } else if (key == 'Dragon Tiger - Pragmatic' || key == 'Dragon Tiger A - Creedroomz' || key == 'Asian Dragon Tiger A - Creedroomz' || key == 'Dragon Tiger - Evolution') {
                    value[n] = values_dragon[value[n]]
                } else if (key == 'Football Studio Spanish - Evolution') {
                    value[n] = values_cards_spanish[value[n]]
                } else if (key == 'Football Studio Ao Vivo - Evolution') {
                    value[n] = values_cards_brasileiroaovivo[value[n]]
                } else if (key == 'Crazy Time') {
                    value[n] = values_crazytime[value[n]]
                } else if (key == 'Double Plus - Esportes da Sorte') {
                    value[n] = values_double_plus[value[n]]
                } else if (key.includes('Baccarat') || key.includes('Bacará')) {
                    value[n] = values_baccarat[value[n]]
                } else if (key.includes('Stock Market')) {
                    if (value[n] < 0) {
                        value[n] = '🔴'
                    } else {
                        value[n] = '🟢'
                    }
                } 

                span.innerText = value[n];
                game.appendChild(span)
            }
            games.appendChild(document.createElement('small')).innerText = key;
            let btn = document.createElement('button')
            btn.classList.add('btn', 'btn-sm', 'rounded-pill', 'btn-info', 'float-end', 'copy_result');
            games.appendChild(btn).innerText = 'Copiar';
            if (obj[key][1] != '-') {
                let last_spin = formatTime(obj[key][1])
                let new_small = document.createElement('small')
                new_small.classList.add('badge-soft-orange', 'px-2', 'py-1', 'ms-2', 'rounded-custom');
                games.appendChild(new_small).innerText = last_spin;
            }
            games.appendChild(game)
            games.appendChild(document.createElement('hr'))
        }
        
        // Button to copy historic
        const btn_copy = document.querySelectorAll('.copy_result');
        for (let i = 0; i < btn_copy.length; i++) {
            btn_copy[i].addEventListener("click", function() {
                const spans = this.nextElementSibling.nextElementSibling.querySelectorAll('span');
                let text = '';
                spans.forEach(span => {
                    text += span.textContent.toString() + ', ';
                });
                navigator.clipboard.writeText(text);
                console.log(text);
                // alert('Copiado com sucesso!');
                showToast("success", translations.copied, checkReload=false, closeAutomatic=true);
            });
        }

    });
};

// ==> Detailed Results and Strategy Showcase
if (window.location.pathname.includes('/historic-results/') || window.location.pathname.includes('/historic-group-results/') || (window.location.pathname.includes('/showcase/') && window.location.search != '')) {
    window.addEventListener('load', (event) => {
        // For chart, return integer
        function percentage(partialValue, totalValue) {
            let x = ((100 * parseInt(partialValue)) / parseInt(totalValue))
            if (!isFinite(x)) {
                return 0
            } else {
                // return Math.round(x)
                return x
            }
        }
        function percentageRed(numerator, denominator) {
            const percentage = (numerator / denominator) * 100;
            return Math.abs(percentage - 100);
        }
        // Function to format date in "d/m" format
        function formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate() + 1;
            const month = date.getMonth() + 1; // getMonth() returns 0-11
            return `${day}/${month}`;
        }

        let ctx_element = document.getElementById('myChart') || false;

        if (ctx_element) {
            var ctx = ctx_element.getContext('2d');
        } else {
            return;
        }

        var gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(37, 211, 102, 0.8)');
        gradient.addColorStop(1, 'rgba(37, 211, 102, 0.05)');

        var gradientRed = ctx.createLinearGradient(0, 0, 0, 400);
        gradientRed.addColorStop(0, 'rgba(245, 20, 20, 0.5)');
        gradientRed.addColorStop(1, 'rgba(245, 20, 20, 0.05)');

        var assertividade = lista_dict.map(item => percentage(item.green_day, item.green_day + item.red_day));
        var red = lista_dict.map(item => percentageRed(item.green_day, item.green_day + item.red_day));
        var labels = lista_dict.map(item => formatDate(item.date_control));
        var chart_color = (getCookie("theme") === 'dark') ? "white" : undefined;

        new Chart(ctx, {
            type: 'line',
            data: {
                // labels: ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6'],
                labels: labels,
                datasets: [
                    {
                        label: 'Green %',
                        // data: [90, 90, 92, 95, 92, 87],
                        data: assertividade,
                        borderColor: '#25d366',
                        backgroundColor: gradient,
                        borderWidth: 1,
                        pointStyle: 'cicle',
                        pointRadius: 8,
                        pointHoverRadius: 15,
                        fill: true,
                        
                    },
                    {
                        label: 'Red %',
                        data: red,
                        borderColor: '#fa4b4b',
                        backgroundColor: gradientRed,
                        borderWidth: 1,
                        pointStyle: 'cicle',
                        pointRadius: 8,
                        pointHoverRadius: 15,
                        fill: true,
                    }
                ]
            },
            options: {
                tension: 0.1,
                responsive: true,
                scales: {
                    y: {
                        suggestedMin: 80,
                        suggestedMax: 100,
                        ticks: {
                            color: chart_color,
                            stepSize: 1,
                        },
                    },
                    x: {
                        ticks: {
                            color: chart_color,
                        },
                    }
                },
                plugins: {
                    tooltip: {

                    },
                    legend: {
                        display: true,
                        labels: {
                            color: chart_color,
                        }
                    }
                },
            }
        });

        function percentageTable(partialValue, totalValue) {
            let x = ((100 * parseInt(partialValue)) / parseInt(totalValue))
            if (!isFinite(x)) {
                return '0%'
            } else {
                return Math.round(x).toString() + '%'
            }
        }
        // Hoje
        const total_diario = object_dict.green_day + object_dict.red_day;
        document.querySelector('#h_0').textContent = percentageTable(object_dict.green_day, total_diario)
        document.querySelector('#h_1').textContent = percentageTable(object_dict.green_day_mt_0, total_diario)
        document.querySelector('#h_2').textContent = percentageTable(object_dict.green_day_mt_1, total_diario)
        document.querySelector('#h_3').textContent = percentageTable(object_dict.green_day_mt_2, total_diario)
        document.querySelector('#h_4').textContent = percentageTable(object_dict.red_day, total_diario)
        // Total
        const total_total = object_dict.green_total + object_dict.red_total;
        document.querySelector('#t_0').textContent = percentageTable(object_dict.green_total, total_total)
        document.querySelector('#t_1').textContent = percentageTable(object_dict.green_total_mt_0, total_total)
        document.querySelector('#t_2').textContent = percentageTable(object_dict.green_total_mt_1, total_total)
        document.querySelector('#t_3').textContent = percentageTable(object_dict.green_total_mt_2, total_total)
        document.querySelector('#t_4').textContent = percentageTable(object_dict.red_total, total_total)

        var trs = document.querySelectorAll('.tr-result')
        for (var i = 0; i < trs.length; i++) {
            let day = ((parseInt(trs[i].getAttribute('data-green_day')) / (parseInt(trs[i].getAttribute('data-red_day')) + parseInt(trs[i].getAttribute('data-green_day')))) * 100).toFixed(2)
            let total = ((parseInt(trs[i].getAttribute('data-green_total')) / (parseInt(trs[i].getAttribute('data-red_total')) + parseInt(trs[i].getAttribute('data-green_total')))) * 100).toFixed(2)
            if (isNaN(day)) {trs[i].querySelector('.ass_day').textContent = '-'} else {trs[i].querySelector('.ass_day').textContent = day + ' %'}
            if (isNaN(total)) {trs[i].querySelector('.ass_total').textContent = '-'} else {trs[i].querySelector('.ass_total').textContent = total + ' %'}
        }
    });
};

// ==> Copy strategy on Showcase
if (window.location.pathname.includes('/showcase/') && window.location.search.includes('?g=')) {
    window.addEventListener('load', (event) => {
        const list_of_piece = ['green', 'confirmation', 'analyzing', 'piece1', 'piece2', 'piece3', 'piece4', 'piece5', 'piece6', 'piece7', 'piece8', 'piece9', 'piece10', 'piece11', 'piece12', 'piece13', 'piece14', 'piece15', 'piece16', 'piece17', 'piece18', 'piece19', 'piece20', 'piece21', 'piece22', 'piece23', 'piece24', 'piece25'];
        document.querySelector('.btn_copy_preset').addEventListener('click', (event) => {
            // Pieces
            const selectedValues = [];
            list_of_piece.forEach(selectName => {
                const selectElement = document.querySelector(`select[name="${selectName}"]`);
                const selectedOption = selectElement.options[selectElement.selectedIndex];
                selectedValues.push(selectedOption.value);
            });
            console.log(selectedValues);
            // Gales
            const max_martin = document.querySelector(`input[name="max_martin"]`).value;
            console.log(max_martin);
            // Games
            const checkboxContainer = document.querySelector('.roulletes-checkboxes');
            const checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
            const selectedCheckboxes = [];
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedCheckboxes.push(checkbox.value);
                }
            });
            console.log(selectedCheckboxes);
            // Get Game Type From Url
            const urlParams = new URLSearchParams(window.location.search);
            const game_type = urlParams.get('t');
            console.log(game_type);
            // Strategy Name
            name_strategy = name_strategy.match(/\d+/);
            name_strategy = name_strategy[0];
            // console.log(name_strategy);
            // Save in localstorage
            const to_save = {
                'game_type': game_type,
                'name_strategy': name_strategy,
                'games': selectedCheckboxes,
                'pieces': selectedValues,
                'max_martin': max_martin,
            };
            // If Roullete, Cover Zero and Include zero in pattern
            if (game_type == 'roleta') {
                const include_zero_checkbox = document.querySelector(`input[name="include_zero"]`);
                const include_zero = include_zero_checkbox.checked;
                console.log('include_zero:', include_zero);
                const cover_zero_checkbox  = document.querySelector(`input[name="cover_zero"]`);
                const cover_zero = cover_zero_checkbox.checked;
                console.log('cover_zero:', cover_zero);
                to_save.include_zero = include_zero;
                to_save.cover_zero = cover_zero;
            }
            localStorage.setItem(`pattern_strategy_${game_type}`, JSON.stringify(to_save));
            // alert('Estratégia copiada com sucesso!');
            showToast("success", translations.copied, checkReload=false, closeAutomatic=true);
            showToast("info", translations.strategy_copied_form, checkReload=false, closeAutomatic=false);
        });
    });
};

// ==> Edit links
if (window.location.pathname.includes('/edit-links/')) {
    window.addEventListener('load', (event) => {
        document.querySelectorAll('button[type="submit"]').forEach(button => {
            button.addEventListener('click', function(e) {
                e.target.disabled = true;
                e.target.textContent = translations.validating;
    
                let el_row_link = document.querySelectorAll('.row_link');
                let formData = new FormData();
    
                let links_dict = Array.from(el_row_link).map(element => {
                    return {
                        id: element.getAttribute('data-id'),
                        group: element.getAttribute('data-group'),
                        e_link_preview_1: element.querySelector('.link_preview_1').value,
                        e_link_preview_2: element.querySelector('.link_preview_2').value,
                        e_link_1: element.querySelector('.link_1').value,
                        e_link_2: element.querySelector('.link_2').value,
                    };
                });
                
                formData.append('links_dict', JSON.stringify(links_dict));
                fetch(url_ajax_set_links, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'X-CSRFToken': csrf_token
                    },
                })
                .then(response => response.json())
                .then(data => {
                    if (data['response'] == "sucesso") {
                        showToast("success", translations.saved_success, checkReload=false, closeAutomatic=true);
                        e.target.disabled = false;
                        e.target.textContent = translations.to_save;
                    } else {
                        showToast("info", data['response'], checkReload=false, closeAutomatic=false);
                        e.target.disabled = false;
                        e.target.textContent = translations.to_save;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred/Um erro ocorreu');
                    e.target.disabled = false;
                    e.target.textContent = translations.to_save;
                });
            });
        });

        // Buttons presets links
        var btns_links = document.querySelectorAll('.ToggleLinks');
        for (let i = 0; i < btns_links.length; i++) {
            btns_links[i].addEventListener("click", function() {
                let btn_name = btns_links[i].textContent;
                var answer = window.confirm(`${translations.apply_links_from} ${btn_name}?`);
                if (answer) {
                    showToast("success", translations.links_applied, checkReload=false, closeAutomatic=true);
                    showToast("info", translations.info_about_links, checkReload=false, closeAutomatic=false);
                    var table_rows = document.querySelectorAll('.row_link');
                    if (btn_name == 'Betano ') {
                        var links = links_betano
                    } else if (btn_name == 'MMA Bet ') {
                        var links = links_mma_bet
                    } else if (btn_name == 'Estrelabet ') {
                        var links = links_estrelabet
                    } else if (btn_name == 'B2xbet.net ') {
                        var links = links_b2xbet_net
                    }
                    Object.entries(links).forEach(([k,v]) => {
                        table_rows.forEach((element) => {
                            if (element.querySelector('td').textContent == k) {
                                element.querySelector('td .link_1').value = v;
                            }
                        });
                    });
                }
                else {}
            });
        }
        
        // Buttons Fast Links
        let btn_fast_link_1 = document.querySelector('#fast_1');
        btn_fast_link_1.addEventListener("click", function() {
            var table_rows = document.querySelectorAll('.row_link');
            table_rows.forEach((element) => {
                element.querySelector('td .link_1').value = document.querySelector('#link_fast').value;
            });
        });
        let btn_fast_link_2 = document.querySelector('#fast_2');
        btn_fast_link_2.addEventListener("click", function() {
            var table_rows = document.querySelectorAll('.row_link');
            table_rows.forEach((element) => {
                element.querySelector('td .link_2').value = document.querySelector('#link_fast').value;
            });
        });
    });
};

// ==> Mask Esco333333333
if (window.location.pathname.includes('/meus-dados/') || window.location.pathname.includes('/add-group/') || window.location.pathname.includes('/edit-group/')) {
    $(document).ready(function(){
        var options = {
            onKeyPress: function (cpf, ev, el, op) {
                var masks = ['000.000.000-000', '00.000.000/0000-00'];
                $('.cpfOuCnpj').mask((cpf.length > 14) ? masks[1] : masks[0], op);
            }
        }
        $('.cpfOuCnpj').length > 11 ? $('.cpfOuCnpj').mask('00.000.000/0000-00', options) : $('.cpfOuCnpj').mask('000.000.000-00#', options);
        var SPMaskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        spOptions = {
            onKeyPress: function(val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };
        $('.sp_celphones').mask(SPMaskBehavior, spOptions);
        $('.cnpj').mask('00.000.000/0000-00', {reverse: true});
        $('.cep').mask('00000-000');
        $('.date').mask('00/00/0000');
        $('.money2').mask("#.##0,00", {reverse: true});
        $('.money').mask('000.000.000.000.000,00', {reverse: true});
        $('.cpf').mask('000.000.000-00', {reverse: true});
    });
};

// ==> Edit HTML -> Group
if (window.location.pathname.includes('/edit-group/') || window.location.pathname.includes('/add-group/')) {
    window.addEventListener('load', (event) => {
        
        // hide games without analysis --------------
        let select = document.querySelector('#id_game_type');
        // Ao editar a sala, no momento do load
        if (select.value == 'mines') {
            let elToHidden = document.querySelectorAll('.hidden_for_mines');
            for (let i=0;i<elToHidden.length;i++) {
                elToHidden[i].style.display = "none";
            }
        } else {
            // Não tem for pois atualmente contém apenas 1 elemento
            document.querySelector('.show_for_mines').style.display = "none";
        }
        // Ao trocar o select game type
        select.addEventListener('change', (event) => {
            let elToHidden = document.querySelectorAll('.hidden_for_mines');
            if (select.value == 'mines') {
                for (let i=0;i<elToHidden.length;i++) {
                    elToHidden[i].style.display = "none";
                }
                // Não tem for pois atualmente contém apenas 1 elemento
                document.querySelector('.show_for_mines').style.display = "block";
            } else {
                for (let i=0;i<elToHidden.length;i++) {
                    elToHidden[i].style.display = "block";
                }
                // Não tem for pois atualmente contém apenas 1 elemento
                document.querySelector('.show_for_mines').style.display = "none";
            }
        });
        // hide games without analysis --------------
        
        // Expand aditionals elements -----------------
        // selecionar todos os elementos com a classe "expand_config"
        const expandElems = document.querySelectorAll(".expand_config");
        const invalidFeedbackElems = document.querySelectorAll(".invalid-feedback");

        function displayButtonConfig(elem) {
            // selecionar o elemento com a classe "configuration_advanced"
            const configElem = document.querySelector(".configuration_advanced");
            if (configElem.classList.contains("d-none")) {
                configElem.classList.remove("d-none");
                elem.innerHTML = `<div class="text-center"> ${translations.extra_configs} <br> <sup><i class="fas fa-hand-point-right"></i> ${translations.click_to_retract} <i class="fas fa-level-up-alt"></i></sup></div>`
            } else {
                configElem.classList.add("d-none");
                elem.innerHTML = `<div class="text-center"> ${translations.extra_configs} <br> <sup><i class="fas fa-hand-point-right"></i> ${translations.click_to_expand} <i class="fas fa-level-down-alt"></i></sup></div>`
            }
            elem.scrollIntoView({behavior: 'smooth'});
        }

        // Ao clicar no botão de display
        expandElems.forEach((elem) => {
            elem.addEventListener("click", () => {
                displayButtonConfig(elem);
            });
        });

        // Se houver erro no formulário
        if (invalidFeedbackElems.length > 0) {
            expandElems.forEach((elem) => {
                displayButtonConfig(elem);
                let offsetPosition = invalidFeedbackElems[0].getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        };
        // Expand aditionals elements -----------------
        
        // On change game type in Edit Group -------------
        if (window.location.pathname.includes('/edit-group/')) {
            var select_game_type = document.querySelector('#id_game_type');
            var old_value;
            select_game_type.addEventListener('focus', (event) => {
                old_value = event.target.value
            });
            select_game_type.addEventListener('change', (event) => {
                let check = confirm(translations.confirm_change_game)
                if (check != true) {
                    select_game_type.value = old_value;
                }
            });
        }
        // On change game type in Edit Group -------------

        // On change App type in Edit Group -------------
        if (window.location.pathname.includes('/edit-group/')) {
            const integrationInputs = document.getElementsByName('integration_type');
            for (var i = 0; i < integrationInputs.length; i++) {
                integrationInputs[i].addEventListener('change', function(event) {
                    alert(translations.alert_change_application);
                });
            }
        }
        // On change App type in Edit Group -------------

    });
};

// ==> Edit HTML -> Strategies
if (window.location.pathname.includes('/edit-strategy/') || window.location.pathname.includes('/add-strategy/')) {
    // Copy keyword from list of keywords
    window.addEventListener('load', (event) => {
        document.querySelectorAll('.to_copy').forEach(k => {
            k.addEventListener('click', event => {
                navigator.clipboard.writeText(k.querySelectorAll('td')[1].textContent);
                showToast("success", translations.copied, checkReload=false, closeAutomatic=true);
            });
        });
    });
    // Only for game_type Mines
    if (window.location.search.includes('&t=mines')) {
        // Filter strategy preseted by name ------
        window.addEventListener('load', (event) => {
            document.getElementById('search_mines_strategy').addEventListener('keyup', function() {
                var value = this.value.toLowerCase();
                var rows = document.querySelectorAll('.table_presets_mines tbody tr');
                rows.forEach(function(row) {
                    var firstCellText = row.querySelector('td:first-child').textContent.toLowerCase();
                    row.style.display = firstCellText.indexOf(value) > -1 ? '' : 'none';
                });
            });
        });
        // Filter strategy preseted by name ------
        // Create tables of strategies/games -----
        window.addEventListener('load', (event) => {
			var table_games = document.querySelector('.table_presets_mines tbody');
			for(var key in games){
				var tr = document.createElement('tr');
				var td1 = document.createElement('td');
				var td2 = document.createElement('td');
				var td3 = document.createElement('td');
				var button = document.createElement('button');

				td1.id = key;
				td1.textContent = games[key].name + " " + games[key].emoji;
				td2.textContent = translations.strategy_solo;

				button.type = "button";
				button.className = "btn btn-sm btn-whatsapp-rounded preset_strategy";
				// button.setAttribute('onclick', `setStrategy('slot', '${key}', 'one_time');`);
				button.setAttribute('data-strategy', "slot");
				button.setAttribute('data-game-name', key);
				button.setAttribute('data-type-signal', "one_time");
				button.setAttribute('data-bs-dismiss', "modal");
				button.textContent = translations.to_apply;
				td3.appendChild(button);

				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);

				table_games.appendChild(tr);
				// Fim Linha Um, Solos
				
				// Começo Linha dois, Multi Sinais
				var tr2 = document.createElement('tr');
				var td1 = document.createElement('td');
				var td2 = document.createElement('td');
				var td3 = document.createElement('td');
				var button = document.createElement('button');

				td1.id = key;
				td1.textContent = games[key].name + " " + games[key].emoji;
				td2.textContent = translations.strategy_multi;

				button.type = "button";
				button.className = "btn btn-sm btn-whatsapp-rounded preset_strategy";
				// button.setAttribute('onclick', `setStrategy('slot', '${key}', 'multi_times');`);
                button.setAttribute('data-strategy', "slot");
				button.setAttribute('data-game-name', key);
				button.setAttribute('data-type-signal', "multi_times");
				button.setAttribute('data-bs-dismiss', "modal");
				button.textContent = translations.to_apply;
				td3.appendChild(button);

				tr2.appendChild(td1);
				tr2.appendChild(td2);
				tr2.appendChild(td3);

				table_games.appendChild(tr2);
			}
		});
        // Create tables of strategies/games -----
    };

    // Show and hide fields images and text -----
    window.addEventListener('load', (event) => {

        function toggleElementVisibility(elem_class, set_state) {
            element = document.querySelector(elem_class);
            if (set_state == 'd-block') {
                element.classList.remove('d-none');
                element.classList.add('d-block');
            } else if (set_state == 'd-none') {
                element.classList.remove('d-block');
                element.classList.add('d-none');
            }
        }
        
        function setDisplayIntegration(app, content) {
            // console.log(app, content);
            if (app == 'telegram') {
                // console.log('App is telegram');
                if (content == 'text' || !content) {
                    toggleElementVisibility('.content_text', 'd-block');
                    toggleElementVisibility('.content_images', 'd-none');
                } else if (content == 'text_and_images') {
                    toggleElementVisibility('.content_text', 'd-block');
                    toggleElementVisibility('.content_images', 'd-block');
                } else if (content == 'images') {
                    toggleElementVisibility('.content_text', 'd-none');
                    toggleElementVisibility('.content_images', 'd-block');
                }
            } else {
                toggleElementVisibility('.content_text', 'd-block');
                toggleElementVisibility('.content_images', 'd-none');
            }
        };
        
        const telegram_group_integration_type = document.querySelector('input[name="telegram_group_integration_type"]').value;
        const signals_type = document.querySelector('input[name="signals_type"]:checked').value;
        // Trigger on load
        setDisplayIntegration(telegram_group_integration_type, signals_type);
        // Trigger by change event, adds an event listener for each integration input
        const signalsInputs = document.getElementsByName('signals_type');
        for (var i = 0; i < signalsInputs.length; i++) {
            signalsInputs[i].addEventListener('change', function() {
                var selectedValue = this.value;
                setDisplayIntegration(telegram_group_integration_type, selectedValue)
            });
        }

        // Display images -----
        function toggleRemoveIcon(elem_class, set_state) {
            element = document.querySelector(elem_class);
            if (set_state == 'd-block') {
                element.classList.remove('d-none');
            } else if (set_state == 'd-none') {
                element.classList.add('d-none');
            }
        }

        document.querySelectorAll('.see-image').forEach(el => {
            el.addEventListener('click', function(e) {
                let el_data_field = el.getAttribute('data-field');
                document.querySelector('#gallery').setAttribute('data-field', el_data_field)
            });
        });
        
        document.querySelectorAll('.set-image').forEach(btn_x => {
            btn_x.addEventListener('click', function(e) {
                let el_field = document.querySelector('#gallery').getAttribute('data-field');
                document.querySelector(`[data-field="${el_field}"]`).innerHTML = `<img class="img-fluid" src="${e.target.src}">`;
                toggleRemoveIcon(`[data-field-remove="${el_field}"]`, 'd-block')
                document.querySelector(`[name="${el_field}"]`).setAttribute('value', e.target.src);
            });
        });

        document.querySelectorAll('.clear-image').forEach(btn_r => {
            btn_r.addEventListener('click', function(e) {
                let el_data_field_remove = btn_r.getAttribute('data-field-remove');
                document.querySelector(`[data-field="${el_data_field_remove}"]`).innerHTML = `<i class="fas fa-search-plus"></i>`;
                toggleRemoveIcon(`[data-field-remove="${el_data_field_remove}"]`, 'd-none')
                document.querySelector(`[name="${el_data_field_remove}"]`).setAttribute('value', '');
            });
        });

    });

};

// ==> Listing HTML
if (window.location.pathname.includes('/results/') || window.location.pathname.includes('/results-group/') || (window.location.pathname.includes('/showcase/') &&  window.location.search == '') || (window.location.pathname.includes('/showcase/') &&  window.location.search.includes('?_q=')) ) {
    window.addEventListener('load', (event) => {
        // Percents
        let trs = document.querySelectorAll('.tr-result')
        for (var i = 0; i < trs.length; i++) {
            let day = ((parseInt(trs[i].getAttribute('data-green_day')) / (parseInt(trs[i].getAttribute('data-red_day')) + parseInt(trs[i].getAttribute('data-green_day')))) * 100).toFixed(2)
            let total = ((parseInt(trs[i].getAttribute('data-green_total')) / (parseInt(trs[i].getAttribute('data-red_total')) + parseInt(trs[i].getAttribute('data-green_total')))) * 100).toFixed(2)
            if (isNaN(day)) {trs[i].querySelector('.ass_day').textContent = '-'} else {trs[i].querySelector('.ass_day').textContent = day + ' %'}
            if (isNaN(total)) {trs[i].querySelector('.ass_total').textContent = '-'} else {trs[i].querySelector('.ass_total').textContent = total + ' %'}
        }

        // ...

    });
};

// ==> Listing HTML Reset Result
if (window.location.pathname.includes('/results-group/')) {
    window.addEventListener('load', (event) => {
        document.querySelectorAll('.reset_results_group').forEach(button => {
            button.addEventListener('click', function(e) {
				let g = e.target.getAttribute('data-g');
				let t = e.target.getAttribute('data-t');
				let url_ajax_reset_results = e.target.getAttribute('data-path');
				if (t == 'group') {
					message_alert = translations.confirm_zero_result_room
				} else if (t == 'strategy') {
					message_alert = translations.confirm_zero_result_strategies
				}
				let check = confirm(message_alert)
				if (check != true) {
					return
				}
                let formData = new FormData();
                formData.append('g', g);
                fetch(url_ajax_reset_results, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'X-CSRFToken': csrf_token
                    },
                })
                .then(response => response.json())
                .then(data => {
                    if (data['response'] == "sucesso") {
                        // alert('Resultados zerados com sucesso!')
                        showToast("success", translations.result_cleaned, checkReload=true, closeAutomatic=true);
                        // window.location.reload(true);
                    } else {
                        alert(data['response'])
                        window.location.reload(true);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert(data['response'])
                    window.location.reload(true);
                });
            });
        });
    });
};

// ==> Restart Room (NÃO ESTÁ SENDO UTILIZADO)
// $(document).ready(function(){ 
//     $('.submit_restart').click(function (e) {
//         e.target.disabled = true;
//         e.target.textContent = "Aguarde...";
//         let group = e.target.getAttribute('data-group');

//         let btns = document.querySelectorAll('.submit_restart');
//         for (var i = 0; i < btns.length; i++) {
//             btns[i].disabled = true;
//         }
        
//         $.ajax({
//             type: "POST",
//             url: "{% url 'ajax_restart_group' %}",
//             data: {
//                 csrfmiddlewaretoken: '{{ csrf_token }}',
//                 group: group,
//             },
//             success: function (data) {
//                 if (data['response'] == "sucesso") {
//                     alert('Restart executado com sucesso!')
//                     window.location.reload(true);
//                 } else {
//                     alert(data['response'])
//                     window.location.reload(true);
//                 }
//             },

//             error: function (data) {
//                 alert(data['response'])
//                 window.location.reload(true);
//             }
//         });
//     });
// });

// ==> Listing HTML Delete Alerts
if (window.location.pathname.includes('/groups/')) {
    window.addEventListener('load', (event) => {
        document.querySelectorAll('.delete_alert_erro').forEach(element => {
            element.addEventListener('click', (e) => {
                let groups_errors_list = document.querySelectorAll('.group_alert_error');
                let dataGroupErrors = [];
                
                groups_errors_list.forEach(element => {
                    dataGroupErrors.push(element.getAttribute('data-group-error'));
                });
                
                let formData = new FormData();
                formData.append('groups_errors', JSON.stringify(dataGroupErrors));
                
                fetch(ajax_delete_alert_erro, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'X-CSRFToken': csrf_token
                    },
                })
                .then(response => response.json())
                .then(data => {
                    let message = data['message'];
                    if (data['response'] == "success") {
                        showToast('success', message, checkReload=true, closeAutomatic=true);
                    } else {
                        showToast('error', message, checkReload=false, closeAutomatic=true);
                    }
                })
                .catch(error => {
                    showToast('error', error.message, checkReload=false, closeAutomatic=true);
                });
            });
        });        
    });
}

// ==> Listing HTML Duplicate Strategies
if (window.location.pathname.includes('/strategies/')) {
    window.addEventListener('load', (event) => {
    var duplicateStrategyModal = document.getElementById('duplicateStrategyModal');
    duplicateStrategyModal.addEventListener('show.bs.modal', function (event) {
        // Button that triggered the modal
        var button = event.relatedTarget
        // Extract info from data-bs-* attributes
        var recipient = button.getAttribute('data-bs-strategy-name');
        var strategy_id = button.getAttribute('data-bs-strategy-id');
        // Update the modal's content.
        duplicateStrategyModal.setAttribute('data-strategy-id', strategy_id);
        var modalTitle = duplicateStrategyModal.querySelector('.modal-title');
        var modalBody = duplicateStrategyModal.querySelector('.modal-body');

        modalTitle.textContent = translations.duplicate_strategy
        modalBody.innerHTML = `<div>${translations.ask_duplicate_strategy} <b>${recipient}</b>?</div>`
    });

    function duplicateStrategy(event) {
        var strategy_id = duplicateStrategyModal.getAttribute('data-strategy-id');
        $.ajax({
            type: "POST",
            url: EndpointDuplicateStrategy,
            data: {
                csrfmiddlewaretoken: csrf_token,
                strategy_id: strategy_id,
            },
            beforeSend: function(){
                event.target.disabled = true;
            },
            complete: function(){
                event.target.disabled = false;
            },
            success: function (data) {
                message = data['message']
                if (data['response'] == "success") {
                    $('#duplicateStrategyModal').modal('hide');
                    showToast('success', message, checkReload=true, closeAutomatic=true);
                } else {
                    $('#duplicateStrategyModal').modal('hide');
                    showToast('error', message, checkReload=false, closeAutomatic=true);
                }
            },
            error: function (data) {
                $('#duplicateStrategyModal').modal('hide');
                showToast('error', message, checkReload=false, closeAutomatic=true);
            }
        });
    }
    document.getElementById('btnModalDuplicateStrategy').addEventListener('click', duplicateStrategy);
    });
};


// ==> Listing HTML Reset Result Strategies
if (window.location.pathname.includes('/results/')) {
    window.addEventListener('load', (event) => {
    var duplicateStrategyModal = document.getElementById('duplicateStrategyModal');
    duplicateStrategyModal.addEventListener('show.bs.modal', function (event) {
        // Button that triggered the modal
        var button = event.relatedTarget
        // Extract info from data-bs-* attributes
        var recipient = button.getAttribute('data-bs-strategy-name');
        var strategy_id = button.getAttribute('data-bs-strategy-id');
        // Update the modal's content.
        duplicateStrategyModal.setAttribute('data-strategy-id', strategy_id);
        var modalTitle = duplicateStrategyModal.querySelector('.modal-title');
        var modalBody = duplicateStrategyModal.querySelector('.modal-body');

        modalTitle.textContent = translations.delete_results_strategy
        modalBody.innerHTML = `<div>${translations.ask_delete_results_strategy} <b>${recipient}</b>?</div>`
    });

    function resetResultsStrategy(event) {
        var strategy_id = duplicateStrategyModal.getAttribute('data-strategy-id');
        $.ajax({
            type: "POST",
            url: EndpointResetResultsStrategy,
            data: {
                csrfmiddlewaretoken: csrf_token,
                strategy_id: strategy_id,
            },
            beforeSend: function(){
                event.target.disabled = true;
            },
            complete: function(){
                event.target.disabled = false;
            },
            success: function (data) {
                message = data['message']
                if (data['response'] == "success") {
                    $('#duplicateStrategyModal').modal('hide');
                    showToast('success', message, checkReload=true, closeAutomatic=true);
                } else {
                    $('#duplicateStrategyModal').modal('hide');
                    showToast('erro', message, checkReload=false, closeAutomatic=true);
                }
            },
            error: function (data) {
                $('#duplicateStrategyModal').modal('hide');
                showToast('erro', message, checkReload=false, closeAutomatic=true);
            }
        });
    }
    document.getElementById('btnModalDuplicateStrategy').addEventListener('click', resetResultsStrategy);
    });
};


// ==> Dashboard Set Profile
if (window.location.pathname.includes('/dashboard/')) {
    window.addEventListener('load', (event) => {
        document.querySelectorAll('.set_profile').forEach(button_set_profile => {
            button_set_profile.addEventListener('click', function(e) {
				let client_type = e.target.getAttribute('data-client-type');
				let url_set_client_type = e.target.getAttribute('data-path');

                let formData = new FormData();
                formData.append('client_type', client_type);
                fetch(url_set_client_type, {
                    method: "POST",
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    if (data['response'] == "success") {
                        showToast("success", data['message'], checkReload=false, closeAutomatic=true);
                        document.querySelector('.set_profile_div').style.display = 'none';
                    } else {
                        showToast("warning", data['message'], checkReload=false, closeAutomatic=false);
                    }
                })
                .catch(error => {
                    showToast("error", data['message'], checkReload=false, closeAutomatic=false);
                });
            });
        });
    });
};


// ==> Listing HTML Upload Images
if (window.location.pathname.includes('/gallery/')) {
    window.addEventListener('load', (event) => {

        const chooseFileBtn = document.querySelector('.btn-choose-image'); // Botão para escolher o arquivo
        const uploadBtn = document.querySelector('.btn-upload-image'); // Botão para fazer o upload
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = ".jpg, .jpeg, .png";
        fileInput.style.display = 'none'; // Ocultar o input de arquivo
        document.body.appendChild(fileInput);
    
        chooseFileBtn.addEventListener('click', function() {
            fileInput.click(); // Simular clique no input de arquivo
        });

        fileInput.addEventListener('change', function() {
            if (fileInput.files.length > 0) {
                let fileName = fileInput.files[0].name;
                if (fileName.length > 15) {
                    fileName = fileName.slice(0, 15) + '...';
                }
                chooseFileBtn.textContent = fileName;
            }
        });
    
        uploadBtn.addEventListener('click', function() {
            if (fileInput.files.length > 0) {
                
                if (fileInput.files[0].name.length > 200) {
                    showToast("info", translations.character_limit, checkReload=false, closeAutomatic=true);
                    return
                }
                
                uploadBtn.disabled = true;
                const formData = new FormData();
                formData.append('image', fileInput.files[0]);
                showToast("info", translations.loading_file, checkReload=false, closeAutomatic=true);
                
    
                fetch(EndpointUploadImage, {  // URL
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data['response'] == "success") {
                        showToast("success", data['message'], checkReload=true, closeAutomatic=true);
                    } else {
                        showToast("warning", data['message'], checkReload=false, closeAutomatic=true);
                        chooseFileBtn.textContent = translations.choose_file;
                        uploadBtn.disabled = false;
                    }
                })
                .catch(error => {
                    showToast("error", data['message'], checkReload=false, closeAutomatic=true);
                    chooseFileBtn.textContent = translations.choose_file;
                    console.error('Error:', error);
                    uploadBtn.disabled = false;
                });
            } else {
                showToast("info", translations.please_choose_file, checkReload=false, closeAutomatic=true);
            }
        });

    });
};