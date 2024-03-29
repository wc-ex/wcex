<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

## Область видимости Объект области
Области содержат данные, объекты и методы, которые можно использовать непосредственно в шаблонах привязки, скриптах и событиях.


### Ссылки на область видимости связаны с HTML-элементами

#### $root
Наведите курсор на текущий корневой объект области видимости WebComponent

#### $rootElem
Укажите текущий корневой элемент WebComponent типа HTMLElement.

#### $rootParentElem
Наведите курсор на родительский элемент текущего корневого элемента **WebComponent**, обратите внимание, что если текущий корневой элемент компонента не имеет родительского элемента (например, тег первого уровня в другом компоненте, затем используйте parentElement в HTML, чтобы получить результат null, но фактический parentNode указывает на shadowRoot), то использование rootParentElem вернет родительский компонент фактического текущего компонента типа Объект HTMLElement. Использование этого объекта позволит легко получить данные и методы родительского компонента.


#### $parent
Наведите курсор на родительский объект Scope текущего элемента, обратите внимание, что $parent здесь указывает не на родительский элемент, а на область видимости родительского элемента, который имеет ближайший динамический тег с областью видимости.

#### $id
  Укажите прямую ссылку на элемент id, содержащийся в шаблоне, типа объекта HTMLElement.
  Пример:
  '''html
  <template>
    <div id="mydiv"></div>
  </template>
  <script scope=".">
    возвращаемый класс{

      onReady(){
        this.$id.mydiv.innerHTML = "Привет, мир";
      }
    }
  </script>
  ```

### Зависимости данных и событий

#### $emit
Отправка пользовательских или стандартных событий
- $emit(nameOrEvent: строка | Событие, детальOrtoElem?: Элемент | any, toElem?: Element): void;
#### $watch
Отслеживайте изменения в функции или выражении и запускайте функцию обратного вызова при возникновении изменений

#### $noWatch
Предотвращение мониторинга изменений объекта, который часто используется для некоторых объектов, которые не нуждаются в мониторинге, например системных объектов


### Связанные с маршрутизацией

#### $go
Перенаправление маршрута, которое поддерживает несколько методов, является ссылкой на ярлык метода $router.go().
area — это маршрут секционирования, и по умолчанию используется маршрут по умолчанию.

#### $router
Объекты маршрута, которые предоставляют методы и свойства, связанные с маршрутами, см. в разделе Маршруты
Распространенные методы:
- go(tag,arrts:{}) или go(area,tag,attrs:{})
- parseLocation() разрешает текущий маршрут
- back() для возврата на предыдущий уровень



### Служебные объекты
#### $log 
Выходной стандартный журнал такой же, как и у консоли .log, но цветное имя компонента и номер строки будут отображаться в консоли для удобства отладки. Поддержка упрощенных вызовов $log (...) args), что эквивалентно $log.log(... аргументы)

#### $path()
Получите фактический путь, связанный с динамическим компонентом, например, если в компоненте есть ссылка на изображение, путь к этому изображению будет относительно пути к компоненту, а не к пути к текущей странице, и правильный путь можно получить с помощью $path.
- Поддержка "./" относительно текущего пути компонента
- Поддержка "@/" относительно путей пакетов npm

#### $color
Объекты семантического динамического сопоставления цветов, общие семантические цвета: $color.pri, $color.pria, $color.sec, $color.seca, $color.text, $color.textr, $color.bg, $color.bgr, $color.ok, $color.warn, $color.info, $color.error и т.д.
Модификаторы цвета на основе HSL, такие как $color.pri.l3.s5.h2_.a6, могут вызываться непрерывно, подробнее см. главу о сопоставлении цветов

#### $Colors
Управление цветовыми палитрами и их динамическая загрузка

#### $json
Форматирование отображения $json данных, которое является упрощенным вызовом JSON.stringify и поддерживает динамическое обнаружение изменений.

#### $delay
Вы можете указать следующий период реализации, используя setTimeout
> $delay(ms:число):P romise<void>;

#### $next
В следующем цикле используйте requestAnimationFrame
> $next():P romise<void>;

#### $step
Динамически изменяйте значения свойств шагами, что часто используется в эффектах анимации.
> $step(... аргументы:(любой|[ any,number])[]):любой;
