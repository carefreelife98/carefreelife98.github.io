---
title: "Kotlin - Inheritance (상속)"
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

![path](/assets/images/INU/Kotlin/kotlinTeaser.svg)

# Inheritance Agenda

> Inheritance(상속) 는 객체 지향 프로그래밍의 장점 중 하나. <br>
> Default Classes (public, final) 은 상속을 할 수 없음.
> - **상속을 하기 위해서는 Class 를 `open` 으로 만들어 주어야 함.**
>
> <br><br>
> **상속을 하게 되면 자식 클래스는 부모 클래스로부터 모든 Properties 를 물려 받을 수 있다.**
> <br><br>
> **상속의 이점**
> - 코드의 재사용성을 높인다. (High reusablility)
> - Method Overriding (메소드 재정의) 을 가능하게 함.

<br><br>

## Types of Inheritance
**Class 간**의 상속
- **단일 상속**

**Interface** 를 통한 상속
- **다중 상속**

<br><br>

# Inheritance - Basic

```kotlin
open class Animal {  
    var color: String = ""  
    fun eat() = println("Eat")  
}  

// super class Animal(부모 클래스) 로부터 상속받은 color, eat()
class Dog: Animal() {  
//    var color: String = ""  
//    fun eat() = println("Eat")  
    var bread: String = ""  
    fun bark() = println("Bark")  
}  
// super class Animal(부모 클래스) 로부터 상속받은 color, eat()
class Cat: Animal() {  
//    var color: String = ""  
//    fun eat() = println("Eat")  
    var age: Int = -1  
    fun meow() = println("Meow")  
}  

fun main() {  
    val dog = Dog()  
    dog.apply {  
        bread = "lebra"  
        color = "Black"  
        bark()  
        eat()  
        println("$bread, $color")  
    }  
}
```

> **형식**
> - **Super Class (부모 클래스)**
>   - **`open class (클래스 이름) { }`**
>
> - **자식 클래스**
>   - **`class (클래스 이름) : (상속받을 클래스 이름)( )`**
>
> **특징**
> - **Super Class 생성 시 `open`** 을 붙혀주어야 함.
> - 자식 클래스에서 **상속을 받을 시 상속 대상 부모 클래스 + ( )** 를 붙혀주어야 함.
>   - **constructor** 가 필요하기 때문에.

<br><br>

# Overriding (메소드 재정의)
```kotlin
open class Animal {  
    // overriding 을 위해 Property 에 "open" 추가.  
    open var color: String = ""  
  
    // overriding 을 위해 Method 에도 "open" 추가.  
    open fun eat() = println("Eat")  
}  
  
class Dog: Animal() {  
    var bread: String = ""  
    fun bark() = println("Bark")  
  
    // Property overriding  
    override var color: String = "White"  
  
    // Method overriding  
    override fun eat() {  
        println("A doggy eats food.")  
    }  
}  
  
fun main() {  
    val dog = Dog()  
  
    println(dog.color)  
    println(dog.eat())  
  
    dog.apply {  
        bread = "lebra"  
        color = "Black"  
        bark()  
        eat()  
        println("$bread, $color")  
    }  
}
```

> **Class 상속 때와 같이 Override 대상 메소드 및 속성에 `open` keyword 추가.**
> - **overriding 은 메소드, 속성 둘 다 가능.**
>
> - **Method overriding**
>   - `Super class`
>     - **open** fun(Overriding 될 메소드)
>   - `Sub class`
>     - **override** fun (Overriding 할 메소드) { }
>
> - **Property overriding**
>   - `Super class`
>     - **open var** (Overriding 될 속성)
>   - `Sub class`
>     - **override var** (Overriding 할 속성): (속성의 Type) = (재정의)

<br><br>

# Overriding with Primary Constructors

```kotlin
// Super class 에 open -> overriding 가능
// 주 생성자를 이용하여 초기화 : color
// init block 실행
open class Animal (var color: String) {  
    init {  
        println("at init block of the class Animal : $color")  
    }  
}  

// 자식 클래스에서 부모 클래스 상속.  -> :Animal(color)
// color 은 변수로서 부모 클래스에 전달되어 초기화됨.
// breed 는 자식 클래스인 Dog 에서 초기화 됨.
class Dog(color: String, var breed: String): Animal(color) {  
    init {  
        println("at init block of the class Dog : $color, $breed")  
    }  
}  
  
fun main() {  
    val dog = Dog("Black", "lebra")  
    dog.apply {  
        println("$color $breed")  
    }  
}
```

**실행 결과**
![path](/assets/images/INU/Kotlin/kotlinInheritance1.png)

<br><br>

## Quiz : 값의 출력 예측하기

```kotlin
open class Animal (open var color: String) {  
    init {  
        println("at init block of the class Animal : $color")  
    }  
}  
  
class Dog(override var color: String, var breed: String): Animal(color) {  
    init {  
        println("at init block of the class Dog : $color, $breed")  
    }  
}  
  
fun main() {  
    val animal = Animal("White")  
    val dog = Dog("Black" ,"Pug")  
    println("${animal.color} ")  
    println("${dog.color}, ${dog.breed}")  
}
```

