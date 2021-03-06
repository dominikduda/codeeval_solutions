function DataRecoverer(input) {
    this.input = input;
}

Object.defineProperty(DataRecoverer.prototype, 'words', {
    get: function() {
        return this.input.split(';')[0].split(' ');
    }
});

Object.defineProperty(DataRecoverer.prototype, 'indexes', {
    get: function() {
        var integers = this.input.split(';')[1].split(' ').map(function(num) {
            return parseInt(num);
        });
        integers.push(this._missingIndex(integers));
        return integers;
    }
});

DataRecoverer.prototype._missingIndex = function(indexes) {
    for (var i = 1; i <= indexes.length; i++) {
        if (indexes.indexOf(i) == -1) {
            return i;
        }
    }
    return indexes.length + 1;
};

DataRecoverer.prototype.reconstructedSentence = function() {
    var sentence = [];
    for (var i = 0; i < this.indexes.length; i++) {
        var wordIndex = this.indexes[i] - 1;
        sentence[wordIndex] = this.words[i];
    }
    return sentence.join(' ');
};

var fs = require('fs');
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != '') {
        var dataRecoverer = new DataRecoverer(line);
        console.log(dataRecoverer.reconstructedSentence());
    }
});
