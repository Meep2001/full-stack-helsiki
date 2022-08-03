import React from "react";
import { Part } from "./Part";
import { Header } from "./Header";
import { Total } from "./Total";

export const Course = ({ course }) => {
  const total = course.parts.reduce((r,cV)=>r+cV.exercises,0);
  return (
    <>
      <Header course={course.name}></Header>
      {course.parts.map((part) => {
        return <Part key={part.id} part={part}></Part>;
      })}
      <Total total={total}></Total>
    </>
  );
};
