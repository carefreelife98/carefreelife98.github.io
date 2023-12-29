---
title: "[Naver Clova OCR API & Google Sheet API] Carefree OCR 2 - 우체국 등기 영수증 / 사업자 등록증 자동 관리 시스템"
categories:
  - toy-project
tags:
  - toy-project
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
   teaser: "/assets/images/Projects/ToyProjects/CarefreeOCR0.png"
youtubeurl: https://youtu.be/ZPrLB_rOsJY
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# 1. Agenda

> 회사에서 **매년 우편물 등기 영수증을 일일히 Excel 에 수작업으로 옮기는 작업**을 하고 있는데, <br>
> 담당자께서 다음과 같은 프로그램이 있다면 편리할 것 같다 하심에 진행한 개인 Toy Project 입니다.
>
> **요구 사항**
> 1. **공통**
> 	- **사진 촬영 / 스캔본 과 같은 각 이미지 파일을 OCR 하여 Text 를 Detect 하고, Google Sheet 에 자동으로 Numbering 되어 입력 되었으면 좋겠다.**
> 	- 여러 장의 이미지 파일을 한번에 Upload 가능해야 한다.
> 2. **등기 영수증 OCR**
> 	- **등기 영수증으로부터 사용할 정보**
> 		- 일자
> 		- 개수
> 		- 등기 번호
> 		- 각 등기 별 배송 조회 링크
> 		- 우편 번호
> 		- 법인 명
> 		- 수신인
> 		- 주소
> 3. **사업자 등록증 OCR**
> 	- **사업자 등록증으로부터 사용할 정보**
> 		- 개수
> 		- 사업자명
> 		- 대표자
> 		- 등록번호
> 		- 주소
> 		- 법인번호
> 		- 업태
> 		- 종목
> 		- 전화번호
> 		- 팩스번호

<br><br>

# 2. 전체 구조 / Architecture
<br><br>
## 2-1. AWS Cloud Infrastructure
> ![path](/assets/images/Projects/ToyProjects/carefreeocrV2_1.png)<br>

<br><br>

## 2-2. Spring Boot Application Structure
> ![path](/assets/images/Projects/ToyProjects/carefreeocrV2_2.png)<br>

<br><br>

## 2-3. 전체 구성도 (Architecture)
> ![path](/assets/images/Projects/ToyProjects/carefreeocrV2_3.png)<br>

<br><br>

# 3. CI / CD Pipeline 구축 (Github Actions / AWS CodeDeploy)
> **개발 및 배포 테스트 과정에서 CI/CD Pipeline 이 구축되어 있으면 매우 편리하므로 항상 개인 프로젝트 시작 전 CI/CD Pipeline 부터 간단하게 구축하고 시작하는 경향이 있습니다.**

<br><br>

## 3-1. Github Actions
> ![path](/assets/images/Projects/ToyProjects/carefreeocrV2_4.png)<br>
> **Github Actions 에서 프로그램에서 사용할 Secret 을 Github secret 을 통해 코드에 삽입하고, Build 된 JAR 파일을 .zip 압축하여 AWS S3 에 저장 후 AWS CodeDeploy 를 실행하여 EC2 에 배포하게 됩니다.**
> - **대부분의 secret 정보가 담겨 있는 application.properties 는 Github Secrets 에 넣어두고 Github Actions 과정에서 Secrets 을 통해 직접 생성하여 사용.**
> - **Google API 를 사용하기 위한 사용자 인증 정보인 JSON 파일**은 Github Secret 에 복붙 후 그냥 꺼내어 사용 시 모든 "" 가 사라짐.
> 	- **따라서 create-json 을 사용하여 생성.**

<br><br>

### Github Actions Workflow File - Deploy.yml

