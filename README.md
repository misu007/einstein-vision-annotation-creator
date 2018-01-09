# Einstein Vision Annotation Creator

Einstein Vision オブジェクト検出のカスタムモデルを作成する際に必要な、Annotations.csvファイルを簡単に生成するためのサンプルツールです。ローカル環境で動作するnode.js製Webアプリになります。

<img src="https://github.com/misu007/einstein-vision-annotation-creator/blob/master/readme/img000.png"/>

## 利用方法
### インストール

コマンドラインで任意のフォルダに移動し、
```
# git clone https://github.com/misu007/einstein-vision-anotation-creator.git
# cd einstein-vision-anotation-creator
# npm install
```

### アプリ起動
```
# npm start
```

webブラウザ（Chrome推奨）で
```
http://localhost:5000
```
にアクセスします。

（アプリを終了するときは、コマンドライン上でCtrl-cを押します。）

### 使い方

#### 画像の読み込み
ドラッグ＆ドロップするか、左上をクリックします。
<img src="https://github.com/misu007/einstein-vision-annotation-creator/blob/master/readme/img001.gif"/>

#### ラベルの作成
ラベル作成ボタンをクリックし、任意のラベル名を入力して保存します。
<img src="https://github.com/misu007/einstein-vision-annotation-creator/blob/master/readme/img002.gif"/>

#### アノテーション作成
付与したいラベルをクリックしアクティブにし、画像上で長方形の対角線上をなぞるようにドラッグ&ドロップします。
<img src="https://github.com/misu007/einstein-vision-annotation-creator/blob/master/readme/img003.gif"/>

#### アノテーションのサイズ変更
４隅の四角をドラッグします。
<img src="https://github.com/misu007/einstein-vision-annotation-creator/blob/master/readme/img006.gif"/>

#### アノテーションの移動
＋マークをドラッグします。
<img src="https://github.com/misu007/einstein-vision-annotation-creator/blob/master/readme/img004.gif"/>

#### アノテーションの複製
Shiftキーをクリックしながら、＋マークをドラッグします。
<img src="https://github.com/misu007/einstein-vision-annotation-creator/blob/master/readme/img005.gif"/>

#### ビューの変更
　Gキー、Lキー、Vキーで　グリッド表示切替、ラベル表示切替、サイズ変更が可能です。
<img src="https://github.com/misu007/einstein-vision-annotation-creator/blob/master/readme/img007.gif"/>



## ライセンス
MITライセンス　自由に改変しお使いください。

## 免責
あくまでもサンプルコードです。動作を保証したり、推奨するものではありません。あくまでもサンプルとして、ご活用ください。
