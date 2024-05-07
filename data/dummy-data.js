import Category from "../models/category.js";

const currentDateTime = new Date().toISOString();

const defaultProjects = [
  { name: "Project 1", grade: 0 },
  { name: "Project 2", grade: 0 },
  { name: "Project 3", grade: 0 },
  { name: "Project 4", grade: 0 },
  { name: "Test 1", grade: 0 },
  { name: "Test 2", grade: 0 },
];

export const CATEGORIES = [
  new Category(
    "c1",
    "Sandra",
    "#808080",
    "1063",
    "75001",
    30.7352,
    -94.4347,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c2",
    "Madison",
    "#808080",
    "1063",
    "75002",
    28.3923,
    -99.3997,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c3",
    "Alan",
    "#808080",
    "75006",
    28.3252,
    -101.149,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c4",
    "Emily",
    "#808080",
    "1063",
    "75007",
    26.7985,
    -93.5918,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c5",
    "Monica",
    "#808080",
    "4483",
    "75009",
    34.6012,
    -100.1122,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c6",
    "Karen",
    "#808080",
    "4483",
    "75010",
    29.2906,
    -94.7557,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c7",
    "Maria",
    "#808080",
    "4483",
    "75013",
    36.0098,
    -94.8012,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c8",
    "Tiffany",
    "#808080",
    "4483",
    "75014",
    33.0063,
    -95.55,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c9",
    "Amanda",
    "#808080",
    "4883",
    "75015",
    28.5828,
    -94.8556,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c10",
    "Taylor",
    "#808080",
    "4883",
    "75016",
    33.2381,
    -94.0381,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c11",
    "Daniel",
    "#808080",
    "4883",
    "75017",
    26.3264,
    -100.0765,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c12",
    "Kristina",
    "#808080",
    "4883",
    "75018",
    34.7158,
    -103.193,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c13",
    "Seth",
    "#808080",
    "4883",
    "75019",
    32.4058,
    -93.7857,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c14",
    "Barbara",
    "#808080",
    "4883",
    "75020",
    31.0318,
    -104.5984,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c15",
    "Tina",
    "#808080",
    "4883",
    "75021",
    31.128,
    -94.3933,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c16",
    "Stephen",
    "#808080",
    "4883",
    "75022",
    28.5242,
    -95.7135,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c17",
    "Nancy",
    "#808080",
    "4483",
    "75023",
    31.0836,
    -98.0079,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c18",
    "Diana",
    "#808080",
    "4483",
    "75024",
    29.0661,
    -98.65,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c19",
    "Angela",
    "#808080",
    "4483",
    "75025",
    33.7212,
    -104.6381,
    currentDateTime,
    [...defaultProjects]
  ),
  new Category(
    "c20",
    "Steven",
    "#808080",
    "4483",
    "75026",
    26.1179,
    -96.0975,
    currentDateTime,
    [...defaultProjects]
  ),
];
