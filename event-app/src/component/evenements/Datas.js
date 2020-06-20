var d = new Date();
var date = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();
var dT = year + "-" + month + "-" + date;
var dateStr = dT.replace(/-0+/g, "-");
export const Start_date = [
  {
    _id: 0,
    name: "Toutes les dates",
    array: [],
  },
  {
    _id: 1,
    name: "Aujourd'hui",
    array: [
      new Date(dateStr).getTime(),
      new Date(dateStr).getTime() + 86400000 - 1,
    ],
  },
  {
    _id: 2,
    name: "Cette semaine",
    array: [
      new Date(dateStr).getTime(),
      new Date(dateStr).getTime() + 604800000 - 1,
    ],
  },
  {
    _id: 3,
    name: "Ce mois-ci",
    array: [
      new Date(dateStr).getTime(),
      new Date(dateStr).getTime() + 2592000000 - 1,
    ],
  },
  {
    _id: 4,
    name: "Cette année",
    array: [
      new Date(dateStr).getTime(),
      new Date(dateStr).getTime() + 31536000000 - 1,
    ],
  },
];

export const Type_event = [
  { _id: 1, value: "Sportif" },
  { _id: 2, value: "Educatif" },
  { _id: 3, value: "Scientifique" },
  { _id: 4, value: "Culturel" },
  { _id: 5, value: "Artisanat" },
  { _id: 6, value: "Festivate" },
];
