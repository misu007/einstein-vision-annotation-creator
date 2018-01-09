# Einstein Vision Annotation Creator

Einstein Vision オブジェクト検出のカスタムモデルを作成する際に必要な、Annotations.csvファイルを簡単に生成するためのサンプルツールです。ローカル環境で動作するnode.js製Webアプリになります。

<div style="text-align: center;">
<img src="https://github.com/misu007/einstein-vision-annotation-creator/blob/master/readme/img000.png, "")
</div>

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
<div style="text-align: center;">
<img src="https://github.com/misu007/einstein-vision-annotation-creator/blob/master/readme/img001.gif"/>
</div>

#### ラベルの作成
ラベル作成ボタンをクリックし、任意のラベル名を入力して保存します。
<div style="text-align: center;">
<img src="https://github.com/misu007/einstein-vision-annotation-creator/blob/master/readme/img002.gif"/>
</div>

#### アノテーション作成
付与したいラベルが青くなっていることを確認し（もし青でない場合は、クリックしてアクティブにしてください）画像上で、四角を描きます。
<div style="text-align: center;">
<img src="https://github.com/misu007/einstein-vision-annotation-creator/blob/master/readme/img003.gif"/>
</div>

#### アノテーションのサイズ変更
４隅の四角をドラッグします。
<div style="text-align: center;">
<img src="https://github.com/misu007/einstein-vision-annotation-creator/blob/master/readme/img006.gif"/>
</div>

#### アノテーションの移動
＋マークをドラッグします。
<div style="text-align: center;">
<img src="https://github.com/misu007/einstein-vision-annotation-creator/blob/master/readme/img004.gif"/>
</div>

#### アノテーションの複製
Shiftキーをクリックしながら、＋マークをドラッグします。
<div style="text-align: center;">
<img src="https://github.com/misu007/einstein-vision-annotation-creator/blob/master/readme/img005.gif"/>
</div>

#### ビューの変更
　Gキー、Lキー、Vキーで　グリッド表示切替、ラベル表示切替、サイズ変更が可能です。
<div style="text-align: center;">
<img src="https://github.com/misu007/einstein-vision-annotation-creator/blob/master/readme/img007.gif"/>
</div>



## ライセンス
MITライセンス　自由に改変しお使いください。

## 免責
あくまでもサンプルコードです。動作を保証したり、推奨するものではありません。あくまでもサンプルとして、ご活用ください。
