import Category from "../models/category";
import Meal from "../models/meal";

export const CATEGORIES = [
  new Category("c1", "Sandra", "#f41405"),
  new Category("c2", "Madison", "#882b31"),
  new Category("c3", "Alan", "#686d91"),
  new Category("c4", "Emily", "#51a56e"),
  new Category("c5", "Monica", "#4bd451"),
  new Category("c6", "Karen", "#91b5db"),
  new Category("c7", "Maria", "#4e5cfe"),
  new Category("c8", "Tiffany", "#2ec5e5"),
  new Category("c9", "Amanda", "#dd415a"),
  new Category("c10", "Taylor", "#ed91bf"),
  new Category("c11", "Daniel", "#c0cdf2"),
  new Category("c12", "Kristina", "#72c35e"),
  new Category("c13", "Seth", "#100590"),
  new Category("c14", "Barbara", "#6ae4e2"),
  new Category("c15", "Tina", "#17c804"),
  new Category("c16", "Stephen", "#f8e06b"),
  new Category("c17", "Nancy", "#a261ad"),
  new Category("c18", "Diana", "#83b3b4"),
  new Category("c19", "Angela", "#ee8993"),
  new Category("c20", "Steven", "#ff5cf1"),
];

export const MEALS = [
  new Meal(
    "s1",
    ["C1"],
    "Sandra",
    "Grade 12",
    "https://example.com/student-photos/sandra.jpg",
    ["Algebra: A+", "Geometry: A", "Physics: B+", "Chemistry: A-"],
    ["Math homework submitted on time", "Science project submitted late"],
    true, // Participates in extracurricular activities
    false, // Needs improvement in Science
    true, // Homework consistently submitted on time
    true // Eligible for honor roll
  ),

  new Meal(
    "s2",
    ["C2"],
    "Madison",
    "Grade 11",
    "https://example.com/student-photos/madison.jpg",
    [
      "Biology: B",
      "Earth Science: A",
      "Physics: C+",
      "Environmental Science: B-",
    ],
    ["Biology lab reports completed", "Participated in science fair"],
    true,
    false,
    true,
    false
  ),
];
