export const fakeData = [
  {
    $id: 1,
    body: JSON.stringify(
      'note 1 (this note is purple)',
    ),
    color: JSON.stringify({
      id: "color-purple",
      colorHeader: "#FED0FD",
      colorBody: "#FEE5FD",
      colorText: "#18181A",
    }),
    position: JSON.stringify({ x: 505, y: 10 }),
  },
  {
    $id: 2,
    body: JSON.stringify(
      'note 2 (this note is blue)',
    ),
    color: JSON.stringify({
      id: "color-blue",
      colorHeader: "#9BD1DE",
      colorBody: "#A6DCE9",
      colorText: "#18181A",
    }),
    position: JSON.stringify({ x: 305, y: 110 }),
  },
  {
    $id: 3,
    body: JSON.stringify(
      'note 3 (this note is yellow)',
    ),
    color: JSON.stringify({
      id: "color-yellow",
      colorHeader: "#FFEFBE",
      colorBody: "#FFF5DF",
      colorText: "#18181A",
    }),
    position: JSON.stringify({ x: 605, y: 500 }),
  },
];
