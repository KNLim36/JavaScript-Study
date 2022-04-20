function pushToValueObject(newTimestamp, newValue) {
    valueObject[Object.keys(valueObject).length] = Object.freeze({
        timestamp: newTimestamp,
        value: newValue,
    });
}

function checkIfValueWasTampered() {
    let valueDifferences = [];

    for (let i = 0; i < Object.keys(valueObject).length; i++) {
        if (i !== Object.keys(valueObject).length - 1) {
            valueDifferences.push(
                valueObject[i + 1].value - valueObject[i].value
            );
        }
    }

    /* Check fails if
    1) First value object timestamp is not the game start time
    2) Final value object timestamp is not the game over time
    3) value increment is higher than the actual possible value
    4) The valueObject length is not the same with vTick (value object tick)
    */
    if (
        valueObject[0].timestamp !== this.gamePlayStartTime ||
        valueObject[Object.keys(valueObject).length - 1].timestamp !==
            this.gameOverTime ||
        Math.max(...valueDifferences) > this.maximumAllowedScoreIncrement ||
        Object.keys(valueObject).length !== this.vTick
    ) {
        return true;
    } else {
        return false;
    }
}
