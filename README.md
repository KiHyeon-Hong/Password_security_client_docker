# Installation

## git clone

```bash
git clone https://github.com/KiHyeon-Hong/Password_security_client_docker.git
```

## Docker images

```bash
docker build . -t passwordsecurityclient
docker run -p 65002:65002 -d passwordsecurityclient

docker exec -it <container ID> /bin/bash
```

## Document

### serverAddress

- 비밀번호 보안성 학습모듈이 위치한 주소 변경 API

```text
http://192.168.0.22:65002/serverAddressUpdate?serverAddress=192.168.0.22:65001
```

```json
{
  "state": 200,
  "comment": "서버 주소 변경 완료"
}
```

### passwordValidation

- 사용자가 선택한 비밀번호 보안성 평가 API

```text
http://192.168.0.22:65002/passwordValidation?password=123456
```

```json
{
  "password": "123456",
  "predictPoint": 0.033809125423431396,
  "comment": ["비밀번호가 숫자만으로 구성됨", "사전에 포함된 단어를 사용하거나 유추하기 쉬움"],
  "recommended": ["123E456", "1234D56", "123456g", "%123456", "12345R6"]
}
```

### passwordModelDistribution

- 학습한 비밀번호 보안성 평가모델 배포 요청 API

```text
http://192.168.0.22:65002/passwordModelDistribution?versionData=0.2&comment=TestComment
```

```json
{
  "state": 200,
  "comment": "유출 비밀번호 예측모델 배포 완료"
}
```

### passwordDictUpdate

- 학습을 위한 유출된 비밀번호 추가 요청 API

```text
http://192.168.0.22:65002/passwordDictUpdate?dictionary={"dictionary":"q1w2e3r4"}&comment=TestComment
```

```json
{
  "state": 200,
  "comment": "사전 수정 요청 완료"
}
```

### passwordModelParaUpdate

- 모델 학습에 사용하는 학습 하이퍼 파라매터 수정 요청 API

```text
http://192.168.0.22:65002/passwordModelParaUpdate?parameter={"node":4,"unit":[5,5,3,1],"activation":"relu","epoch":20}&comment=MyNewParameter
```

```json
{
  "state": 200,
  "comment": "하이퍼 파라매터 수정 요청 완료"
}
```
