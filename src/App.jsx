import { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-6">
      <Link to={"/search"}>Click here to go first route</Link>
      <Link to={"/olpage"}>Click here to go second route</Link>
      <ol className="list-decimal">
        <h3 className="font-semibold text-lg">Steps to delete a polygon</h3>
        <li className="list">
          First make a polygon by clicking on the 4 vertices of ploygon
        </li>
        <li>Outline of polygon will turn red to blue</li>
        <li>
          Hold ALt and click on poylgon the click the delete selected button
        </li>
      </ol>
      <ol className="list-decimal">
        <h3 className="font-semibold text-lg">Steps to edit a polygon</h3>
        <li className="list">First click on any of the vertice of polygon</li>
        <li>Then that will start to stretch along with cursor click to stop</li>
        <li>
          Repeat step2 different vertices until the required polygon is formed
        </li>
      </ol>
    </div>
  );
}

export default App;
