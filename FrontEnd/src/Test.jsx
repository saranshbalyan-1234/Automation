import React, { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    let input = [1, 2, 4];
    let result = [];
    for (var i = 0; i < input.length; i++) {}

    console.log(result);
  }, []);
  return (
    <div>
      <input disabled={true} id="test" value="saransh" />
    </div>
  );
}
