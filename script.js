/**
 * Скрипт для лендинга электрика
 * Легкий, без зависимостей
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // === Плавный скролл по якорям ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Закрыть мобильное меню если открыто
        document.querySelector('.nav').classList.remove('nav--active');
      }
    });
  });

  // === Бургер-меню для мобильных ===
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const overlay = document.querySelector('.overlay');
  const navLinks = document.querySelectorAll('.nav a');

  // Функция открытия/закрытия
  function toggleMenu() {
    nav.classList.toggle('nav--active');
    overlay.classList.toggle('overlay--active');
    
    // Меняем иконку
    if (nav.classList.contains('nav--active')) {
      burger.textContent = '✕';
      document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    } else {
      burger.textContent = '☰';
      document.body.style.overflow = ''; // Возвращаем скролл
    }
  }

  // Закрытие меню
  function closeMenu() {
    nav.classList.remove('nav--active');
    overlay.classList.remove('overlay--active');
    burger.textContent = '☰';
    document.body.style.overflow = '';
  }

  if (burger) {
    // Клик по бургеру
    burger.addEventListener('click', toggleMenu);
    
    // Клик по затемнению
    overlay.addEventListener('click', closeMenu);
    
    // Клик по ссылке меню (закрыть после перехода)
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // === Анимация при скролле (Intersection Observer) ===
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // Анимировать только один раз
      }
    });
  }, observerOptions);

  // Наблюдаем за секциями
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });

  // === Клик по телефону: логирование для аналитики (опционально) ===
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      // Здесь можно добавить отправку события в Яндекс.Метрику / GA
      console.log('📞 Клик по телефону:', link.href);
      // Пример для Метрики:
      // if (typeof ym === 'function') { ym(XXXXXX, 'reachGoal', 'call_click'); }
    });
  });

  // === Клик по Telegram: логирование ===
  document.querySelectorAll('a[href*="t.me"]').forEach(link => {
    link.addEventListener('click', () => {
      console.log('✈️ Клик по Telegram:', link.href);
      // if (typeof ym === 'function') { ym(XXXXXX, 'reachGoal', 'tg_click'); }
    });
  });

  // === Защита от случайного нажатия на sticky-кнопки при скролле ===
  let lastScroll = 0;
  const stickyActions = document.querySelector('.sticky-actions');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Скрывать плавающие кнопки при быстром скролле вниз
    if (stickyActions) {
      if (currentScroll > lastScroll && currentScroll > 300) {
        stickyActions.style.opacity = '0';
        stickyActions.style.pointerEvents = 'none';
      } else {
        stickyActions.style.opacity = '1';
        stickyActions.style.pointerEvents = 'all';
      }
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // === Готово! ===
  console.log('✅ Сайт электрика загружен и готов к работе');
});