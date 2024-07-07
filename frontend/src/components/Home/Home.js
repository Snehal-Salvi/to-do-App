import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>
        <h1 className={styles.heading}>Welcome to Taskly</h1>
        <p className={styles.subtext}>
          Your ultimate task management solution to:
        </p>
        <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <FontAwesomeIcon icon={faCheckCircle} className={styles.icon} />
              Create tasks to keep track of your work.
            </li>
            <li className={styles.featureItem}>
              <FontAwesomeIcon icon={faCheckCircle} className={styles.icon} />
              Set progress to monitor task completion.
            </li>
            <li className={styles.featureItem}>
              <FontAwesomeIcon icon={faCheckCircle} className={styles.icon} />
              Edit tasks to update details as needed.
            </li>
            <li className={styles.featureItem}>
              <FontAwesomeIcon icon={faCheckCircle} className={styles.icon} />
              Delete tasks that are no longer needed.
            </li>
            <li className={styles.featureItem}>
              <FontAwesomeIcon icon={faCheckCircle} className={styles.icon} />
              Add functionalities to customize your workflow.
            </li>
          </ul>
        <Link to="/tasks" className={styles.startButton}>
          Jump In{" "}
          <FontAwesomeIcon icon={faPaperPlane} className={styles.messageIcon} />
        </Link>
      </div>
      <div className={styles.rightContent}>
        <img src={require('../../assets/backgroundImage.png')} alt="Taskly Overview" className={styles.image} />
      </div>
    </div>
  );
}

export default Home;
