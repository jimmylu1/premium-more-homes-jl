import React from "react";
import StarRating from "./StarRating";

// const listings = props => {
//   let oneListing = props.entry.split(",");
//   let listing = {
//     img: oneListing[0],
//     description: oneListing[1],
//     location: oneListing[2],
//     cost_per_night: [3],
//     rating: oneListing[4],
//     votes: oneListing[5]
//   };
// };

const ListEntry = props => (
  <a href={`/?id=${props.entry.id}`} className="individualPic">
    <div>
      <img className="img" src={props.entry.img} />
      <p className="location">
        {props.entry.house_type} · {props.entry.location}
      </p>
      <p className="description">{props.entry.description}</p>
      <p className="price">${props.entry.cost_per_night} per night</p>
      <StarRating rating={props.entry.rating} />
      <span className="votes">{props.entry.votes}</span>
    </div>
  </a>
);

export default ListEntry;
