// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Логика для мобильного меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Переключает класс 'active'
            navLinks.classList.toggle('active');
            
            // Переключает состояние aria-expanded для доступности
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Закрываем меню при нажатии на ссылку
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // 2. Логика для подсветки активной ссылки в навигации
    const sections = document.querySelectorAll('main section');
    const navItems = document.querySelectorAll('.nav-links a');

    // Intersection Observer для отслеживания видимости секций
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Получаем ID секции, которая сейчас видна
                const currentId = entry.target.id;
                
                // Удаляем класс 'active' со всех ссылок
                navItems.forEach(a => a.classList.remove('active'));
                
                // Добавляем класс 'active' к соответствующей ссылке
                const targetLink = document.querySelector(.nav-links a[href="#${currentId}"]);
                if (targetLink) {
                    targetLink.classList.add('active');
                }
            }
        });
    }, {
        // Observer срабатывает, когда секция пересекает 50% вьюпорта
        rootMargin: '0px',
        threshold: 0.5 
    });

    // Наблюдаем за каждой секцией
    sections.forEach(section => {
        observer.observe(section);
    });
});