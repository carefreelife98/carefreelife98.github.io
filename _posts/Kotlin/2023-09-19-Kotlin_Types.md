---
title: "Kotlin - val, var, const val 및 Basic Types"
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

# Kotlin - val, var, const val 및 Basic Types

```kotlin
	class Person(val name:String, val age:Int)  
	  
	// kotlin = multi paradigm programming language. 다중 패러다임 언어.  
	// 함수형 언어 + 객체 지향 언어  
	  
	// c(명령형 언어), c++(객체 지향형 언어)  
	  
	fun main(){ // function. 함수. entry point(진입점).  
		// 함수의 Body(몸체). block=compound statements(복문)  
		val chae = Person("Chae", 25) // on instance of the class Person  
		val park = Person("Park", 26) // on instance of the class Person  
		println(chae.age)  
		println(park.age)  
	//    println(PI)  
	//    println(abs(-12.7)) //절대값 |-12.7| = 12.7//    println("Hello World!")  
	}
```

# val, var, const val
- **val (value) : Immutable variables (Read-Only Variables)**
	```kotlin
val a: Int = 1 //(직접 할당)
val b = 2 // 'Int' Type 자동 참조
val c: Int // 변수가 초기화 되지 않을 때에는 Type 선언 필요
c = 3 // 선언 이후 값의 할당
	```
- **var (variable) : Mutable variables (Writeable variables)**
	```kotlin
var x = 5 // 'Int' Type 자동 참조
x += 1
	```
- **const var : 전역 상수 (Immutable) - 함수 내에서 지역 변수로서 사용 불가능**
```kotlin
	const val MY_KEY = 1234 // 타입 생략
	const val MY_KEY:Int = 1234
	
	fun main(){
		// ...
	}
``` 

# Basic Types of Kotlin
- **숫자**
	- Int
	- Float, Double

- **문자, 문자열**
	- Char, String

- **Boolean**
	- true
	- false

- **Any: 모든 Type 과 호환**

- **Number: 모든 숫자 Type 과 호환**

## Basic Types : Number
> **Number** : Kotlin type은 **첫 글자가 대문자.**
- `Double(64)`, `Float(32)`
- `Long(64)`,` Int(32)`, `Short(16)`, `Byte(8)`

- **상수(Literal Constants)**
	- `Double` : 123.5, 123.5e10
	- `Float` : 123.5**F**, 123.5**F**
	- `Long` : 123**L**
	- `Hexadecimals` : 0x0F
	- `Binaries` : 0b00001011

- **형 변환 함수 :** `to + type` -> **`toByte()`**
	- toByte()
	- toShort()
	- toLong()
	- toFloat()
	- toDouble()

- [추가!] U: Unsigned (부호 없음)
	- ULong, UInt, UShort, UByte


## Changing Type : 확대 및 축소
- Number Type 을 크기 순으로 정렬
	- **`Byte -> Short -> Int -> Long -> Float -> Double`**
- **Type 확대 (Widening)** : Int -> Float
- **Type 축소 (Narrowing)** : Float -> Int

```kotlin
package number  
  
class Number {  
    fun number(){  
        val b = 980116  
        val i:Byte = b.toByte()  
        println("${b.toString(2)}, ${b.toString(16)}, $i")  
  
        val f = i.toFloat()  
        println("int $i becomes Float $f")  
    }  
}
```
 
![path](/assets/images/INU/Kotlin/kotlinType1.png)

## Quiz 1
```kotlin
// 다음 코드에서 에러가 발생하는 원인을 찾으시오.

fun quiz_1(){  
    val f = 3.14f  
    val d = 2.718  
  
    val s:Short = f.toShort()
    val b:Byte = d.toByte() 
}
```
- 에러 발생 원인
  	![path](/assets/images/INU/Kotlin/kotlinType2.png)
	- Int 로 먼저 형변환 해줘야 함.

## Numbers 예시 
### 예시 1
```kotlin
class NumbersEx {
    fun ex1() {
        println("Byte: MIN_VALUE=${Byte.MIN_VALUE}, MAX-VALUE=${Byte.MAX_VALUE}")
//        println(Byte.MAX_VALUE)  
//        println(Byte.MIN_VALUE) 
    }
}
```
- println 내부에 `${}` 를 사용하여 변수를 넣어 한번에 출력할 수 있다.
- **Byte Type**은 `MIN_VALUE` 와 `MAX_VALUE` 가 존재한다.
	- **Byte.MAX_VALUE = `127`**
	- **Byte.MIN_VALUE = `-128`**

