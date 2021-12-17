const request = require('request');
const fs = require('fs');

/*
 * PasswordModelParaUpdate
 * 비밀번호 보안성 평가모델 학습 파라매터 변경 모듈
 * @version: 1.0.0
 */
class PasswordModelParaUpdate {
    /*
     * 비밀번호 보안성 평가모델 학습 파라매터 변경 요청 기능
     * 비밀번호 보안성 평가모델 서버로 학습을 위한 하이퍼 파라매터를 변경 요청한다.
     * @version: 1.0.0
     * @param: parameter, comment
     * @return: state, comment
     */
    passwordModelParaUpdate(parameter, comment) {
        var data = JSON.parse(parameter);
        data.comment = comment;

        var address = fs.readFileSync(__dirname + '/../files/smartServerAddress.txt', 'utf8');

        request.post(
            {
                headers: {
                    'content-type': 'application/json',
                },
                url: `http://${address}/passwordModelParaUpdate`,
                body: data,
                json: true,
            },
            function (err, res, body) {}
        );

        return {
            state: 200,
            comment: `하이퍼 파라매터 수정 요청 완료`,
        };
    }
}

module.exports.PasswordModelParaUpdate = PasswordModelParaUpdate;
