---
title: "Kotlin - 함수 & Lambda Expression"
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

# 함수의 형식
## 기본 형식
```kotlin
fun 함수이름(형식 인자 이름 : 인자 타입(Int..)): 반환 타입(Int..) {
	// Method Body
	return _
} 

// 반환값이 없는 경우 -> 반환 타입에 Unit (생략 가능)
fun carefreeLife(length: Int, breadth: Int): Unit {
	print(length * breadth)
}
```
### 예시
```kotlin
fun add(a: Int, b: Int): Int { // formal parameters 
    return a + b  
}

fun main() { // Top-level Function  
    val res = Function().add(3, 5)  // Actual arguments
    print(res)  
}
```
## 간단한 함수인 경우 - 수식처럼 사용 가능
```kotlin
// 아래와 같이 함수의 Return 값을 직접 할당 할 수 있다.
// 마치 함수가 변수인 것처럼 사용 가능.
fun add(a: Int, b: Int) = a + b

fun max(a: Int, b: Int) = if(a > b) a else b
```
- 간단한 로직을 가진 함수인 경우
	- **함수의 반환 타입 생략 가능** (두 개의 형식 인자가 같은 Type을 가졌으므로)
	- **함수의 반환 값을 중괄호 및 Return 문 사용 없이 설정 가능.**

## Named Parameters
```kotlin
// function.kt
fun findVolume(length: Int, width: Int, height: Int = 10) = length * width * height

// main.kt
import function.Function  
fun main() { // Top-level Function  
    println(Function().findVolume(2,3))  
    println(Function().findVolume(2,3, 30)) // 실 매개변수 (Actual Parameter) 
    print(Function().findVolume(width = 20, length = 10))  // 실 매개변수의 순서를 바꿔 함수 사용
    print(Function().findVolume(height = 30, length = 10, width = 10))
}
```
- 함수에 지정된 **매개 변수의 입력 순서를 Custom** 하여 사용 할 수 있다.
	- **해당 함수에 실 매개 변수 입력 시 매개 변수의 이름을 지정하여 입력.**
- 매개 변수의 **Default 값 지정 가능.**
	- 함수 호출 시 **Default 로 지정된 Parameter 를 생략하게 되면 Default 값이 자동 삽입**됨.

## Functions with Various Arguments
```kotlin
// function.kt

// 가변 인자 : 인자의 개수가 변할 수 있다.  
// 여러 개의 인자가 입력될 수 있으므로 배열로서 구현됨.  
fun addWithVararg(vararg values: Int): Int {  
    var sum = 0  
    for (e in values) {  
        sum += e  
    }  
    return sum  
}

// main.kt
fun main() { // Top-level Function  
    println(function.Function().addWithVararg(1, 2, 3, 4))  
    println(function.Function().addWithVararg(1, 2, 3, 4, 5, 6, 7))  
}
```

# Lambda 식과 고차 함수
## 함수형  프로그래밍 (Functional Programming)
```kotlin
// Lambda 식 예시
val add = {x: Int, y: Int -> x + y}
```

> 모든 코드를 순수 함수로 작성하여 프로그램의 부작용 (side effect) 을 해결하려는 프로그래밍 기법	 
>
> - **순수 함수 (Pure Function)**
> 	- 같은 Parameter 에 대하여 항상 같은 값을 반환.
> 	- 함수 바깥의 어떤 상태도 바꾸지 않음.
> - **일급 함수 (First Class Citizen)**
> 	- **람다 식 (Lambda Expression)** 은 일급 함수
> 		- 일급 객체는 함수의 parameter 로 전달할 수 있다. (Actual Argument)
> 		- 일급 객체는 함수의 Return 값에 사용할 수 있다.
> 		- 일급 객체는 변수에 저장 할 수 있다.
> - **고차 함수 (High Order Function)**
> 	- 다른 함수를 Parameter 로 사용하거나 함수를 Return 값으로 반환