### 예시 2
```kotlin
fun ex2ChangeType(){  
    val b = 0b011111  
    val i2b:Byte = b.toByte()  
    println("2진수 변환=${i2b.toString(2)}, 16진수 변환=${i2b.toString(16)}") // 2진수, 16진수 변환 한번에 출력  
//  println(i2b.toString(16)) //16진수  
}
```
- `변수 이름 + : + 변수 Type` 을 통해 **변수의 타입을 직접 지정**할 수 있다.
- `Byte 변환 후 toString(int)` 메소드를 통해 **진수 변환**이 가능하다.
    ![path](/assets/images/INU/Kotlin/kotlinType3.png)
    ![path](/assets/images/INU/Kotlin/kotlinType4.png)

### 예시 3
```kotlin
fun ex3typeCheck(v:Any){ // 형식 인자에는 val & var를 지정하지 않는다.  
    when (v){ // Java 의 Switch-Case 와 비슷함. Break 존재하지 않는다.  
        is Short -> println("The Type od $v is Short.")  
        is Int -> println("The Type od $v is Int.")  
        is Float -> println("The Type od $v is Float.")  
        is Double -> println("The Type od $v is Double.")  
  
        else -> println("unknown type")  
    }  
}

//Main.kt
val f = 2.56f  
val d = 28.56  
val s:Short = 23  
var i = 12  
  
NumbersEx().ex3typeCheck(f) // 실 인자. actual argument  
NumbersEx().ex3typeCheck(d) // 실 인자. actual argument  
NumbersEx().ex3typeCheck(s) // 실 인자. actual argument  
NumbersEx().ex3typeCheck(i) // 실 인자. actual argument  
NumbersEx().ex3typeCheck("Hello")
```
![path](/assets/images/INU/Kotlin/kotlinType5.png)
- `Any` : **모든 형식의 인자를 수용함.**
- `when-is-else` : **Java 의 Switch-Case** 문과 비슷.
	- Break문을 없애어 잦은 오류를 해결함.

## Basic Types : Char
> **Char Type 변수는 `""` 로 묶은 문자만 할당 할 수 있음.**
- ASCII 코드에 해당하는 숫자를 할당할 경우 에러가 발생함.
	- `toChar()` 을 적용하여 **Char Type으로 변환해야 함.**

### 예시 1
```kotlin
fun char(){  
    val code:Int = 65 // 문자 'A'의 ASCII Code    val hanCodeFirst:Char = '\uac00' // UNICode - 첫 번째 한글 음절 '가'  
    val hanCodeLast:Char = '\ud7a3' // UNICode - 마지막 한글 음절 '힣'  
  
    println("${code.toChar()}, ${(code+1).toChar()}") // A, B  
    println("$hanCodeFirst, $hanCodeLast") // '가', '힣'  
}
```
- `toChar()` 메소드를 통해 Int 형 데이터를 해당 ASCII 코드의 문자로 변환 할 수 있다.
- 한글은 `Char = ''` 으로 선언함으로서 `UniCode 변환`을 통해 사용할 수 있다.

### 예시 2
```kotlin
fun char1(){  
  
    for (i in 48..60){  
        val c = i.toChar()  
        if (c.isDigit()) print(c)  
        else print ('*')  
    }    
    println()  
  
    for (i in 65..90) {  
        print("${i.toChar()} ")  
    }  
    println()  
}
```
![path](/assets/images/INU/Kotlin/kotlinType6.png)
- Kotlin 에서의 For 문은 `for (i in 0..10) {}`  과 같이 사용 가능하며 이때 `시작값과 끝 값은 i에 포함`된다.
- `isDigit()`
	- 해당 값이 숫자인지를 판별. (True, False) 반환

### 예시 3 (중요)
```kotlin
fun char_warn(){  
//        println('0'.toInt()) // Deprecated 됨.  
    println('0'.code) // 해당 숫자가 아닌 숫자의 ASCII Code 를 출력함.  
    println('0'.digitToInt()) // 대안  
}
```
![path](/assets/images/INU/Kotlin/kotlinType7.png)
- 기존에 사용하던 `'숫자'.toInt() 메소드는 Deprecated.`
- Intellij 에서 제공하는 대안으로 `'숫자'.code 메소드는 해당 숫자가 아닌 ASCII Code를 반환`해줌.
- **대안**
	- `'숫자'.digitToInt()` 메소드 사용하기.

