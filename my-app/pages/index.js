import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import NFTcard from "../components/NFTcard";

export default function Home() {
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchCollection, setFetchCollection] = useState(false);

  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching NFTs");
    const api_key = process.env.API_KEY;
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    var requestOptions = {
      method: "GET",
    };

    /// if collections is there and fetch for a particular collection
    if (!contract.length) {
      const fetchURL = `${baseURL}?owner=${address}`;

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      console.log("fetching nfts for collection owned by address");
      const fetchURL = `${baseURL}?owner=${address}&contractAddresses%5B%5D=${contract}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }

    if (nfts) {
      console.log("nfts:", nfts);
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsforCollection = async () => {
    if (contract.length) {
      console.log("Fetching NFTs in the collection");
      const api_key = process.env.API_KEY;
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
      var requestOptions = {
        method: "GET",
      };
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      if (nfts) {
        console.log("NFTs in collection:", nfts);
        setNFTs(nfts.nfts);
      }
    }
  };

  const RenderForm = () => {
    return (
      <div className={styles.form}>
        <div className={styles.firstrow}>
          <input
            className={styles.input}
            type="text"
            value={address}
            placeholder="Wallet Address"
            disabled={fetchCollection}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>
        <div className={styles.secondrow}>
          <input
            className={styles.input}
            type="text"
            value={contract}
            placeholder="Collection contract"
            onChange={(e) => setContract(e.target.value)}
          ></input>
        </div>
        <div className={styles.thirdRow}>
          <label className={styles.checktext}>
            <input
              className={styles.input2}
              type="checkbox"
              value={fetchCollection}
              placeholder="Check for collection"
              onChange={(e) => {
                setFetchCollection(e.target.checked);
              }}
            ></input>
            For whole Collection
          </label>
        </div>
        <div className={styles.buttonrow}>
          <button
            onClick={() => {
              if (fetchCollection) {
                fetchNFTsforCollection();
              } else {
                fetchNFTs();
              }
            }}
            className={styles.button}
          >
            Let's Go 🚀
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>NFT Explorer</title>
        <meta name="description" content="Explore all you NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>NFT Explorer</h1>

        <p className={styles.description}>Explore the World of NFTs</p>

        <RenderForm />

        <div className={styles.gallery}>
          {NFTs.length &&
            NFTs.map((nft) => {
              return <NFTcard nft={nft}></NFTcard>;
            })}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
