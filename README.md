// Предпололжим, что есть объект с переводами
const messages: Record<string, string> = {
  'Loading.First': 'Виджет крузится',
  'Loading.Second': 'Виджет ещё грузится',
  'Loading.Third': 'Загрузка идёт дольше чем обычно. Пожалуйста, подождите',
  'Error.Timeout': 'Ошибка при загрузке. Пожалуйста -- обновите окно',
  'Success.LoadingFinished': 'Виджет загружен!',
}
// который приходит с сервера и может быть на разных языках

// Есть приложение
const App: FC< ... > = () => {
  return <SomeConvenientWidget />;
}

// И есть загружающийся виджет внутри этого приложения
const SomeConvenientWidget: FC< ... > = () => {
  return ...
}

// SomeConvenientWidget загружается долго :(
// Поступил продуктовый запрос на показ спиннера пока грузится SomeConvenientWidget (не меняя сам виджет!)
// и показом текста под этим спиннером, который меняется каждые N секунды на следующий

// Что нужно сделать:
// -- написать удобный инструмент для работы с переводами, чтобы без проп дриллинга (!!!) можно было просто
//    использовать какой-нибудь метод i18n(key), который будет возвращать перевод по ключу
// -- использовать строки из messages. По контексту понятно, что они делают, но на всякий случай уточню:
//    Loading.First, Loading.Second, Loading.Third - сменяются друг за другом каждые N секунды
//    Error.Timeout - ошибка, которая показывается когда превышен лимит по времени >N
//    Success.LoadingFinished - сообщение об удачной щагрузке виджета
// -- для собственной разработки как-нибудь замедлить отображение SomeConvenientWidget чтобы кейс отрабатывал
// -- реализовать спиннер с сменой текстов

// по каждому пункту могу подсказать как лучше сделать и почему, но это минус кандидату

// Всё это с использованием ts, по отображению свободно, никакого дизайн ревью не будет. Желательно соблюдать
// структуру проекта и не делать всё в 1 файле. linter, prettier + к карме :)