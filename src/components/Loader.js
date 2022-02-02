import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  return (
    <div className="sweet-loading text-center">

      <BeatLoader color={"#5f2bf8"} loading={loading} css={override} size={15} />
    </div>
  );
}

export default Loader;
