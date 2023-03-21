<!--DESC: {"아이콘":"sports_score"} -->

## 빠르게 시작하기

간단한 프로젝트를 빠르게 시작한 다음 단계별로 구체화해 보겠습니다. 자, 이제 디스크에 새 디렉토리를 만들고 가자.

### 주요 항목: 색인.html

먼저 일반적으로 _index.html_라고 하는 엔트리 파일을 작성합니다.

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <title>WCEX Doocument</title>
    <meta name="viewport" content="initial-scale=1.0,width=device-width" />
    <meta charset="utf-8" />

    <meta name="npm" content="https://cdn.jsdelivr.net/npm/" />

    <style>
      html,
      body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin: 0;
        padding: 0;
        font-size: 18px;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
  </head>

  <body>
    <app-></app->
  </body>
</html>
```

일반 HTML과 비교할 때 세 가지 간단한 단계 만 필요합니다.

1. 프로젝트에 **npm** \<meta\> 태그 정의를 추가하여 WCEX가 필요한 타사 패키지를 찾을 수 있는 위치를 알 수 있도록 합니다. 여기서는 jsdelivr이 사용되며 원하는 CDN을 사용하거나 로컬 경로에 NPM을 설치할 수 있습니다.

```html
<meta name="npm" content="https://cdn.jsdelivr.net/npm/" />
```

2. 첫 번째 구성 요소의 경우 일반적으로 **app**이라는 이름을 지정하지만 여기서 레이블 이름은 \<app-\>이므로 그 이유는 웹 구성 요소 표준 사양의 요구 사항으로 인해 모든 사용자 지정 구성 요소에는 하나 이상의 '-' 문자가 필요하므로 끝에 '-'를 추가해야 합니다.

```html
<app-></app->
```

3. 마지막으로 공용 cdn을 통해 직접 WCEX 패키지를 소개하고 최신 버전을 가져와야합니다. WCEX는 타사 종속성이 없는 매우 작으며 로딩이 매우 빠르며 일반적으로 이 줄을 \<head\> 태그의 마지막 요소에 넣는 이유는 wcex 초기화에는 첫 번째 기사에서 설명한 NPM 리포지토리 주소와 같은 미리 정의된 정보가 필요하기 때문입니다. 또 다른 요점은 HTML의 초기 초기화 흰색 화면을 최적화 할 수 있다는 것입니다.

```html
<script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
```

### 첫 번째 구성 요소: **\<앱-\>**

이전 섹션에서 우리가 정의한 첫 번째 웹 구성 요소가 index.html에 로드된 것을 보았으므로 이제 고전적인 Hello World인 웹 구성 요소를 만들어 보겠습니다.

- 이 디렉터리에 **app.html라는 새 파일을 만듭니다.

```html
<template>
  <h1>Hello World!</h1>
