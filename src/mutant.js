const Diagonal = Symbol("diagonal")
const Vertical = Symbol("vertical")
const Horizontal = Symbol("horizontal")

// returns true if is a mutant , otherwise returns false
function validatorDna(direction, dna) {
    const limit = 4;

    var isMatch = false;
    // Limit to iterate in x
    var firstLimit = 0;
    // Limit to iterate in y
    var secondLimit = 0;

    // Set limits by direction
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

    // Choose the x position to start to compare
    for (var i = 0; i < firstLimit; i++) {

        // Choose the y position to start to compare
        for (var j = 0; j <= secondLimit; j++) {
            isMatch = true;
            var sequence = [];
            var next = dna[i].substring(j, j + 1);

            if (!next) return false;

            sequence.push(next);

            // Counter number of items to match
            for (var counter = 1; counter < limit && isMatch; counter++) {

                // Get the next position by direction to compare
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
    // Verify the basic directions
    var result = [Diagonal, Vertical, Horizontal].some(function (direction) {
        return validatorDna(direction, dna)
    });

    if (result) return true;

    // If not found a match, check a diagonal ascendant 
    const transformDna = dna.map(str => str.split('').reverse().join(''));

    return validatorDna(Diagonal, transformDna)
}