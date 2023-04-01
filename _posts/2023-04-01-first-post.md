---
title: "First Post: 시작이 반이다...!"
categories:
  - Memo
tags:
  - memo
  - daily
  - blog
---

### 드디어.............
```
블로그를 시작할 수 있게 되었다.. 장장 일주일? 정도 걸린 것 같다...
```
>1. ```
어지러웠다
``` 
<br>
처음 써보는 Ruby, Rbenv, jekyll, bundle... 어쩌구 저쩌구 어지러웠다..<br><br>
>2. ```
그 와중에 git도 처음 사용해보았다
``` 
<br>
> git add -A <br>
> git commit -a <br>
> git push <br><br>
> -> 이런 과정들을 처음 겪어보았다.. 에러 하나, 빨간불 하나 뜰 때마다 멘탈 와르르..<br><br>
>3. ```
이번엔 github page Repository 에서 말썽이다.
``` 
<br><br>
> 계속 Build, and deploy 하는 과정에서 몇가지 오류가 뜨길래 <br>Rerun을 마구 돌렸더니 몇 가지 process 가 queued 상태로 멈춰 있다... <br>```Googling 해보았으나 결과는 Repository 삭제 후 rebuild.```<br>Rebuild 했으나, Profile이 뜨질 않는다.. <br>버튜버 처럼 Profile 없이 활동해볼까 하다가 자료구조 수업 강의실 입장.<br><br>
>4. ```
minimal-mistakes theme 가 너무 복잡한가
``` 
<br>
싶어서 다른 theme 선택 후 리빌딩, 깃 푸쉬까지 마치니 너무 쉽게 잘 동작한다. 기분은 좋았지만 내가 원했던 각종 카테고리를 가져 분류가 된 ```개발 블로그로는 적합하지 않았다.``` <br>다시 minimal-mistakes 설치 후 처음부터 다시 시작.<br><br>
>5. ```
드디어....!
``` 
잘 동작하나 싶더니 ```permalink``` 를 통한 접근 과정에서 404 등장.. <br>약 6시간 붙잡고 앉아 원인을 찾았다. <br>문제는 처음 내려받은 minimal-mistakes.master.zip 의 압축을 풀었을 때 각종 archive 파일들의 확장자가 ```html```로 되어 있었다. <br><br>사실 그게 문제고 원인일거라 생각도 못했지만 (나는 백엔드 개발밖에 몰라..) <br>파일들을 하나하나 뒤져보는 과정에서 vscode로 열었을 때, <br>여느 다른 파일들처럼 변수나 동작을 암시하는 코드의 컬러가 들어가 있지 않은, <br>말 그대로 생 text/plain 파일같아서 ```확장자를 .html --> .md``` 의 <br>마크다운 형식 파일로 바꾸어 주었더니...<br><br>
>6. ```
바로 동작한다.
```
<br> 내가 이거 하나 때문에 몇시간을 투자한건지.. <br>회의감이 살짝 들었지만  ```모든 일엔 이유가 있다``` 는 말처럼 이 또한 배움이며, <br>언젠간 도움이 될 것이라 믿고 ```실제로 지금까지 말한 과정중에 새로 배운것들이 많았다.``` <br><br>이제 개발 블로그를 시작해보려 한다.

```
Carefree Life start ~ !
```
### Task Lists

- [x] Build CarefreeLife's dev blog
- [ ] Post Every night
- [ ] Grow up