</template>
```

보시다시피 이것은 일반 HTML 파일이며 유일한 요구 사항은 \<template\>을 루트 태그로 사용해야 한다는 것입니다.

> _template_에 대한 지식은 다음을 참조 할 수 있습니다 : https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template, 이것은 표준 W3C 사양이며, WCEX는 표준화 된 기본 웹 구성 요소 사양을 사용하여 구현하며, 향후 많은 기술 포인트가 사용될 수 있으며 모두 표준 사양에 속합니다. 따라서 사양을 미리 살펴볼 수 있으며 대부분은 여기에서 찾을 수 있습니다 https://developer.mozilla.org/en-US/docs/Web/Web_Components

자, 이제 필요한 모든 것이 완료되었으므로 실제로 시작하고 실행해 보겠습니다.

### 브라우저에서 열기

이전 장에서 다루었듯이 WCEX가 수행하는 주요 작업 중 하나는 복잡한 패키징 및 환경 구성에 대해 싫어하는 동적 로드입니다. 그래서 다음은 간단합니다. 여러 가지 방법이 있습니다. 실행할 수 있습니다. 위의 두 파일을 정적 웹 또는 Github 또는 NPM에 넣기 만하면됩니다. 이러한 방법은 아래에 설명되어 있습니다.

#### 로컬 HTTP 서비스 시작

- 가장 쉬운 방법은 npm으로 빠른 HTTP 서버 도구를 설치하는 것입니다.

```shell
npm install -g http-server
```

- 그런 다음 지금 디렉토리에서 시작하여 명령 줄에서 디렉토리로 이동하여 다음 명령을 실행하십시오.

```shell
http-server
```

- HTTP 서버가 포트 8080에서 시작된 것을 볼 수 있으며 이제 브라우저를 열고 주소 표시 줄에 입력하십시오.

```
http://localhost:8080
```

이제 당신은 안녕하세요 세계를 볼 수 있습니다, 물론, 당신은 당신이 좋아하는 HTTP 서버, nginx, lighttpd의 모든 종류를 사용할 수 있습니다 ....

> 좋아, 다음. 브라우저의 디버깅 창을 열 수 있습니다. DOM의 구성 요소를 살펴보면 표준화된 웹 구성 요소의 내부 구조입니다. 여기에서 WCEX의 두 번째 주요 기능인 **직관적**을 볼 수 있습니다. VDOM 및 템플릿 엔진, 기본 구현 및 표준화 된 구현의 포기로 인해 디버그 창에 표시되는 DOM 구조는 기본적으로 템플릿의 구조와 동일하므로 문제를 관찰하고 디버깅하는 데 매우 도움이되며 디버그 창을 통해 원하는 거의 모든 작업을 수행하고, 데이터 변경 사항을 관찰하고, 이벤트를 보내고, 데이터를 변경하는 등의 작업을 수행 할 수 있습니다. 가능한 한 이 목표를 달성하기 위해. WCEX 구현은 또한 WCEX의 **if** 및 **for** 구조와 같은 많은 세부 사항을 수행했으며, 구현된 DOM은 래퍼 요소의 다른 레이어를 추가하는 대신 시블리컬하므로 CSS 및 데이터 구조 액세스 요소의 일관성과 **직관적**에 매우 도움이 됩니다.

#### 웹을 통한 직접 미리보기

위의 파일을 **github**에 제출하거나 npm을 통해 패키지를 게시하면 CDN을 통해 직접 액세스할 수 있으며 직접 미리 볼 수 있도록 위젯을 만들었으므로 이 도구는 **jsdelivr**을 CDN으로 사용합니다.
특정 액세스 형식 및 설명은 https://www.jsdelivr.com/

- NPM 액세스, 자신의 패키지 이름을 바꾸십시오.

```
https://wc-ex.com/go?npm/@wcex/example-basic/index.html

https://wc-ex.com/go?npm/[YOUT PACKAGE NAME][@VERSION]/index.html

```

- GitHub 액세스를 위해 자신의 저장소 이름과 경로를 바꾸십시오.

```
https://wc-ex.com/go?gh/wc-ex/wcex/example/basic/index.html
https://wc-ex.com/go?gh/[YOU REPOS]@[COMMIT ID]/[YOU DIR]/index.html
```

> 물론 위의 방법 외에도 CLI 툴킷도 만들었습니다. 크기가 수십 K에 불과한 매우 작고 webpack, 롤업 및 기타 복잡한 패키징 도구에 의존하지 않습니다. 핫 업데이트 컴파일 및 릴리스 등과 같은 더 많은 작업을 수행하는 데 도움이 될 수 있습니다. 또 다른 중요한 점은 TypeScript를 지원하는 것입니다. npm을 통해 **@wcex/CLI**를 설치할 수 있으며, 이에 대한 자세한 내용은 이후 섹션에서 설명합니다.

### 추가 개선

간단히 말해서, 다음 장에서는 예를 들어 더 많은 기능을 추가하려고 노력할 것입니다. 사용자 지정 속성을 추가하여 데이터 바인딩을 추가합니다. 이벤트를 처리하고 구성 요소를 더 추가합니다.
