---
title: "Kotlin - 클래스 (Class)"
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

# Class
## 생성자
**생성자 내부에 존재하는 Constructor**
- Secondary Constructor

**클래스 선언문에 존재하는 (외부) Constructor**
- Primary Constructor

<br><br>

## Class 선언 및 호출

```kotlin
class SmartDevice {
	// class's body
}

fun main() {
	// 객체(Object) = Class 의 Instance
	val smartTvDevice = SmartDevice() //() 는 Constructor 함수 호출.
}
```

> **객체를 생성**하는 것은 객체에 관한 정보를 저장하기 위해 필요한 **메모리를 할당하는 것.**

<br><br>

## Class: Method 정의 및 호출

```kotlin
class SmartDevice { // class declaration. data type.  
    fun turnOn() { // member function == method  
        println("Smart device is turned on.")  
    }  
  
    fun turnOff() { // member function == method  
        println("Smart device is turned off.")  
    }  
}  
  
fun main() {  
    val smartTV = SmartDevice() // constructor, class instance = object  
  
    // method 호출  
    smartTV.turnOn()  
    smartTV.turnOff()  
}
```

> **Method 호출 형식** <br>
> - **classObject . methodName([Optional] Arguments)**
- Dot( . ) Notation 을 사용하여 Class 를 참조.
- 해당 Class 내부의 Method 들을 사용할 수 있다.

<br><br>

## Class 의 Property (속성)

> **Class 의 Property. 즉 속성을 정의 가능.**
> - val (불가변 속성)
> - var (가변 속성)
>
> **Class Instance 의 데이터 타입은 Class. (Class Name 과 동일)**

```kotlin
class SmartDevice {  
    // Class's Property (클래스의 속성)  
    val name = "Android TV"  
    val category = "Entertainment"  
    var status = "online" // 변경 가능 변수  
  
    // Class's Methods  
    fun turnOn() {  
        println("Smart device is turned on.")  
    }  
    fun turnOff() { // member function == method  
        println("Smart device is turned off.")  
    }  
}  
  
fun main() {  
    // constructor, class instance = object  
    val smartTV = SmartDevice()  
  
    // 클래스의 메소드 호출  
    smartTV.turnOn()  
    smartTV.turnOff()  
  
    // 클래스의 속성 호출  
    println("Device name is = ${smartTV.name}")  
}
```

<br><br>

## Class 속성 초기화
> **가장 중요한 것은 `속성`**
> - Class 의 속성 값을 초기화 하는 과정 중요.

### 1. 하드 코딩 (Without Constructor)

```kotlin 
class Person {  
    // 3개 Properties 속성 초기화  
    var name: String = "Chae"  
    var age: Int = 26  
    var isMarried: Boolean = false  
  
    fun getName() = println("The name is $name.")  
}  
  
fun main() {  
    val chae = Person()  
    chae.getName()  
    println("${chae.age}, ${chae.isMarried}")  
}
```

- 위와 같이 **하드 코딩을 통해 Class의 속성을 초기화 할 수도 있지만, 이는 클래스의 재사용성이 떨어지므로 권하지 않는 방법**이다.
- 대신 아래와 같이 **Constructor 를 사용한 Class의 속성을 초기화 하는 방법을 사용하도록 하자.**

<br><br>

### 2. Constructor 사용
#### 2-1. Secondary Constructor (보조 생성자)
```kotlin  
class Person {  
    // 3개 Properties 속성 선언. (초기화 x)
    var name: String  
    var age: Int  
    var isMarried: Boolean  
  
    // secondary constructor.  
    // Secondary constructor 에 전달되는 Parameter 이름과 class 속성 이름을 다르게 지정하면  
    // 둘 사이의 구분이 되므로 this. 을 생략할 수 있게 된다. (this 는 현재 객체를 나타냄) 
    constructor(_name: String, _age: Int, _isMarried: Boolean) {  
//        this.name = _name  
//        this.age = _age  
//        this.isMarried = _isMarried  
        name = _name  
        age = _age  
        isMarried = _isMarried  
    }  
  
    // secondary constructor 는  인자 값을 다르게 주어 여러 개 생성 가능.  
    constructor(_name: String, _age: Int) {  
	    name = _name
        age = _age  
        isMarried = true // 속성에 default 값으로 true를 할당. (Parameter 에서 제거)
    }  

    fun getName() = println("The name is $name.")  
}  
  
fun main() {  
    // 첫번째 Constructor 사용 (Parameter 3개)  
    val chae = Person("Chae", 26, false)  
  
    // 두번째 Constructor 사용 (Parameter 2개)
    val kim = Person("Kim", 27)
  
    chae.getName()  
    println("${chae.age}, ${chae.isMarried}")  
}
```