## Basic Types : Boolean
> **Boolean**
> 값 : `true(참)` , `false(거짓)`
- **논리 연산 기호** : `&&(AND)` , `||(OR)` , `!(NOT)`

```kotlin
class boolean {  
    fun boolean(){  
        var foo: Boolean = true  
        val bar = false  
  
        println(foo && bar)  
        println(foo || bar)  
        println(!foo)  
  
        foo = !foo // toggle : Debug 시 Break Point        println(foo)  
    }  
}
```

## Basic Types : String
> **String (문자열, String of Characters)**
- String 을 구성하는 **특정 위치의 Character 접근하기**
	- `String객체.get(index)`
	- `String객체[index]`
- String 자료구조는 `Immutable(변경 불가, Read-Only)` 함.

### 예시 1 - Indexing, Get()
```kotlin
fun string(){  
    val foo: String = "My First Kotlin"  
    val c: Char = 's'  
  
//        println(foo.length)  
    val size = foo.length  
    println("${foo[0]}, ${foo[size-1]}") // indexing (Kotlin 에서 권장하는 방법)  
//        println("${foo.get(0)}, ${foo.get(size-1)}") // getter  
    for(i in 0 until size)  
        print(foo[i])  
    println()  
}
```
- **String 에 속한 각 Char 에 접근하는 방법**
	- **Indexing (권장)** : `String[index]`
	- getter : `String.get(index)`
- **for (i in 0 until 10)**
	- **범위 :** `0 <= i <10`
	- `i in 0 ..< 10` 으로도 표현 가능.

### 예시 2 - substring(), replace()
```kotlin
fun string2() {  
    val foo: String = "My First Kotlin"  
  
    println(foo[9])  
    println(foo.substring(0, 9) + "Python") // 0 ~ 8 까지  
    println(foo.replace("Kotlin", "C++"))  
}
```
- `.substring(시작, ~이전)` 
	- 해당 문자열을 char 기준으로 범위 지정하여 자른다.
- `.replace("a", "b")`
	- 해당 문자열의 "a" 를 "b" 로 치환한다.

### 예시 3 - Format()
```kotlin
fun string3() {  
    val pi = PI // Double  
    val digit = 10  
    val str = "CarefreeLife"  
    val c = '\uAC00'  
    val length = 3000  
  
    // 서식 지정: .format("String, %(숫자: 출력 시 해당 칸 수 만큼 띄어줌)변수 타입", 변수)  
    println(String.format("길이 = %5d meters", length))  
    // %.4f : 소수점 아래 4 자리수에서 반 올림 하여 해당 자리까지 출력  
    println("%.4f %3d %10s %c".format(pi, digit, str, c))  
}
```
- **.format("%5d", 변수)**
	- 5칸 띄워 Int형 변수를 출력
		- % 뒤의 형식에 따라 해당 자리에 변수값을 삽입.
		- `d: Int` , `f: Float` , `s: String` , `c: Char`
	- **변수의 개수 만큼 %형식이 필요함.**
	- **소수점이 존재하는 형태의 변수 반올림 가능**
		- **%.4f** : 소수점 아래 4자리에서 `반올림 후 해당 자리까지 출력.`

### 예시 4 - Escape Character ( \ )
```kotlin
fun string4() {  
    val amount = "10"  
  
    println("가격은 USD \$ $amount") // escape character \ . 특수 문자 출력  
}
```
- **특수 문자의 출력은 Escape Character 를 사용. ( \ )**
	- `\$` , `\'` ...

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

- [x] Kotlin - val, var, const val 및 Basic Types
- [x] val, var, const val
- [x] Basic Types of Kotlin
- [x] Basic Types : Number
- [x] Changing Type : 확대 및 축소
- [x] Numbers 예시
- [x] Basic Types : Char
- [x] Basic Types : Boolean
- [x] Basic Types : String
- [x] 예시 1 - Indexing, Get()
- [x] 예시 2 - substring(), replace()
- [x] 예시 3 - Format()
- [x] 예시 4 - Escape Character ( \ )