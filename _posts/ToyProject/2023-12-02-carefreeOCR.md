---
title: "[Naver Clova OCR API] Carefree OCR"
categories:
  - toy-project
tags:
  - toy-project
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
   teaser: "/assets/images/Projects/ToyProjects/CarefreeOCR0.png"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# \[Toy Project] Carefree OCR
![path](/assets/images/Projects/ToyProjects/CarefreeOCR0.png)<br>
> 어머니께서 평소 Excel 을 사용하여 작업하시는데, <br>
> **책자 내부에 존재하는 Data 들을 일일히 손으로 Typing 하여 Excel 에 옮기시는 모습이 힘들어 보였다.**
> - **이에 이번 토이 프로젝트 - [Carefree OCR] 을 진행하게 되었다.**

<br><br>

## \[Carefree OCR] Main Idea & Tools
```html
휴대폰의 Camera 를 사용하여 찍은 책자 이미지를 OCR 기술을 이용해서 Web 화면에 띄어준다면, 
해당 Text 만 복사하여 어머니께서 잘 사용하실 수 있을 것.
```
> **[Tools]**
> - **Naver Cloud Platform - Naver Clova OCR API**
> 	- 부분 유료 / API 호출 당 지불
> - **AWS EC2 - t2.micro / Amazon linux 2**
> 	- Tomcat
> - **Github Actions**
> 	- Workflow File
> 	- Github Secrets
> - **Spring Boot 3.1.5**
> 	- Dependency
> 		- implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
> 		- implementation 'org.springframework.boot:spring-boot-starter-web'
> 		- implementation("com.googlecode.json-simple:json-simple:1.1.1")
> 		- compileOnly 'org.projectlombok:lombok'
> 		- annotationProcessor 'org.projectlombok:lombok'
> 		- testImplementation 'org.springframework.boot:spring-boot-starter-test'

<br><br>

## \[Carefree OCR] Project Structure
![path](/assets/images/Projects/ToyProjects/CarefreeOCR1.png)<br>
> 초기 계획은 Docker Hub 에 버전 별 이미지 저장 후 ArgoCD 를 통해 배포할 계획이었으나 AWS ECR / EKS 와 같은 컨테이너 서비스를 사용하자니 비용이 발생함.
> - **Github Actions 를 통해 특정 Tag 를 가진 EC2 에 직접 Application을 Build 하여 Spring Boot 내장 Tomcat 서버에 띄우기로 했다.**
> - Docker Hub 에는 Image 만 Build 후 업로드.
> 	- Project Backup 비슷한 개념으로 사용하기로 했다.

<br><br>