> **형식**
> - **`constructor(클래스의 속성) { 속성 1, 속성 2, ... 속성 n 초기화 }`**
>
> **특징**
> - **Secondary Constructor 는 여러 개 생성 가능.**
>   - 각 constructor 에 전달되는 **속성 parameter 가 서로 다른 경우**에만.
> - **속성 Parameter 를 사용하지 않고 constructor 내부에서 default 값 설정 가능.**
> - constructor 의 **속성 Parameter 이름과 class 의 속성 이름이 다른 경우** **`this.` 생략 가능.**
>   - `this` : 현재 속해 있는 Class.

<br><br>

#### 2-2. Primary Constructor (주 생성자)

```kotlin
// Primary constructor - class 생성 시에 class 속성을 함께 선언  
class Person(var name: String,  
		     var age: Int,  
		     var isMarried: Boolean) {  
    // method 는 Class body 내부에 작성해야 함.  
    fun getName() = println("The name is $name.")  
}
```

> **형식**
> - `class (class 이름) constructor (class 속성 선언) { method1, method2 ... }`
>   - `constructor` 는 생략 가능.
>
> **특징**
> - **Class 속성을 ( ) 안에 넣어 선언. (함수의 형식 인자 처럼)**
>   - `constructor` keyword 는 생략 가능.
> - **객체가 생성될 때 Primary constructor 호출.**
>   - **Parameter 순서대로** Class 의 Property **초기값이 할당**됨.
> - **var, val 및 접근 제어자 (Private, Protected ...) 사용**
>   - 형식 인자가 아닌 Class 의 속성을 나타내기 때문에.
>   - 생략 시 Default 는 Public.

<br><br>

**init block**
```kotlin
class Person(var name: String,  
             var age: Int,  
             var isMarried: Boolean) {  
    // init block 을 사용.
    // constructor 실행 시 제일 먼저 실행됨.
    init {  
        println("Beginning of init block")  
        println("이름=$name, 나이=$age")  
        println("End of init block")  
    }  
    
    // method 는 Class body 내부에 작성해야 함.  
    fun getName() = println("The name is $name.")  
}
```
> - Primary constructor 는 Property 를 초기화 하는 역할.
> - **Property 초기화가 아닌 다른 작업을 위한 코드를 추가하려면 init block 이 필요.**

<br><br>

#### 2-3. Primary constructor & Secondary constructor 함께 사용하기

> **[주의!!] 주 생성자와 보조 생성자를 함께 사용하는 경우**
> - **주 생성자를 보조 생성자에서 `:this` 를 통해 꼭 선언** 해주어야 한다.

```kotlin
// Primary constructor
class Person(var name: String,  
             var age: Int,  
             var isMarried: Boolean) { 
    // 주 생성자에서 초기화 되지 않은 속성. 빈 문자열로 초기화. 
    var nickName: String = ""  
    init {  
        println("Beginning of init block")  
        println("이름=$name, 나이=$age")  
        println("End of init block")  
    }  
  
    // nickName 속성을 위한 Secondary constructor 생성  
    // 4개의 속성 중 주 생성자에서 이미 초기화 된 속성은 그대로 사용. (= :this(_name, _age, _isMarried)  
    // 주 생성자에서 초기화 되지 않은 nickName 속성은 아래의 보조 생성자에서 추가적으로 초기화.  
    constructor(_name:String, _age:Int, _isMarried:Boolean, _nickName:String)  
            :this(_name, _age, _isMarried) { // 주 생성자의 도움을 받아 주 생성자와 동일하게 초기화 할 것  
        this.nickName = _nickName  // 추가 속성 초기화
    }   
}

fun main() {  
    // 첫번째 Constructor 사용 (Parameter 3개)  
    val chae = Person("Chae", 26, false, "CarefreeLife")  
    println("${chae.name}, ${chae.age}, ${chae.isMarried}, ${chae.nickName}")   
}
```

> **주 생성자에서 초기화 되지 않는 Class 내부에 새로운 속성을 추가한 경우**
> - Secondary constructor (보조 생성자) 생성
> - **[필수]** 주 생성자에서 초기화 된 속성들은 `:this` 사용하여 그대로 사용 가능
>   - **`constructor(주 생성자에서 이미 초기화 된 속성들:타입): this(주 생성자에서 이미 초기화 된 속성들) { 새로 추가된 속성 초기화 }`**

**실행 결과**
![path](/assets/images/INU/Kotlin/kotlinclass.png)

<br><br>

