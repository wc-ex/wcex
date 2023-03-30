<!--DESC: {"icon":"sports_score"} -->

## すぐに始める

簡単なプロジェクトをすばやく開始してから、段階的に改良しましょう。 さて、ディスク上に新しいディレクトリを作成して行きましょう。

### メインエントリ: インデックス.html

まず、一般的に_index.html_と呼ばれるエントリファイルを作成します。

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

通常のHTMLと比較して、必要なのは3つの簡単なステップだけです。

1. プロジェクトに **npm** \<meta\> タグ定義を追加して、WCEX に必要なサードパーティ パッケージの場所を知らせます。ここでは jsdelivr が使用され、任意の CDN を使用するか、ローカル パスに NPM をインストールできます。

```html
<meta name="npm" content="https://cdn.jsdelivr.net/npm/" />
```

2.最初のコンポーネントでは、通常**app**という名前を付けますが、ここではラベル名が\<app-\>であるため、Webコンポーネントの標準仕様の要件により、すべてのカスタムコンポーネントには少なくとも1つの「-」文字が必要なため、最後に「-」を追加する必要があります。

```html
<app-></app->
```

3.最後に、ここではパブリックcdnを介して直接WCEXパッケージを導入し、最新バージョンをインポートする必要があります。 WCEXは非常に小さく、サードパーティの依存関係がなく、読み込みは非常に高速であり、通常、この行を\ <head \ >タグの最後の要素に入れますが、この理由は、wcexの初期化には、最初の記事で説明されているNPMリポジトリアドレスなどの事前定義された情報が必要であるためです。 もう一つのポイントは、HTMLの初期初期化白画面を最適化できることです。

```html
<script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
```

### 最初のコンポーネント: **\<app-\>**

前のセクションでは、定義した最初の Web コンポーネントが index.html に読み込まれたことを確認しましたが、今度は古典的な Hello World である Web コンポーネントを作成しましょう。

- このディレクトリに **app.html という名前の新しいファイルを作成します。

```html
<template>
  <h1>Hello World!</h1>
</template>
```

ご覧のとおり、これは通常のHTMLファイルであり、唯一の要件は、ルートタグとして\<template\>を使用する必要があることです。

> _template_に関する知識については、以下を参照できます。 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template、これは標準のW3C仕様であり、WCEXは標準化されたネイティブWebコンポーネント仕様を使用して実装し、将来多くの技術的ポイントが使用される可能性があり、それらはすべて標準仕様に属します。 したがって、事前に仕様を確認することができ、そのほとんどはここで見つけることができます:https://developer.mozilla.org/en-US/docs/Web/Web_Components

さて、必要なことはすべて終わったので、実際に起動して実行しましょう。

### ブラウザで開く

前の章で説明したように、WCEX が行う主なことの 1 つは動的読み込みであり、複雑なパッケージ化や環境構成では嫌いです。 したがって、次のことは簡単です。 あなたには多くの方法があります。 あなたはそれを実行させることができます。 上記の2つのファイルを静的なWEBまたはGithubまたはNPMに入れるだけです。 これらのメソッドについて以下に説明します。

#### ローカル HTTP サービスを開始する

- 最も簡単な方法は、npmを使用して高速HTTPサーバーツールをインストールすることです

```shell
npm install -g http-server
```

- 次に、コマンドラインでディレクトリを開始し、ディレクトリに移動して、次のコマンドを実行します。

```shell
http-server
```

- HTTPサーバーがポート8080で起動されていることを確認したら、ブラウザを開いてアドレスバーに入力します。

```
http://localhost:8080
```

今、あなたはハローワールドを見ることができます、もちろん、あなたはあなたが好きなHTTPサーバー、nginx、lighttpdの任意の種類を使用することができます....

> さて、次は。 ブラウザーのデバッグ ウィンドウを開くことができます。 DOM 内のコンポーネントを見ると、これは標準化された Web コンポーネントの内部構造です。 ここでは、WCEXの2番目の主な機能である**直感的**を見ることができるかもしれません。 VDOMとテンプレートエンジン、ネイティブ実装、標準化された実装の放棄により、デバッグウィンドウに表示されるDOM構造は基本的にテンプレートの構造と同じであり、デバッグウィンドウを介して問題を観察およびデバッグするのに非常に役立ちます、デバッグウィンドウを介して、データの変更を監視し、イベントを送信し、データを変更するなど、ほとんどすべてを実行できます。 この目標を可能な限り達成するために。 WCEXの実装は、WCEXの**if**および**for**構造など、多くの詳細も行いましたが、実装されたDOMは、ラッパー要素の別のレイヤーを追加するのではなく、CSSとデータ構造アクセス要素の一貫性と**直感的**に非常に役立ちます。

#### ウェブ経由で直接プレビュー

上記のファイルを **github** に送信するか、npm を介してパッケージを公開すると、CDN から直接アクセスでき、直接プレビューに役立つウィジェットが作成され、このツールは CDN として **jsdelivr** を使用します。
特定のアクセス形式と説明については、https://www.jsdelivr.com/ を参照してください。

- NPMアクセスは、独自のパッケージ名を置き換えてください。

```
https://wc-ex.com/go?npm/@wcex/example-basic/index.html

https://wc-ex.com/go?npm/[YOUT PACKAGE NAME][@VERSION]/index.html

```

- GitHubにアクセスする場合は、独自のリポジトリ名とパスを置き換えてください

```
https://wc-ex.com/go?gh/wc-ex/wcex/example/basic/index.html
https://wc-ex.com/go?gh/[YOU REPOS]@[COMMIT ID]/[YOU DIR]/index.html
```

> もちろん、上記の方法に加えて、CLIツールキットも作成しました。 非常に小さく、サイズもわずか数十Kで、webpack、ロールアップ、その他の複雑なパッケージングツールに依存していません。 ホットアップデートのコンパイルやリリースなど、より多くの作業を行うのに役立ちます。 もう一つの重要な点は、TypeScriptをサポートすることです。 **@wcex/CLI** は npm 経由でインストールできますが、その詳細については後のセクションで説明します。

### 最初の例

<div>
<wcex-doc.com-playground files="['first/index.html','first/app.html']"></wcex-doc.com-playground>
</div>




### さらなる改良

簡単に言えば、次の章では、たとえば、それにさらに機能を追加しようとします。 カスタム プロパティを追加して、データ バインディングを追加します。 イベントを処理し、コンポーネントを追加します。
