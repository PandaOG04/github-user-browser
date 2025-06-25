const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('GitHub API Proxy Endpoints', () => {

  it('GET /api/search/users?q=octocat should return users', (done) => {
    chai.request(app)
      .get('/api/search/users?q=octocat')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('users').that.is.an('array');
        done();
      });
  });

  it('GET /api/users/octocat should return user details', (done) => {
    chai.request(app)
      .get('/api/users/octocat')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('login', 'octocat');
        expect(res.body).to.have.property('repos').that.is.an('array');
        done();
      });
  });

  it('GET /api/repos/octocat/hello-world should return repo details and commits', (done) => {
    chai.request(app)
      .get('/api/repos/octocat/hello-world')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name', 'Hello-World');
        expect(res.body).to.have.property('commits').that.is.an('array');
        done();
      });
  });

});
