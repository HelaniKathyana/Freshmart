let request = obj => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.uri);
            if (obj.headers) {
            Object.keys(obj.headers).forEach(key => {
            xhr.setRequestHeader(key, obj.headers[key]);
            });
            }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj.body);
        });
    };

const backendBaseUrl = "http://traveller-backend.azurewebsites.net"

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
    urlParams[decode(match[1])] = decode(match[2]);
})();

function fixUrl(url){
    if(url[0]=="/"){
        return (backendBaseUrl+url);
    }
    return url;
}

var TimeAgo = (function() {
    var self = {};

    // Public Methods
    self.locales = {
      prefix: '',
      sufix:  'ago',

      seconds: 'less than a minute',
      minute:  'one minute',
      minutes: '%d minutes',
      hour:    'one hour',
      hours:   'about %d hours',
      day:     'a day',
      days:    '%d days',
      month:   'one month',
      months:  '%d months',
      year:    'one year',
      years:   '%d years'
    };

    self.inWords = function(timeAgo) {
        var dateGiven = new Date(timeAgo);
        console.log(`${dateGiven} : ${new Date()}`)
      var seconds = Math.floor((new Date().getTime() - parseInt(timeAgo)) / 1000),
          separator = this.locales.separator || ' ',
          words = this.locales.prefix + separator,
          interval = 0,
          intervals = {
            year:   seconds / 31536000,
            month:  seconds / 2592000,
            day:    seconds / 86400,
            hour:   seconds / 3600,
            minute: seconds / 60
          };

      var distance = this.locales.seconds;

      for (var key in intervals) {
        interval = Math.floor(intervals[key]);

        if (interval > 1) {
          distance = this.locales[key + 's'];
          break;
        } else if (interval === 1) {
          distance = this.locales[key];
          break;
        }
      }

      distance = distance.replace(/%d/i, interval);
      words += distance + separator + this.locales.sufix;

      return words.trim();
    };

    return self;
  }());

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}
