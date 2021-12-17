const request = require('request');
const fs = require('fs');

/*
 * PasswordDictUpdate
 * 비밀번호 보안성 평가모델 학습 데이터 수정 모듈
 * @version: 1.0.0
 */
class PasswordDictUpdate {
    /*
     * 비밀번호 보안성 평가모델 학습 데이터 수정 기능
     * 비밀번호 보안성 평가모델의 학습을 위한 데이터 수정을 서버로 요청한다.
     * @version: 1.0.0
     * @param: dictionary, comment
     * @return: state, comment
     */
    passwordDictUpdate(dictionary, comment) {
        var data = JSON.parse(dictionary);
        data.comment = comment;

        var address = fs.readFileSync(__dirname + '/../files/smartServerAddress.txt', 'utf8');

        request.post(
            {
                headers: {
                    'content-type': 'application/json',
                },
                url: `http://${address}/passwordDictUpdate`,
                body: data,
                json: true,
            },
            function (err, res, body) {}
        );

        return {
            state: 200,
            comment: `사전 수정 요청 완료`,
        };
    }
}

module.exports.PasswordDictUpdate = PasswordDictUpdate;
