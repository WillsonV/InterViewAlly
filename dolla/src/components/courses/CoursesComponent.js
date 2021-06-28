import React from "react";
import { homeObjTwo } from "../pages/HomePage/Data";
import { homeObjFour } from "../pages/Services/Data";
import HeroSection from "./../HeroSection";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";
import { FaFire } from "react-icons/fa";
import { Button } from "./../Button";
import { BsXDiamondFill } from "react-icons/bs";
import { GiCrystalize } from "react-icons/gi";
import "./CoursesComponent.css";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Paper } from "@material-ui/core";

function CoursesComponent({
  CourseType,
  price,
  Features,
  Features2,
  Features3,
  Features4,
}) {
  const dispatch = useDispatch();
  const productlist = useSelector((state) => state.items);
  console.log(productlist);

  const AddToBasketHandler = (id) => {
    dispatch({ type: "Add", id: id });
  };

  const RemoveFromBasketHandler = () => {
    dispatch({ type: "Remove" });
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff", size: 64 }}>
        <div className="Courses__section">
          <div className="Courses__wrapper">
            <div className="Courses__container">
              {productlist.map((keyName, i) => (
                <Link className="Courses__container-card">
                  <div className="Courses__container-cardInfo">
                    <div className="icon">
                      <FaFire />
                    </div>
                    <h3>{keyName.title}</h3>
                    <h4>{keyName.price} $ </h4>
                    <p>per hour</p>
                    <ul className="Courses__container-features">
                      <li>{keyName.Features}</li>
                      <li>{keyName.Features2}</li>
                      <li>{keyName.Features3}</li>
                      <li>{keyName.Features4}</li>
                    </ul>
                    <Button
                      onClick={() => AddToBasketHandler(keyName.id)}
                      buttonSize="btn--wide"
                      buttonColor="primary"
                    >
                      Add to cart
                    </Button>
                    {(keyName.quantity > "0" ||
                      keyName.quantity != undefined) && (
                      <Button
                        className="gotoCartBtn"
                        onClick={() => AddToBasketHandler(keyName.id)}
                        buttonSize="btn--wide"
                        buttonColor="primary"
                      >
                        Go to cart {keyName.quantity}
                      </Button>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default CoursesComponent;
