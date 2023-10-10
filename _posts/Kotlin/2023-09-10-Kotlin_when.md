---
title: "Kotlin - When 문, enum class, When as Expression & 반복문"
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

# When
> When 문 사용 시 조건식에 사용된 변수의 모든 경우의 수를 나열해주어야 함.
- 만약 **너무 많은 경우의 수 발생 시**
	- else 사용 가능.
	- **else 문을 사용**하여 명시된 **조건에 맞지 않는 모든 경우를 else 문에서 소모** 할 수 있다.
- 잦은 오류가 발생하는 **Break 문 자체를 제거하여** 원활한 Case 문 사용 가능.

<br><br>

## Enum Class
> **Enum** 
> - enumeration : 나열 (비슷한 성질 끼리). **Top-level Class**
> - **비슷한 성질 끼리 클래스 단위로 Grouping 하는 것.**
> - **코드의 가독성을 증가 시킬 수 있다.**

```kotlin
// enumeration : 나열 (비슷한 성질 끼리). Top-level Class  
enum class DayOfWeak {  
    // 비슷한 성질 끼리 클래스 단위로 그룹핑  
    SUN, MON, TUE, WED, THU, FRI, SAT  
}

fun When() {  
  
        // class 는 곧 Type 이다. (Primitive Type 이 아닌 사용자 정의 Type)        val s: DayOfWeak = SUN  
  
    when (s) {  
  
            SUN -> println("일요일")  
            MON -> println("월요일")  
            TUE -> println("화요일")  
            WED -> println("수요일")  
            THU -> println("목요일")  
            FRI -> println("금요일")  
            else -> println("토요일")  
			// SAT -> println("토요일")
    }
  
	// when expression  
	val t = when (s) {  
		MON, TUE, WED, THU, FRI -> "Week Day"  
		SUN, SAT -> "Week End"  
	}  

	println("When Expression = $t")  


	if (s == SUN) println("일요일") // Mutually Exclusive  
	else if (s == MON) println("월요일")  
	else if (s == TUE) println("화요일")  
	else if (s == WED) println("수요일")  
	else if (s == THU) println("목요일")  
	else if (s == FRI) println("금요일")  
	else println("토요일")  
//        else if (s == "SAT") println("토요일")  
}
```

<br><br>

## When  as Expression
```kotlin
// when expression  
val t = when (s) {  
    MON, TUE, WED, THU, FRI -> "Week Day"  
    SUN, SAT -> "Week End"  
}  
  
println("When Expression = $t")
```
- **when 문의 반환 결과를 직접 변수에 할당 할 수 있다.**

<br><br>

# For
> **step : 증가량**
> **downTo : 역순 실행**

```kotlin
// 일반적인 for 문
for (i in 1..10 step 3) {
	print("$i ")
}

// downTo & step
for (i in 10 downTo  1 step 2) {  
    print("$i ")  
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

- [x] When
- [x] Enum Class
- [x] When  as Expression
- [x] For