```yaml
name: Deploy to Amazon EC2 - *** registered receipt ocr

on:
  push:
    branches:
      - main

# 리전, 버킷 이름, CodeDeploy 앱 이름, CodeDeploy 배포 그룹 이름
env:
  AWS_REGION: ap-northeast-2
  S3_BUCKET_NAME: ***-registered-receipt-ocr-s3-bucket
  CODE_DEPLOY_APPLICATION_NAME: ***-registered-receipt-ocr
  CODE_DEPLOY_DEPLOYMENT_GROUP_NAME: ***-registered-receipt-ocr-DeployGroup
  PROPERTIES: ${{ secrets.APPLICATIONPROPERTIES }}
  JSON: ${{ secrets.GOOGLE_USER_JSON }}
  
permissions:
  contents: read

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    environment: production

    steps:
    # (1) 기본 체크아웃
    - name: Checkout
      uses: actions/checkout@v3

    # (2) JDK 17 세팅
    - name: Set up JDK 17 & Add application.properties / JSON from Github secrets
      uses: actions/setup-java@v3
      with:
        distribution: 'adopt'
        java-version: '17'

    # Github Secrets 를 통해 application.properties 생성 및 삽입
    - uses: actions/checkout@v2
    - run: touch ./src/main/resources/application.properties
    - run: echo "${{ env.PROPERTIES }}" > ./src/main/resources/application.properties
    
    - uses: actions/upload-artifact@v2
      with:
        name: application.properties
        path: ./src/main/resources/application.properties
    
    # Github Secrets 를 통해 Google API Account 계정 secret 생성 및 삽입
    - name: create-json
      id: create-json
      uses: jsdaniell/create-json@1.1.2
      with:
        name: "***-ocr-6e01aae86a2f.json"
        json: ${{ secrets.GOOGLE_USER_JSON }}
    
    - name: Run chmod to make gradlew executable
      run: chmod +x ./gradlew

    # (3) Gradle build (Test 제외)
    - name: Build with Gradle
      uses: gradle/gradle-build-action@0d13054264b0bb894ded474f08ebb30921341cee
      with:
        arguments: clean build -x test

    # (4) AWS 인증 (IAM 사용자 Access Key, Secret Key 활용)
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.CAREFREE98_ADMIN_AWS_ACCESS_KEY }}
        aws-secret-access-key: ${{ secrets.CAREFREE98_ADMIN_AWS_SECRET_KEY }}
        aws-region: ${{ env.AWS_REGION }}

    # (5) 빌드 결과물을 S3 버킷에 업로드
    - name: Upload to AWS S3
      run: |
        aws deploy push \
          --application-name ${{ env.CODE_DEPLOY_APPLICATION_NAME }} \
          --ignore-hidden-files \
          --s3-location s3://$S3_BUCKET_NAME/$GITHUB_SHA.zip \
          --source .

    # (6) S3 버킷에 있는 파일을 대상으로 CodeDeploy 실행
    - name: Deploy to AWS EC2 from S3
      run: |
        aws deploy create-deployment \
          --application-name ${{ env.CODE_DEPLOY_APPLICATION_NAME }} \
          --deployment-config-name CodeDeployDefault.AllAtOnce \
          --deployment-group-name ${{ env.CODE_DEPLOY_DEPLOYMENT_GROUP_NAME }} \
          --s3-location bucket=$S3_BUCKET_NAME,key=$GITHUB_SHA.zip,bundleType=zip
```

<br><br>

## 3-2. AWS CodeDeploy
> ![path](/assets/images/Projects/ToyProjects/carefreeocrV2_5.png)<br>
> **CodeDeploy 의 DeployGroup 에 지정된 EC2에 AllAtOnce 방식으로 애플리케이션을 배포합니다.**
> - 여러 개의 EC2 를 띄우지 않았으므로 **애초에 무중단 배포가 불가능.** AllAtOnce 방식으로 한번에 배포.

<br><br>

> ![path](/assets/images/Projects/ToyProjects/carefreeocrV2_6.png)<br>
> 수많은 삽질 및 리팩토링의 흔적..

<br><br>

# 4. APIs

