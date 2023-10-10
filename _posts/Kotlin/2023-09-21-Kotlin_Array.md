---
title: "Kotlin - 배열 (Array)"
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

# Array
> **배열(Array) 는 정적인 자료구조.**
> 	- Indexing 가능.
> 
> Kotlin 에서 한 배열 내의 원소 Type에 제한은 없지만 (제한을 걸지 않는 이상) **일반적으로 한 배열에 한 가지의 Type 을 사용**한다.

<br><br>

# One Dimmensional Arrays (1차원 배열)

```kotlin
package arrays  
  
class oneDimensionArrInClass {  
    val arr = arrayOf<Int>(1, 2, 4)  
    val arrBool:Array<Boolean> = arrayOf<Boolean>(true, false, true)  
    val arrChar:Array<Char> = arrayOf<Char>('c', 's', 'm')  
  
    // intArrayOf 사용시 Type 자체도 IntArray 라는 특정 Type을 사용하게 됨.  
    val arr2:IntArray = intArrayOf(3, 4, 5, 6)  
  
    // 마찬가지  
    val arr3:BooleanArray = booleanArrayOf(true, false, false)  
  
    fun lambdaWithArray() {  
        // Lambda 식을 사용한 배열  
        val arr4 = Array<Int>(8, { it -> it * 2 }) // 생성자  
        // val arr4 = Array<Int>(8, { it * 2 }) // Lambda 의 형식 인자 종류가 하나인 경우 생략 가능  
        println(arr4.contentToString())
		
		arr4.forEach { element ->  
		    println("$element")  
		}  
  
		arr4.forEachIndexed { index, element ->  
		    if (element % 2 == 0) {  
		        println("arr[$index] = $element ")  
		    }  
		}
    }  
}
```
- 배열 생성 시 Lambda 식을 활용 할 수 있다.

<br><br>

```kotlin
// oneDimenstionArr.kt
fun oneDimensionArr() {  
    val intArray: Array<Int> = arrayOf(1, 2, 3)  
    var intArray2: IntArray = intArrayOf(4, 5, 6, 7)  
  
    println("${intArray.size}, ${intArray.first()}, ${intArray.last()}")  
    println("${intArray2[0]}, ${intArray2.get(3)}")  
  
    intArray2[2] = 8  
    intArray2.set(3, 9)  
    println("${intArray2.contentToString()}")  
  
    // Lambda 를 활용한 식.  
    val intArray3: Array<Int> = Array(3) {i -> intArray[i]}  
}  
  
fun showElement(arr : IntArray) {  
    for (e in arr) {  
        print("$e ")  
    }  
    println()  
}  
  
fun ForEach() {  
    val intArray: Array<Int> = arrayOf(1, 2, 3)  
    var intArray2: IntArray = intArrayOf(4, 5, 6, 7)  
  
    intArray.forEachIndexed { i, e -> print("intArray[$i] = $e ") }  
    intArray2.forEach { e -> print("$e ") }  
    println()  
}
```

<br><br>

**Methods**
-  **`.size`**
	- 배열의 크기 반환
- **`.first() & .last()`**
	- 배열의 처음과 끝 원소 반환
- **`.forEach()`**
	- 배열의 각 원소를 넘겨준다.

<br><br>

# Iterator
```kotlin
fun iterator() {  
    val intOnlyArray = arrayOf<Int>(1, 2, 3)  
    val intOnlyArray2 = intArrayOf(4, 5, 6, 7)  
  
    intOnlyArray.forEach { element -> print("$element") }  
    println()  
    intOnlyArray2.forEachIndexed { i, e -> println("intOnlyArray2[$i] = $e") }  
  
    val iter: Iterator<Int> = intOnlyArray.iterator()  
    while (iter.hasNext()) {  
        val e = iter.next()  
        print("$e ")  
    }  
    println()  
}
```

<br><br>

# Two Dimension Array

```kotlin
// twoDimensionArr
package arrays  
  
class twoDimensionArr {  
    fun arr2D() {  
        val array1 = arrayOf(1, 2, 3)  
        val array2 = arrayOf(4, 5, 6)  
        val array3 = arrayOf(7, 8, 9)  
  
        val arr2d = arrayOf(array1, array2, array3)  
        for (e1 in arr2d) {  
            for (e2 in e1) {  
                print("$e2")  
            }  
            println()  
        }  
    }  
}
```

```kotlin
// main.kt
fun main() { // Top-level Function  
    arrays.Arrays().oneDimensionArr()  
    var se:IntArray = intArrayOf(9, 8, 0, 1, 1, 6)  
    arrays.Arrays().showElement(se)  
    arrays.Arrays().ForEach()  
    arrays.twoDimensionArr().arr2D()  
}
```

> **Array의 Type 지정 방법**
1. variable1 : **`Array<Type> = arrayOf`**(value1, value2, value3, ...)
2. variable2 : **`(Type)Array = (Type)ArrayOf`**(value1, value2, value3, ...)
	- StringArray 는 존재하지 않는다.

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

- [x] Array
- [x] One Dimmensional Arrays (1차원 배열)
- [x] Iterator
- [x] Two Dimension Array
