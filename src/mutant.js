const Diagonal = Symbol("diagonal")
const Vertical = Symbol("vertical")
const Horizontal = Symbol("horizontal")



function validatorDna(direction, dna) {
    const limit = 4;

    var isMatch = false;
    var firstLimit = 0;
    var secondLimit = 0;

    switch (direction) {
        case Diagonal:
            firstLimit = dna.length - limit
            secondLimit = dna.length - limit
            break;
        case Horizontal:
            firstLimit = dna.length
            secondLimit = dna.length - limit
            break;
        case Vertical:
            firstLimit = dna.length - limit
            secondLimit = dna.length
            break;
    }


    for (var i = 0; i < firstLimit; i++) {
        for (var j = 0; j <= secondLimit; j++) {
            isMatch = true;
            var sequence = [];
            var next = dna[i].substring(j, j + 1);

            if (!next) return false;

            sequence.push(next);

            for (var counter = 1; counter < limit && isMatch; counter++) {
                switch (direction) {
                    case Diagonal:
                        sequence.push(dna[i + counter].substring(j + counter, j + counter + 1));
                        break;

                    case Horizontal:
                        sequence.push(dna[i].substring(j + counter, j + counter + 1));
                        break;

                    case Vertical:
                        sequence.push(dna[i + counter].substring(j, j + 1));
                        break;
                }

                isMatch = isMatch && (sequence[0] == sequence[counter]);
            }

            if (isMatch) return true;
        }

    }

    return false;
}

module.exports = function isMutant(dna) {
    var result = [Diagonal, Vertical, Horizontal].some(function (direction) {
        return validatorDna(direction, dna)
    });

    if (result) return true;

    const transformDna = dna.map(str => str.split('').reverse().join(''));

    return validatorDna(Diagonal, transformDna)
}