## Class 속성: Getter & Setter
> Property (속성) : 클래스의 멤버 변수
> - 값(Value) 또는 상태(State) 를 저장할 수 있는 필드.
> - Getter 와 Setter 메서드를 자동 생성.
>   - **`val` 로 선언한 Property**
>     - **`Getter` 자동 생성 (Read-Only)**
>   - `var` 로 선언한 Property
>     - **`Getter 와 Setter` 자동 생성 (Read & Writable)**
>     - 읽기 및 변경 가능
- **`Kotlin` 에서는  `val & var` 로 선언된 모든 것에 대해 `getter & setter` 를 자동 생성 해준다!!!**

<br><br>

### Getter & Setter 기본
```kotlin
class Rectangle(val shape: String, // Only getter  
                var height: Int, // getter + setter  
                var width: Int) // getter + setter  
  
fun main() {  
    val rect = Rectangle("Rectangle", 30, 30)  
    rect.height = 40 // setter 호출한 것  
    rect.width = 40 // setter 호출한 것  
    println("${rect.shape}, ${rect.width}, ${rect.height}") // getter 호출한 것 
}
```
> **기본적으로 Kotlin 에서는 val, var 에 따라 적절한 getter 및 setter 를 생성해준다.**
> - 따라서 특별하게 정의하지 않더라도 getter 및 setter 를 사용할 수 있었던 것.
> - 수동 정의 가능.

<br><br>

### Getter & Setter 수동으로 정의하기
```kotlin
class Rectangle(_shape: String,  
                _height: Int,  
                _width: Int) {  
  
    // getter & setter 정의  
    val shape: String = _shape  
        get() = field // 여기서 field 는 _shape property 를 가리킴.  
  
    var height: Int = _height  
        get() = field  
        set(value) {  
            field = value // 여기서 field 는 height
        }  
  
    var width: Int = _width  
        get() = field  
        set(value) {  
            field = value // 여기서 field 는 width  
        }  
}
```
- 위처럼 정의하지 않더라도 val & var 지정이 되어있다면 자동으로 getter & setter 이 정의되어 사용 가능.

<br><br>

## Scope Function (범위 함수) - with, apply
```kotlin
class PersonScopeFunc (var name:String,  
                       var age:Int,  
                       var isMarried:Boolean)  
  
fun main() {  
    val chae: PersonScopeFunc = PersonScopeFunc("Chae", 26, false)  
  
    // 객체에 scope 함수를 사용하게 되면 해당 중괄호 내부는 객체 참조를 하고 있는 상태가 된다.  
    // 따라서 this. 와 같은 메소드를 사용하지 않아도 해당 객체를 참조할 수 있게 된다.  
    chae.apply {  
        // this.name, this.age 대신 직접 class 의 property 를 사용하는 모습.  
        println("$name $age $isMarried")  
    }  
    with(chae) {  
        // this.name, this.age 대신 직접 class 의 property 를 사용하는 모습.  
        println("$name $age $isMarried")  
    }  
}
```

> Kotlin의 `apply`와 `with` 함수는 객체의 컨텍스트 내에서 코드 블록을 실행하는 데 사용.<br>
> 이 두 함수는 비슷한 목적을 가지고 있지만 다소 다른 사용 사례가 있다.

1. **`apply` 함수:**
    - **객체의 속성을 수정하거나 설정할 때 유용.**
    - **객체를 이용해 작업하면서 동시에 객체를 반환**
    - 주로 객체 초기화 블록과 함께 사용.
   
   예제:
   ```kotlin
   val person = Person()
   person.apply {
       name = "Chae"
       age = 26
   }.doSomethingElse() // 다른 메서드를 연속적으로 호출할 수 있음
   ```
   <br><br>
2. **`with` 함수:**
    - **특정 객체의 컨텍스트 내에서 작업**할 때 사용.
    - 특정 객체의 **메서드를 호출하거나 속성을 읽어올 때 편리.**
    - **마지막 표현식의 결과를 반환.**

   예제:
   ```kotlin
   val person = Person()
   val result = with(person) {
       name = "Chae"
       age = 26
       // 여기에서 다양한 작업 수행
       "Result of some operation" // 마지막 표현식의 결과를 반환
   }
   ```

간단히 말해서,
- `apply`는 **객체의 속성 설정 및 해당 객체를 반환.**
- `with`는 **특정 객체의 컨텍스트 내에서 코드 블록을 실행하고 마지막 표현식의 결과를 반환.**

<br><br>

[처음으로~](#){: .btn .btn--primary }

### Task Lists

>

- [x] 생성자
- [x] Class 선언 및 호출
- [x] Class: Method 정의 및 호출
- [x] Class 의 Property (속성)
- [x] Class 속성 초기화
- [x] Class 속성: Getter & Setter
- [x] Scope Function (범위 함수) - with, apply