# \[Carefree OCR] Spring boot Application
## Clova OCR API 사용하기
> NCP 자체에서 Sample code 를 제공하고 설명 또한 잘 되어 있어 비슷한 프로젝트를 진행한다면 아래 공식 Document를 참고해도 좋을 것 같다. <br>
> [링크: NCP - Clova OCR](https://guide.ncloud-docs.com/docs/ko/clovaocr-overview)

### /api/NaverOcrApi.java
```java
package carefree.CarefreeOCR.api;  
  
import lombok.extern.slf4j.Slf4j;  
import org.json.simple.JSONArray;  
import org.json.simple.JSONObject;  
import org.json.simple.parser.JSONParser;  
import org.springframework.beans.factory.annotation.Value;  
import org.springframework.stereotype.Component;  
  
import java.io.*;  
import java.net.HttpURLConnection;  
import java.net.URL;  
import java.util.ArrayList;  
import java.util.List;  
import java.util.Map;  
import java.util.UUID;  
  
import static carefree.CarefreeOCR.api.JsonUtils.getListMapFromJsonArray;  
  
@Slf4j  
@Component  
public class NaverOcrApi {  
    @Value("${naver.service.url}")  
    private String url;  
      
    public List<String> callApi(String type, String filePath, String naver_secretKey, String ext) {  
        String apiURL = url;  
        String secretKey = naver_secretKey;  
        String imageFile = filePath;  
        List<String> parseData = null;  
  
        log.info("callApi Start! " + "type:" + type + " file path:" + filePath + " ext:" + ext);  
  
        try {  
            URL url = new URL(apiURL);  
            HttpURLConnection con = (HttpURLConnection)url.openConnection();  
            con.setUseCaches(false);  
            con.setDoInput(true);  
            con.setDoOutput(true);  
            con.setReadTimeout(30000);  
            con.setRequestMethod(type);  
            String boundary = "----" + UUID.randomUUID().toString().replaceAll("-", "");  
            con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);  
            con.setRequestProperty("X-OCR-SECRET", secretKey);  
  
            JSONObject json = new JSONObject();  
            json.put("version", "V2");  
            json.put("requestId", UUID.randomUUID().toString());  
            json.put("timestamp", System.currentTimeMillis());  
//            json.put("enableTableDetection", true);  
            JSONObject image = new JSONObject();  
            image.put("format", ext);  
            image.put("name", "demo");  
            JSONArray images = new JSONArray();  
            images.add(image);  
            json.put("images", images);  
            String postParams = json.toString();  
  
            con.connect();  
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());  
            File file = new File(imageFile);  
            writeMultiPart(wr, postParams, file, boundary);  
            wr.close();  
  
            int responseCode = con.getResponseCode();  
            BufferedReader br;  
            if (responseCode == 200) {  
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));  
            } else {  
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));  
            }  
            String inputLine;  
            StringBuffer response = new StringBuffer();  
            while ((inputLine = br.readLine()) != null) {  
                response.append(inputLine);  
            }  
            br.close();  
  
            parseData = jsonparse(response);  
  
  
        } catch (Exception e) {  
            System.out.println("Error: " + e);  
        }  
        return parseData;  
    }  
          
private static void writeMultiPart(DataOutputStream out, String jsonMessage, File file, String boundary) throws  
            IOException {  
        StringBuilder sb = new StringBuilder();  
        sb.append("--").append(boundary).append("\r\n");  
        sb.append("Content-Disposition:form-data; name=\"message\"\r\n\r\n");  
        sb.append(jsonMessage);  
        sb.append("\r\n");  
  
        out.write(sb.toString().getBytes("UTF-8"));  
        out.flush();  
  
        if (file != null && file.isFile()) {  
            out.write(("--" + boundary + "\r\n").getBytes("UTF-8"));  
            StringBuilder fileString = new StringBuilder();  
            fileString  
                    .append("Content-Disposition:form-data; name=\"file\"; filename=");  
            fileString.append("\"" + file.getName() + "\"\r\n");  
            fileString.append("Content-Type: application/octet-stream\r\n\r\n");  
            out.write(fileString.toString().getBytes("UTF-8"));  
            out.flush();  
  
            try (FileInputStream fis = new FileInputStream(file)) {  
                byte[] buffer = new byte[8192];  
                int count;  
                while ((count = fis.read(buffer)) != -1) {  
                    out.write(buffer, 0, count);  
                }  
                out.write("\r\n".getBytes());  
            }  
  
            out.write(("--" + boundary + "--\r\n").getBytes("UTF-8"));  
        }  
        out.flush();  
    }
    
    // Data 가공 (OCR 결과를 List<String> 형식으로 반환)  
    private static List<String> jsonparse(StringBuffer response) throws org.json.simple.parser.ParseException {  
        //json 파싱  
        JSONParser jp = new JSONParser();  
        JSONObject jobj = (JSONObject) jp.parse(response.toString());  
        //images 배열 obj 화  
        JSONArray JSONArrayPerson = (JSONArray)jobj.get("images");  
        JSONObject JSONObjImage = (JSONObject)JSONArrayPerson.get(0);  
        JSONArray s = (JSONArray) JSONObjImage.get("fields");  
        //  
        List<Map<String, Object>> m = getListMapFromJsonArray(s);  
        List<String> result = new ArrayList<>();  
        for (Map<String, Object> as : m) {  
            result.add((String) as.get("inferText"));  
        }  
  
        return result;  
    }  
}
```

<br><br>

### /api/JsonUtils.java
```java
package carefree.CarefreeOCR.api;  
  
import com.fasterxml.jackson.databind.ObjectMapper;  
import lombok.extern.slf4j.Slf4j;  
import org.json.simple.JSONArray;  
import org.json.simple.JSONObject;  
import org.springframework.util.ObjectUtils;  
  
import java.util.ArrayList;  
import java.util.List;  
import java.util.Map;  
  
@Slf4j  
public class JsonUtils {  
  
    /**  
     * jsonObject --> map 으로 변경  
     * JSONObject 에 JSONArray 없어야 햠.  
     */    
     public static Map<String, Object> getMapFromJSONObject(JSONObject obj) {  
        if (ObjectUtils.isEmpty(obj)) {  
            log.error("BAD REQUEST obj : {}", obj);  
            throw new IllegalArgumentException(String.format("BAD REQUEST obj %s", obj));  
        }  
  
        try {  
            return new ObjectMapper().readValue(obj.toString(), Map.class);  
        } catch (Exception e) {  
            log.error(e.getMessage(), e);  
            throw new RuntimeException(e);  
        }  
    }  
  
    /**  
     * json array 를 list map 으로 변경.  
     *     
     * @return 값이 있으면 list map, 없으면 list 빈 값 return  
     */    
     public static List<Map<String, Object>> getListMapFromJsonArray(JSONArray jsonArray) {  
        if (ObjectUtils.isEmpty(jsonArray)) {  
            log.error("jsonArray is null.");  
            throw new IllegalArgumentException("jsonArray is null");  
        }  
        List<Map<String, Object>> list = new ArrayList<>();  
        for (Object jsonObject : jsonArray) {  
            list.add(getMapFromJSONObject((JSONObject) jsonObject));  
        }  
        return list;  
    }  
}
```

<br><br>

## uploadController 구현
> **Thymeleaf 를 이용해서 List\<String> 형식으로 전달되는 Data 를 HTML 에 간단하게 띄울 예정.**
> - 우편 번호를 기준으로 OCR 결과 Data 를 나누어 출력하는 로직 추가.
> <br><br>
> [참고 블로그: @junsoo1230](https://velog.io/@junsoo1230/Naver-Clova-OCR-API-%EC%82%AC%EC%9A%A9-Spring)

```java
package carefree.CarefreeOCR.controller;  
  
import carefree.CarefreeOCR.api.NaverOcrApi;  
import lombok.RequiredArgsConstructor;  
import lombok.extern.slf4j.Slf4j;  
import org.springframework.beans.factory.annotation.Value;  
import org.springframework.stereotype.Controller;  
import org.springframework.ui.Model;  
import org.springframework.web.bind.annotation.GetMapping;  
import org.springframework.web.bind.annotation.PostMapping;  
import org.springframework.web.bind.annotation.RequestParam;  
import org.springframework.web.multipart.MultipartFile;  
  
import java.io.File;  
import java.io.IOException;  
import java.util.ArrayList;  
import java.util.Iterator;  
import java.util.List;  
import java.util.ListIterator;  
  
@Controller  
@Slf4j  
@RequiredArgsConstructor  
public class uploadController {  
    @Value("${naver.service.secretKey}")  
    private String secretKey;  
    private final NaverOcrApi naverApi;  
  
    // 파일 업로드 폼을 보여주기 위한 GET 요청 핸들러 메서드  
    @GetMapping("/upload-form")  
    public String uploadForm() throws Exception {  
        return "/upload-form"; // HTML 템플릿의 이름을 반환 (upload-form.html)    }  
  
    // 파일 업로드 및 OCR 수행을 위한 POST 요청 핸들러 메서드  
    @PostMapping("/uploadAndOcr")  
    public String uploadAndOcr(@RequestParam("file") MultipartFile file, Model model) throws IOException {  
        if (file.isEmpty()) {  
            return "error"; // 파일이 비어있을 경우 에러를 처리하는 HTML 템플릿으로 이동  
        }  
  
        String naverSecretKey = secretKey; // 본인의 네이버 Clova OCR 시크릿 키로 대체  
  
        File tempFile = File.createTempFile("temp", file.getOriginalFilename());  
        file.transferTo(tempFile);  
  
        List<String> result = naverApi.callApi("POST", tempFile.getPath(), naverSecretKey, "jpeg");  
  
        tempFile.delete(); // 임시 파일 삭제  

		// 우편 번호를 기준으로 OCR 결과 Data를 나누어 출력하는 코드 추가.
        ListIterator<String> iter = result.listIterator();  
        StringBuilder sb = new StringBuilder();  
        ArrayList<String> afterFmt = new ArrayList<>();  
        while (iter.hasNext()) {  
            String text = iter.next();  
            // 우편 번호 이면,  
            if (text.matches("\\(\\d{5}\\)")) {  
                // sb 누적 string 을 ArrayList 에 추가 후 초기화. (우편 번호 제외) 
                if(!sb.isEmpty()) afterFmt.add(String.valueOf(sb));  
                sb.setLength(0);  
            } else {  
                // 우편 번호가 아니면 sb 에 해당 문자열 추가.  
                sb.append(' ').append(text);  
            }  
        }  
  
        model.addAttribute("ocrResult", afterFmt); // OCR 결과를 HTML 템플릿에 전달  
  
        return "ocr-result"; // OCR 결과를 표시하는 HTML 템플릿 이름 반환  
    }  
}
```

<br><br>

## /resources/templates/upload-form.html
```html
<!DOCTYPE html>  
<html lang="en" xmlns:th="http://www.thymeleaf.org">  
<head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>Image Upload and OCR</title>  
</head>  
<body>  
<h1>Image Upload and OCR</h1>  
<form action="/uploadAndOcr" method="post" enctype="multipart/form-data">  
    <input type="file" name="file" accept=".jpg, .jpeg, .png">  
    <button type="submit">Upload and OCR</button>  
</form>  
</body>  
</html>
```
> **특정 확장자를 가진 이미지 파일 (.jpg, .jpeg, .png) 을 Upload 하여 Server 로 전달.**

<br><br>

## /resources/templates/ocr-result.html
```html
<!DOCTYPE html>  
<html lang="en" xmlns:th="http://www.thymeleaf.org">  
<head>  
  <meta charset="UTF-8">  
  <meta name="viewport" content="width=device-width, initial-scale=1.0">  
  <title>Carefree Life's OCR Result</title>  
</head>  
<body>  
<h1>CarefreeLife's OCR 결과</h1>  
<ul>  
  <li th:each="result : ${ocrResult}" th:text="${result}"></li>  
</ul>  
</body>  
</html>
```

<br><br>

# \[Carefree OCR] 완성 모습

> **th:each 를 통해 결과 리스트를 순환하며 결과를 출력.**<br>
> ![path](/assets/images/Projects/ToyProjects/CarefreeOCR2.png)<br>
> - **upload-form 에서 정상적으로 파일을 받아주는 모습.**
>
> <br><br>
> 
> ![path](/assets/images/Projects/ToyProjects/CarefreeOCR3.png)<br>
> - **ocr-result 에서 정상적으로 Clova OCR API 호출 및 결과를 반환해주는 모습.**
>
> <br><br>
> 
> ![path](/assets/images/Projects/ToyProjects/CarefreeOCR4.png)<br>
> - **EC2 log 에서도 프로그램이 잘 동작하고 있는 것을 볼 수 있다.**

```
해당 프로젝트를 진행함으로서 어머니께서 유용하게 잘 사용하시니 뿌듯하다.
이렇듯 실제 삶에서 작지만 편한 도구를 원하는 대로 만들어 사용할 수 있는 점이
개발 분야의 최대 장점이자 재미이지 않을까 싶다. 
```

<br><br>

지식 공유 및 기록을 위한 개인 프로젝트 포스트입니다.
피드백은 항상 환영합니다!
긴 글 읽어주셔서 감사합니다.
{: .notice--success}
{: style="text-align: center;"}

<br><br>

[처음으로~](#){: .btn .btn--primary }

### Task Lists

>

- [x] \[Toy Project] Carefree OCR
- [x] \[CarefreeOCR] Main Idea & Tools
- [x] \[CarefreeOCR] Project Structure
- [x] Clova OCR API 사용하기
- [x] uploadController 구현
