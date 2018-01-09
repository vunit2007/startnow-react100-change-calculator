const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');

let nightmare;

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

app.listen(8888);

const url = 'http://localhost:8888';

describe('express', function() {
  this.timeout(12000);
  beforeEach(() => {
    nightmare = new Nightmare();
  });

  it('should load successfully', () => axios.get(url).then(r => expect(r.status === 200)));

  xit('should include an input element for the user to enter amount due', () =>
    nightmare
    .goto(url)
    .evaluate(() => document.querySelector('input[name=amountDue]'))
    .end()
    .then((input) => {
      expect(input).to.not.be.null;
      expect(typeof input).to.equal('object');
    })
  );

  xit('should include an input element for the user to enter amount received', () =>
    nightmare
    .goto(url)
    .evaluate(() => document.querySelector('input[name=amountReceived]'))
    .end()
    .then((input) => {
      expect(input).to.not.be.null;
      expect(typeof input).to.equal('object');
    })
  );

  xit('should include a button for the user to calculate change', () =>
    nightmare
    .goto(url)
    .evaluate(() => document.querySelector('button.btn'))
    .end()
    .then(button => {
      expect(button).to.not.be.null.and.to.not.be.undefined;
      expect(typeof button).to.equal('object');
    })
  );

  xit('should calculate total change correctly', () =>
    nightmare
    .goto(url)
    .type('input[name=amountDue]', 13.01)
    .type('input[name=amountReceived]', 20)
    .click('button.btn')
    .wait('#output')
    .evaluate(() => document.querySelector('#output').innerText)
    .end()
    .then(el => expect(el).to.contain('6.99'))
  );

  xit('should calculate individual change correctly', () =>
    nightmare
    .goto(url)
    .type('input[name=amountDue]', 13.01)
    .type('input[name=amountReceived]', 20)
    .click('button.btn')
    .wait('#change-table p')
    .evaluate(() => Array.from(document.querySelectorAll('#change-table span')).map(e => e.innerText))
    .then((results) => {
      const expected = {
        twenties: '0',
        tens: '0',
        fives: '1',
        ones: '1',
        quarters: '3',
        dimes: '2',
        nickels: '0',
        pennies: '4'
      };

      const promises = Object
        .keys(expected)
        .map((key, i) => expect(results[i]).to.equal(expected[key], `Expected ${expected[key]} ${key}, saw ${results[i]} instead.`));

      return Promise.all(promises);
    })
  );
});
