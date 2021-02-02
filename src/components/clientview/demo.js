import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Dialog } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    height: theme.spacing(2),
    border: "1px solid #000",
    padding: "15px 15px 15px 15px",
    margin: "10px 0px 0px 10px",
    height: "165px",

    "& > *": {
      margin: theme.spacing(2),
      width: theme.spacing(2),
    },
  },
  h4heading: {
    padding: "10px 130px",
  },
  crossBtn: {
    position: "relative",
    bottom: "80%",
    left: "40%",
    color: "red",
    fontSize: "16px",
  },
}));

export default function Ifsc_searchdata() {
  const classes = useStyles();
  const [getDataList, setDataList] = useState([]);
  const [getIFSC, setIFSC] = useState("");

  useEffect(function () {
    handleClick();
  }, []);

  const handleClick = async () => {
    const URL = `https://ifsc.razorpay.com/${getIFSC}`;
    const response = await fetch(URL)
      .then((data) => data.json())
      .then((dataJSON) => {
        console.log(dataJSON);
        setDataList([...getDataList, dataJSON]);
      })
      .catch((err) => console.log(err));
    //    const data = response.json()
    //    setDataList(data);
    //    console.log("Hello", data);
  };

  const fetchData = () => {
    const arr = [];
    getDataList.map((item) => arr.push(item));
    console.log(arr.reverse());
    return arr.slice(0, 5).map((item, index) => {
      return (
        <div>
          <div className={classes.root}>
            <Paper elevation={0} />
            BANK:{item.BANK}
            <br />
            IFSC:{item.IFSC}
            <br />
            BRANCH:{item.BRANCH}
            <br />
            ADDRESS:{item.ADDRESS}
            <br />
            CONTACT:{item.CONTACT}
            <br />
            CITY:{item.CITY}
            <br />
            DISTRICT:{item.DISTRICT}
            <br />
            STATE:{item.STATE}
            <br />
          </div>
          {index ? (
            <a
              className={classes.crossBtn}
              onClick={() => {
                var ar = [];
                getDataList.map((itm, indx) => {
                  if (index != indx) {
                    ar.push(itm);
                  }
                });
                setDataList(ar);
                delete arr[index];
              }}
            >
              X
            </a>
          ) : (
            ""
          )}
          <Paper />
        </div>
      );
    });

    // return <div>{JSON.stringify(getDataList)}</div>;
  };

  return (
    <div>
      <h3>
        <center>Ifsc Search Data</center>
      </h3>
      <center>
        <div class="row">
          <span>Enter IFSC Code</span>
          <input
            type="text"
            placeholder="Enter course name"
            value={getIFSC}
            onChange={(e) => setIFSC(e.target.value)}
            class="form-control"
            name="text"
          />
          <button onClick={handleClick} style={{ marginTop: 5 }}>
            Search
          </button>
          <h4 className={classes.h4heading}>Your Seached result:</h4>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>{fetchData()}</div>
      </center>
    </div>
  );
}
