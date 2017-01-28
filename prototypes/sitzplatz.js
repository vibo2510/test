/**
 * Created by Viktoria Bock on 27.01.2017.
 */

function Sitzplatz(id, nummer, status) {
    this._id= id;
    this.nummer= nummer;
    this.isFree = status;
};

Sitzplatz.prototype.setStatus = function(status){
    this.isFree= status;
};

Sitzplatz.prototype.kaufen = function () {
  this.isFree= false;
};


module.exports = Sitzplatz;