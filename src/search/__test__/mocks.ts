export const mock1 = {
  name: "cleveland",
}

export const mock2 = {
  stateName: "alaska",
}

export const mock3 = {
  availability: {
    from: "10:10",
    to: "12:00"
  }
}

export const invalidMock1 = {
  availability: {
    from: "10:10",
    to: "08:10"
  }
}

export const invalidMock2 = {
  availability: {
    from: "08:64",
    to: "10:10"
  }
}

export const mock4 = {
  name: "clinic",
  stateName: "florida",
}

export const mock5 = {
  name: "uab",
  availability: {
    from: "11:00",
    to: "2o:00"
  }
}

export const mock6 = {
  stateName: "arizona",
  availability: {
    from: "08:30",
    to: "12:30"
  }
}

export const mock7 = {
  name: "test",
  stateName: "ca",
  availability: {
    from: "00:12",
    to: "10:22"
  }
}