## 람다 식 (Lambda Expression)
```kotlin
// 변수   변수 타입               람다식{람다 식의 형식인자 -> 람다 식의 본문}  
val add: (Int, Int) -> Int = {x: Int, y: Int -> x + y}
println(add(1, 2))

// 람다 식의 형식인자에 Type이 선언되어 있으므로 변수 타입, 리턴 타입 생략 가능
val add2 = {x: Int, y: Int -> x + y}  

// 변수 타입, 리턴 타입이 선언되어 있으므로 람다 식(형식 인자)의 타입 생략 가능.
val add3: (Int, Int) -> Int = {x, y -> x + y}
```
- **람다 식 : Function with no name**
	- **변수에 람다 식을 할당**
	- 구성:
		- **`val (변수): (변수 타입) -> (리턴 타입) = {람다 식의 형식인자 -> 람다 식 본문**}`

### (Lambda) 변수에 함수 저장
```kotlin
// 일반적인 표현
fun main() { // Top-level Function  
	// 함수를 값으로 참조할 때 함수 참조 연산자(::) 를 사용. 
    val addFunction = ::add
    addFunction()
}  
  
fun add() {
    println("General Function")  
}


// Lambda 식 표현
fun main() { // Top-level Function  
  
    val addFunction = add

	// 같은 동작을 실행
    addFunction()
    add()
}

// 함수가 아닌 변수로서 직접 할당
// 
val add: () -> Unit = {  
    println("Lambda Expression")
}
```

### (Lambda) 함수를 Data Type 으로 사용
```kotlin
// Lambda 식 표현  
fun main() { // Top-level Function  
  
    val addFunction = add  
  
    // 같은 동작을 실행  
    addFunction()  
    add()  
  
    val subFunction = sub  
    subFunction()  
    sub()  
}  
  
val add = {  
    println("Lambda Expression")  
}   

// Parameter 없음: () -> 반환 타입 없음: Unit
val sub: () -> Unit = {  
    println("Subtract Operation")  
}
```

### (Lambda) 함수를 Return Type 으로 사용
```kotlin
// function2_lambda
val add: () -> Unit = {  
    println("Add Operation")  
}  
  
val sub: () -> Unit = {  
    println("Subtract Operation")  
}  
  
fun addOrSubtract(flag: Boolean): () -> Unit {  
    if (flag) {  
        return add  
    } else {  
        return sub  
    }  
}

// main.kt
fun main() {  
    val addFunction = function2_Lamda().addOrSubtract(true)  
    val subFunction = function2_Lamda().addOrSubtract(false)  
  
    addFunction()  
    subFunction()  
}
```

### (Lambda) 함수를 다른 함수의 인자로 전달
```kotlin
// function2_lambda()
val add: () -> Unit = { println("Add Operation") }  
val sub: () -> Unit = { println("Subtract Operation") }  

// 3. Parameter 로 전달된 Lambda 식을 함수 내부에서 사용.
fun addOrSubtract(flag: Boolean, x:Int, y:Int, op:(Int, Int) -> String) {  
    if (flag) {  
        add()  
        println(op(x, y))  
    }  
    else {  
        sub()  
        println(op(x, y))  
    }  
}

// main.kt
import function.function2_Lamda  
  
fun main() {  
	
	// 1. Lambda 함수를 변수로서 생성
    val addOp: (Int, Int) -> String = {a, b ->  
        "$a + $b = ${a + b}"  
    }  
    val subOp: (Int, Int) -> String = {a, b ->  
        "$a - $b = ${a - b}"  
    }  
	
	// 2. 변수가 된 Lambda 식을 다른 함수의 인자로서 전달
    function2_Lamda().addOrSubtract(true, 2, 3, addOp)  
    function2_Lamda().addOrSubtract(false, 6, 4, subOp)  
}
```

![path](/assets/images/INU/Kotlin/kotlinFunction.png)
- 위와 같이 Lamda 함수로서 변수를 생성하고 해당 Lambda 식을 변수로서 함수의 인자로 전달하여 사용 할 수 있다.


