import React from "react";
import styles from "../styles/Home.module.css";
import Tilt from ""

export const NFTcard = ({ nft }) => {
  return (
    <div className={styles.card1} href="">
      <div className={styles.image}>
        <img className={styles.img} src={nft.media[0].gateway}></img>
      </div>
      <div className={styles.cardtext}>
        <div className="">
          <h2>{nft.title}</h2>
          <p>Id : {nft.id.tokenId}</p>
          <p>{nft.contract.address}</p>
        </div>
        <div className={styles.carddescription}>
          <p>{nft.description}</p>
        </div>
      </div>
    </div>
  );
};
