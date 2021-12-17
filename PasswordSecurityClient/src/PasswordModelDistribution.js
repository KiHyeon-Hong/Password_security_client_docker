const http = require('http');
const fs = require('fs');

/*
 * PasswordModelDistribution
 * 비밀번호 보안성 평가모델 배포 요청 모듈
 * @version: 1.0.0
 */
class PasswordModelDistribution {
    /*
     * 비밀번호 보안성 평가모델 배포 요청 기능
     * 비밀번호 보안성 평가모델의 가중치 배포를 요청한다.
     * @version: 1.0.0
     * @param: versionData, comment
     * @return: x
     */
    passwordModelDistributionWeights(versionData, comment) {
        var path = __dirname;

        var tempPath = path.split('\\');

        if (tempPath.length == 1) {
            tempPath = path.split('/');
        }

        path = tempPath;

        var downloadPath = '';
        for (let i = 0; i < path.length - 1; i++) {
            downloadPath = downloadPath + path[i] + '/';
        }

        var address = fs.readFileSync(__dirname + '/../files/smartServerAddress.txt', 'utf8');

        const weights = fs.createWriteStream(downloadPath + 'passwordModel/weights.bin');
        http.get(`http://${address}/passwordModelDistributionWeight?versionData=${versionData}&comment=${comment}`, function (response) {
            response.pipe(weights);
        });
    }

    /*
     * 비밀번호 보안성 평가모델 배포 요청 기능
     * 비밀번호 보안성 평가모델의 구조 배포를 요청한다.
     * @version: 1.0.0
     * @param: versionData, comment
     * @return: x
     */
    passwordModelDistributionModel(versionData, comment) {
        var path = __dirname;

        var tempPath = path.split('\\');

        if (tempPath.length == 1) {
            tempPath = path.split('/');
        }

        path = tempPath;

        var downloadPath = '';
        for (let i = 0; i < path.length - 1; i++) {
            downloadPath = downloadPath + path[i] + '/';
        }

        var address = fs.readFileSync(__dirname + '/../files/smartServerAddress.txt', 'utf8');

        const model = fs.createWriteStream(downloadPath + 'passwordModel/model.json');
        http.get(`http://${address}/passwordModelDistributionModel?versionData=${versionData}&comment=${comment}`, function (response) {
            response.pipe(model);
        });
    }

    /*
     * 비밀번호 보안성 평가모델 배포 요청 기능
     * 비밀번호 보안성 평가모델의 사전 배포를 요청한다.
     * @version: 1.0.0
     * @param: versionData, comment
     * @return: x
     */
    passwordModelDistributionDictionary(versionData, comment) {
        var path = __dirname;

        var tempPath = path.split('\\');

        if (tempPath.length == 1) {
            tempPath = path.split('/');
        }

        path = tempPath;

        var downloadPath = '';
        for (let i = 0; i < path.length - 1; i++) {
            downloadPath = downloadPath + path[i] + '/';
        }

        var address = fs.readFileSync(__dirname + '/../files/smartServerAddress.txt', 'utf8');

        http.get(`http://${address}/passwordModelDistributionDict?versionData=${versionData}&comment=${comment}`, function (response) {});
    }
}

module.exports.PasswordModelDistribution = PasswordModelDistribution;