# 익명 함수 (Anonymous Functions)
> **Anonymous Function 역시 이름이 없는 함수이다.**
> 	- Lambda Expression 과 비슷하지만 익명 함수는 **일반 함수이기 때문에 제어 문장 (return, break, continue) 을 사용할 수 있다.**

```kotlin
fun main() {  
    // fun(a, b) = a + b "익명 함수"  
    val add: (Int, Int) -> Int = fun(a:Int, b:Int): Int = a + b  
  
    // Lambda Expression  
    val add2 = {a: Int, b: Int -> a + b}  
  
    println(add(10, 2))  
    println(add2(10, 2))  
}
```


# Inline Functions
> **Inline Functions : 코드를 복사하여 함수를 구현**
> 	- Inline Function을 호출하는 곳에 함수 본문 내용을 그대로 복사.
> 		- 메모리 사용량 증가
> 	- Lambda Expression 과 같은 형태의 매개변수 사용
> 	- **일반 함수보다 빨리 처리되기 때문에 성능 향상**
> 		- Inline Function 은 Stack과 같은 과정을 거치지 않음.
> 	- **Inline Function 내부 코드는 짧아야 하며, 잦은 사용은 지양 할 것.**

```kotlin
fun main() {  
    println(add(2,3))  
    println(add(5,7))  
}  
  
inline fun add(a: Int, b: Int): Int = a + b
```

# 확장 함수 (Extension Functions)
> **확장 함수: Class 에 새로운 함수를 추가 하는 것.**
> 	- Class 내부에 필요로 하는 **함수를 선언하지 않고 추가** 할 수 있다.
> 	- 추가된 확장 함수는 static 으로 동작하게 됨.
> 	- **개발자가 만든 Class** 및 **Kotlin 자체에 존재하는 기존 클래스** (String, Int, Array ... etc) 에 필요로 하는 기능을 추가.
> 	- **코드의 길이 감소 및 가독성 증가의 효과.**

## 사용자 정의 Class 에 확장 함수 추가하기

```kotlin
class Student {  
    fun hasPassed(score: Int): Boolean {  
        return score > 60  
    }  
  
    // 직접 클래스 내부에 선언하지 않고 확장 함수로 추가 가능  
    //    fun isScholar(score: Int): Boolean {  
    //        return score > 90    //    }
}  
  
// 확장 함수 추가 
// fun (추가할 클래스).(확장 함수 이름) { 확장 함수 코드 }
fun Student.isScholar(score: Int): Boolean {  
    return score > 90  
}  
  
fun main() {  
	// Create an Instance of the Class Student
    val Chae = Student()
    println("Pass status: ${Chae.hasPassed(88)}") 
  
    // Extension function 사용  
    println("Scholarship status: ${Chae.isScholar(95)}")  
}
```

## Predefined Class 에 확장 함수 추가하기
```kotlin
// Predefined Class 인 "String" Class 에 "add" 확장 함수 추가.
fun String.add(s1: String): String {
    // this : add 메소드를 호출한 객체인 "String" 을 나타냄.  
    return this + s1  
}  
  
fun extensionFunc() {  
    val s: String = "Hello, "  
    val s1: String = "Kotlin!"  
    println(s.add(s1))  
}
```



<br><br>

지식 공유 및 기록을 위한 Kotlin 개인 학습 포스트입니다.
피드백은 항상 환영합니다!
긴 글 읽어주셔서 감사합니다.
{: .notice--success}
{: style="text-align: center;"}

<br><br>

[처음으로~](#){: .btn .btn--primary }

### Task Lists

>

- [x] 함수의 형식
- [x] 기본 형식
- [x] 간단한 함수인 경우 - 수식처럼 사용 가능
- [x] Named Parameters
- [x] Functions with Various Arguments
- [x] Lambda 식과 고차 함수
- [x] 함수형  프로그래밍 (Functional Programming)
- [x] 람다 식 (Lambda Expression)
- [x] 익명 함수 (Anonymous Functions)
- [x] Inline Functions
- [x] 확장 함수 (Extension Functions)