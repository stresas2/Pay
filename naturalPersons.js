const naturalPersons = {
  history: [],
  weekNumber: sentDate => {
    const date = new Date(sentDate);
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNumber = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
    return weekNumber;
  },
  addHistory: (id, year, week, amount) => {
    const data = {
      id: id,
      data: [
        {
          year: year,
          week: week,
          amount: amount
        }
      ]
    };
    naturalPersons.history.push(data);
  },
  UpdateHistoryPayment: (userID, year, weekNumber, amount) => {
    const newData = {
      year: year,
      week: weekNumber,
      amount: amount
    };
    naturalPersons.history.filter(id => id.id === userID)[0].data.push(newData);
  },
  countFee: (amount, percents, limit) => {
    let fee;
    if (amount > limit) {
      fee = (amount - limit) * percents;
    } else {
      fee = 0;
    }
    return fee;
  },
  countFee2: (pastTotalAmount, newAmount, percents, limit) => {
    let fee;

    if (pastTotalAmount > limit) {
      fee = newAmount * percents;
    } else {
      fee = (newAmount - (limit - pastTotalAmount)) * percents;
    }
    return fee;
  },
  process: (operation, percents, limit) => {
    let finalValue;
    const realPercents = percents / 100;

    // Get new payment year
    const year = Number(operation.date.slice(0, 4));
    // Count which week of year it is
    const weekNumber = naturalPersons.weekNumber(operation.date);

    // Get list from history of user who made the payments
    const idValues = [];
    naturalPersons.history.forEach(data => {
      idValues.push(data.id);
    });

    // Check if exist any payments with this user ID in payments histoty
    switch (idValues.includes(operation.user_id)) {
      // Case when there are no payments in history with this user ID
      case false: {
        // Count Fee
        finalValue = naturalPersons.countFee(
          operation.operation.amount,
          realPercents,
          limit
        );
        // Save in history new payment
        naturalPersons.addHistory(
          operation.user_id,
          year,
          weekNumber,
          operation.operation.amount
        );
        break;
      }
      // Case when there are payments in history with this user ID
      case true: {
        // Get all payments data from past of this user
        const object = naturalPersons.history.filter(
          id => id.id === operation.user_id
        );

        // Get years list of payments when they were made
        const yearValues = [];
        object.forEach(data => {
          yearValues.push(data.data[0].year);
        });

        // Get weeks of year list of payments when they were made
        const weeksValues = [];
        object.forEach(data => {
          weeksValues.push(data.data[0].week);
        });

        // Check if where are payments in history in same year and same week as new payment
        switch (
          !(yearValues.includes(year) && weeksValues.includes(weekNumber))
        ) {
          // Case when new payment doesn't has match payments in history with year and week
          case true: {
            // Count Fee
            finalValue = naturalPersons.countFee(
              operation.operation.amount,
              realPercents,
              limit
            );
            // Update history
            naturalPersons.UpdateHistoryPayment(
              operation.user_id,
              year,
              weekNumber,
              operation.operation.amount
            );
            break;
          }
          // Case when new payment has payments in history with same year and week
          case false: {
            // Get amount of past payments in same weeek and year as new payment
            const pastTotalAmount = naturalPersons.history.filter(
              id => id.id === operation.user_id
            )[0].data[0].amount;

            // Get new payment amount
            const newPaymentAmount = operation.operation.amount;

            // Calculate tax
            finalValue = naturalPersons.countFee2(
              pastTotalAmount,
              newPaymentAmount,
              realPercents,
              limit
            );

            // Update history payment amount with same year and same week
            naturalPersons.history.filter(
              id => id.id === operation.user_id
            )[0].data[0].amount += operation.operation.amount;

            break;
          }
          default: {
            break;
          }
        }
        break;
      }
      default: {
        break;
      }
    }

    // to round the final value
    finalValue = (Math.ceil(finalValue * 100) / 100).toFixed(2);
    return finalValue;
  }
};

module.exports = naturalPersons.process;
