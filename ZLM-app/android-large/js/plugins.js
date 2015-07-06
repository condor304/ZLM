String.prototype.hashCode = function(){
    var hash = 0, i, char;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

function unique(array){
    return $.grep(array,function(el,index){
        return index == $.inArray(el,array);
    });
}

// Place any jQuery/helper plugins in here.

function explode (delimiter, string, limit) {

  if ( arguments.length < 2 || typeof delimiter == 'undefined' || typeof string == 'undefined' ) return null;
  if ( delimiter === '' || delimiter === false || delimiter === null) return false;
  if ( typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object'){
    return { 0: '' };
  }
  if ( delimiter === true ) delimiter = '1';
  
  // Here we go...
  delimiter += '';
  string += '';
  
  var s = string.split( delimiter );
  

  if ( typeof limit === 'undefined' ) return s;
  
  // Support for limit
  if ( limit === 0 ) limit = 1;
  
  // Positive limit
  if ( limit > 0 ){
    if ( limit >= s.length ) return s;
    return s.slice( 0, limit - 1 ).concat( [ s.slice( limit - 1 ).join( delimiter ) ] );
  }

  // Negative limit
  if ( -limit >= s.length ) return [];
  
  s.splice( s.length + limit );
  return s;
}

function date (format, timestamp) {
  // http://kevin.vanzonneveld.net
  // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
  // +      parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: MeEtc (http://yass.meetcweb.com)
  // +   improved by: Brad Touesnard
  // +   improved by: Tim Wiel
  // +   improved by: Bryan Elliott
  //
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: David Randall
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // +  derived from: gettimeofday
  // +      input by: majak
  // +   bugfixed by: majak
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Alex
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // +   improved by: Thomas Beaucourt (http://www.webapp.fr)
  // +   improved by: JT
  // +   improved by: Theriault
  // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
  // +   bugfixed by: omid (http://phpjs.org/functions/380:380#comment_137122)
  // +      input by: Martin
  // +      input by: Alex Wilson
  // +   bugfixed by: Chris (http://www.devotis.nl/)
  // %        note 1: Uses global: php_js to store the default timezone
  // %        note 2: Although the function potentially allows timezone info (see notes), it currently does not set
  // %        note 2: per a timezone specified by date_default_timezone_set(). Implementers might use
  // %        note 2: this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST set by that function
  // %        note 2: in order to adjust the dates in this function (or our other date functions!) accordingly
  // *     example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
  // *     returns 1: '09:09:40 m is month'
  // *     example 2: date('F j, Y, g:i a', 1062462400);
  // *     returns 2: 'September 2, 2003, 2:26 am'
  // *     example 3: date('Y W o', 1062462400);
  // *     returns 3: '2003 36 2003'
  // *     example 4: x = date('Y m d', (new Date()).getTime()/1000);
  // *     example 4: (x+'').length == 10 // 2009 01 09
  // *     returns 4: true
  // *     example 5: date('W', 1104534000);
  // *     returns 5: '53'
  // *     example 6: date('B t', 1104534000);
  // *     returns 6: '999 31'
  // *     example 7: date('W U', 1293750000.82); // 2010-12-31
  // *     returns 7: '52 1293750000'
  // *     example 8: date('W', 1293836400); // 2011-01-01
  // *     returns 8: '52'
  // *     example 9: date('W Y-m-d', 1293974054); // 2011-01-02
  // *     returns 9: '52 2011-01-02'
  var that = this,
    jsdate, f, formatChr = /\\?([a-z])/gi,
    formatChrCb,
    // Keep this here (works, but for code commented-out
    // below for file size reasons)
    //, tal= [],
    _pad = function (n, c) {
      if ((n = n + '').length < c) {
        return new Array((++c) - n.length).join('0') + n;
      }
      return n;
    },
    txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  formatChrCb = function (t, s) {
    return f[t] ? f[t]() : s;
  };
  f = {
    // Day
    d: function () { // Day of month w/leading 0; 01..31
      return _pad(f.j(), 2);
    },
    D: function () { // Shorthand day name; Mon...Sun
      return f.l().slice(0, 3);
    },
    j: function () { // Day of month; 1..31
      return jsdate.getDate();
    },
    l: function () { // Full day name; Monday...Sunday
      return txt_words[f.w()] + 'day';
    },
    N: function () { // ISO-8601 day of week; 1[Mon]..7[Sun]
      return f.w() || 7;
    },
    S: function () { // Ordinal suffix for day of month; st, nd, rd, th
      var j = f.j();
      return j < 4 | j > 20 && ['st', 'nd', 'rd'][j%10 - 1] || 'th';
    },
    w: function () { // Day of week; 0[Sun]..6[Sat]
      return jsdate.getDay();
    },
    z: function () { // Day of year; 0..365
      var a = new Date(f.Y(), f.n() - 1, f.j()),
        b = new Date(f.Y(), 0, 1);
      return Math.round((a - b) / 864e5) + 1;
    },

    // Week
    W: function () { // ISO-8601 week number
      var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3),
        b = new Date(a.getFullYear(), 0, 4);
      return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
    },

    // Month
    F: function () { // Full month name; January...December
      return txt_words[6 + f.n()];
    },
    m: function () { // Month w/leading 0; 01...12
      return _pad(f.n(), 2);
    },
    M: function () { // Shorthand month name; Jan...Dec
      return f.F().slice(0, 3);
    },
    n: function () { // Month; 1...12
      return jsdate.getMonth() + 1;
    },
    t: function () { // Days in month; 28...31
      return (new Date(f.Y(), f.n(), 0)).getDate();
    },

    // Year
    L: function () { // Is leap year?; 0 or 1
      var j = f.Y();
      return j%4==0 & j%100!=0 | j%400==0;
    },
    o: function () { // ISO-8601 year
      var n = f.n(),
        W = f.W(),
        Y = f.Y();
      return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
    },
    Y: function () { // Full year; e.g. 1980...2010
      return jsdate.getFullYear();
    },
    y: function () { // Last two digits of year; 00...99
      return (f.Y() + "").slice(-2);
    },

    // Time
    a: function () { // am or pm
      return jsdate.getHours() > 11 ? "pm" : "am";
    },
    A: function () { // AM or PM
      return f.a().toUpperCase();
    },
    B: function () { // Swatch Internet time; 000..999
      var H = jsdate.getUTCHours() * 36e2,
        // Hours
        i = jsdate.getUTCMinutes() * 60,
        // Minutes
        s = jsdate.getUTCSeconds(); // Seconds
      return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
    },
    g: function () { // 12-Hours; 1..12
      return f.G() % 12 || 12;
    },
    G: function () { // 24-Hours; 0..23
      return jsdate.getHours();
    },
    h: function () { // 12-Hours w/leading 0; 01..12
      return _pad(f.g(), 2);
    },
    H: function () { // 24-Hours w/leading 0; 00..23
      return _pad(f.G(), 2);
    },
    i: function () { // Minutes w/leading 0; 00..59
      return _pad(jsdate.getMinutes(), 2);
    },
    s: function () { // Seconds w/leading 0; 00..59
      return _pad(jsdate.getSeconds(), 2);
    },
    u: function () { // Microseconds; 000000-999000
      return _pad(jsdate.getMilliseconds() * 1000, 6);
    },

    // Timezone
    e: function () { // Timezone identifier; e.g. Atlantic/Azores, ...
      // The following works, but requires inclusion of the very large
      // timezone_abbreviations_list() function.
/*              return that.date_default_timezone_get();
*/
      throw 'Not supported (see source code of date() for timezone on how to add support)';
    },
    I: function () { // DST observed?; 0 or 1
      // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
      // If they are not equal, then DST is observed.
      var a = new Date(f.Y(), 0),
        // Jan 1
        c = Date.UTC(f.Y(), 0),
        // Jan 1 UTC
        b = new Date(f.Y(), 6),
        // Jul 1
        d = Date.UTC(f.Y(), 6); // Jul 1 UTC
      return 0 + ((a - c) !== (b - d));
    },
    O: function () { // Difference to GMT in hour format; e.g. +0200
      var tzo = jsdate.getTimezoneOffset(),
        a = Math.abs(tzo);
      return (tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
    },
    P: function () { // Difference to GMT w/colon; e.g. +02:00
      var O = f.O();
      return (O.substr(0, 3) + ":" + O.substr(3, 2));
    },
    T: function () { // Timezone abbreviation; e.g. EST, MDT, ...
      // The following works, but requires inclusion of the very
      // large timezone_abbreviations_list() function.
/*              var abbr = '', i = 0, os = 0, default = 0;
      if (!tal.length) {
        tal = that.timezone_abbreviations_list();
      }
      if (that.php_js && that.php_js.default_timezone) {
        default = that.php_js.default_timezone;
        for (abbr in tal) {
          for (i=0; i < tal[abbr].length; i++) {
            if (tal[abbr][i].timezone_id === default) {
              return abbr.toUpperCase();
            }
          }
        }
      }
      for (abbr in tal) {
        for (i = 0; i < tal[abbr].length; i++) {
          os = -jsdate.getTimezoneOffset() * 60;
          if (tal[abbr][i].offset === os) {
            return abbr.toUpperCase();
          }
        }
      }
*/
      return 'UTC';
    },
    Z: function () { // Timezone offset in seconds (-43200...50400)
      return -jsdate.getTimezoneOffset() * 60;
    },

    // Full Date/Time
    c: function () { // ISO-8601 date.
      return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
    },
    r: function () { // RFC 2822
      return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
    },
    U: function () { // Seconds since UNIX epoch
      return jsdate / 1000 | 0;
    }
  };
  this.date = function (format, timestamp) {
    that = this;
    jsdate = (timestamp == null ? new Date() : // Not provided
      (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
      new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
    );
    return format.replace(formatChr, formatChrCb);
  };
  return this.date(format, timestamp);
}

function strtotime (str, now) {
  // http://kevin.vanzonneveld.net
  // +   original by: Caio Ariede (http://caioariede.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: David
  // +   improved by: Caio Ariede (http://caioariede.com)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Wagner B. Soares
  // +   bugfixed by: Artur Tchernychev
  // +   input by: wookie
  // %        note 1: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
  // *     example 1: strtotime('+1 day', 1129633200);
  // *     returns 1: 1129719600
  // *     example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
  // *     returns 2: 1130425202
  // *     example 3: strtotime('last month', 1129633200);
  // *     returns 3: 1127041200
  // *     example 4: strtotime('2009-05-04 08:30:00');
  // *     returns 4: 1241418600
  var i, l, match, s, parse = '';

  str = (str + '').replace(/\s{2,}|^\s|\s$/g, ' ').replace(/[\t\r\n]/g, '');; // unecessary spaces and chars

  if (str === 'now') {
    return now === null || isNaN(now) ? new Date().getTime() / 1000 | 0 : now | 0;
  } else if (!isNaN(parse = Date.parse(str))) {
    return parse / 1000 | 0;
  } else if (now) {
    now = new Date(now * 1000); // Accept PHP-style seconds
  } else {
    now = new Date();
  }

  str = str.toLowerCase();

  var __is = {
    day: {
      'sun': 0,
      'mon': 1,
      'tue': 2,
      'wed': 3,
      'thu': 4,
      'fri': 5,
      'sat': 6
    },
    mon: [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec'
    ]
  };

  var process = function (m) {
    var ago = (m[2] && m[2] === 'ago');
    var num = (num = m[0] === 'last' ? -1 : 1) * (ago ? -1 : 1);

    switch (m[0]) {
    case 'last':
    case 'next':
      switch (m[1].substring(0, 3)) {
      case 'yea':
        now.setFullYear(now.getFullYear() + num);
        break;
      case 'wee':
        now.setDate(now.getDate() + (num * 7));
        break;
      case 'day':
        now.setDate(now.getDate() + num);
        break;
      case 'hou':
        now.setHours(now.getHours() + num);
        break;
      case 'min':
        now.setMinutes(now.getMinutes() + num);
        break;
      case 'sec':
        now.setSeconds(now.getSeconds() + num);
        break;
      case 'mon':
        if (m[1] === "month") {
          now.setMonth(now.getMonth() + num);
          break;
        }
        // fall through
      default:
        var day = __is.day[m[1].substring(0, 3)];
        if (typeof day !== 'undefined') {
          var diff = day - now.getDay();
          if (diff === 0) {
            diff = 7 * num;
          } else if (diff > 0) {
            if (m[0] === 'last') {
              diff -= 7;
            }
          } else {
            if (m[0] === 'next') {
              diff += 7;
            }
          }
          now.setDate(now.getDate() + diff);
          now.setHours(0, 0, 0, 0); // when jumping to a specific last/previous day of week, PHP sets the time to 00:00:00
        }
      }
      break;

    default:
      if (/\d+/.test(m[0])) {
        num *= parseInt(m[0], 10);

        switch (m[1].substring(0, 3)) {
        case 'yea':
          now.setFullYear(now.getFullYear() + num);
          break;
        case 'mon':
          now.setMonth(now.getMonth() + num);
          break;
        case 'wee':
          now.setDate(now.getDate() + (num * 7));
          break;
        case 'day':
          now.setDate(now.getDate() + num);
          break;
        case 'hou':
          now.setHours(now.getHours() + num);
          break;
        case 'min':
          now.setMinutes(now.getMinutes() + num);
          break;
        case 'sec':
          now.setSeconds(now.getSeconds() + num);
          break;
        }
      } else {
        return false;
      }
      break;
    }
    return true;
  };

  match = str.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/);
  if (match !== null) {
    if (!match[2]) {
      match[2] = '00:00:00';
    } else if (!match[3]) {
      match[2] += ':00';
    }

    s = match[1].split(/-/g);

    s[1] = __is.mon[s[1] - 1] || s[1];
    s[0] = +s[0];

    s[0] = (s[0] >= 0 && s[0] <= 69) ? '20' + (s[0] < 10 ? '0' + s[0] : s[0] + '') : (s[0] >= 70 && s[0] <= 99) ? '19' + s[0] : s[0] + '';
    return parseInt(this.strtotime(s[2] + ' ' + s[1] + ' ' + s[0] + ' ' + match[2]) + (match[4] ? match[4] / 1000 : ''), 10);
  }

  var regex = '([+-]?\\d+\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)' + '|(last|next)\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))' + '(\\sago)?';

  match = str.match(new RegExp(regex, 'gi')); // Brett: seems should be case insensitive per docs, so added 'i'
  if (match === null) {
    return false;
  }

  for (i = 0, l = match.length; i < l; i++) {
    if (!process(match[i].split(' '))) {
      return false;
    }
  }

  return now.getTime() / 1000 | 0;
}

$.fn.timer = function( userdefinedoptions ){
	var $this = $(this),
					opt,
					count = 0;

	$this.hide();
	var number = (parseInt($('#percent').val())+parseInt(1.0));
	$('#percent').val(number);
	$('.fill').css('width', (100-number)+'%');

};

function getWidmarkFactor(sex, kg, cm)
{
	if (sex=="M")
	{
		$widmark = {"150":{"45":"0.78","50":"0.75","55":"0.72","60":"0.69","65":"0.67","70":"","75":"","80":"","85":"","90":"","95":"","100":"","105":"","110":"","115":"","":null},"155":{"45":"0.79","50":"0.77","55":"0.74","60":"0.71","65":"0.69","70":"0.66","75":"","80":"","85":"","90":"","95":"","100":"","105":"","110":"","115":"","":null},"160":{"45":"0.8","50":"0.78","55":"0.76","60":"0.73","65":"0.71","70":"0.69","75":"0.66","80":"","85":"","90":"","95":"","100":"","105":"","110":"","115":"","":null},"165":{"45":"0.82","50":"0.8","55":"0.77","60":"0.75","65":"0.73","70":"0.71","75":"0.68","80":"0.66","85":"","90":"","95":"","100":"","105":"","110":"","115":"","":null},"170":{"45":"0.83","50":"0.81","55":"0.79","60":"0.77","65":"0.75","70":"0.72","75":"0.7","80":"0.68","85":"0.66","90":"","95":"","100":"","105":"","110":"","115":"","":null},"175":{"45":"","50":"0.82","55":"0.8","60":"0.78","65":"0.76","70":"0.74","75":"0.72","80":"0.7","85":"0.68","90":"0.66","95":"","100":"","105":"","110":"","115":"","":null},"180":{"45":"","50":"0.83","55":"0.81","60":"0.79","65":"0.77","70":"0.76","75":"0.74","80":"0.72","85":"0.7","90":"0.68","95":"0.66","100":"","105":"","110":"","115":"","":null},"185":{"45":"","50":"","55":"0.82","60":"0.81","65":"0.79","70":"0.77","75":"0.75","80":"0.73","85":"0.72","90":"0.7","95":"0.68","100":"0.66","105":"","110":"","115":"","":null},"190":{"45":"","50":"","55":"0.83","60":"0.82","65":"0.8","70":"0.78","75":"0.77","80":"0.75","85":"0.73","90":"0.72","95":"0.7","100":"0.68","105":"0.67","110":"","115":"","":null},"195":{"45":"","50":"","55":"","60":"0.83","65":"0.81","70":"0.79","75":"0.78","80":"0.76","85":"0.75","90":"0.73","95":"0.71","100":"0.7","105":"0.68","110":"0.67","115":"","":null},"200":{"45":"","50":"","55":"","60":"0.84","65":"0.82","70":"0.81","75":"0.79","80":"0.78","85":"0.76","90":"0.74","95":"0.73","100":"0.71","105":"0.7","110":"0.68","115":"0.67","":null},"205":{"45":"","50":"","55":"","60":"","65":"0.83","70":"0.82","75":"0.8","80":"0.79","85":"0.77","90":"0.76","95":"0.74","100":"0.73","105":"0.71","110":"0.7","115":"0.69","":null}};
	}

	if (sex=="F")
	{
		$widmark = {"150":{"45":"0.69","50":"0.66","55":"0.63","60":"0.61","65":"0.58","70":"","75":"","80":"","85":"","90":"","95":"","100":"","105":"","110":"","115":"","":null},"155":{"45":"0.7","50":"0.68","55":"0.65","60":"0.63","65":"0.6","70":"0.57","75":"","80":"","85":"","90":"","95":"","100":"","105":"","110":"","115":"","":null},"160":{"45":"0.72","50":"0.69","55":"0.67","60":"0.65","65":"0.62","70":"0.6","75":"0.57","80":"","85":"","90":"","95":"","100":"","105":"","110":"","115":"","":null},"165":{"45":"0.73","50":"0.71","55":"0.69","60":"0.66","65":"0.64","70":"0.62","75":"0.59","80":"0.57","85":"","90":"","95":"","100":"","105":"","110":"","115":"","":null},"170":{"45":"0.74","50":"0.72","55":"0.7","60":"0.68","65":"0.66","70":"0.64","75":"0.61","80":"0.59","85":"0.57","90":"","95":"","100":"","105":"","110":"","115":"","":null},"175":{"45":"","50":"0.73","55":"0.71","60":"0.69","65":"0.67","70":"0.65","75":"0.63","80":"0.61","85":"0.59","90":"0.57","95":"","100":"","105":"","110":"","115":"","":null},"180":{"45":"","50":"0.74","55":"0.73","60":"0.71","65":"0.69","70":"0.67","75":"0.65","80":"0.63","85":"0.61","90":"0.59","95":"0.57","100":"","105":"","110":"","115":"","":null},"185":{"45":"","50":"","55":"0.74","60":"0.72","65":"0.7","70":"0.68","75":"0.66","80":"0.65","85":"0.63","90":"0.61","95":"0.59","100":"0.57","105":"","110":"","115":"","":null},"190":{"45":"","50":"","55":"0.75","60":"0.73","65":"0.71","70":"0.7","75":"0.68","80":"0.66","85":"0.64","90":"0.63","95":"0.61","100":"0.59","105":"0.58","110":"","115":"","":null},"195":{"45":"","50":"","55":"","60":"0.74","65":"0.72","70":"0.71","75":"0.69","80":"0.68","85":"0.66","90":"0.64","95":"0.63","100":"0.61","105":"0.59","110":"0.58","115":"","":null},"200":{"45":"","50":"","55":"","60":"0.75","65":"0.73","70":"0.72","75":"0.7","80":"0.69","85":"0.67","90":"0.66","95":"0.64","100":"0.63","105":"0.61","110":"0.6","115":"0.58","":null},"205":{"45":"","50":"","55":"","60":"","65":"0.74","70":"0.73","75":"0.71","80":"0.7","85":"0.69","90":"0.67","95":"0.66","100":"0.64","105":"0.63","110":"0.61","115":"0.6","":null}};
	}

	if (kg%5!=0)
	{
		var $mod = kg % 5;
		kg = kg - $mod;
	}

	if (cm%5!=0)
	{
		var $mod = cm % 5;
		cm = cm - $mod;
	}

	try
	{
		if (kg>115) kg = 115;
		if (kg<45) kg = 45;
		if (cm<150) cm = 150;
		if (cm>205) cm = 205;
		if (kg<65)
		{
			while (!($widmark[cm][kg]>0))
			{
				kg += 5;
			}
		}

		if (kg>65)
		{
			while (!($widmark[cm][kg]>0))
			{
				kg -= 5;
			}
		}

		if ($widmark[cm][kg]>0)
		{
			return $widmark[cm][kg];
		}
	}
	catch (err)
	{
		if (sex=="M")
			return "0.68";

		if (sex=="F")
			return "0.55";
	}
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function round (value, precision, mode) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // +    revised by: Onno Marsman
  // +      input by: Greenseed
  // +    revised by: T.Wild
  // +      input by: meo
  // +      input by: William
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Josep Sanz (http://www.ws3.es/)
  // +    revised by: Rafał Kukawski (http://blog.kukawski.pl/)
  // %        note 1: Great work. Ideas for improvement:
  // %        note 1:  - code more compliant with developer guidelines
  // %        note 1:  - for implementing PHP constant arguments look at
  // %        note 1:  the pathinfo() function, it offers the greatest
  // %        note 1:  flexibility & compatibility possible
  // *     example 1: round(1241757, -3);
  // *     returns 1: 1242000
  // *     example 2: round(3.6);
  // *     returns 2: 4
  // *     example 3: round(2.835, 2);
  // *     returns 3: 2.84
  // *     example 4: round(1.1749999999999, 2);
  // *     returns 4: 1.17
  // *     example 5: round(58551.799999999996, 2);
  // *     returns 5: 58551.8
  var m, f, isHalf, sgn; // helper variables
  precision |= 0; // making sure precision is integer
  m = Math.pow(10, precision);
  value *= m;
  sgn = (value > 0) | -(value < 0); // sign of the number
  isHalf = value % 1 === 0.5 * sgn;
  f = Math.floor(value);

  if (isHalf) {
    switch (mode) {
    case 'PHP_ROUND_HALF_DOWN':
      value = f + (sgn < 0); // rounds .5 toward zero
      break;
    case 'PHP_ROUND_HALF_EVEN':
      value = f + (f % 2 * sgn); // rouds .5 towards the next even integer
      break;
    case 'PHP_ROUND_HALF_ODD':
      value = f + !(f % 2); // rounds .5 towards the next odd integer
      break;
    default:
      value = f + (sgn > 0); // rounds .5 away from zero
    }
  }

  return (isHalf ? value : Math.round(value)) / m;
}

if (!window.localStorage) {
  Object.defineProperty(window, "localStorage", new (function () {
    var aKeys = [], oStorage = {};
    Object.defineProperty(oStorage, "getItem", {
      value: function (sKey) { return sKey ? this[sKey] : null; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "key", {
      value: function (nKeyId) { return aKeys[nKeyId]; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "setItem", {
      value: function (sKey, sValue) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "length", {
      get: function () { return aKeys.length; },
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "removeItem", {
      value: function (sKey) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    this.get = function () {
      var iThisIndx;
      for (var sKey in oStorage) {
        iThisIndx = aKeys.indexOf(sKey);
        if (iThisIndx === -1) { oStorage.setItem(sKey, oStorage[sKey]); }
        else { aKeys.splice(iThisIndx, 1); }
        delete oStorage[sKey];
      }
      for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) { oStorage.removeItem(aKeys[0]); }
      for (var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx < aCouples.length; nIdx++) {
        aCouple = aCouples[nIdx].split(/\s*=\s*/);
        if (aCouple.length > 1) {
          oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
          aKeys.push(iKey);
        }
      }
      return oStorage;
    };
    this.configurable = false;
    this.enumerable = true;
  })());
}
 
//check if click event firing twice on same position.
var lastclickpoint, curclickpoint;
var isJQMGhostClick = function(event){
  curclickpoint = event.clientX+'x'+event.clientY;
  if (lastclickpoint === curclickpoint) {
	lastclickpoint = '';
	return true;
  } else {
	//alert(lastclickpoint);
	lastclickpoint = curclickpoint;
	return false;
  }
}