**실행 결과**
![path](/assets/images/INU/Kotlin/kotlinInheritance2.png)

<br><br>

**출력 내용**
1. **at init block of the class Animal : White**
    - val animal = Animal("White") 에 따른 출력
2. **at init block of the class Animal : null**
    - `val dog = Dog("Black"` -> `class Dog(override var color: String,`
        - Super Class 인 Animal 의 속성을 override 하겠다는 값 (override var color) 이 Superclass 에게 알려짐 (?)
        - **상속 속성을 Animal(부모 클래스) 에서 초기화 하지 않으므로 null 반환**
3. **at init block of the class Dog : Black, Pug**
    - **하위 클래스인 Dog 에서 color: Black 으로 `재정의.`**
        - **Breed: Pug 로 `초기화.`**
    - init block 에 Black, Pug 전달되어 출력.

<br><br>

# Overriding with Secondary Constructors

## Color 속성 초기화 하기

**방법 1. 부모 클래스의 보조 생성자에서 초기화 하겠다.**

```kotlin
open class Animal () {  
    var color: String = ""  
  
    constructor(_color: String): this() {  
        color = _color  
    }  
  
}  
  
class Dog(color: String, var breed: String): Animal(color)
```

<br><br>

**방법 2. 하위 클래스의 보조 생성자에서 직접 초기화 하겠다.**

```kotlin
open class Animal () {  
    var color: String = ""  
  
    constructor(_color: String): this() {  
        color = _color  
    }  
}  
  
class Dog: Animal {  
    var breed: String = ""  
  
    constructor(_color: String, _breed: String) : super(_color) {  
        breed = _breed  
    }  
}
```

<br><br>

# Polymorphism(다형성) : Overriding & Overloading

```kotlin
// Overriding : Method 나 Property 의 이름은 같지만 동작이나 값을 재정의.  
// Overloading : 동작은 같지만 Parameter 의 Type 이나 개수가 다름.  
class Calc {  
    fun add(x:Int, y:Int):Int = x + y    
    fun add(x:Float, y:Float):Float = x + y    
    fun add(x:Float, y:Float, z:Float):Float = x + y + z
    fun add(x:Double, y:Double):Double = x + y    
    fun add(x:String, y:String):String = x + y
}  

fun main() {
	val calc = Calc()  
	println(calc.add(2, 3))  
	println(calc.add(4.1f, 3.5f))  
	println(calc.add(4.1f, 3.5f, 6.2f))  
	println(calc.add(4.0, 5.0))  
	println(calc.add("Carefree", "Life"))
}
```

<br><br>

# 가시성 수식어 (Visibility Modifiers)

```kotlin
class Foo {  
    val a = 1  
    protected val b = 2  
    private val c = 3  
 
	internal val d = 4  
}
```

> **Visibility (가시성, 접근 제한)**
> - Class 의 Method 나 Property 의 **접근 권한을 지정.**
> 	- **정보 은닉 (Information Hiding)**
> 		- 클래스 **외부에서 필요한 부분은 개방** (Public).
> 		- 클래스 내부에서만 접근 가능하고 **외부 접근을 차단** (Private).
>
> **Visibility Modifier**
> - **`Public (+)`**
>   - 모두에게 **공개**.
>   - **모든 곳에서 접근가능. (Default)**
> - **`Protected (#)`**
>   - **상속받은 클래스에서는 접근 가능** (Accessible)
> - **`Internal`**
>   - 같은 모듈 내에서 접근 가능.
>   - Kotlin 에서만 사용.
>   - **모듈 내에 존재하는 Public** 이라 생각해도 됨.
> - **`Private (-)`**
>   - **외부 접근 불가.**
>
> - 괄호 안 기호는 **`UML(Unified Modeling Language)`** 에서 사용.

<br><br>

## 가시성 수식어 사용 예시

```kotlin
open class Base {  
    private var a = 1  
    protected fun baseFun() {  
        a += 1  
        println("a = $a")  
    }  
}  
  
class Derived : Base() {  
    fun derivedFun() {  
        super.baseFun()  
    }  
}  
  
fun main() {  
    val derived = Derived()
    // Private 으로 선언된 변수는 외부에서 직접 접근 불가. 
    // derived.a = 2
    
    // Protected 로 선언된 함수가 존재하는 Class 를 상속 받은 하위 Class 에서 super Class 의 Protected 함수를 이용해 super Class 의 private 변수에 접근.
    derived.derivedFun()
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

- [x] Inheritance Agenda
- [x] Types of Inheritance
- [x] Inheritance - Basic
- [x] Overriding (메소드 재정의)
- [x] Overriding with Primary Constructors
- [x] Quiz : 값의 출력 예측하기
- [x] Overriding with Secondary Constructors
- [x] Color 속성 초기화 하기
- [x] Polymorphism(다형성) : Overriding & Overloading
- [x] 가시성 수식어 (Visibility Modifiers)