import React from "react";
import Header from "../common/Header/Header";
import Menu from "./Menu/Menu";
import styles from "./Home.css";

const Home = () => (
	<div className={styles.container}>
		<Header />
		<Menu />
	</div>
);

export default Home;
