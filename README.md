# Bariiiii バリー


## これは何？

これはバーコードを読み込むアプリです。  

このアプリはUnityによって作られているので、マルチプラットフォームです。  
(そうなるつもり)  

現在は本のバーコードを読み込む機能が実装されています。  

## ターゲット  
:iphone: iOS and Android.  
OS Ver...  

## 使い方

```

git clone https://github.com/igara/Bariiiii.git

cd Bariiiii
sh setup.sh

```

## 使用しているライブラリ

- iOS  
[AVFoundation](https://developer.apple.com/reference/avfoundation)


- Android  
[Mobile Vision](https://developers.google.com/vision/)  

##  サブプロジェクト

- [CreateBariiiiiAndroidNativePlugin](https://github.com/igara/Bariiiii/tree/master/CreateBariiiiiAndroidNativePlugin)  
Android Studioで作成されたプロジェクト  
カメラによるバーコード読み取りライブラリを作成している  
このプロジェクトで作成されたものはUnity上でも使えるように  
[Assets/Plugins/Android](https://github.com/igara/Bariiiii/tree/master/Assets/Plugins/Android)に配置する  

- [CreateBariiiiiIOSNativePlugin](https://github.com/igara/Bariiiii/tree/master/CreateBariiiiiIOSNativePlugin)  
Xcodeで作成されたプロジェクト  
カメラによるバーコード読み取りライブラリを作成している  
このプロジェクトで作成されたものはUnity上でも使えるように  
[Assets/Plugins/iOS](https://github.com/igara/Bariiiii/tree/master/Assets/Plugins/iOS)に配置する  

- [BuildTool](https://github.com/igara/Bariiiii/tree/master/BuildTool)
Android Studio、Xcode、Unityのビルドを管理するツール  
