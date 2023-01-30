## サポートのお願い

Facemesh2Scratchは2020年よりオープンソースかつ無料で提供しており、学校や各種プログラミング教室はじめさまざまな場所で利用されております。継続して開発を続けるためには、使っていただいている皆さまからの支援が必要です。<br />
[一杯のコーヒー](https://www.buymeacoffee.com/champierre)という形でサポートをいただけると大変ありがたく思います。

<a href="https://www.buymeacoffee.com/champierre"><img src="https://user-images.githubusercontent.com/10215/215533679-bb41b1a2-ba42-4eb6-9f9a-6d0bd67f3aaa.png"></a>

# Facemesh2Scratch

Facemesh2Scratchは、WebカメラのみでフェイストラッキングができるScratch3向け拡張機能です。

MediaPipeとTensorFlow.jsが提供するfacemeshパッケージを利用しています。背景にある技術を知りたい方は、"[Face and hand tracking in the browser with MediaPipe and TensorFlow.js](https://blog.tensorflow.org/2020/03/face-and-hand-tracking-in-browser-with-mediapipe-and-tensorflowjs.html)"を参照ください。

*他の言語で読む: [English](README.en.md), [日本語](README.md).*

## デモ動画

### 顔の認識

  <img src="images/facemesh.gif" width="600" />

### 複数の顔にも対応

  <img src="images/facemesh_multiple_faces.gif" width="600" />

## 使用方法

- Chromeで https://stretch3.github.io/ (ほかのオリジナル拡張機能が使用できます)または https://champierre.github.io/facemesh2scratch/ を開きます。
- 拡張機能一覧よりFacemesh2Scratchを選びます。

## サンプルプロジェクト

https://github.com/champierre/facemesh2scratch/raw/master/sample_projects/facemesh.sb3

<img src="images/en/sample_project.png" />

## ライセンス

- Facemesh2Scratchには [BSD 3-Clause License](./LICENSE.md) が適用されます。オープンソースで、誰でも自由に利用できます。授業やワークショップで使用でき、商用利用も認められています。あなたやあなたの生徒さんがFacemesh2Scratchを使用して何か面白いプロジェクトを作成したときは、ぜひハッシュタグ #facemesh2scratch を使用してSNSで共有するか、連絡先までお知らせください。以下の「活用例」に追加させていただきます。

## 活用例

- [顔の向きでオブジェクトを制御する](https://twitter.com/y0sh1k10/status/1244241128074797057)
- [風船を吹く](https://twitter.com/kuroyanagi_css/status/1241510719834558467)

## 推奨環境

- OS
  - Windows 8 (TBD)
  - Windows 10 (TBD)
  - MacOS
  - iOS
- Browser
  - Chrome
  - Safari(iOS)

Chrome の拡張機能を使用している場合に、正常に動作しないことがあるので、もしうまく動かないという場合には、[ゲストモード](https://support.google.com/chrome/answer/6130773?hl=ja)に切り替えてお試しください。

## FAQ

- Q. Facemesh2Scratch拡張機能が正常に動作しません。

- A. Chromeのデベロッパーツールを開き、Consoleタブを確認してください。「Error: WebGL is not supported on this device」というエラーが表示されている場合、[ChromeでWebGLが使えない場合の対処方法](https://masshiro.blog/webgl-chrome/)にある対処方法を試みてください。Chromeの「設定」画面より「詳細設定」を選び、「ハードウェア アクセラレーションが使用可能な場合は使用する」が無効になっている場合は、有効にしてChromeを再起動してみてください。

## 開発社向け(For Developers - How to run Facemesh2Scratch extension on your computer)

1. Setup LLK/scratch-gui on your computer.

  ```
  % git clone git@github.com:LLK/scratch-gui.git
  % cd scratch-gui
  % npm install
  ```

2. In scratch-gui folder, clone Facemesh2Scratch. You will have facemesh2scratch folder under scratch-gui.

  ```
  % git clone git@github.com:champierre/facemesh2scratch.git
  ```

3. Run the install script.

  ```
  % sh facemesh2scratch/install.sh
  ```

4. Run Scratch, then go to http://localhost:8601/.

  ```
  % npm start
  ```
