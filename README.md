# Разработка портфолио-проекта "Подборщик курсов"

_[Ссылка](https://creative-meerkat-3200a7.netlify.app/) на приложение_

Описание:

Данный сайт предоставляет удобный доступ в интерактивной форме к большинству школ, образовательных платформ и их курсам, сортировать их по некоторым категориям, позволяет пользователяем делится мнениями о данном курсе. Удобная навигация, приятный дизайн, быстродействие независимо от устройства, это лишь немногие преимущества этого проекта.

Цели преследуемые в разработке:

- Отработка навыков связанных с Next JS и его возможностей (SSR, Head, Image, Router + SEO )
- Получение опыта в создании интерфейса со сложной сеткой и работы с готовым API
- Четкое следование определенной архитектуре
- Применение Typescript в проекте, и понимание преимуществ этого подхода
- Создание и настройка анимаций с помощью Framer Motion
- Продвтнутая работа с клавиатурой, доступность и aria-атрибуты

## Превью

![mian](https://user-images.githubusercontent.com/91529586/169608702-0f79b53f-5540-4e1d-9b9c-5dcfa5ba9a43.png)
![mobile](https://user-images.githubusercontent.com/91529586/169608709-5c18fd4b-f82b-4372-809a-7c1e3e54184c.png)


## Стак приложения

Основная архитектура приложения:
NextJS + Typescript

Выбор библиотек был обусловлен несколькими вещами:

- Поддержка TS
- Совместимость с Next
- Легкий вес
- Доступное описание API

Выбранные библиотеки:

- React Hook Form - более удобная работа с формаими и их frontend валидацией
- Axios - удобные запросы к серверу
- Date FNS - легковесная библиотека для работы с датой
- Framer Motion - более декларативный подход к анимациям
  DEV:
- Всевозможные типы
- Stylelint - статическая типизация для CSS
- ESlint - статическая типизация для TS/JS
- SVGR - svg file, как реакт компонент

## Router

- / - стартовая страница с описанием функций сайта
- /search - поиск по курсам (не реализован из-за того, что не знаю endpoint в API)
- /[type] - страница со всеми категориями данного типа
  - /[product-alias] - страница со всеми продуктами (курсами) данного типа

## API

API предоставленный создателем приложения
Тестирование проводил в приложениях Postman и Insomnia

ЛЕГЕНДА:

- ТИП - элемент первого порядка (Курсы, Сервисы и т.д)
- РАЗДЕЛ - элемент второго порядка (Аналитика, Дизайн и т.д)
- КАТЕГОРИЯ - элемент третьего порядка (Курсы по photoshop, Курсы по BigData и т.д)
- ПРОДУКТ - элемент четвертого порядка, примитив (Курс "Освой Photoshop за 12 месяцев до уроня мастер от образовательной платформы SkillBox" и т.д)

- /api
  - /product
    - /find - POST - по категории получить список продуктов, есть возможность задать лимит
  - /topPage
    - /byAlias/[alias] - GET - получить подробную информацию по данной категории
    - /find - POST - по типу получить список разделов, а также все категории для этого раздела
  - /review
    - /createDemo - POST - отправаить тестовый отзыв, нужен, чтобы тестировать успешную или неуспешную отправку отзыва

## Файловая архитектура

- /components - папка с компонентами, как с примитивными, так и более комплексными
- /context - папка с основным контекстом приложения (т.к проект выполнен без использования библиотек для хранения состояний, чтобы его не нагружать)
- /helpers - некоторые функции, объекты и константы, которые находятся там, либо для переиспользования, либо для отделения логики
- /hooks - папка с кастомными хуками
- /interfaces - папка с переиспользуемыми интерфейсами и типами
- /layout - папка с layout'ами пользовательского интерфейса
- /page-componenets - папка с компонентами для конкретных страниц, т.к. мы не можем использовать css файлы в папке pages
- /pages - обязательная папка для Next, служит одновременно для роутинга и подключения пропсов, которые мы передаем через SSR, а также некоторых корневых файлов (с метатегами и другими подключенными данными)
- /layout - папка с layout'ами пользовательского интерфейса
- /public - обязательная папка для Next, используется для статических файлов, favicons и т.д.
- /styles - обязательная папка для Next, используется для хранения глобальных css-файлов \* все остальное файлы конфигов

# Некоторые особенности проекта

## SSR

Основыне запросы используемые на страницах с использованием синтаксиса Next

- getStaticPaths - используется при любом определении динимачексих переменных в пути, для статического пререндера этих страниц (как правило какого то количества)
- getStaticProps - используется получения информации, которая нужна для рендера страницы

## Описание компонента Rating

Хочу отдельно остановится на этом компоненте, т.к. он получился самым интересным из примитивных

В зависимости от флага isEditable, может иметь 2 разных состояния:

- Просто отбражение рейтинга(Dumb component)
- Редактируемый ползунок для ввода значения(Smart component)

Каждый из этих состояний имеет свое описание в плане доступности (aria-атрибуты и спрятанный текст)

Сейчас речь пойдет, как раз о втором из них
Возможности и особенности:

- При наведении мыши подсказывает, какое значение будет установлено, но не устанавливает его
- На клик устанавливает рейтинг
- Возможность устанавливать рейтинг с клавиатуры (TAB - перемещаться, Space/Enter - установить)
- Возможность устанавливать рейтинг с клавиатуры при помощи цифр, от 1 до 5, а также стрелками на клавиатуре

## Продуманная grid - верстка

В приоритете я пользовался grid версткой, когда создавал сложную разметку пользовался именнованными колонками, преимущесто данного подхода в простой установке media запросов при построенни сетки для устройств с меньшим диаметром экрана

Также при построении помогало прочерчивать в фигме вспомогательные линии
![division](https://user-images.githubusercontent.com/91529586/169608738-ffe9e565-1d6f-42e3-b287-8b26ab1ee320.png)


## Анимации, measuredRef и появление кнопки

Для анимации использовал библиотеку framer-motion
Мною были избраны следущие подходы при построении анимаций:

- Обычные motion-элементы для построения простых анимаций (например сортировки продуктов с импользованием атрибута layout)
- Компонент AnimatePrescene для того, чтобы правильно санимировать появление элемента, а также его скрытие, что справедливо для условных компонентов, которые не всегда присутсвуют в DOM-дереве
- Хук useAnimation для создания неявных анимаций, зависящих от сложных вычислений, состояний и, в целом, с более сложной логикой, в моем случае, это измение opacity для кнопки "Вверх", которая отталкивается от прокрученности страницы

Также для некоторой работы анимаций важно было использовать именно ref в компонентах, что в условиях условных компонентов не является возможным (потому что ref не уведомляет о изменении состояний), поэтому был выход, либо прятать эти компоненты визуально, а не удалять из DOM, либо использовать measuredRef из документации реакт, это callBack хук, который можно использовать, как ref, но который уведомит о своем изменении и вовремя перерендерит компонент

## Доступность

В этом проекте этой теме я уделил особое внимание
Во первых вот список доступностей, которые я поддержал в этом проекте:

- Доступность с клавиатуры (работа с tabIndex)
- Цветовая доступность (Контрастность палитры для соответвия АА нормам)
- Доступность для screen reader(В первую очередь это семантическая верстка, которая помогает с большинством проблем доступности, а также выборочная установка aria-атрибутов и спрятанного визуально текста, но который находится в DOM-дереве)
