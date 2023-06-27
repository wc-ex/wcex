<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

## 범위 범위 개체
범위 범위에는 바인딩 템플릿 스크립트와 이벤트에서 직접 사용할 수 있는 데이터, 개체 및 메서드가 포함됩니다.


### 범위 참조는 HTML 요소와 관련이 있습니다.

#### $root
현재 WebComponent 루트 범위 개체를 가리킵니다

#### $rootElem
현재 WebComponent 루트 요소인 HTMLElement 개체를 가리킵니다.

#### rootParentElem
현재 **WebComponent** 루트 요소의 부모 요소를 가리키면 현재 구성 요소 루트 요소에 부모 요소가 없는 경우(예: 다른 구성 요소에 있는 첫 번째 수준 태그, HTML에서 parentElement 사용, get null, 그러나 실제 parentNode는 shadowRoot를 가리킴), rootParentElem을 사용하면 실제 현재 구성 요소의 부모 구성 요소가 반환됩니다. HTMLElement 객체입니다. 이 개체를 사용하면 부모 구성 요소의 데이터와 메서드를 쉽게 가져올 수 있습니다.


#### $parent
현재 요소의 부모 범위 개체를 가리키면 여기서 $parent 부모 요소를 가리키지 않지만 범위가 있는 가장 최근의 다이내믹 태그가 있는 부모 요소의 범위를 가져옵니다.

#### $id
  HTMLElement 개체 형식의 템플릿에 있는 id 요소에 대한 직접 참조를 제공합니다.
  본보기:
  '''html
  <template>
    <div id="mydiv"입니다></div>
  </template>
  <스크립트 범위 = ".">
    반환 클래스{

      onReady(){
        this.$id.mydiv.innerHTML = "헬로 월드";
      }
    }
  </script>
  ```

### 데이터는 이벤트와 관련이 있습니다.

#### $emit
사용자 지정 또는 표준 이벤트 보내기
- $emit(nameOrEvent: 문자열 | 이벤트, detailOrtoElem?: 요소 | any, toElem?: 요소): void;
#### $watch
함수 또는 표현식의 변경 사항을 모니터링하고 변경 시 콜백을 트리거합니다.

#### $noWatch
시스템 개체와 같이 모니터링할 필요가 없는 일부 개체에 자주 사용되는 개체의 변경 모니터링을 방지합니다


### 경로 관련

#### $go
여러 가지 방법을 지원하는 루트 점프는 $router.go() 메서드에 대한 바로 가기 참조입니다.
영역은 파티션 경로이며 기본값은 "default"입니다

#### $router
경로 관련 메서드와 특성을 제공하는 경로 개체는 Routing 장을 참조하십시오
일반적인 방법:
- go(tag,arrts:{}) 또는 go(area,tag,attrs:{})
- parseLocation()은 현재 경로를 확인합니다.
- back()은 이전 레벨로 돌아갑니다.



### Tool 클래스 객체
#### $log 
출력 표준 로그는 콘솔 .log와 동일한 방식으로 사용되지만 쉽게 디버깅할 수 있도록 콘솔에 색상이 지정된 구성 요소 이름과 줄 번호를 표시합니다. 간소화된 통화 지원 $log(...) args)와 동일$log.log(...) 아라소

#### $path()
동적 구성 요소와 관련된 실제 경로를 가져오고, 구성 요소에서 이미지를 참조하는 경우 이 이미지의 경로는 현재 페이지의 경로가 아닌 구성 요소의 경로를 기준으로 하며 $path 사용하여 올바른 경로를 얻을 수 있습니다.
- 현재 구성 요소 경로를 기준으로 하는 "./" 지원
- "@/" 상대 npm 패키지 경로 지원

#### $color
시맨틱 동적 색상 일치 객체, 일반적인 시맨틱 색상: $color.pri, $color.pria, $color.sec, $color.seca, $color.text, $color.textr, $color.bg, $color.bgr, $color.ok, $color.warn, $color.info, $color.error 등
$color.pri.l3.s5.h2_.a6 등과 같은 HSL 기반 색상 데코레이터를 지속적으로 호출 할 수 있으며 자세한 내용은 색상 일치 장을 참조하십시오

#### $Colors
색상표 관리 및 동적 로드

#### $json
형식 지정은 $json 데이터, JSON.stringify에 대한 간소화된 호출을 표시하고 동적 변경 감지를 지원합니다

#### $delay
setTimeout 구현을 사용하여 구현의 다음 주기를 지정할 수 있습니다
> $delay(ms:number):P romise<void>;

#### $next
다음 주기는 requestAnimationFrame을 사용하여 구현됩니다
> $next():P romise<void>;

#### $step
속성 값을 단계별로 동적으로 변경하며, 애니메이션 효과에 자주 사용됩니다.
> $step(... args:(any|[임의,숫자]) []):모두;
