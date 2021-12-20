const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const PasswordSecurityClient = require('./PasswordSecurityClient');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/passwordModelDistribution', (req, res, next) => {
  var pwd = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();
  res.send(pwd.passwordModelDistribution(req.query.versionData, req.query.comment));
});

app.get('/passwordValidation', (req, res, next) => {
  var pwd = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();
  pwd.passwordValidation(req.query.password).then(function (result) {
    res.send(result);
  });
});

app.get('/passwordDictUpdate', (req, res, next) => {
  var pwd = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();
  res.send(pwd.passwordDictUpdate('{"dictionary":"q1w2e3r4"}', 'test message'));
});

app.get('/passwordModelParaUpdate', (req, res, next) => {
  var pwd = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();
  res.send(pwd.passwordModelParaUpdate('{"node":4,"unit":[3,5,3,1],"activation":"relu","epoch":12}', 'test message.'));
});

app.get('/serverAddressUpdate', (req, res, next) => {
  var pwd = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();
  res.send(pwd.serverAddressUpdate(req.query.serverAddress));
});

app.listen(65002, () => {
  console.log(`Server running...`);
});
