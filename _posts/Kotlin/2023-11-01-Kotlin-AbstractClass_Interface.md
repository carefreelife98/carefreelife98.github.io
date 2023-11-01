---
title: "Kotlin - 추상 클래스 (Abstract Class) & 인터페이스 (Interface)"
categories:
  - Kotlin
tags:
  - Kotlin
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
   teaser: "/assets/images/INU/Kotlin/kotlinTeaser.svg"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# 추상 클래스 (Abstract Class)
> **`추상 클래스의 역할은 Methods 와 Properties 를 "제공"하기 위함.`**
> - **추상 클래스는 부분적으로만 정의된 클래스.**
>   - 완벽하게 정의되어 있는 클래스가 아님.
> - 추상 메소드 (Abstract Method) 는 **Body 가 존재하지 않은 상태에서 선언만 한다.**
> - 추상 클래스의 **추상 메소드는 상속 관계에 있는 하위 클래스 에서 추상 메소드를 Overriding 하여 구현.**
>   - 추상 클래스는 **반드시 하나 이상의 Abstract Method / Property 를 가지고 있어야 한다.**
> - 추상 클래스의 Instance 들은 그 **추상 메소드를 하위 클래스에서 구현해야만 생성 할 수 있다.**

```kotlin
// 추상 클래스 Foo
abstract class Foo {  
    // body 가 없는 Method 의 선언만 진행.  
    abstract fun bar()  
}  
  
// 추상 클래스 Foo 를 상속받은 클래스 Anonymous
class Anonymous : Foo() {    
    // 추상 클래스의 추상 메소드를 구현  
    override fun bar() {  
        println("bar() is implemented")  
    }  
}  
  
fun main() {  
    // Anonymous 클래스 객체 생성  
    val foo = Anonymous()  
  
    // Anonymous Class  
    foo.bar()  
}
```

<br><br>

## Object - 무명 클래스
> 추상 클래스를 상속받은 하위 클래스의 Instance 를 **여러 번 사용하지 않고 한번만 사용하는 경우에 사용.** <br><br>
> **인터페이스 구현 시 자주 사용하니 기억해두자.**

```kotlin
fun main() {  
    // 무명 클래스 object 사용
    val foo = object : Foo() {  
        // 추상 클래스의 추상 메소드를 구현  
        override fun bar() {  
            println("bar() is implemented")  
        }  
    }  
    // Anonymous Class  
    foo.bar()  
}
```
- **무명 클래스인 object 를 사용하여 추상클래스인 Foo를 상속받고 추상메소드 bar 을 구현.**

<br><br>

## Abstract Class : Abstract Property
```kotlin
// 추상 클래스 Foo
abstract class Foo2 {  
    // abstract property 는 선언만 진행. (초기값 할당 x)    
    abstract var name: String  
  
    // body 가 없는 Method 의 선언만 진행.  
    abstract fun bar2()  
  
    // 상속을 허용한 Method
    open fun openFunction() {  
	    println("openFunction() is implemented")  
	}
  
    // 상속을 허용하지 않은 Method    
    fun publicFunction() {}  
}  
  
// 추상 클래스 Foo2 를 상속받은 클래스 Anonymous2
class Anonymous2() : Foo2() {  
    // 추상 클래스의 추상 속성 초기값 할당.  
    override var name: String = "new name"  
  
    // 추상 클래스의 추상 메소드를 구현  
    override fun bar2() {  
        println("bar2() is implemented")  
        println("name = $name")  
    }  
	
	override fun openFunction() {  
	    super.openFunction()  
	}
}  
  
fun main() {  
    val foo = Anonymous2()  
    
    foo.bar2()  
    foo.openFunction()
}
```

<br><br>

# Interface
## Interface vs Abstract class
> - **같은 점**
>   - 추상 메소드 (Abstract Method)를 갖는다.
> - **차이점**
>   - **Interface 는 추상메소드 만을 갖는다.**
>     - **추상 속성 없음**
>     - **구현 상속의 목적**을 갖기 때문.

<br><br>

## Interface 를 사용하는 목적
> - **구현 상속**
>   - **인터페이스가 바뀌더라도 이를 구현하는 하위 클래스는 클래스 상속과 다르게 영향을 거의 받지 않음.**
>     - **구현을 하지 않고 선언만** 했기 때문에.
> - **다중 상속**
>   - 하위 클래스가 **여러 개의 인터페이스를 상속** 받을 수 있음.
>   - 클래스는 단일 상속만 가능 (1:1 관계)

<br><br>

## Interface 사용 예시
> **Interface 는 클래스가 아니다.**
> - 구현 상속 받을 때 **생성자를 호출하는 괄호 미사용.**
>   - Interface는 완벽하게 구현된 것이 아니므로.
>
> **Abstract Method**
> - **`Abstract` keyword** 없이 Method 만 선언.

```kotlin  
// interface Clickable  
interface Clickable {  
    fun click()  
    fun showOff() = println("I'm clickable")  
}  
  
// interface Focusable  
interface Focusable {  
    fun setFocus(b:Boolean)  
    fun showOff() = println("I'm focusable")  
}  
  
// 다중 상속. Interface 는 콤마 (,) 를 통해 구분됨.  
class Button : Clickable, Focusable {  
    override fun click() {  
        println("I was clicked")  
    }  
  
    override fun setFocus(b: Boolean) {  
        println("I ${if (b) "got" else "lost"} focus.")  
    }  
  
    // Interface 중 같은 이름을 가진 Method 존재 시
    // 해당 Method 에 T Type Parameter <> 를 사용하여 Interface 구분.
    override fun showOff() {  
        super<Clickable>.showOff()  
        super<Focusable>.showOff()  
    }  
}  
  
fun main() {  
    val button:Button = Button()  
    button.setFocus(true)  
    button.showOff()  
    button.click()  
}
```

<br><br>

지식 공유를 위한 Kotlin 개인 학습 포스트입니다.
피드백은 항상 환영합니다!
긴 글 읽어주셔서 감사합니다.
{: .notice--success}
{: style="text-align: center;"}

<br><br>

[처음으로~](#){: .btn .btn--primary }

### Task Lists

>

- [x] 추상 클래스 (Abstract Class)
- [x] Object - 무명 클래스
- [x] Abstract Class : Abstract Property
- [x] Interface vs Abstract class
- [x] Interface 를 사용하는 목적
- [x] Interface 사용 예시
