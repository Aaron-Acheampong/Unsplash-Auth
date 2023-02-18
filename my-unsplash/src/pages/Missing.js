import React from 'react';
import { Link } from "react-router-dom";

export default function Missing() {
  return (
    <div>
      <h1>Oops!</h1>
        <p>Page Not Found</p>
        <div className="flexGrow">
        <Link to="/">Visit Our Homepage</Link>
            </div>
    </div>
  )
}