## 4-1. NCP Clova OCR API
> ![path](/assets/images/Projects/ToyProjects/carefreeocrV2_7.png)<br>
`[NCP Clova OCR API 바로가기]`(https://console.ncloud.com/ocr/domain)
> **NCP Clova OCR API 같은 경우에는 다양한 서비스와 모델을 지원합니다.**
> - **등기 영수증의 경우 매우 다양한 내용이 담겨 있고, 텍스트의 크기도 작아 더욱 정밀한 OCR 결과를 얻기 위해서 General OCR - Premium Model 을 사용했습니다.**
> - **사업자 등록증의 경우 NCP 자체에서 사업자 등록증과 같은 특정 서류에 대하여 Template 을 생성할 수 있는 OCR service 를 지원합니다.**
> 	- 따라서 회사의 사업자 등록증을 Template Sample 로 등록 후, 요구 사항을 바탕으로 원하는 정보를 얻어낼 Field 를 지정하여 OCR service 를 더욱 정밀하게 사용할 수 있도록 의도했습니다.

<br><br>

## 4-2. GCP Google Sheet API
> ![path](/assets/images/Projects/ToyProjects/carefreeocrV2_8.png)<br>
`[GCP Google Sheet API 바로가기]`(https://developers.google.com/sheets/api/reference/rest?hl=ko)
**Google Sheet API 를 사용하는 것은 어렵지 않으나, API 를 사용하기 위한 과정(사용자 인증 정보 생성)이 조금 까다로울 수 있습니다.**

<br><br>

> ![path](/assets/images/Projects/ToyProjects/carefreeocrV2_9.png)<br>
> **위와 같이 API 키, OAuth 2.0 Client ID, Service Account 세 가지를 각 용도에 맞추어 생성한 후 정상적으로 Google Sheet API 를 사용 할 수 있다.**
> - 만약 CI/CD Pipeline 이 구축되어 있다면, **해당 정보를 숨기기 위해 Github Actions 및 Github Secret** 에 미리 지정하여 배포하는 방법이 제겐 편리하고 가장 무난한 방법이었습니다.

<br><br>

# 5. Spring Boot Application 개발
> **프로젝트 진행하면서 개인적으로 기록했던 사항 및 설명은 소스코드 내부에 주석으로 달아두었습니다.**

<br><br>

## 5-1. 전체 흐름

> **전체적인 흐름은 다음과 같습니다.**
> 
> <br><br>
> 
> 1. **사용자가 /upload-form 으로 GET 요청. -> upload-form 반환.**
> 2. **사용자가 등기 영수증 / 사업자 등록증 이미지 파일을 upload 후 /uploadAndOcr 으로 POST 요청.**
> 3. **NCP Clova OCR API Call 후 List\<String> 형태로 결과 값 반환.**
> 4. **OCR 결과를 Iterator 를 사용하여 순회하며 Data 가공.**
> 	- **총 개수 파악**
> 	- **정규 표현식을 사용하여 날짜 저장. (추후 해당 날짜 별로 Google Sheet 생성)**
> 	- **정규 표현식을 사용하여 등기 번호 탐색 및 저장.**
> 		- **탐색한 등기 번호를 통한 우체국 등기 발송 조회 링크 생성**
> 			- 우체국 등기 조회 로직을 살펴보니 "https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1=(등기 번호)&displayHeader=" 와 같이 수행됨.
> 			- 등기 번호에서 - (dash) 를 정규표현식을 통해 지우고 숫자만 남긴 후 URL Format 에 삽입하여 해당 등기 우편 조회 링크를 생성.
> 	- **우편 번호, 기업 명 저장**
> 	- **수신인 저장**
> 		- 두 자 이름인 경우 고려
> 	- **"익일 특급" / "합계" / "통상" 발견 전까지 주소로 간주하여 저장**
> 		- **"합계" 발견 시 Loop 종료.**
> 5. **가공된 Data 를 HTML Template 으로 반환하는 동시에 Google Sheet 로 전달하기 위해 List<List\<Object>> 형식으로 재가공.**
> 	- 기존 Data 를 Number, 등기 번호, 조회 링크, 우편 번호, 법인 명, 수신자, 주소 의 총 7개씩 나눠 2차원 배열 형태로 가공.
> 6. **재 가공된 Data를 Google Sheet API 를 사용해서 지정된 Google Sheet 에 저장.**
> 	- **Google Sheet API 사용자 인증은 Github Actions 에 의해 생성된 프로젝트 루트 위치의 JSON 파일 사용.**
> 	- **addSheet()**
> 		- OCR 에서 Detect 한 날짜를 Title 로 Sheet 생성. (날짜 별 등기 영수증 내용 분리 저장)
> 		- 만약 동일한 날짜 (시트 이름) 가 존재하면 해당 시트를 반환.
> 	- **updateValues()**
> 		- **데이터 반환 타입만 변경해주면 기능 변경 가능.**
> 			- **Update**ValuesResponse : 기존 셀에 덮어 쓰기
> 			- **Append**ValuesResponse : 기존 셀 끝에 이어 쓰기

<br><br>

## 5-2. Naver Cloud Platform Clova OCR API

```java
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
            con.setRequestMethod("POST");  
            String boundary = "----" + UUID.randomUUID().toString().replaceAll("-", "");  
            con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);  
            con.setRequestProperty("X-OCR-SECRET", secretKey);  
  
            JSONObject json = new JSONObject();  
            json.put("version", "V2");  
            json.put("requestId", UUID.randomUUID().toString());  
            json.put("timestamp", System.currentTimeMillis());  
            JSONObject image = new JSONObject();  
            image.put("format", "jpeg");  
            image.put("name", "demo");  
            JSONArray images = new JSONArray();  
            images.add(image);  
            json.put("images", images);  
            String postParams = json.toString();  
  
            con.connect();  
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());  
//            long start = System.currentTimeMillis();  
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
            System.out.println(e);  
        }  
  
        return parseData;  
    }  
  
    private static void writeMultiPart(OutputStream out, String jsonMessage, File file, String boundary) throws  
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

## 5-3. GoogleSheet API

```java
@Slf4j  
@Component  
public class GoogleSheet {  
    private static HttpRequestInitializer requestInitializer;  
  
    public GoogleSheet() throws IOException {  
        this.requestInitializer = new HttpCredentialsAdapter(  
                GoogleCredentials.fromStream(new FileInputStream("/home/ec2-user/app/***.json"))  
                        .createScoped(Collections.singletonList("https://www.googleapis.com/auth/spreadsheets"))  
        );  
    }  
  
    // UpdateValuesResponse : 기존 셀에 덮어 쓰기  
    // AppendValuesResponse : 기존 셀 끝에 이어 쓰기  
    // 데이터 반환 타입만 변경해주면 기능 변경 가능.  
    public static AppendValuesResponse updateValues(String sheetTitle,  
                                                    String spreadsheetId,  
                                                    String range,  
                                                    String valueInputOption,  
                                                    List<List<Object>> values) throws IOException {  
        Sheets service = new Sheets.Builder(new NetHttpTransport(),  
                GsonFactory.getDefaultInstance(),  
                requestInitializer)  
                .setApplicationName("OCR Sheets")  
                .build();  
  
        // 시트를 추가  
        SheetProperties addedSheetProperties = addSheet(service, sheetTitle, spreadsheetId);  
  
        // 시트 이름과 지정한 범위 (A1:G1000) 에 Data 저장.  
        ValueRange body = new ValueRange().setValues(values);  
  
        // spreadsheetId 와 range 를 합쳐 update 할 위치를 지정 (Spreadsheet 이름 ! 시작 셀 : 끝 셀)  
        // 예: 2023-12-28!A1:G1000  
        return service.spreadsheets().values().append(spreadsheetId, sheetTitle + "!" + range, body)  
                .setValueInputOption(valueInputOption)  
                .execute();  
    }  
  
    public static SheetProperties addSheet(Sheets service, String sheetTitle, String spreadsheetId) throws IOException {  
        // 시트가 이미 존재하는지 확인  
        SheetProperties existingSheet = getSheet(service, sheetTitle, spreadsheetId);  
        if (existingSheet != null) {  
            return existingSheet; // 이미 존재하면 해당 시트의 정보를 반환  
        }  
  
        // 시트를 추가하기 위한 요청 생성  
        AddSheetRequest addSheetRequest = new AddSheetRequest();  
        SheetProperties sheetProperties = new SheetProperties();  
        sheetProperties.setTitle(sheetTitle);  
        addSheetRequest.setProperties(sheetProperties);  
  
        // 스프레드시트 업데이트를 위한 요청 생성  
        BatchUpdateSpreadsheetRequest updateRequest = new BatchUpdateSpreadsheetRequest();  
  
        // 시트 추가 요청을 업데이트 요청에 추가  
        updateRequest.setRequests(Collections.singletonList(  
                new Request()  
                        .setAddSheet(addSheetRequest)  
        ));  
  
        // 업데이트 요청을 Google Sheets API에 전송  
        service.spreadsheets().batchUpdate(spreadsheetId, updateRequest).execute();  
        return sheetProperties;  
    }  
  
    private static SheetProperties getSheet(Sheets service, String sheetTitle, String spreadsheetId) throws IOException {  
        Spreadsheet spreadsheet = service.spreadsheets().get(spreadsheetId).execute();  
        List<Sheet> sheets = spreadsheet.getSheets();  
        for (Sheet sheet : sheets) {  
            if (sheet.getProperties().getTitle().equals(sheetTitle)) {  
                return sheet.getProperties();  
            }  
        }  
        return null;  
    }  
}
```

<br><br>

## 5-4. uploadController
> 간단한 프로그램이 이렇게 커질 줄 몰라 controller 와 service 구분을 하지 않아서,,,<br>
> 추후 Refactoring 예정입니다.

```java
@Controller  
@Slf4j  
@RequiredArgsConstructor  
public class uploadController {  
    @Value("${naver.service.secretKey}")  
    private String secretKey;  
  
    @Value("${naver.business.secretKey}")  
    private String secretKeyBusiness;  
  
    private List<String> exceptions = new ArrayList<>();  
  
    private final NaverOcrApi naverApi;  
    private final NaverOcrApiBusiness naverBusinessApi;  
    ArrayList<String> afterFmt = new ArrayList<>();  
    String date = "";  
    private static final String[] REGIONS = {  
            "서울특별시",  
            "부산광역시",  
            "대구광역시",  
            "인천광역시",  
            "광주광역시",  
            "대전광역시",  
            "울산광역시",  
            "세종특별자치시",  
            "경기도",  
            "강원특별자치도",  
            "충청북도",  
            "충청남도",  
            "전라북도",  
            "전라남도",  
            "경상북도",  
            "경상남도",  
            "제주특별자치도"  
    };  
  
  
    // 파일 업로드 폼을 보여주기 위한 GET 요청 핸들러 메서드  
    @GetMapping("/upload-form")  
    public String uploadForm() throws Exception {  
        return "upload-form"; // HTML 템플릿의 이름을 반환 (upload-form.html)    }  
  
    // 파일 업로드 및 OCR 수행을 위한 POST 요청 핸들러 메서드  
    @PostMapping("/uploadAndOcr")  
    public String uploadAndOcr(@RequestParam("files") List<MultipartFile> files, Model model) throws IOException {  
        for (MultipartFile file : files) {  
            if (file.isEmpty()) {  
                return "error"; // 파일이 비어있을 경우 에러를 처리하는 HTML 템플릿으로 이동  
            }  
  
            String naverSecretKey = secretKey; // 본인의 네이버 Clova OCR 시크릿 키로 대체  
  
            File tempFile = File.createTempFile("temp", file.getOriginalFilename());  
            file.transferTo(tempFile);  
  
            // 이전 실행 내역 초기화  
            if (!afterFmt.isEmpty()) afterFmt.clear();  
  
            // NCP Clova OCR API Call  
            List<String> result = naverApi.callApi("POST", tempFile.getPath(), naverSecretKey, "jpeg");  
  
            // api 호출 실패 시 exception 에 기록하고 pass.            if (errors(result, tempFile)) continue;  
  
            tempFile.delete(); // 임시 파일 삭제  
  
            // Iterator 를 사용하여 OCR 결과를 순회.  
            ListIterator<String> iter = result.listIterator();  
            int total = 0;  
            while (iter.hasNext()) {  
                String text = iter.next();  
  
                // 날짜 확인 및 저장 (Google Sheet 에 날짜 별로 Sheet 생성하기 위함)  
                if (text.matches("\\d{4}-\\d{2}-\\d{2}")) {  
                    date = text;  
                }  
  
                // 등기 번호 발견 시 데이터 가공 (일반 영수증: 00000-0000-0000 / 대량 발송 영수증: 0000000000000)  
                if (text.matches("\\d{5}-\\d{4}-\\d{4}") || text.matches("\\d{13}")) {  
                    total++;  
                    // 총 개수 Numbering                    afterFmt.add("[" + total + "]");  
  
                    // 등기 번호 저장  
                    afterFmt.add(text);  
  
                    // 정규화 된 등기 번호를 사용한 각 등기 별 우체국 조회 서비스 링크 생성  
                    String findPostUrl =  
                            "https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1="  
                                    + text.replaceAll("[^0-9]", "")  
                                    + "&displayHeader=";  
                    afterFmt.add(findPostUrl);  
  
                    // 가격 skip, 우편 번호 저장  
                    iter.next();  
                    text = iter.next();  
                    afterFmt.add(text);  
  
                    // 기업 명 저장  
                    afterFmt.add(iter.next());  
  
                    // 수신인 저장  
                    text = iter.next();  
                    if (Arrays.asList(REGIONS).contains(text)) {  
                        afterFmt.add("-");  
                        iter.previous();  
                    } else {  
                        // 두 자 이름 / 다음 줄로 이름이 밀렸을 경우 Concat.                        if (text.length() <= 2) {  
                            text = text.concat(iter.next());  
                        }  
                        afterFmt.add(text);  
                    }  
  
                    // 주소 저장  
                    StringBuilder adr = new StringBuilder();  
                    while (iter.hasNext()) {  
                        text = iter.next();  
                        // 합계 / 통상 / 익일특급 발견 시 주소 저장 후 순회.  
                        if (text.equals("합계") || text.equals("통상") || text.equals("익일특급")) {  
                            afterFmt.add(String.valueOf(adr));  
                            break;  
                        }  
  
                        // 띄어 쓰기 포함 주소 문자열 concat.                        if (iter.hasNext())  
                            adr.append(" ").append(text);  
                    }  
                }  
                // 합계 발견 시 종료. (마지막 도달)  
                if (text.equals("합계")) {  
                    break;  
                }  
            }  
            model.addAttribute("ocrResult", afterFmt); // OCR 결과를 HTML 템플릿에 전달  
  
            List<List<Object>> toGSheet = new ArrayList<>();  
            int idx = 0;  
            log.info("size: " + afterFmt.size());  
            for (int i = 0; i < afterFmt.size(); i++) {  
                List<Object> temp = new ArrayList<>();  
                for (int j = 0; j < 7 && idx < afterFmt.size(); j++) {  
                    temp.add(afterFmt.get(idx));  
                    idx++;  
                }  
                toGSheet.add(temp);  
            }  
            GoogleSheet.updateValues(date, "1UADUNDLfmaQLJ1woHzVs9sq2HyScmfLla4lKvjaAwy8", "A1:G1000", "RAW", toGSheet);  
        }  
        log.info(concatString(exceptions));  
        exceptions.clear();  
        return "ocr-result"; // OCR 결과를 표시하는 HTML 템플릿 이름 반환  
    }  
  
    @PostMapping("/ocrBusiness")  
    public String uploadAndOcrBusiness(@RequestParam("files") List<MultipartFile> files, Model model) throws IOException {  
        for (MultipartFile file : files) {  
            if (file.isEmpty()) {  
                return "error"; // 파일이 비어있을 경우 에러를 처리하는 HTML 템플릿으로 이동  
            }  
  
            String naverSecretKey = secretKeyBusiness;  
  
            File tempFile = File.createTempFile("temp", file.getOriginalFilename());  
            file.transferTo(tempFile);  
  
            // NCP Clova OCR API Call  
            List<String> result = naverBusinessApi.callApiBusiness("POST", tempFile.getPath(), naverSecretKey, "jpeg");  
  
            // api 호출 실패 시 exception 에 기록하고 pass.            if (errors(result, tempFile)) continue;  
  
            tempFile.delete(); // 임시 파일 삭제  
  
            // \n 삭제  
            int num = 0;  
  
            while (num < result.size()) {  
                result.set(num, result.get(num).replaceAll("\n", ", "));  
                num++;  
            }  
            model.addAttribute("ocrBusinessResult", result);  
  
            List<List<Object>> toGSheet = new ArrayList<>();  
            int idx = 0;  
            List<Object> temp = new ArrayList<>();  
            for (int i = 0; i < 7 && idx < result.size(); i++) {  
                temp.add(result.get(idx));  
                idx++;  
            }  
            toGSheet.add(temp);  
  
            GoogleSheet.updateValues("시트1", "1ucw8wIlZosXmskTX61odE_CnX8WnEjw9q_Oggj8WwQY", "A1:J1000", "RAW", toGSheet);  
        }  
        log.info(concatString(exceptions));  
        exceptions.clear();  
        return "ocr-result-business";  
    }  
  
    private Boolean errors(List<String> tg, File f) {  
        if (tg == null) {  
            log.info("!! OCR 불가능한 이미지 입니다. result 에 NULL 값 확인됨 !!");  
            exceptions.add(f.getName());  
            return true;  
        }  
        return false;  
    }  
  
    private static String concatString(List<String> stringList) {  
        StringBuilder stringBuilder = new StringBuilder();  
        for (String str : stringList) stringBuilder.append(str);  
        return stringBuilder.toString();  
    }  
}
```

<br><br>

# 6. DNS 연결 AWS Route53 + 가비아

## 6-1. 가비아 도메인 구매
> ![path](/assets/images/Projects/ToyProjects/carefreeocrV2_10.png)<br>
`[가비아]`(https://www.gabia.com/)
> 회사 이름과 OCR 을 붙여 가장 저렴한 이벤트 도메인을 구매했습니다.
> - **도메인 구매 후 사진 하단의 `"네임서버 설정"` 에서 1 ~ 4 차 네임 서버 항목을 6-2 단계에서 얻는 AWS Route53 의 NS 유형 값 4개를 채워주고 기다리면 도메인 등록이 완료됩니다.**

<br><br>

## 6-2. AWS Route53 레코드 생성
> ![path](/assets/images/Projects/ToyProjects/carefreeocrV2_11.png)<br>
`[AWS Route53]`(https://aws.amazon.com/ko/route53/)
> 1. **AWS Route53 에서 호스팅 영역 생성 -> 6-1 에서 구매한 도메인 입력**
> 2. **레코드 생성 -> 값 부분에 EC2 의 IP 주소를 입력. -> 생성**
> 3. **NS(NameServer) 유형 값 4개를 도메인 구매처의 도메인 네임 서버 설정에 입력하여 연결.**
>
> <br>
> - **[참고] 가비아에서 도메인 구매 후 등록하고 (6-2 까지 진행) 기다리다 보면 도메인 등록이 완료 되었다고 문자가 온다. 문자가 오면 해당 도메인으로 접근 시 EC2로 연결된다.**

<br><br>

# 7. Trouble Shooting

## 7-1. Use JsonReader.setLenient(true) to accept malformed JSON
> ![path](/assets/images/Projects/ToyProjects/carefreeocrV2_12.png)<br>
> Google Sheet API 를 사용하기 위한 계정 인증을 위한 JSON 파일을 CI/CD 환경에서 안전하게 사용하기 위해 Github Secrets 를 사용했다.
> - 하지만 Google Sheet API 를 요청하자, 이전에 발생하지 않던 에러가 발생했다.
> - **발생한 에러: `com.google.gson.stream.MalformedJsonException: Use JsonReader.setLenient(true) to accept malformed JSON at line 2 column 4 path $.`**
> 	- Malformed (흉한) Json Exception 이라는 에러 이름에서 JSON 파일의 형식이 잘못되었음을 유추하고 EC2 에 접속하여 해당 JSON 파일을 열어보았다.
>
> **해당 JSON 파일의 모습.**
> ![path](/assets/images/Projects/ToyProjects/carefreeocrV2_13.png)<br>
> - 위처럼 JSON 파일에서 "" 가 전부 빠져 있어 에러가 발생한 모습을 볼 수 있었다.
> <br><br>
> **해결 방법**
> - Github Actions 의 Workflow file 의 옵션 중 create-json 을 사용하여 해결.

```yml
- name: create-json
      id: create-json
      uses: jsdaniell/create-json@1.1.2
      with:
        name: "secrets.json"
        json: ${{ secrets.SECERT_JSON }}
```

> **위 코드를 Workflow 파일에 추가하여 Github secrets 에 저장된 JSON 형식의 secret 을 정상적으로 사용할 수 있었다.**

<br><br>

# 8. 프로그램 시연 영상

{% raw %}
<iframe width="560" height="315" src="https://youtu.be/w_yWncXfCRM" frameborder="0" allowfullscreen></iframe>
{% endraw %}

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

- [x] 1\. Agenda
- [x] 2\. 전체 구조 / Architecture
- [x] 2-1. AWS Cloud Infrastructure
- [x] 2-2. Spring Boot Application Structure
- [x] 2-3. 전체 구성도 (Architecture)
- [x] 3\. CI / CD Pipeline 구축 (Github Actions / AWS CodeDeploy)
- [x] 3-1. Github Actions
- [x] Github Actions Workflow File - Deploy.yml
- [x] 3-2. AWS CodeDeploy
- [x] 4\. APIs
- [x] 4-1. NCP Clova OCR API
- [x] 4-2. GCP Google Sheet API
- [x] 5\. Spring Boot Application 개발
- [x] 5-1. 전체 흐름
- [x] 5-2. Naver Cloud Platform Clova OCR API
- [x] 5-3. GoogleSheet API
- [x] 5-4. uploadController
- [x] 6\. DNS 연결 AWS Route53 + 가비아
- [x] 6-1. 가비아 도메인 구매
- [x] 6-2. AWS Route53 레코드 생성
- [x] 7\. Trouble Shooting
- [x] 7-1. Use JsonReader.setLenient(true) to accept malformed JSON
- [x] 8\. 프로그램 시연 영상
