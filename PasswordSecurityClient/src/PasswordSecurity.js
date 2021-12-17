const fs = require('fs');
const http = require('http');
const request = require('request');

const PasswordValidation = require(__dirname + '/PasswordValidation.js');
const PasswordModelDistribution = require(__dirname + '/PasswordModelDistribution.js');
const PasswordDictUpdate = require(__dirname + '/PasswordDictUpdate.js');
const PasswordModelParaUpdate = require(__dirname + '/PasswordModelParaUpdate.js');
const PasswordSecurityCheck = require(__dirname + '/PasswordSecurityCheck.js');

/*
 * PasswordSecurity
 * 비밀번호 보안성 평가모델 인터페이스 모듈
 * @version: 1.0.0
 */
class PasswordSecurity {
    /*
     * 비밀번호 보안성 평가 기능
     * password의 유출 여부를 예측하고, 유출되었다고 평가할 경우 그에 대한 보완 피드백을 반환한다.
     * 만약, 비밀번호가 아니라면 310 상태 메시지를 반환하며, 성공 시 예측 결과, 그리고 피드백을 반환한다.
     * @version: 1.0.0
     * @param: password
     * @return: state, comment
     */
    async passwordValidation(password) {
        if (password.split('\n').length != 1 || password.split(',').length != 1 || password.split("'").length != 1 || password.split('"').length != 1) {
            return {
                state: 310,
                comment: `유효하지 않은 비밀번호`,
            };
        }

        const result = await new PasswordValidation.PasswordValidation().passwordValidation(password);
        return new PasswordSecurityCheck.PasswordSecurityCheck().passwordSecurityCheck(password, result);
    }

    /*
     * 비밀번호 보안성 평가모델 배포 요청 기능
     * 비밀번호 보안성 평가모델 학습 모듈이 작동하는 서버에 비밀번호 보안성 평가모델 배포를 요청하여, 해당 버전에 맞는 모델의 가중치와 구조를 받는다.
     * @version: 1.0.0
     * @param: versionData, comment
     * @return: state, comment
     */
    passwordModelDistribution(versionData, comment) {
        var pwd = new PasswordModelDistribution.PasswordModelDistribution();

        versionData = versionData.toString();
        comment = comment.toString();

        pwd.passwordModelDistributionWeights(versionData, comment);
        pwd.passwordModelDistributionModel(versionData, comment);
        pwd.passwordModelDistributionDictionary(versionData, comment);

        return {
            state: 200,
            comment: `유출 비밀번호 예측모델 배포 완료`,
        };
    }

    /*
     * 비밀번호 보안성 평가모델 유출 비밀번호 추가 기능
     * 새로운 유출 비밀번호 발생 시 이를 학습 데이터에 추가하기 위해 해당 비밀번호를 입력받는다.
     * @version: 1.0.0
     * @param: dictionary, comment
     * @return: state, comment
     */
    passwordDictUpdate(dictionary, comment) {
        var pwd = new PasswordDictUpdate.PasswordDictUpdate();

        return pwd.passwordDictUpdate(dictionary, comment);
    }

    /*
     * 비밀번호 보안성 평가모델 학습 파라매터 수정 기능
     * 모델 학습을 위한 하이퍼 파라매터를 수정한다. 구성은 은닉층의 수, 노드 수, 활성화 함수, 학습 횟수를 변경 가능하다.
     * @version: 1.0.0
     * @param: parameter, comment
     * @return: state, comment
     */
    passwordModelParaUpdate(parameter, comment) {
        var pwd = new PasswordModelParaUpdate.PasswordModelParaUpdate();

        return pwd.passwordModelParaUpdate(parameter, comment);
    }

    /*
     * 비밀번호 보안성 평가모델 서버 주소 변경 기능
     * 비밀번호 보안성 평가모델 학습 서버의 주소를 변경한다. 기본 주소는 localhost:65001이다.
     * @version: 1.0.0
     * @param: serverAddress
     * @return: state, comment
     */
    serverAddressUpdate(serverAddress) {
        fs.writeFileSync(__dirname + '/../files/smartServerAddress.txt', serverAddress, 'utf8');
        return {
            state: 200,
            comment: `서버 주소 변경 완료`,
        };
    }

    /*
     * 로그 정보 제공 기능
     * @version: 0.0.1
     * @param: x
     * @return: x
     */
    getLog(level, startDate, finishDate) {
        return 'getLog';
    }
}

module.exports.PasswordSecurity = PasswordSecurity;
